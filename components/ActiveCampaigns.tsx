import ActiveCard from "./ActiveCard";

type ActiveCampaignsProps = {
    campaigns: {
        title: string,
        raisedAmount: number,
        goalAmount: number,
    }[];
};

export default function ActiveCampaigns() {

    const campaigns = [
        {
            title: "Clean Water Initiative",
            raisedAmount: 1000,
            goalAmount: 5000
        },
        {
            title: "Eco Tree Planting",
            raisedAmount: 7500,
            goalAmount: 10000
        }
    ]

    return (
        <div className="bg-customLightGray p-5 rounded-xl flex flex-col gap-y-5 shadow-lg">
            <h3 className="text-2xl font-semibold">Active Campaigns</h3>
            <div className="flex gap-x-5 flex-1">
                {
                    campaigns && campaigns.map((campaign, index) => {
                        return (
                            <ActiveCard key={index} campaign={campaign}/>
                        )
                    })
                }
            </div>
        </div>
    )
}