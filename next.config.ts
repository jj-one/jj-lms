import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [process.env.NEXT_PUBLIC_S3_BUCKET_NAME + "." + process.env.NEXT_PUBLIC_S3_ENDPOINT_BASE_URL],
  },
};

export default nextConfig;
