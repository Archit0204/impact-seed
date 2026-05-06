import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

// GET /api/volunteers/[id] — Get volunteer program details
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const volunteer = await client.volunteer.findUnique({
            where: { id },
            include: {
                org: true,
                registrations: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            }
                        }
                    }
                },
                _count: {
                    select: { registrations: true }
                }
            }
        });

        if (!volunteer) {
            return NextResponse.json({
                success: false,
                message: "Volunteer program not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Volunteer program fetched",
            volunteer
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}

// DELETE /api/volunteers/[id] — Delete volunteer program (org admin only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }

        const { id } = await params;

        const user = await client.user.findUnique({
            where: { email: session.user?.email as string },
            include: { org: true }
        });

        if (!user?.org) {
            return NextResponse.json({
                success: false,
                message: "Forbidden"
            }, { status: 403 });
        }

        const volunteer = await client.volunteer.findUnique({
            where: { id }
        });

        if (!volunteer || volunteer.orgId !== user.org.id) {
            return NextResponse.json({
                success: false,
                message: "Volunteer program not found or you don't own it"
            }, { status: 404 });
        }

        await client.volunteer.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Volunteer program deleted"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}
