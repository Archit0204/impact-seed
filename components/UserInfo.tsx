import { UserSchema } from '@/lib/zod';
import Image from 'next/image';
import z from 'zod';

type UserInfoProps = {
    user: z.infer<typeof UserSchema>,
}

export default async function UserInfo({ user }: UserInfoProps) {

    return (
        <div className='flex justify-between items-center p-4 shadow-lg rounded-xl'>
            <div className='flex items-center gap-x-5'>
                <div>
                    <Image className='rounded-full' src={user.avatar as string} alt='profile' width={100} height={100}/>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-2xl font-semibold'>{user.firstName} {user.lastName ? `${user.lastName}`: ``}</h1>
                    <div className='flex flex-col'>
                        <p className='underline'>{user.email}</p>
                        <p>Member Since: {user.createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            <div>
                <button className='text-white bg-customBlack px-2 py-2 rounded-xl'>Start a Campaign</button>
            </div>
        </div>
    )

}