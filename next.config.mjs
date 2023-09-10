import { next } from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const millionConfig = {
  auto: { rsc: true },
};

export default next(nextConfig, millionConfig);
