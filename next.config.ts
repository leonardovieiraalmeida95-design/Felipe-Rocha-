import type { NextConfig } from "next";
const config: NextConfig = { output: "export", reactStrictMode: false, trailingSlash: true, images: { unoptimized: true }, ...(process.env.VERCEL === "1" ? {} : { basePath: "/Felipe-Rocha-" }) };
export default config;
