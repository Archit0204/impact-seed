import CampaignForm from "@/components/CampaignForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CampaignSchema } from "@/lib/zod";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

type Params = Promise<{ id: string }>;
type Campaign = z.infer<typeof CampaignSchema> | undefined;

export default async function EditPage(props: { params: Params }) {

    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }

    const { id } = await props.params;

    let campaign: Campaign = undefined;

    try {
        
        const response = await axios.get(`${process.env.CLIENT_URL}/api/campaigns/${id}`);
        campaign = response.data.campaign;

        if (campaign && campaign.user?.email !== session.user?.email) {
            redirect('/');
        }

    } catch (error: any) {
        console.log(error.message);
        
    }


    return (
        <div className="flex flex-col gap-y-8">
            <Navbar/>
            <CampaignForm userId={session.user?.email as string} campaign={campaign} type="edit"/>
            <Footer/>
        </div>
    )

}