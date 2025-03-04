import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: "example.com"
            },
            {
                hostname: "pub-9445ecb69ca64d0bbcde421d997509bd.r2.dev"
            }
        ]
    }
};

export default nextConfig;
