"use client"
import { OrgSchema } from '@/lib/zod'
import z from 'zod'
import { useRouter } from 'next/navigation';
import OrgCard from './OrgCard';
import { ArrowRight, Building2 } from 'lucide-react';

type OrgBannerProps = {
    orgs: z.infer<typeof OrgSchema>[]
}

export default function OrgBanner({ orgs }: OrgBannerProps) {
    const router = useRouter();

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-2">
                        <Building2 className="w-4 h-4" />
                        Verified Partners
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                        Featured Organizations
                    </h2>
                </div>
                <button 
                    onClick={() => router.push('/orgs')} 
                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
                >
                    View All
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
            
            {orgs && orgs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {orgs.slice(0, 4).map(org => (
                        <OrgCard key={org.id} org={org} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-lg">No organizations available yet</p>
                </div>
            )}
        </section>
    )
}