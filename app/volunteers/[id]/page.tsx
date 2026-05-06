"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { MapPin, Calendar, Sparkles, Users, ArrowLeft, Building2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function VolunteerDetail() {
    const params = useParams();
    const router = useRouter();
    const [volunteer, setVolunteer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        const fetchVolunteer = async () => {
            try {
                const res = await axios.get(`/api/volunteers/${params.id}`);
                setVolunteer(res.data.volunteer);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVolunteer();
    }, [params.id]);

    const handleRegister = async () => {
        setRegistering(true);
        try {
            await axios.post(`/api/volunteers/${params.id}/register`);
            toast.success("Successfully registered for this program!");
            // Refresh data
            const res = await axios.get(`/api/volunteers/${params.id}`);
            setVolunteer(res.data.volunteer);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to register");
        } finally {
            setRegistering(false);
        }
    };

    const handleWithdraw = async () => {
        if (!confirm("Are you sure you want to withdraw?")) return;
        try {
            await axios.delete(`/api/volunteers/${params.id}/register`);
            toast.success("Registration withdrawn");
            const res = await axios.get(`/api/volunteers/${params.id}`);
            setVolunteer(res.data.volunteer);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to withdraw");
        }
    };

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

    if (!volunteer) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <p className="text-xl text-slate-400">Program not found</p>
                    <button onClick={() => router.push('/volunteers')} className="text-emerald-600 font-semibold hover:underline">
                        Back to Programs
                    </button>
                </div>
            </div>
        );
    }

    const eventDate = new Date(volunteer.eventDate);
    const isUpcoming = eventDate > new Date();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <button 
                    onClick={() => router.push('/volunteers')}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Programs
                </button>

                {/* Hero image */}
                <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-200 mb-8">
                    {volunteer.avatar ? (
                        <Image src={volunteer.avatar} alt={volunteer.name} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
                            <Users className="w-16 h-16 text-emerald-300" />
                        </div>
                    )}
                    {isUpcoming && (
                        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold">
                            Upcoming
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-200 p-8">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                                {volunteer.cause}
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4 mb-4">{volunteer.name}</h1>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{volunteer.description}</p>

                            {/* Skills */}
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-semibold text-slate-700 mb-3">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {volunteer.skills?.map((skill: string, i: number) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Org */}
                            {volunteer.org && (
                                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{volunteer.org.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                                            <CheckCircle2 className="w-3 h-3" />
                                            <span>Verified Organization</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <MapPin className="w-5 h-5 text-emerald-500" />
                                    <div>
                                        <p className="text-xs text-slate-400">Location</p>
                                        <p className="text-sm font-semibold text-slate-900">{volunteer.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <Calendar className="w-5 h-5 text-amber-500" />
                                    <div>
                                        <p className="text-xs text-slate-400">Event Date</p>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-xs text-slate-400">Registered</p>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {volunteer._count?.registrations || 0} volunteers
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleRegister}
                                disabled={registering}
                                className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {registering ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Users className="w-4 h-4" />
                                        Register to Volunteer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
