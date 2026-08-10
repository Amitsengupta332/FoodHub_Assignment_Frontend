// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */

//   images: {
//     // domains: ["res.cloudinary.com"],
//     domains: ["i.ibb.co", "res.cloudinary.com", "assets.tmecosys.com"],
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/auth/:path*",
//         destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
//       },
//     ];
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "i.ibb.co",
//       },
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "assets.tmecosys.com",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
