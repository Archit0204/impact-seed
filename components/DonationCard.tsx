
type DonationCardProps = {
    donation: {
        title: string, 
        date: string,
        amount: number
    }
};

export default function DonationCard({ donation}: DonationCardProps) {

    return (
        <div className="bg-white w-full p-5 rounded-xl flex flex-col gap-y-2">
            <h3 className="text-xl font-medium">{donation.title}</h3>
            <div>
                <p>Date: {donation.date}</p>
                <p>Amount: {donation.amount}$</p>
            </div>
        </div>
    )
}