import CampaignCard from "@/components/CampaignCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { CampaignSchema } from "@/lib/zod";
import axios from "axios";
import z from 'zod';
import { Megaphone } from "lucide-react";

type Campaign = z.infer<typeof CampaignSchema>;
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Campaigns(props: { params: Params, searchParams: SearchParams }) {

    let campaigns: Campaign[] = [];

    const searchParams = await props.searchParams;
    const { search, filter } = searchParams;

    try {
        const response = await axios.get(`${process.env.CLIENT_URL}/api/campaigns?search=${search}&filter=${filter}`);
        campaigns = response.data.campaigns;
    } catch (error: any) {
        console.log(error.message);
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar/>
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <Megaphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Campaigns</h1>
                        <p className="text-sm text-slate-500">Discover and support causes that matter</p>
                    </div>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    <Sidebar type="campaign"/>
                    <div className="flex-1">
                        {campaigns.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {campaigns.map(campaign => (
                                    <CampaignCard key={campaign.id} campaign={campaign}/>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                <Megaphone className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-lg font-medium text-slate-400">No campaigns found</p>
                                <p className="text-sm text-slate-300 mt-1">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}