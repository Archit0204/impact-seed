"use client"
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

type SidebarProps = {
    type: string,
};

export default function Sidebar({ type }: SidebarProps) {

    const [filter, setFilter] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const router = useRouter();

    async function filterHandler() {
        if (type === "campaign") {

            if (search === "" && filter !== "#") {
                router.push(`/campaigns?filter=${filter}`);
            }
            else if (filter === "#" && search !== "") {
                router.push(`/campaigns?search=${search}`);
            }
            else if (filter !== "#" && search !== "") {
                router.push(`/campaigns?search=${search}&filter=${filter}`);
            }
            else {
                // show toast
            }
        }
        else {
            if (search !== "") {
                router.push(`/orgs?search=${search}`);
            }
            else {
                // show toast
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-4 h-full w-[20%] p-10 shadow-lg rounded-lg">
            <h2 className="text-xl font-medium">Filters</h2>
            <div className="flex flex-col gap-y-3">
                <div className={`flex flex-col ${type === "org" ? "hidden": ""}`}>
                    <h4 className="text-sm">Category</h4>
                    <Select onValueChange={val => setFilter(val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="#">Category</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="hunger">Hunger</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="welfare">Welfare</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="search">Search</label>
                    <Input type="text" placeholder={`Search a ${type}`} id="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-y-2 mt-3">
                    <button onClick={filterHandler} className="text-white bg-customBlack px-2 py-1 rounded-lg">Apply Filters</button>
                    <button onClick={() => type === "org" ? router.push('/orgs') : router.push('/campaigns')} className="text-white bg-customBlack px-2 py-1 rounded-lg">Remove Filters</button>
                </div>
            </div>
        </div>
    )

}