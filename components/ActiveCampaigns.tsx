import { z } from "zod";
import ActiveCard from "./ActiveCard";
import { CampaignSchema } from "@/lib/zod";
import { Award } from "lucide-react";

type ActiveCampaignsProps = {
    campaigns: z.infer<typeof CampaignSchema>[];
};

export default function ActiveCampaigns({ campaigns }: ActiveCampaignsProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
                <Award className="w-5 h-5 text-emerald-500" />
                <h3 className="text-xl font-bold text-slate-900">Your Campaigns</h3>
                <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                    {campaigns?.length || 0} active
                </span>
            </div>
            {campaigns && campaigns.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaigns.map((campaign, index) => (
                        <ActiveCard key={index} campaign={campaign} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <Award className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-400">No campaigns yet</p>
                    <p className="text-sm text-slate-300 mt-1">Create your first campaign to get started</p>
                </div>
            )}
        </div>
    )
}