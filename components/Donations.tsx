import { Heart } from "lucide-react";
import DonationCard from "./DonationCard"

type DonationsProps = {
    donations?: {
        id: string;
        amount: number;
        anonymous: boolean;
        message?: string;
        createdAt: string;
        campaign: {
            id: string;
            name: string;
            avatar?: string;
            category: string;
        };
    }[];
};

export default function Donations({ donations = [] }: DonationsProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
                <Heart className="w-5 h-5 text-rose-500" />
                <h2 className="text-xl font-bold text-slate-900">Donation History</h2>
            </div>
            {donations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {donations.map((donation) => (
                        <DonationCard key={donation.id} donation={donation} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <Heart className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-400">No donations yet</p>
                    <p className="text-sm text-slate-300 mt-1">Your donation history will appear here</p>
                </div>
            )}
        </div>
    ) 
}