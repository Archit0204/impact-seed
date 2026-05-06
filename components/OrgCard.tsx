"use client"
import { OrgSchema } from '@/lib/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { Building2, CheckCircle2, ArrowRight } from 'lucide-react';

type OrgProps = {
    org: z.infer<typeof OrgSchema> & { _count?: { campaigns: number; volunteer: number } }
}

export default function OrgCard({ org }: OrgProps) {
    const router = useRouter();

    return (
        <div 
            className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-6 card-interactive cursor-pointer"
            onClick={() => router.push(`/orgs/${org.id}`)}
        >
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    {org.avatar ? (
                        <Image 
                            src={org.avatar} 
                            alt={org.name} 
                            width={56} 
                            height={56}
                            className="rounded-xl object-cover ring-2 ring-slate-100"
                        />
                    ) : (
                        <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center ring-2 ring-emerald-100">
                            <Building2 className="w-7 h-7 text-emerald-600" />
                        </div>
                    )}
                    <CheckCircle2 className="absolute -bottom-1 -right-1 w-5 h-5 text-emerald-500 fill-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                        {org.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                            Verified
                        </span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-500 leading-relaxed mt-4 line-clamp-3 flex-1">
                {org.description}
            </p>

            {/* Stats */}
            {org._count && (
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-900">{org._count.campaigns}</span>
                        <span className="text-xs text-slate-400">Campaigns</span>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-900">{org._count.volunteer}</span>
                        <span className="text-xs text-slate-400">Programs</span>
                    </div>
                </div>
            )}

            {/* CTA */}
            <button className="w-full mt-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-center gap-2 group-hover:border-emerald-300 group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-all duration-200">
                View Organization
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    )
}