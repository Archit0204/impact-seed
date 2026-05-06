"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";
import { Sprout, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { label: "Campaigns", href: "/campaigns" },
        { label: "Organizations", href: "/orgs" },
        { label: "Volunteer", href: "/volunteers" },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button 
                        onClick={() => router.push('/')} 
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">
                            Impact<span className="text-emerald-600">Seed</span>
                        </span>
                    </button>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <button
                                key={link.href}
                                onClick={() => router.push(link.href)}
                                className={`nav-link px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    isActive(link.href)
                                        ? "text-emerald-700 bg-emerald-50"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        {status === "authenticated" ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 p-1 rounded-full transition-all duration-200 hover:ring-2 hover:ring-emerald-200">
                                        <Image 
                                            className="rounded-full ring-2 ring-emerald-100" 
                                            src={session.user?.image as string} 
                                            alt="profile" 
                                            width={36} 
                                            height={36}
                                        />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 mr-4 animate-slide-down rounded-xl shadow-xl border border-slate-200">
                                    <DropdownMenuLabel className="flex flex-col py-3">
                                        <span className="text-sm font-semibold text-slate-900">{session.user?.name}</span>
                                        <span className="text-xs font-normal text-slate-500">{session.user?.email}</span>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="cursor-pointer rounded-lg" onClick={() => router.push('/profile')}>
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer rounded-lg" onClick={() => router.push('/campaigns/new')}>
                                            Create Campaign
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        className="cursor-pointer rounded-lg text-red-600 focus:text-red-600" 
                                        onClick={() => signOut()}
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <button 
                                onClick={() => signIn()}
                                className="px-5 py-2 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button 
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="md:hidden pb-4 animate-slide-down">
                        <div className="flex flex-col gap-1">
                            {navLinks.map(link => (
                                <button
                                    key={link.href}
                                    onClick={() => { router.push(link.href); setMobileOpen(false); }}
                                    className={`px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors ${
                                        isActive(link.href)
                                            ? "text-emerald-700 bg-emerald-50"
                                            : "text-slate-600 hover:bg-slate-50"
                                    }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                            {status !== "authenticated" && (
                                <button 
                                    onClick={() => signIn()}
                                    className="mt-2 px-4 py-3 text-sm font-semibold text-white rounded-lg gradient-primary"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
