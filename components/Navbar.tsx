"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const { data: session, status } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const donateHandler = () => {

        if (status === "authenticated") {
            router.push("/campaigns");
        } else {
            signIn();
        }

    }

    return (
        <nav className="bg-white flex px-16 pt-4 justify-between items-center">
            <h1 className="text-2xl font-semibold">Impact Seed</h1>
            <div className="flex space-x-6">
                {status === "authenticated" ? (
                    <>
                        {/* Donate Button */}
                        <button onClick={donateHandler} className="bg-customBlack px-4 py-2 text-white rounded-xl font border-2 border-customBlack hover:bg-white hover:text-customBlack hover:border-2 hover:border-customBlack">
                            Donate
                        </button>

                        {/* Avatar and Dropdown */}
                        <div className="relative flex items-center">
                            <button onClick={toggleDropdown} className="rounded-full w-10 h-10 bg-gray-200 overflow-hidden">
                                {session.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-semibold">
                                        {session.user?.name?.[0]}
                                    </div>
                                )}
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-10 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                                    <button
                                        onClick={() => router.push("/profile")}  // Navigate to the profile page
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={donateHandler} className="bg-customBlack px-4 py-2 text-white rounded-xl font border-2 border-customBlack hover:bg-white hover:text-customBlack hover:border-2 hover:border-customBlack">
                            Donate
                        </button>
                        <button
                            onClick={() => signIn()}
                            className="bg-customBlack px-4 py-2 text-white rounded-xl font border-2 border-customBlack hover:bg-white hover:text-customBlack hover:border-2 hover:border-customBlack"
                        >
                            Signin
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
