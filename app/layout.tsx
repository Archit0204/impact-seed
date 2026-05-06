import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/Providers";
import { Toaster } from "sonner";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Impact Seed — Make a Difference",
    description: "Discover meaningful campaigns, donate to causes you care about, and volunteer with NGOs making real change in the world.",
    keywords: ["donation", "NGO", "volunteering", "campaigns", "charity", "social impact"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.className} antialiased`}>
                <Providers>
                    {children}
                    <Toaster 
                        position="bottom-right" 
                        richColors 
                        closeButton
                        toastOptions={{
                            style: {
                                borderRadius: '12px',
                            }
                        }}
                    />
                </Providers>
            </body>
        </html>
    );
}
