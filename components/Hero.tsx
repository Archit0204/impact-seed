"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Search, ArrowRight, Heart, Users, Globe } from "lucide-react";

export default function Hero() {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const searchHandler = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (search !== "") {
            router.push(`/campaigns?search=${search}`);
        }
    }

    const stats = [
        { icon: Heart, label: "Donations Made", value: "10K+" },
        { icon: Users, label: "Active Volunteers", value: "2.5K+" },
        { icon: Globe, label: "NGOs Supported", value: "150+" },
    ];

    return (
        <section className="relative overflow-hidden gradient-hero">
            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-40 right-40 w-48 h-48 bg-emerald-300/20 rounded-full blur-2xl animate-float" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="flex flex-col items-center text-center gap-8">
                    {/* Badge */}
                    <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Making change happen, one seed at a time
                    </div>

                    {/* Headline */}
                    <h1 className="animate-slide-up text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] max-w-4xl">
                        Discover meaningful ways to{" "}
                        <span className="text-gradient">make a change</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="animate-slide-up stagger-2 text-lg sm:text-xl text-slate-500 max-w-2xl leading-relaxed">
                        Support campaigns, donate to causes you care about, and volunteer 
                        with organizations creating real impact in communities worldwide.
                    </p>

                    {/* Search */}
                    <form onSubmit={searchHandler} className="animate-slide-up stagger-3 w-full max-w-xl relative group">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                            <input 
                                type="text" 
                                name="search" 
                                value={search} 
                                onChange={e => setSearch(e.target.value)} 
                                placeholder="Search campaigns, causes, organizations..."
                                className="w-full py-4 pl-14 pr-36 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all duration-300"
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 hover:shadow-md transition-all duration-200"
                            >
                                Search
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>

                    {/* CTA Buttons */}
                    <div className="animate-slide-up stagger-4 flex flex-wrap justify-center gap-4 mt-2">
                        <button 
                            onClick={() => router.push('/campaigns')}
                            className="px-8 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 flex items-center gap-2"
                        >
                            Explore Campaigns
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => router.push('/volunteers')}
                            className="px-8 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                        >
                            Start Volunteering
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="animate-slide-up stagger-5 grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-slate-200/60 w-full max-w-lg">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <stat.icon className="w-5 h-5 text-emerald-500 mb-1" />
                                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                                <span className="text-xs text-slate-500">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )   
}