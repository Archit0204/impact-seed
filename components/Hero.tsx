"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { IoIosSearch } from "react-icons/io";

export default function Hero() {

    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const searchHandler = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (search !== "") {
            router.push(`/campaigns?search=${search}`);
        }
        else {
            // show toast
        }
    }

    return (
        <section className="flex flex-col h-full items-center justify-center gap-y-8 p-8">
            <p className="text-8xl">Discover meaningful ways to make a donation</p>
            <form onSubmit={searchHandler} className="w-[40%] relative">
                <input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Campaigns"
                className="py-3 pl-4 pr-14 border-2 border-customBlack w-full rounded-full focus:outline-none"/>
                <button className="absolute text-3xl top-[10px] right-5"><IoIosSearch/></button>
            </form>
        </section>
    )   

}