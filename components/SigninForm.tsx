"use client"

import { useState } from "react"
import Link from "next/link"
import { Apple, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { signIn } from "next-auth/react"

export default function SigninForm() {
    const [termsAccepted, setTermsAccepted] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white">
            <Card className="w-full max-w-md shadow-lg transition-all duration-200 hover:shadow-xl bg-white">
                <CardHeader className="text-center space-y-2 pb-6">
                    <CardTitle className="text-3xl font-bold tracking-tight text-customBlack">Sign in to Impact Seed</CardTitle>
                    <CardDescription className="text-base text-customBlack/70">
                        Continue with OAuth provider to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        {/* Google Sign In */}
                        <Button
                        variant="outline"
                        className="w-full h-12 text-customBlack border-customBlack/20 hover:bg-customBlack/5 active:bg-customBlack/10 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!termsAccepted}
                        onClick={() => {
                            if (termsAccepted) {
                                signIn('google', { callbackUrl: '/' });
                            }
                        }}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                                </svg>
                                Sign in with Google
                            </div>
                        </Button>

                        {/* Facebook Sign In */}
                        <Button
                        variant="outline"
                        className="w-full h-12 text-customBlack border-customBlack/20 hover:bg-customBlack/5 active:bg-customBlack/10 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!termsAccepted}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <Facebook className="h-5 w-5 text-[#1877F2]" />
                                Sign in with Facebook
                            </div>
                        </Button>

                        {/* Apple Sign In */}
                        <Button
                        variant="outline"
                        className="w-full h-12 text-customBlack border-customBlack/20 hover:bg-customBlack/5 active:bg-customBlack/10 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!termsAccepted}
                        >
                        <div className="flex items-center justify-center gap-3">
                            <Apple className="h-5 w-5" />
                            Sign in with Apple
                        </div>
                        </Button>
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                        className="mt-1 border-customBlack/30 data-[state=checked]:bg-customBlack data-[state=checked]:border-customBlack"
                        />
                        <div className="space-y-1">
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none cursor-pointer select-none text-customBlack"
                        >
                            I accept the terms of service
                        </label>
                        <p className="text-xs text-customBlack/70 leading-relaxed">
                            By continuing, you agree to our{" "}
                            <Link
                            href="/terms"
                            className="text-customBlack hover:text-customBlack/80 underline underline-offset-2 font-medium"
                            >
                            Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                            href="/privacy"
                            className="text-customBlack hover:text-customBlack/80 underline underline-offset-2 font-medium"
                            >
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
