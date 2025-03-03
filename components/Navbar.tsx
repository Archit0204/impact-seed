"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";

export default function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <nav className="bg-white flex px-16 pt-4 justify-between items-center">
            <h1 onClick={() => router.push('/')} className="text-2xl font-semibold cursor-pointer">Impact Seed</h1>
            <div className="flex gap-x-6 text-lg font-medium">
                <button className="hover:underline" onClick={() => router.push('/campaigns')}>Campaigns</button>
                <button className="hover:underline" onClick={() => router.push('/orgs')}>Orgs</button>
                <button className="hover:underline" onClick={() => router.push('/volunteers')}>Volunteers</button>
                {/* <button>Signin</button> */}
                {
                    status === "authenticated" ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Image className="rounded-full cursor-pointer" src={session.user?.image as string} alt="profile" width={40} height={40}/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="max-w-64 mr-5">
                                    <DropdownMenuLabel className="flex flex-col">
                                        <span>Signed in as</span>
                                        <span className="text-xs font-normal text-foreground">{session.user?.email}</span>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
                                        {/* <DropdownMenuItem>Option 2</DropdownMenuItem>
                                        <DropdownMenuItem>Option 3</DropdownMenuItem> */}
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <button className="hover:underline" onClick={() => signIn()}>Signin</button>
                    )
                }
            </div>
        </nav>
    );
}
