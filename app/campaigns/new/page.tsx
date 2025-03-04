import CampaignForm from "@/components/CampaignForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewCampaign() {

    const session = await getServerSession();

    if (!session) {
        redirect('/');
    }

    return (
        <div className="flex flex-col gap-y-8">
            <Navbar/>
            <CampaignForm userId={session.user?.email as string}/>
            <Footer/>
        </div>
    )

}