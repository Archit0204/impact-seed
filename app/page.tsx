import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CampaignBanner from "../components/CampaignBanner";
import axios from "axios";
import OrgBanner from "@/components/OrgBanner";
import { CampaignSchema, OrgSchema } from "@/lib/zod";
import { z } from "zod";

type Campaign = z.infer<typeof CampaignSchema>;
type Org = z.infer<typeof OrgSchema>;

export default async function Home() {

    let campaigns: Campaign[] = [];
    let orgs: Org[] = [];

    try {
        
        const campaignResponse = await axios.get(`${process.env.CLIENT_URL}/api/campaigns`);
        campaigns = campaignResponse.data.campaigns;
        // console.log(campaignResponse.data);

        const orgResponse = await axios.get(`${process.env.CLIENT_URL}/api/orgs`);
        orgs = orgResponse.data.orgs;
        // console.log(orgResponse.data);
        
    } catch (error: any) {
        console.log(error.message);
    }

    return (
        <div className="bg-white flex flex-col min-h-screen w-full">
            <div className="flex flex-col h-screen">
                <Navbar/>
                <Hero/>
            </div>
            <CampaignBanner campaigns={campaigns}/>
            <OrgBanner orgs={orgs}/>
        </div>
    );
}
