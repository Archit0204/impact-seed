"use client"
import { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

type SidebarProps = {
    type: string,
};

const categories = ["education", "hunger", "technology", "health", "welfare", "other"];

export default function Sidebar({ type }: SidebarProps) {
    const [filter, setFilter] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    async function filterHandler() {
        if (type === "campaign") {
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (filter) params.set('filter', filter);
            router.push(`/campaigns?${params.toString()}`);
        } else {
            if (search) {
                router.push(`/orgs?search=${search}`);
            }
        }
    }

    function clearFilters() {
        setFilter("");
        setSearch("");
        router.push(type === "campaign" ? '/campaigns' : '/orgs');
    }

    return (
        <div className="flex flex-col gap-6 w-full lg:w-72 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm h-fit lg:sticky lg:top-24">
            <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
            </div>

            {/* Search */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider" htmlFor="sidebar-search">
                    Search
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                        type="text" 
                        placeholder={`Search ${type === "campaign" ? "campaigns" : "organizations"}...`} 
                        id="sidebar-search" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-slate-50 border-slate-200 focus:border-emerald-300 focus:ring-emerald-200 rounded-xl"
                    />
                </div>
            </div>

            {/* Category filter pills (campaigns only) */}
            {type === "campaign" && (
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(filter === cat ? "" : cat)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200 ${
                                    filter === cat
                                        ? "gradient-primary text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-2 mt-2">
                <button 
                    onClick={filterHandler} 
                    className="w-full py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 hover:shadow-md transition-all duration-200"
                >
                    Apply Filters
                </button>
                <button 
                    onClick={clearFilters} 
                    className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <X className="w-4 h-4" />
                    Clear All
                </button>
            </div>
        </div>
    )
}