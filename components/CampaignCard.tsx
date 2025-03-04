"use client"
import { CampaignSchema } from '@/lib/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import z from 'zod';

type CampaignProps = {
    campaign: z.infer<typeof CampaignSchema>
}

export default function CampaignCard({ campaign }: CampaignProps) {

    const router = useRouter();

    return (
        <div className='flex flex-col gap-y-2 border-2 p-4 border-customBlack rounded-lg w-[300px] h-[400px]'>
            {/* <Image src={"data:image/webp;base64,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"} alt='Avatar' width={250} height={250}/> */}
            <Image src={campaign.avatar as string} alt='Avatar' width={250} height={250}/>
            <div className='flex flex-col gap-y-3 h-full'>
                <h3 onClick={() => router.push(`/campaigns/${campaign.id}`)} className='text-lg font-bold cursor-pointer'>{campaign.name.slice(0,30)}{campaign.name.length > 30 ? "...": ""}</h3>
                <p className='text-sm'>{campaign.description.slice(0,100)}{campaign.description.length > 100 ? "...": ""}</p>
                <div>
                    <span className='text-sm font-semibold bg-customBlack text-white py-1 px-2 rounded-xl'>{campaign.category}</span>
                </div>
            </div>
            <div className='flex justify-between items-center mt-auto'>
                <p className='font-medium'>Raised: {campaign.raisedAmount}$</p>
                <p className='font-medium'>Goal: {campaign.goalAmount}$</p>
            </div>
        </div>
    )

}