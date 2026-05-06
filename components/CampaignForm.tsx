"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import axios, { isAxiosError } from "axios"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { CampaignSchema } from "@/lib/zod"
import { toast } from "sonner"

type CampaignFormProps = {
    userId: string,
    campaign?: z.infer<typeof CampaignSchema>
    type: "create" | "edit"
}

type OwnershipType = "personal" | "org";

export default function CampaignForm({ userId, campaign, type }: CampaignFormProps) {

    const [formData, setFormData] = useState({
        name: campaign?.name || "",
        description: campaign?.description || "",
        category: campaign?.category || "",
        goal: (campaign?.goalAmount)?.toString() || "",
        ownership: campaign?.owner as OwnershipType || "personal"
    })
    const [avatar, setAvatar] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(campaign?.avatar || null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }))
    }

    const handleOwnershipChange = (value: OwnershipType) => {
        setFormData((prev) => ({ ...prev, ownership: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatar(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeAvatar = () => {
        setAvatar(null)
        setPreviewUrl(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleSubmit = async () => {
        if (!formData.name || !formData.description || !formData.category || !formData.goal) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        const formDataToSend = new FormData()
        
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value)
        })

        if (avatar) {
            formDataToSend.append('avatar', avatar)
        }

        formDataToSend.append('email', userId);

        try {
            if (type === "create") {
                await axios.post('/api/campaigns', formDataToSend);
                toast.success("Campaign created successfully!");
                router.push('/campaigns');
            }
            else {
                await axios.post(`/api/campaigns/${campaign?.id}`, formDataToSend);
                toast.success("Campaign updated successfully!");
                router.push('/profile');
            }
        } catch (error: any) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
            else {
                toast.error("Error submitting form");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 gradient-hero">
            <Card className="w-full max-w-2xl shadow-2xl shadow-slate-200/50 rounded-3xl border-slate-200 overflow-hidden">
                <CardHeader className="gradient-primary text-white rounded-t-none px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">
                                {type === "create" ? "Create New" : "Edit"} Campaign
                            </CardTitle>
                            <CardDescription className="text-white/80">
                                Fill in the details to {type === "create" ? "set up your new" : "update your"} campaign
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-8 px-8">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700 font-semibold">Campaign Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter campaign name"
                            className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-200 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-700 font-semibold">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your campaign and its impact..."
                            className="min-h-[120px] border-slate-200 focus:border-emerald-400 focus:ring-emerald-200 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-slate-700 font-semibold">Category</Label>
                        <Select value={formData.category} onValueChange={handleSelectChange}>
                            <SelectTrigger id="category" className="border-slate-200 focus:ring-emerald-200 rounded-xl">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="hunger">Hunger</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="welfare">Welfare</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="goal" className="text-slate-700 font-semibold">Goal Amount</Label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                            <Input
                                id="goal"
                                type="number"
                                value={formData.goal}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="pl-9 border-slate-200 focus:border-emerald-400 focus:ring-emerald-200 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Campaign Cover</Label>
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <div
                                    className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-emerald-50/50 hover:border-emerald-300 transition-all duration-200 cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <Upload className="mx-auto h-10 w-10 text-slate-300" />
                                    <p className="mt-2 text-sm text-slate-500">Click to upload or drag and drop</p>
                                    <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 2MB)</p>
                                </div>
                            </div>

                            {previewUrl && (
                                <div className="relative">
                                    <img
                                        src={previewUrl}
                                        alt="Campaign cover preview"
                                        className="w-24 h-24 rounded-2xl object-cover border border-slate-200"
                                    />
                                    <button
                                        onClick={removeAvatar}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
                                        aria-label="Remove cover"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Ownership</Label>
                        <RadioGroup 
                            value={formData.ownership} 
                            onValueChange={handleOwnershipChange}
                            className="flex gap-4"
                            disabled={type === "edit"}
                        >
                            <div className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                                formData.ownership === "personal" 
                                    ? "border-emerald-300 bg-emerald-50" 
                                    : "border-slate-200 hover:border-slate-300"
                            }`}>
                                <RadioGroupItem value="personal" id="personal" className="border-slate-300 text-emerald-600" />
                                <Label htmlFor="personal" className="cursor-pointer text-slate-700 font-medium">Personal</Label>
                            </div>
                            <div className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                                formData.ownership === "org" 
                                    ? "border-emerald-300 bg-emerald-50" 
                                    : "border-slate-200 hover:border-slate-300"
                            }`}>
                                <RadioGroupItem value="org" id="organization" className="border-slate-300 text-emerald-600" />
                                <Label htmlFor="organization" className="cursor-pointer text-slate-700 font-medium">Organization</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3 border-t border-slate-100 pt-6 px-8 pb-8">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-6"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="gradient-primary text-white hover:opacity-90 rounded-xl px-8 font-semibold disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            `${type === "create" ? "Create" : "Update"} Campaign`
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}