"use client"
import { OrgSchema } from '@/lib/zod'
import z from 'zod'
import CampaignCard from './CampaignCard';
import { useRouter } from 'next/navigation';
import OrgCard from './OrgCard';

type OrgBannerProps = {
    orgs: z.infer<typeof OrgSchema>[]
}

export default function OrgBanner({ orgs }: OrgBannerProps) {

    const router = useRouter();

    return (
        <div className="flex flex-col p-10 w-full">
            <div className="flex justify-between items-center">
                <h2 className='text-4xl font-medium'>Organisations</h2>
                <button onClick={() => router.push('/orgs')} className='text-lg hover:bg-customBlack hover:text-white rounded-lg px-3 py-1'>Show All</button>
            </div>
            <div className='w-full flex items-center py-6 justify-start gap-x-8'>
                {
                    orgs && orgs.length > 0 ? (
                        orgs.slice(0,4).map(org => (
                            <OrgCard key={org.id} org={org}/>
                        ))
                    ) : (
                        <p className='text-lg w-full text-center py-14'>No Orgs Available</p>
                    )
                }
            </div>
        </div>
    )
}