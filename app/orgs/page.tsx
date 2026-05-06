import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import OrgCard from "@/components/OrgCard";
import Sidebar from "@/components/Sidebar"
import { OrgSchema } from "@/lib/zod";
import axios from "axios";
import z from 'zod';
import { Building2 } from "lucide-react";

type Org = z.infer<typeof OrgSchema>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Orgs(props: {searchParams: SearchParams}) {

    let orgs: Org[] = [];

    const searchParams = await props.searchParams;
    const { search } = searchParams;

    try {
        const response = await axios.get(`${process.env.CLIENT_URL}/api/orgs?search=${search}`);
        orgs = response.data.orgs;
    } catch (error: any) {
        console.log(error.message);
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar/>
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Organizations</h1>
                        <p className="text-sm text-slate-500">Discover verified NGOs and foundations</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <Sidebar type="org"/>
                    <div className="flex-1">
                        {orgs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {orgs.map(org => (
                                    <OrgCard key={org.id} org={org}/>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                <Building2 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-lg font-medium text-slate-400">No organizations found</p>
                                <p className="text-sm text-slate-300 mt-1">Try adjusting your search</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}