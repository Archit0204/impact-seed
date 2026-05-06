import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index"
import { CampaignSchema } from "@/lib/zod";
import { R2Upload } from "@/lib/uploadR2";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {

    try {
        
        const { id } = await params;

        const campaign = await client.campaign.findUnique({
            where: {
                id: id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    }
                },
                org: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        verified: true,
                    }
                },
                _count: {
                    select: { donations: true }
                }
            }
        });

        if (!campaign) {
            return NextResponse.json({
                success: false,
                message: "Campaign not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Campaign fetched successfully",
            campaign: campaign
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }

}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {

    try {

        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }
     
        const { id } = await params;

        const formData = await req.formData();
        
        const user = await client.user.findUnique({
            where: {
                email: session.user?.email as string
            },
            include: {
                org: true,
                campaigns: true
            }
        });

        
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Bad Request"
            }, { status: 400 });
        }
        
        if (!user?.campaigns.some(camp => camp.id === id)) {
            return NextResponse.json({
                success: false,
                message: "User doesnt own this Campaign"
            }, { status: 404 });
        }

        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const goal = formData.get('goal');
        const owner = formData.get('ownership');
        const avatar = formData.get('avatar');

        const body = {
            name: name?.toString(),
            description: description?.toString(),
            category: category?.toString(),
            owner: owner?.toString(),
            goalAmount: parseInt(goal?.toString() as string)
        }

        if (!CampaignSchema.safeParse(body).success) {
            console.log(body);
            console.log(CampaignSchema.safeParse(body).error)
            return NextResponse.json({
                success: false,
                message: "Invalid Data",
            }, {status: 400});
        }

        let fileUrl: string = "";
        
        if (avatar) {
            const res = await R2Upload(avatar as File, body.name as string);
    
            if (!res.success) {
                return NextResponse.json({
                    success: false,
                    message: "Internal Server Error",
                    error: "R2 Error"
                });
            }

            fileUrl = res.key as string;
        }

        await client.campaign.update({
            where: {
                id: id
            }, 
            data: {
                name: body.name,
                description: body.description,
                category: body.category,
                goalAmount: body.goalAmount,
                avatar: avatar ? fileUrl: undefined
            }
        });

        return NextResponse.json({
            success: true,
            message: "Campaign Updated",
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}

// DELETE /api/campaigns/[id] — Delete campaign (owner only)
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
            include: { campaigns: true }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }

        if (!user.campaigns.some(c => c.id === id)) {
            return NextResponse.json({
                success: false,
                message: "You don't own this campaign"
            }, { status: 403 });
        }

        await client.campaign.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Campaign deleted"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}