import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Next.js 15+ blocks cross-origin requests to the dev server's internal
  // /_next/* assets by default, which silently breaks all client-side JS
  // (hydration, hooks, canvas, etc.) when the site is opened from a LAN IP
  // or another device instead of localhost. Allowlist your dev network
  // origin(s) here so hydration actually works when testing over the network.
  allowedDevOrigins: ["100.117.200.44"],
};

export default nextConfig;
