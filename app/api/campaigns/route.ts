import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { getServerSession } from "next-auth";
import { CampaignSchema } from "@/lib/zod";
import { R2Upload } from "@/lib/uploadR2";

export async function GET(req: NextRequest) {
    try {
        
        const searchParams = req.nextUrl.searchParams;

        const search = searchParams.get('search');
        const filter = searchParams.get('filter');

        const whereCondition: any = { approved: true };

        if (search && search !== 'undefined') {
            whereCondition.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        
        if (filter && filter !== 'undefined') {
            whereCondition.category = { contains: filter, mode: 'insensitive'};
        }

        const campaigns = await client.campaign.findMany({
            where: whereCondition
        });

        return NextResponse.json({
            success: true,
            message: "Campaigns fetched successfully",
            campaigns: campaigns
        }, {status: 200});

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, {status: 500});
    }
}

export async function POST(req: NextResponse) {

    try {
        
        // const session = await getServerSession();

        // if (!session) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "Unauthorized"
        //     }, {status: 401});
        // }

        const formData = await req.formData();

        const userId = formData.get('email');
        
        // const body = await req.json();
        const user = await client.user.findUnique({
            where: {
                // email: body.userId
                email: userId?.toString()
            },
            include: {
                org: true,
                campaigns: true
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Bad Request"
            }, { status: 400 });
        }

        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const goal = formData.get('goal');
        const owner = formData.get('ownership');
        const avatar = formData.get('avatar');

        const body = {
            name: name?.toString(),
            description: description?.toString(),
            category: category?.toString(),
            owner: owner?.toString(),
            goalAmount: parseInt(goal?.toString() as string)
        }

        if (body.owner === "personal" && user.campaigns.length > 3) {
            return NextResponse.json({
                success: false,
                message: "More than 3 campaigns"
            }, { status: 402 });
        }

        if (body.owner === "org" && user.org === null) {
            return NextResponse.json({
                success: false,
                message: "No Org Registered"
            }, { status: 402 });
        }

        if (!CampaignSchema.safeParse(body).success) {
            console.log(body);
            console.log(CampaignSchema.safeParse(body).error)
            return NextResponse.json({
                success: false,
                message: "Inavalid Data",
            }, {status: 400});
        }

        let fileUrl: string = "";

        if (avatar) {
            const res = await R2Upload(avatar as File, body.name as string);
    
            if (!res.success) {
                return NextResponse.json({
                    success: false,
                    message: "Internal Server Error",
                    error: "R2 Error"
                });
            }

            fileUrl = res.key as string;
        }


        await client.campaign.create({
            data: {
                userId: user?.id,
                name: body.name as string,
                description: body.description as string,
                category: body.category as string,
                goalAmount: body.goalAmount,
                raisedAmount: 0,
                avatar: fileUrl,
                owner: body.owner as string,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Campaign created successfully"
        }, {status: 200});

    } catch (error: any) {
        console.log(error.message);
        
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        
        }, {status: 500});
    }

}