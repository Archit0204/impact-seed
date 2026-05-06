import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Sprout, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="gradient-dark text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                                <Sprout className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                Impact<span className="text-emerald-400">Seed</span>
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Empowering change through donations and volunteering. 
                            Every seed of kindness grows into a forest of impact.
                        </p>
                        <div className="flex gap-3 mt-2">
                            <button className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <FaFacebookF className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <FaXTwitter className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <FaInstagram className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
                        <div className="flex flex-col gap-2.5">
                            {[
                                { label: "Campaigns", href: "/campaigns" },
                                { label: "Organizations", href: "/orgs" },
                                { label: "Volunteer", href: "/volunteers" },
                                { label: "My Profile", href: "/profile" },
                            ].map(link => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h4>
                        <div className="flex flex-col gap-2.5">
                            {["How It Works", "FAQ", "Terms of Service", "Privacy Policy"].map(item => (
                                <span key={item} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <span>Chitkara University, Rajpura</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <span>+91 123-456-789</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <span>hello@impactseed.org</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <p className="text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} Impact Seed. All rights reserved. Built with 💚
                    </p>
                </div>
            </div>
        </footer>
    )
}