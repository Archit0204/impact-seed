
type ActiveCampaignsProps = {
    campaign: {
        title: string,
        raisedAmount: number,
        goalAmount: number,
    }
};

export default function ActiveCard( { campaign }: ActiveCampaignsProps ) {

    return (
        <div className="bg-white w-full p-5 rounded-xl flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
                <h4 className="text-xl font-medium">{campaign.title}</h4>
                <div>
                    <p>Goal: ${campaign.goalAmount}</p>
                    <p>Raised: ${campaign.raisedAmount}</p>
                </div>
            </div>
            <div className="w-full flex justify-start items-center">
                <button className="bg-customBlack text-white font-medium p-2 rounded-lg">Edit Campaign</button>
            </div>
        </div>
    )
}