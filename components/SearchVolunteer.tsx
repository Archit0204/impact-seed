"use client"
import { useState } from "react"
import { Search, MapPin, Sparkles, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchVolunteer() {
    const [location, setLocation] = useState<string>("");
    const [skills, setSkills] = useState<string>("");
    const [causes, setCauses] = useState<string>("");
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set('location', location);
        if (causes) params.set('cause', causes);
        if (skills) params.set('search', skills);
        router.push(`/volunteers?${params.toString()}`);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
                <Search className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900">Find Opportunities</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Location" 
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="relative flex-1">
                    <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Skills" 
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all" 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)}
                    />
                </div>
                <div className="relative flex-1">
                    <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Causes" 
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all" 
                        value={causes} 
                        onChange={(e) => setCauses(e.target.value)}
                    />
                </div>
                <button 
                    onClick={handleSearch}
                    className="px-8 py-3 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 hover:shadow-md transition-all duration-200"
                >
                    Search
                </button>
            </div>
        </div>
    )
}