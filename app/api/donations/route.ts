import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

// POST /api/donations — Create a donation
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized — please sign in to donate"
            }, { status: 401 });
        }

        const body = await req.json();
        const { amount, campaignId, anonymous, message } = body;

        if (!amount || !campaignId || amount <= 0) {
            return NextResponse.json({
                success: false,
                message: "Invalid donation data"
            }, { status: 400 });
        }

        const campaign = await client.campaign.findUnique({
            where: { id: campaignId, approved: true }
        });

        if (!campaign) {
            return NextResponse.json({
                success: false,
                message: "Campaign not found or not approved"
            }, { status: 404 });
        }

        const user = await client.user.findUnique({
            where: { email: session.user?.email as string }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }

        // Use a transaction to create donation and update campaign atomically
        const result = await client.$transaction(async (tx) => {
            const donation = await tx.donation.create({
                data: {
                    amount: parseFloat(amount),
                    anonymous: anonymous || false,
                    message: message || null,
                    campaignId,
                    userId: user.id,
                }
            });

            await tx.campaign.update({
                where: { id: campaignId },
                data: {
                    raisedAmount: {
                        increment: parseFloat(amount)
                    }
                }
            });

            return donation;
        });

        return NextResponse.json({
            success: true,
            message: "Donation successful!",
            donation: result
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

// GET /api/donations — Get authenticated user's donations
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }

        const user = await client.user.findUnique({
            where: { email: session.user?.email as string }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }

        const donations = await client.donation.findMany({
            where: { userId: user.id },
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
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            message: "Donations fetched",
            donations
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}
