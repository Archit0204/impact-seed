import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import client from "@/db/index";
import UserInfo from "@/components/UserInfo";
import Donations from "@/components/Donations";
import Footer from "@/components/Footer";
import ActiveCampaigns from "@/components/ActiveCampaigns";

export default async function Profile() {

    const session = await getServerSession();
    
    if (!session) {
        redirect("/");
    }

    const user: any = await client.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    });
    
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col gap-y-12 p-10">
                <UserInfo user={user}/>
                <Donations/>
                <ActiveCampaigns/>
            </div>
            <Footer/>
        </div>
    )
}