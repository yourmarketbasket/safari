import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    allowedDevOrigins: ["http://192.168.1.104:4500"],
  },
};

export default nextConfig;
