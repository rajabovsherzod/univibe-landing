import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app lives inside a larger multi-lockfile workspace; pin Turbopack's
  // root to this directory so module resolution uses the local node_modules.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
