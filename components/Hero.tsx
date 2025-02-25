"use client"
import { useState } from "react"
import { IoIosSearch } from "react-icons/io";

export default function Hero() {

    const [search, setSearch] = useState<string>("");

    return (
        <section className="flex flex-col h-full items-center justify-center gap-y-8 p-8">
            <p className="text-8xl">Discover meaningful ways to make a donation</p>
            <div className="w-[40%] relative">
                <input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Campaigns"
                className="py-3 pl-4 pr-14 border-2 border-customBlack w-full rounded-full focus:outline-none"/>
                <button className="absolute text-3xl top-[10px] right-5"><IoIosSearch/></button>
            </div>
        </section>
    )   

}