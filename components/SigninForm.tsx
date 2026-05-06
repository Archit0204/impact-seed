"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { signIn } from "next-auth/react"
import { Sprout } from "lucide-react"

export default function SigninForm() {
    const [termsAccepted, setTermsAccepted] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center p-4 gradient-hero relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse-slow" />

            <Card className="relative w-full max-w-md shadow-2xl shadow-slate-200/50 border-slate-200 rounded-3xl overflow-hidden bg-white">
                <CardHeader className="text-center space-y-4 pb-6 pt-8">
                    <div className="flex justify-center">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-emerald-200">
                            <Sprout className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                            Welcome to Impact Seed
                        </CardTitle>
                        <CardDescription className="text-base text-slate-500 mt-2">
                            Sign in to start making a difference
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 px-8 pb-8">
                    {/* Google Sign In */}
                    <Button
                        variant="outline"
                        className="w-full h-13 text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 font-medium rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={!termsAccepted}
                        onClick={() => {
                            if (termsAccepted) {
                                signIn('google', { callbackUrl: '/' });
                            }
                        }}
                    >
                        <div className="flex items-center justify-center gap-3">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </div>
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-3 bg-white text-slate-400 font-medium">More options coming soon</span>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start space-x-3">
                        <Checkbox
                            id="terms"
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                            className="mt-1 border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 rounded-md"
                        />
                        <div className="space-y-1">
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none cursor-pointer select-none text-slate-700"
                            >
                                I accept the terms of service
                            </label>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                By continuing, you agree to our{" "}
                                <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 font-medium">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 font-medium">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
