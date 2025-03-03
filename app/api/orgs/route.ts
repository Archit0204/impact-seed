import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {

    try {
        
        const searchParams = req.nextUrl.searchParams;
        const search = searchParams.get('search');

        const whereCondition: any = { verified: true };

        if (search && search !== 'undefined') {
            
            whereCondition.name = { contains: search, mode: 'insensitive' }; 
        }


        const orgs = await client.org.findMany({
            where: whereCondition
        });

        return NextResponse.json({
            success: true,
            orgs: orgs
        }, {status: 200});

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, {status: 500});
    }

}

export async function POST(req: NextRequest) {

    try {
        
        const session = await getServerSession();

        // if (!session) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "Unauthorized",
        //     }, { status: 401 });
        // }

        const body = await req.json();

        const user = await client.user.findUnique({
            where: {
                // email: session.user?.email as string
                email: body.userId
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Bad Request"
            }, { status: 400 });
        }

        await client.org.create({
            data: {
                name: body.name,
                description: body.description,
                avatar: body.avatar,
                userId: user.id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Org created successfully"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message 
        }, { status: 500 })
    }

}