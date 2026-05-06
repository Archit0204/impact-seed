"use client"
import { UserSchema } from '@/lib/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { Plus, Heart, Award, Calendar } from 'lucide-react';

type UserInfoProps = {
    user: z.infer<typeof UserSchema> & { 
        donations?: any[]; 
        volunteerRegistrations?: any[];
    },
}

export default function UserInfo({ user }: UserInfoProps) {
    const router = useRouter();

    const stats = [
        { 
            icon: Heart, 
            label: "Donations", 
            value: user.donations?.length || 0,
            color: "text-rose-500 bg-rose-50"
        },
        { 
            icon: Award, 
            label: "Campaigns", 
            value: user.campaigns?.length || 0,
            color: "text-emerald-500 bg-emerald-50"
        },
        { 
            icon: Calendar, 
            label: "Volunteering", 
            value: user.volunteerRegistrations?.length || 0,
            color: "text-amber-500 bg-amber-50"
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Banner */}
            <div className="h-32 gradient-primary relative">
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Profile info */}
            <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
                    <Image 
                        className="rounded-2xl ring-4 ring-white shadow-lg" 
                        src={user.avatar as string} 
                        alt="profile" 
                        width={96} 
                        height={96}
                    />
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4 pt-2">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {user.firstName} {user.lastName || ""}
                            </h1>
                            <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
                            <p className="text-xs text-slate-400 mt-1">
                                Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                        <button 
                            onClick={() => router.push('/campaigns/new')} 
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            New Campaign
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                                <p className="text-xs text-slate-400">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}