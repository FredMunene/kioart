import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.1.31:3000", "http://localhost:3000", "http://127.0.0.1:3000","https://64672429cd16.ngrok-free.app","kyoart.vercel.app"]
};

export default nextConfig;
