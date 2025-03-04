import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchVolunteer from "@/components/SearchVolunteer";
import VolunteerCard from "@/components/VolunteerCard";
import { VolunteerSchema } from "@/lib/zod";
import axios from "axios";
import { z } from "zod";

type Volunteer = z.infer<typeof VolunteerSchema>; 

export default async function Volunteers() {

    let volunteers: Volunteer[] = [];

    try {
        
        const response = await axios.get(`${process.env.CLIENT_URL}/api/volunteers`);

        volunteers = response.data.volunteers;

    } catch (error: any) {
        console.log(error.message);

    }

    return (
        <div className="w-screen">
            <Navbar/>
            <div className="p-8">
                <SearchVolunteer/>
                {
                    volunteers.length > 0 ? (
                        <div className="grid grid-cols-3">
                            {
                                volunteers.map(volunteer => {
                                    return (
                                        <VolunteerCard volunteer={volunteer}/>
                                    )
                                })
                            }
                        </div>
                    ): (
                        <div>No programs found</div>
                    )
                }
            </div>
            <Footer/>
        </div>
    )

}