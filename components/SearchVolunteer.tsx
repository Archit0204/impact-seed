"use client"
import { useState } from "react"

export default function SearchVolunteer() {

    const [location, setLocation] = useState<string>("");
    const [skills, setSkills] = useState<string>("");
    const [causes, setCauses] = useState<string>("");

    return (
        <div className="w-full flex flex-col gap-y-4 p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold">Find Volunteer Opportunities</h2>
            <div className="flex flex-col gap-y-3">
                <div className="flex w-full gap-x-3">
                    <input type="text" placeholder="Location" className="w-full rounded-lg bg-customLightGray border px-4 py-1 focus:outline-none" value={location} onChange={(e) => setLocation(e.target.value)}/>
                    <input type="text" placeholder="Skills" className="w-full rounded-lg bg-customLightGray border px-4 py-1 focus:outline-none" value={skills} onChange={(e) => setSkills(e.target.value)}/>
                    <input type="text" placeholder="Causes" className="w-full rounded-lg bg-customLightGray border px-4 py-1 focus:outline-none" value={causes} onChange={(e) => setCauses(e.target.value)}/>
                </div>
                <button className="text-white bg-customBlack rounded-lg py-1">Search Opportunities</button>
            </div>
        </div>
    )
}