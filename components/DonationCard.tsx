import { Calendar, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type DonationCardProps = {
    donation: {
        id: string;
        amount: number;
        anonymous: boolean;
        message?: string;
        createdAt: string;
        campaign: {
            id: string;
            name: string;
            avatar?: string;
            category: string;
        };
    }
};

export default function DonationCard({ donation }: DonationCardProps) {
    const date = new Date(donation.createdAt);
    const timeAgo = getTimeAgo(date);

    return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-slate-200 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <Link 
                        href={`/campaigns/${donation.campaign.id}`}
                        className="text-sm font-semibold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1"
                    >
                        {donation.campaign.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{timeAgo}</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-lg font-bold text-emerald-600">${donation.amount}</span>
                </div>
            </div>
            {donation.message && (
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 italic">&quot;{donation.message}&quot;</p>
            )}
            {donation.anonymous && (
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                    <EyeOff className="w-3 h-3" />
                    <span>Anonymous</span>
                </div>
            )}
        </div>
    )
}

function getTimeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}