import { env } from "@/lib/env";

export function useConstructUrl(key: string): string {
    return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME}.${env.NEXT_PUBLIC_S3_ENDPOINT_BASE_URL}/${key}`;
}