import CampaignCard from "@/components/CampaignCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { CampaignSchema } from "@/lib/zod";
import axios from "axios";
import z from 'zod';

type Campaign = z.infer<typeof CampaignSchema>;
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
 
// export async function generateMetadata(props: {
//   params: Params
//   searchParams: SearchParams
// }) {
//   const params = await props.params
//   const searchParams = await props.searchParams
//   const slug = params.slug
//   const query = searchParams.query
// }

export default async function Campaigns(props: { params: Params, searchParams: SearchParams }) {

    let campaigns: Campaign[] = [];

    const params = await props.params;
    const searchParams = await props.searchParams;
    const { search, filter } = searchParams;

    // console.log("searchParams -> ", searchParams);

    try {
        
        const response = await axios.get(`${process.env.CLIENT_URL}/api/campaigns?search=${search}&filter=${filter}`);
        campaigns = response.data.campaigns;

    } catch (error: any) {
        console.log(error.message);
        
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-screen">
                <Navbar/>
                <div className="flex gap-x-5 p-4 h-full">
                    <Sidebar type="campaign"/>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-3xl">Campaigns</h3>
                        {/* <div className="grid grid-cols-3 p-5">
                            {
                                campaigns.length > 0 && campaigns.map(campaign => {
                                    return (
                                        <CampaignCard key={campaign.id} campaign={campaign}/>
                                    )
                                })
                            }
                        </div> */}
                        {
                            campaigns.length > 0 ? (
                                <div className="grid grid-cols-3 p-5 gap-10">
                                    {
                                        campaigns.map(campaign => {
                                            return (
                                                <CampaignCard key={campaign.id} campaign={campaign}/>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div>No Campaigns Found</div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )

}