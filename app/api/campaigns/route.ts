import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { getServerSession } from "next-auth";
import { CampaignSchema } from "@/lib/zod";

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
        
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, {status: 401});
        }

        const body = await req.json();
        const user = await client.user.findUnique({
            where: {
                // email: body.userId
                email: session.user?.email as string
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Bad Request"
            }, { status: 400 });
        }

        if (!CampaignSchema.safeParse(body).success) {
            console.log(body);
            console.log(CampaignSchema.safeParse(body).error)
            return NextResponse.json({
                success: false,
                message: "Inavalid Data",
            }, {status: 400});
        }

        await client.campaign.create({
            data: {
                userId: user?.id,
                name: body.name,
                description: body.description,
                category: body.category,
                goalAmount: body.goalAmount,
                raisedAmount: body.raisedAmount,
                avatar: body.avatar,
                owner: body.owner,
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