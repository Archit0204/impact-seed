"use client"
import { CampaignSchema } from '@/lib/zod'
import z from 'zod'
import CampaignCard from './CampaignCard';
import { useRouter } from 'next/navigation';
import { ArrowRight, TrendingUp } from 'lucide-react';

type CampaignBannerProps = {
    campaigns: z.infer<typeof CampaignSchema>[]
}

export default function CampaignBanner({ campaigns }: CampaignBannerProps) {
    const router = useRouter();

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-2">
                        <TrendingUp className="w-4 h-4" />
                        Trending Now
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                        Active Campaigns
                    </h2>
                </div>
                <button 
                    onClick={() => router.push('/campaigns')} 
                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
                >
                    View All
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
            
            {campaigns && campaigns.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {campaigns.slice(0, 4).map(campaign => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-lg">No campaigns available yet</p>
                    <button 
                        onClick={() => router.push('/campaigns/new')}
                        className="mt-4 px-6 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold"
                    >
                        Start a Campaign
                    </button>
                </div>
            )}

            <button 
                onClick={() => router.push('/campaigns')} 
                className="sm:hidden w-full mt-6 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700"
            >
                View All Campaigns
            </button>
        </section>
    )
}