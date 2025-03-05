import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index"
import { CampaignSchema } from "@/lib/zod";
import { R2Upload } from "@/lib/uploadR2";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {

    try {
        
        const { id } = await params;

        const campaign = await client.campaign.findUnique({
            where: {
                id: id
            },
            include: {
                user: true
            }
        });

        return NextResponse.json({
            success: true,
            message: "Campaign fetched successfully",
            campaign: campaign
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: true,
            message: "Internal Server Error",
            error: error.message
        });
    }

}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {

    try {
     
        const { id } = await params;

        const formData = await req.formData();

        const userId = formData.get('email');
        
        const user = await client.user.findUnique({
            where: {
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
        console.log(user.campaigns);
        
        if (!user?.campaigns.some(camp => camp.id === id)) {
            return NextResponse.json({
                success: false,
                message: "User doesnt own this Campaign"
            }, { status: 404 });
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

        await client.campaign.update({
            where: {
                id: id
            }, 
            data: {
                name: body.name,
                description: body.description,
                category: body.category,
                goalAmount: body.goalAmount,
                avatar: avatar ? fileUrl: undefined
            }
        });

        return NextResponse.json({
            success: true,
            message: "Campaign Updated",
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}