import type { NextConfig } from "next";

const allowedImageHosts = [
  "cdnwebapp.indialends.com",
  "www.vivifin.com",
  "moneyview.in",
  "www.fdplfinance.com",
  "www.flexsalary.com",
  "www.getzype.com",
  "loan.credittnow.com",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // TypeScript errors ignore block jo pehle add kiya tha
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: allowedImageHosts.map((host) => ({
      protocol: "https",
      hostname: host,
      pathname: "/**",
    })),
  },

  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "http://localhost:5001/api/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:5001/api/:path*",
      },
    ];
  },
};

export default nextConfig;