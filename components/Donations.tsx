import DonationCard from "./DonationCard"

export default async function Donations() {

    const donations = [
        {
            title: "Save the Children",
            date: "2021-10-10",
            amount: 100
        },
        {
            title: "Save the Children",
            date: "2021-10-10",
            amount: 100
        },
        {
            title: "Save the Children",
            date: "2021-10-10",
            amount: 100
        }
    ]

    return (
        <div className="bg-customLightGray p-5 rounded-xl flex flex-col gap-y-5 shadow-lg">
            <h1 className="text-2xl font-semibold">Past Donations</h1>
            <div className="flex gap-x-5 flex-1">
                {
                    donations && donations.map((donation, index) => {
                        return (
                            <DonationCard key={index} donation={donation}/>
                        )
                    })
                }
            </div>
        </div>
    ) 
}