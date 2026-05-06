"use client"
import { CampaignSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import ProgressBar from "./ProgressBar";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

type ActiveCampaignsProps = {
    campaign: z.infer<typeof CampaignSchema>
};

export default function ActiveCard({ campaign }: ActiveCampaignsProps) {
    const router = useRouter();

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this campaign?")) return;
        
        try {
            await axios.delete(`/api/campaigns/${campaign.id}`);
            toast.success("Campaign deleted");
            router.refresh();
        } catch {
            toast.error("Failed to delete campaign");
        }
    };

    return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-slate-200 transition-colors">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-slate-900 truncate">{campaign.name}</h4>
                    <div className="mt-3">
                        <ProgressBar 
                            raised={campaign.raisedAmount || 0} 
                            goal={campaign.goalAmount} 
                            size="sm" 
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-bold text-slate-900">
                            ${(campaign.raisedAmount || 0).toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">
                            of ${campaign.goalAmount.toLocaleString()} goal
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <button 
                    onClick={() => router.push(`/campaigns/edit/${campaign.id}`)} 
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                </button>
                <button 
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}