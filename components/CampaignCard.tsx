"use client"
import { CampaignSchema } from '@/lib/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import z from 'zod';
import ProgressBar from './ProgressBar';
import { Heart } from 'lucide-react';

type CampaignProps = {
    campaign: z.infer<typeof CampaignSchema>
}

const categoryColors: Record<string, string> = {
    education: "bg-blue-50 text-blue-700 border-blue-200",
    hunger: "bg-orange-50 text-orange-700 border-orange-200",
    technology: "bg-violet-50 text-violet-700 border-violet-200",
    health: "bg-rose-50 text-rose-700 border-rose-200",
    welfare: "bg-teal-50 text-teal-700 border-teal-200",
    other: "bg-slate-50 text-slate-700 border-slate-200",
};

export default function CampaignCard({ campaign }: CampaignProps) {
    const router = useRouter();
    const colorClass = categoryColors[campaign.category?.toLowerCase()] || categoryColors.other;

    return (
        <div 
            className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden card-interactive cursor-pointer"
            onClick={() => router.push(`/campaigns/${campaign.id}`)}
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden bg-slate-100">
                {campaign.avatar ? (
                    <Image 
                        src={campaign.avatar} 
                        alt={campaign.name} 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center gradient-primary opacity-20">
                        <Heart className="w-12 h-12 text-emerald-600" />
                    </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}>
                        {campaign.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {campaign.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
                    {campaign.description}
                </p>

                {/* Progress */}
                <div className="mt-auto pt-2">
                    <ProgressBar 
                        raised={campaign.raisedAmount || 0} 
                        goal={campaign.goalAmount} 
                        size="sm" 
                    />
                    <div className="flex justify-between mt-2">
                        <span className="text-sm font-semibold text-slate-900">
                            ${(campaign.raisedAmount || 0).toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-400">
                            of ${campaign.goalAmount.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Donate button */}
                <button 
                    onClick={(e) => { e.stopPropagation(); router.push(`/campaigns/${campaign.id}`); }}
                    className="w-full py-2.5 rounded-xl gradient-accent text-white text-sm font-semibold hover:opacity-90 hover:shadow-md transition-all duration-200 mt-1"
                >
                    Donate Now
                </button>
            </div>
        </div>
    )
}