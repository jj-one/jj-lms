import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    NODE_ENV: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    NXT_PUBLIC_APP_URL: z.url(),

    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_ENDPOINT_URL_S3: z.url(),
    AWS_REGION: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_S3_BUCKET_NAME: z.string().min(1),
    NEXT_PUBLIC_S3_ENDPOINT_BASE_URL: z.string().min(1),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    NEXT_PUBLIC_S3_ENDPOINT_BASE_URL: process.env.NEXT_PUBLIC_S3_ENDPOINT_BASE_URL,
  }
});