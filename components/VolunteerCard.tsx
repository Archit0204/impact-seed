"use client"
import { VolunteerSchema } from "@/lib/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { MapPin, Calendar, Sparkles, Users, ArrowRight } from "lucide-react"

type VolunteerCardProps = {
    volunteer: z.infer<typeof VolunteerSchema> & { _count?: { registrations: number } }
}

const causeColors: Record<string, string> = {
    environment: "bg-green-50 text-green-700 border-green-200",
    education: "bg-blue-50 text-blue-700 border-blue-200",
    health: "bg-rose-50 text-rose-700 border-rose-200",
    community: "bg-purple-50 text-purple-700 border-purple-200",
    animals: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function VolunteerCard({ volunteer }: VolunteerCardProps) {
    const router = useRouter();
    const causeColor = causeColors[volunteer.cause?.toLowerCase()] || "bg-slate-50 text-slate-700 border-slate-200";
    const eventDate = new Date(volunteer.eventDate);
    const isUpcoming = eventDate > new Date();

    return (
        <div 
            className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden card-interactive cursor-pointer"
            onClick={() => router.push(`/volunteers/${volunteer.id}`)}
        >
            {/* Image */}
            <div className="relative h-36 overflow-hidden bg-slate-100">
                {volunteer.avatar ? (
                    <Image 
                        src={volunteer.avatar} 
                        alt={volunteer.name} 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
                        <Users className="w-10 h-10 text-emerald-300" />
                    </div>
                )}
                {isUpcoming && (
                    <div className="absolute top-3 right-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                            Upcoming
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                {/* Cause badge */}
                <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full border ${causeColor}`}>
                    {volunteer.cause}
                </span>

                <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {volunteer.name}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {volunteer.description}
                </p>

                {/* Meta */}
                <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{volunteer.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {volunteer.skills?.slice(0, 3).map((skill, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                            <Sparkles className="w-3 h-3" />
                            {skill}
                        </span>
                    ))}
                    {volunteer.skills?.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-400">
                            +{volunteer.skills.length - 3}
                        </span>
                    )}
                </div>

                {/* Register */}
                <button 
                    onClick={(e) => { e.stopPropagation(); router.push(`/volunteers/${volunteer.id}`); }}
                    className="w-full mt-2 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-md transition-all duration-200"
                >
                    Register to Volunteer
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}