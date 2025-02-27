import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";

export async function GET(req: NextRequest) {

    try {
        
        const session = await getServerSession();
        console.log(session);
        
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 });
        }

        const user = await client.user.findUnique({
            where: {
                email: session.user?.email as string
            }
        });

        return NextResponse.json({
            success: true,
            message: "User fetched successfully",
            user: user
        }, { status: 200 });

    } catch (error: any) {
        console.log(error.message);
        
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}