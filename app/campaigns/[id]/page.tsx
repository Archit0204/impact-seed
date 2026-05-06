"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import DonationModal from "@/components/DonationModal";
import Image from "next/image";
import { Heart, Users, Calendar, Share2, ArrowLeft, User, EyeOff } from "lucide-react";

export default function CampaignDetail() {
    const params = useParams();
    const router = useRouter();
    const [campaign, setCampaign] = useState<any>(null);
    const [donations, setDonations] = useState<any[]>([]);
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [campRes, donRes] = await Promise.all([
                axios.get(`/api/campaigns/${params.id}`),
                axios.get(`/api/campaigns/${params.id}/donations`)
            ]);
            setCampaign(campRes.data.campaign);
            setDonations(donRes.data.donations || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <p className="text-xl text-slate-400">Campaign not found</p>
                    <button onClick={() => router.push('/campaigns')} className="text-emerald-600 font-semibold hover:underline">
                        Back to Campaigns
                    </button>
                </div>
            </div>
        );
    }

    const percentage = Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            
            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Back button */}
                <button 
                    onClick={() => router.push('/campaigns')}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Campaigns
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Image */}
                        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-200">
                            {campaign.avatar ? (
                                <Image 
                                    src={campaign.avatar} 
                                    alt={campaign.name} 
                                    fill 
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full gradient-primary opacity-20 flex items-center justify-center">
                                    <Heart className="w-16 h-16 text-emerald-600" />
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                                    {campaign.category}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {campaign.owner === "org" ? "Organization Campaign" : "Personal Campaign"}
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{campaign.name}</h1>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{campaign.description}</p>

                            {/* Creator */}
                            {campaign.user && (
                                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                                    {campaign.user.avatar ? (
                                        <Image 
                                            src={campaign.user.avatar} 
                                            alt="Creator" 
                                            width={40} 
                                            height={40}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <User className="w-5 h-5 text-slate-400" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {campaign.user.firstName} {campaign.user.lastName || ""}
                                        </p>
                                        <p className="text-xs text-slate-400">Campaign Creator</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Donors */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-5">
                                <Users className="w-5 h-5 text-emerald-600" />
                                <h2 className="text-xl font-bold text-slate-900">Recent Donors</h2>
                                <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                                    {donations.length} total
                                </span>
                            </div>
                            {donations.length > 0 ? (
                                <div className="space-y-3">
                                    {donations.slice(0, 10).map((d: any) => (
                                        <div key={d.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                                            <div className="flex items-center gap-3">
                                                {d.anonymous ? (
                                                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                                                        <EyeOff className="w-4 h-4 text-slate-400" />
                                                    </div>
                                                ) : d.user?.avatar ? (
                                                    <Image src={d.user.avatar} alt="" width={36} height={36} className="rounded-full" />
                                                ) : (
                                                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">
                                                        {d.anonymous ? "Anonymous" : `${d.user?.firstName || "Donor"} ${d.user?.lastName || ""}`}
                                                    </p>
                                                    {d.message && (
                                                        <p className="text-xs text-slate-400 italic line-clamp-1">&quot;{d.message}&quot;</p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-emerald-600">${d.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Heart className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                    <p className="text-sm text-slate-400">No donations yet. Be the first!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Donation widget */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
                            <div className="text-center mb-4">
                                <span className="text-3xl font-bold text-slate-900">
                                    ${campaign.raisedAmount.toLocaleString()}
                                </span>
                                <span className="text-sm text-slate-400 ml-1">
                                    raised of ${campaign.goalAmount.toLocaleString()} goal
                                </span>
                            </div>

                            <ProgressBar raised={campaign.raisedAmount} goal={campaign.goalAmount} size="lg" />

                            <div className="grid grid-cols-2 gap-4 my-6">
                                <div className="text-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-lg font-bold text-slate-900">{campaign._count?.donations || 0}</span>
                                    <p className="text-xs text-slate-400">Donors</p>
                                </div>
                                <div className="text-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-lg font-bold text-slate-900">{percentage}%</span>
                                    <p className="text-xs text-slate-400">Funded</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowDonateModal(true)}
                                className="w-full py-4 rounded-xl gradient-accent text-white text-base font-bold hover:opacity-90 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Heart className="w-5 h-5" />
                                Donate Now
                            </button>

                            <button className="w-full mt-3 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                <Share2 className="w-4 h-4" />
                                Share Campaign
                            </button>

                            <p className="text-xs text-slate-400 text-center mt-4">
                                Created {new Date(campaign.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <DonationModal
                campaignId={campaign.id}
                campaignName={campaign.name}
                isOpen={showDonateModal}
                onClose={() => setShowDonateModal(false)}
                onSuccess={fetchData}
            />
        </div>
    );
}
