import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().uuid(), 
    email: z.string().email(), 
    firstName: z.string(),
    lastName: z.string().optional(),
    avatar: z.string().url().optional(),
    oauthId: z.string(),
    role: z.enum(["user", "admin"]).default("user"),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
    campaigns: z.array(z.object({ id: z.string().uuid() })).optional(),
    org: z.object({
        id: z.string().uuid(),
        name: z.string(),
        description: z.string(),
        avatar: z.string().url().optional(),
        verified: z.boolean(),
        userId: z.string().uuid(),
    }).optional(),
});

export const OrgSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string(),
    avatar: z.string().url().optional()
});
  
export const CampaignSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string(),
    avatar: z.string().url().optional(),
    category: z.string(),
    raisedAmount: z.number().nonnegative("Raised amount must be non-negative").optional(), 
    goalAmount: z.number().positive("Goal amount must be positive"),
    owner: z.enum(["personal", "org"]),
    orgId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
    org: OrgSchema.optional(),
    user: UserSchema.optional(),
});

export const VolunteerSchema = z.object({
    id: z.string().uuid(), 
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    avatar: z.string().url().optional(), 
    cause: z.string().min(1, "Cause is required"),
    location: z.string().min(1, "Location is required"),
    skills: z.array(z.string()).min(1, "At least one skill is required"), 
    eventDate: z.date(), 
    orgId: z.string().min(1, "Organization ID is required"),
    org: OrgSchema.optional(),
    registrations: z.array(z.any()).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const DonationSchema = z.object({
    id: z.string().uuid().optional(),
    amount: z.number().positive("Amount must be positive"),
    anonymous: z.boolean().default(false),
    message: z.string().max(500).optional(),
    campaignId: z.string().uuid(),
    userId: z.string().uuid().optional(),
    createdAt: z.date().optional(),
});

export const VolunteerRegistrationSchema = z.object({
    id: z.string().uuid().optional(),
    userId: z.string().uuid(),
    volunteerId: z.string().uuid(),
    status: z.enum(["pending", "accepted", "rejected"]).default("pending"),
    createdAt: z.date().optional(),
});

export const CreateVolunteerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    cause: z.string().min(1, "Cause is required"),
    location: z.string().min(1, "Location is required"),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    eventDate: z.string().min(1, "Event date is required"),
});