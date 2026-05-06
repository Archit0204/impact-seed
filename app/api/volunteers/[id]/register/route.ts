import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

// POST /api/volunteers/[id]/register — Register for a volunteer program
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized — please sign in to register"
            }, { status: 401 });
        }

        const { id } = await params;

        const user = await client.user.findUnique({
            where: { email: session.user?.email as string }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }

        const volunteer = await client.volunteer.findUnique({
            where: { id }
        });

        if (!volunteer) {
            return NextResponse.json({
                success: false,
                message: "Volunteer program not found"
            }, { status: 404 });
        }

        // Check if already registered
        const existing = await client.volunteerRegistration.findUnique({
            where: {
                userId_volunteerId: {
                    userId: user.id,
                    volunteerId: id
                }
            }
        });

        if (existing) {
            return NextResponse.json({
                success: false,
                message: "You are already registered for this program"
            }, { status: 409 });
        }

        const registration = await client.volunteerRegistration.create({
            data: {
                userId: user.id,
                volunteerId: id,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Registration successful!",
            registration
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}

// DELETE /api/volunteers/[id]/register — Withdraw from a volunteer program
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
            where: { email: session.user?.email as string }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }

        await client.volunteerRegistration.delete({
            where: {
                userId_volunteerId: {
                    userId: user.id,
                    volunteerId: id
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Registration withdrawn"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}
