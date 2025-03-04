import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index"

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