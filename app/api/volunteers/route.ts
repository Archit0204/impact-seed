import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";

export async function GET(req: NextRequest) {

    try {
        
        const volunteers = await client.volunteer.findMany();

        return NextResponse.json({
            success: true,
            message: "Volunteering programs fetched",
            volunteers: volunteers
        }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 })
    }
}