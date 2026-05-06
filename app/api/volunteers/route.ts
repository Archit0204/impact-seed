import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const search = searchParams.get('search');
        const cause = searchParams.get('cause');
        const location = searchParams.get('location');

        const whereCondition: any = {};

        if (search && search !== 'undefined') {
            whereCondition.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (cause && cause !== 'undefined') {
            whereCondition.cause = { contains: cause, mode: 'insensitive' };
        }

        if (location && location !== 'undefined') {
            whereCondition.location = { contains: location, mode: 'insensitive' };
        }

        const volunteers = await client.volunteer.findMany({
            where: whereCondition,
            include: {
                org: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        verified: true,
                    }
                },
                _count: {
                    select: { registrations: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            message: "Volunteering programs fetched",
            volunteers
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}

// POST /api/volunteers — Create a volunteer program (org admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }

        const user = await client.user.findUnique({
            where: { email: session.user?.email as string },
            include: { org: true }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }

        if (!user.org) {
            return NextResponse.json({
                success: false,
                message: "You must have a registered organization to create volunteer programs"
            }, { status: 403 });
        }

        const body = await req.json();
        const { name, description, cause, location, skills, eventDate, avatar } = body;

        if (!name || !description || !cause || !location || !skills || !eventDate) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields"
            }, { status: 400 });
        }

        const volunteer = await client.volunteer.create({
            data: {
                name,
                description,
                cause,
                location,
                skills: Array.isArray(skills) ? skills : [skills],
                eventDate: new Date(eventDate),
                avatar: avatar || null,
                orgId: user.org.id,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Volunteer program created successfully",
            volunteer
        }, { status: 201 });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}