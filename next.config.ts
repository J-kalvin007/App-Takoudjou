import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  server: {
    host: '0.0.0.0',  // expose sur le réseau local
    port: 5173         // facultatif, si tu veux un port fixe
  }
};

export default nextConfig;
