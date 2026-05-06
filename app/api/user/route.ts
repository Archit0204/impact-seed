import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { NEXT_AUTH } from "@/lib/auth";

export async function GET(req: NextRequest) {

    try {
        
        const session = await getServerSession(NEXT_AUTH);
        
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 });
        }

        const user = await client.user.findUnique({
            where: {
                email: session.user?.email as string
            },
            include: {
                campaigns: true,
                org: true,
                donations: {
                    include: {
                        campaign: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                category: true,
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10
                },
                volunteerRegistrations: {
                    include: {
                        volunteer: {
                            select: {
                                id: true,
                                name: true,
                                cause: true,
                                location: true,
                                eventDate: true,
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
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