import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import OrgCard from "@/components/OrgCard";
import Sidebar from "@/components/Sidebar"
import { OrgSchema } from "@/lib/zod";
import axios from "axios";
import z from 'zod';

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
        <div className="min-h-screen flex flex-col">
            <div className="h-screen">
                <Navbar/>
                <div className="flex gap-x-5 p-4 h-full">
                    <Sidebar type="org"/>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-3xl">Organisations</h3>
                        {/* <div className="grid grid-cols-3 p-5">
                            {
                                orgs.length > 0 ? orgs.map(org => {
                                    return (
                                        <OrgCard key={org.id} org={org}/>
                                    )
                                }) : (
                                    <div>No</div>
                                )
                            }
                        </div> */}
                        {
                            orgs.length > 0 ? (
                                <div className="grid grid-cols-3 p-5">
                                    {
                                        orgs.map(org => {
                                            return (
                                                <OrgCard key={org.id} org={org}/>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div>No Organisations Found</div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )

}