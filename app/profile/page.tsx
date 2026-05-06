import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import client from "@/db/index";
import UserInfo from "@/components/UserInfo";
import Donations from "@/components/Donations";
import Footer from "@/components/Footer";
import ActiveCampaigns from "@/components/ActiveCampaigns";
import { Calendar, MapPin } from "lucide-react";

export default async function Profile() {

    const session = await getServerSession();
    
    if (!session) {
        redirect("/");
    }

    const user: any = await client.user.findUnique({
        where: {
            email: session.user?.email as string
        },
        include: {
            campaigns: true,
            org: true,
            donations: {
                include: {
                    campaign: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            category: true,
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 10
            },
            volunteerRegistrations: {
                include: {
                    volunteer: {
                        select: {
                            id: true,
                            name: true,
                            cause: true,
                            location: true,
                            eventDate: true,
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!user) {
        redirect("/");
    }
    
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar/>
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col gap-8">
                    <UserInfo user={user}/>
                    <Donations donations={user.donations?.map((d: any) => ({
                        ...d,
                        createdAt: d.createdAt.toISOString(),
                    }))} />
                    <ActiveCampaigns campaigns={user.campaigns}/>
                    
                    {/* Volunteer Registrations */}
                    {user.volunteerRegistrations && user.volunteerRegistrations.length > 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-5">
                                <Calendar className="w-5 h-5 text-amber-500" />
                                <h3 className="text-xl font-bold text-slate-900">Volunteer Registrations</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.volunteerRegistrations.map((reg: any) => (
                                    <div key={reg.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <h4 className="text-sm font-semibold text-slate-900">{reg.volunteer.name}</h4>
                                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                                            <MapPin className="w-3 h-3" />
                                            <span>{reg.volunteer.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                                            <Calendar className="w-3 h-3" />
                                            <span>{new Date(reg.volunteer.eventDate).toLocaleDateString()}</span>
                                        </div>
                                        <span className={`inline-block mt-3 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                                            reg.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                                            reg.status === 'rejected' ? 'bg-red-50 text-red-600' :
                                            'bg-amber-50 text-amber-600'
                                        }`}>
                                            {reg.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    )
}