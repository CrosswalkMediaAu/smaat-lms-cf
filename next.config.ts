import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@/components": path.resolve(__dirname, "src/app/app/components"),
      "@/lib": path.resolve(__dirname, "src/app/lib"),
      "@/hooks": path.resolve(__dirname, "src/app/hooks"),
      "@/app": path.resolve(__dirname, "src/app"),
    };
    return config;
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
