import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";

// GET /api/campaigns/[id]/donations — Get donations for a specific campaign
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const campaign = await client.campaign.findUnique({
            where: { id }
        });

        if (!campaign) {
            return NextResponse.json({
                success: false,
                message: "Campaign not found"
            }, { status: 404 });
        }

        const donations = await client.donation.findMany({
            where: { campaignId: id },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Hide user info for anonymous donations
        const sanitized = donations.map((d) => ({
            id: d.id,
            amount: d.amount,
            anonymous: d.anonymous,
            message: d.message,
            createdAt: d.createdAt,
            user: d.anonymous ? null : d.user,
        }));

        return NextResponse.json({
            success: true,
            message: "Donations fetched",
            donations: sanitized
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}
