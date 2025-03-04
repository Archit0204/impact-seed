"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { CampaignSchema } from "@/lib/zod"

type CampaignFormProps = {
    userId: string,
    campaign?: z.infer<typeof CampaignSchema>
}

export default function CampaignForm({ userId, campaign }: CampaignFormProps) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        goal: "",
        ownership: "personal"
    })
    const [avatar, setAvatar] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }))
    }

    const handleOwnershipChange = (value: string) => {
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
        const formDataToSend = new FormData()
        
        // Append all form fields
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value)
        })

        // Append avatar if exists
        if (avatar) {
            formDataToSend.append('avatar', avatar)
        }

        formDataToSend.append('email', userId);

        try {
            const response = await axios.post('/api/campaigns', formDataToSend);
            console.log(response.data);
            
            router.push('/campaigns');
        } catch (error: any) {
            console.log("Error submitting form:", error.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="bg-customBlack text-customLightGray rounded-t-lg">
                    <CardTitle className="text-2xl">Create New Campaign</CardTitle>
                    <CardDescription className="text-customLightGray/80">
                        Fill in the details to set up your new Campaign
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-customBlack">
                        Campaign Name
                        </Label>
                        <Input
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter campaign name"
                        className="border-customBlack/20 focus-visible:ring-customBlack"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-customBlack">
                        Description
                        </Label>
                        <Textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your campaign"
                        className="min-h-[120px] border-customBlack/20 focus-visible:ring-customBlack"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-customBlack">
                        Category
                        </Label>
                        <Select value={formData.category} onValueChange={handleSelectChange}>
                        <SelectTrigger id="category" className="border-customBlack/20 focus:ring-customBlack">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="goal" className="text-customBlack">
                        Goal Amount
                        </Label>
                        <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-customBlack/60">$</span>
                        <Input
                            id="goal"
                            type="number"
                            value={formData.goal}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="pl-8 border-customBlack/20 focus-visible:ring-customBlack"
                        />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-customBlack">Campaign Cover</Label>
                        <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <div
                            className="border-2 border-dashed border-customBlack/20 rounded-lg p-4 text-center hover:bg-customBlack/5 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                            >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Upload className="mx-auto h-10 w-10 text-customBlack/50" />
                            <p className="mt-2 text-sm text-customBlack/70">Click to upload or drag and drop</p>
                            <p className="text-xs text-customBlack/50">SVG, PNG, JPG or GIF (max. 2MB)</p>
                            </div>
                        </div>

                        {previewUrl && (
                            <div className="relative">
                            <img
                                src={previewUrl}
                                alt="Campaign cover preview"
                                className="w-24 h-24 rounded-lg object-cover border border-customBlack/10"
                            />
                            <button
                                onClick={removeAvatar}
                                className="absolute -top-2 -right-2 bg-customBlack text-customLightGray rounded-full p-1"
                                aria-label="Remove cover"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            </div>
                        )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-customBlack">Ownership</Label>
                        <RadioGroup 
                        value={formData.ownership} 
                        onValueChange={handleOwnershipChange}
                        className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="personal" id="personal" className="border-customBlack/20 text-customBlack" />
                                <Label htmlFor="personal" className="text-customBlack">
                                Personal
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="organization" id="organization" className="border-customBlack/20 text-customBlack" />
                                <Label htmlFor="organization" className="text-customBlack">
                                Organization
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t border-customBlack/10 pt-6">
                    <Button
                        variant="outline"
                        className="border-customBlack/20 text-customBlack hover:bg-customBlack/5 hover:text-customBlack"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        className="bg-customBlack text-customLightGray hover:bg-customBlack/90"
                    >
                        Create Campaign
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}