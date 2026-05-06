import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CampaignBanner from "../components/CampaignBanner";
import axios from "axios";
import OrgBanner from "@/components/OrgBanner";
import { CampaignSchema, OrgSchema } from "@/lib/zod";
import { z } from "zod";
import Footer from "@/components/Footer";
import { Heart, Search, Users, ArrowRight } from "lucide-react";

type Campaign = z.infer<typeof CampaignSchema>;
type Org = z.infer<typeof OrgSchema>;

export default async function Home() {

    let campaigns: Campaign[] = [];
    let orgs: Org[] = [];

    try {
        const campaignResponse = await axios.get(`${process.env.CLIENT_URL}/api/campaigns`);
        campaigns = campaignResponse.data.campaigns;

        const orgResponse = await axios.get(`${process.env.CLIENT_URL}/api/orgs`);
        orgs = orgResponse.data.orgs;
    } catch (error: any) {
        console.log(error.message);
    }

    const steps = [
        {
            icon: Search,
            title: "Discover",
            description: "Browse campaigns, organizations, and volunteering opportunities that align with your values."
        },
        {
            icon: Heart,
            title: "Contribute",
            description: "Donate to causes you believe in — anonymously or publicly. Every amount makes a difference."
        },
        {
            icon: Users,
            title: "Volunteer",
            description: "Sign up for volunteering programs and make hands-on impact in your community."
        }
    ];

    return (
        <div className="bg-white flex flex-col min-h-screen w-full">
            <Navbar/>
            <Hero/>
            
            <CampaignBanner campaigns={campaigns}/>
            
            {/* How it works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How It Works</h2>
                        <p className="text-lg text-slate-500 mt-3 max-w-xl mx-auto">
                            Making an impact has never been easier. Three simple steps to change the world.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-slate-200 card-hover">
                                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-lg shadow-emerald-200">
                                    <step.icon className="w-7 h-7 text-white" />
                                </div>
                                <span className="absolute top-4 right-4 text-4xl font-black text-slate-100">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <OrgBanner orgs={orgs}/>

            {/* CTA Banner */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto gradient-primary rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Plant Your Seed?</h2>
                        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                            Start a campaign, make a donation, or volunteer today. Every action creates ripples of change.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/campaigns/new" className="px-8 py-3.5 rounded-xl bg-white text-emerald-700 font-bold hover:bg-white/90 transition-all duration-200 flex items-center gap-2 shadow-lg">
                                Start a Campaign
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="/volunteers" className="px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200">
                                Explore Volunteering
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    );
}
