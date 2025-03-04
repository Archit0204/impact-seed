import { VolunteerSchema } from "@/lib/zod"
import Image from "next/image"
import { z } from "zod"

type VolunteerCardProps = {
    volunteer: z.infer<typeof VolunteerSchema>
}

export default function VolunteerCard({volunteer}: VolunteerCardProps) {

    return (
        <div>
            <Image src={volunteer.avatar as string} alt="avatar" width={100} height={100}/>
            <div>
                <h2>{volunteer.name}</h2>
                <p>{volunteer.description}</p>
            </div>
            <button>Learn More</button>
        </div>
    )

}