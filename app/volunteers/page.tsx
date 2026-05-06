import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchVolunteer from "@/components/SearchVolunteer";
import VolunteerCard from "@/components/VolunteerCard";
import { VolunteerSchema } from "@/lib/zod";
import axios from "axios";
import { z } from "zod";
import { Users } from "lucide-react";

type Volunteer = z.infer<typeof VolunteerSchema>; 
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Volunteers(props: { searchParams: SearchParams }) {

    let volunteers: Volunteer[] = [];
    const searchParams = await props.searchParams;
    const { search, cause, location } = searchParams;

    try {
        const params = new URLSearchParams();
        if (search) params.set('search', search as string);
        if (cause) params.set('cause', cause as string);
        if (location) params.set('location', location as string);
        
        const response = await axios.get(`${process.env.CLIENT_URL}/api/volunteers?${params.toString()}`);
        volunteers = response.data.volunteers;
    } catch (error: any) {
        console.log(error.message);
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Volunteer Programs</h1>
                        <p className="text-sm text-slate-500">Make a hands-on difference in your community</p>
                    </div>
                </div>

                <SearchVolunteer />

                <div className="mt-8">
                    {volunteers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {volunteers.map(volunteer => (
                                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                            <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-lg font-medium text-slate-400">No volunteer programs found</p>
                            <p className="text-sm text-slate-300 mt-1">Try adjusting your search criteria</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}