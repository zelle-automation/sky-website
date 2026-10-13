import type { NextConfig } from "next";

// The Express API (server/) runs as its own Node.js process. The browser talks to it
// through these rewrites, so the website and dashboard share one origin and cookie.
const API = process.env.API_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${API}/api/:path*` },
      { source: "/uploads/:path*", destination: `${API}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
