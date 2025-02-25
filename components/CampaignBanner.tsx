"use client"
import { CampaignSchema } from '@/lib/zod'
import z from 'zod'
import CampaignCard from './CampaignCard';
import { useRouter } from 'next/navigation';

type CampaignBannerProps = {
    campaigns: z.infer<typeof CampaignSchema>[]
}

export default function CampaignBanner({ campaigns }: CampaignBannerProps) {

    const router = useRouter();

    return (
        <div className="flex flex-col p-10 w-full">
            <div className="flex justify-between items-center">
                <h2 className='text-4xl font-medium'>Campaigns</h2>
                <button onClick={() => router.push('/campaigns')} className='text-lg hover:bg-customBlack hover:text-white rounded-lg px-3 py-1'>Show All</button>
            </div>
            <div className='w-full flex items-center py-6 justify-start'>
                {
                    campaigns && campaigns.length > 0 ? (
                        campaigns.slice(0,4).map(campaign => (
                            <CampaignCard key={campaign.id} campaign={campaign}/>
                        ))
                    ) : (
                        <p className='text-lg w-full text-center py-14'>No Campaigns Available</p>
                    )
                }
            </div>
        </div>
    )
}