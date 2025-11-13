import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import z from "zod";
import { v4 as uuidv4 } from  "uuid";
import { env } from "@/lib/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/s3-client";
import { getCurrentUser } from "@/lib/current-user";
import { requireAdminUser } from "@/app/data/admin/require-admin";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  contentType: z.string().min(1, "Content type is required"),
  size: z.number().min(1, "File size must be greater than 0").max(5 * 1024 * 1024, "File size must be less than 5MB"),
  isImage: z.boolean(),
});

export async function POST(req: Request) {

  const user = await requireAdminUser();

  try {
    const body = await req.json();
    const validation = fileUploadSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(
            {error: validation.error.message},
            {status: 400}
        );
    }

    const { fileName, contentType, size } = validation.data;
    const uniqueKey = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
        ContentType: contentType,
        ContentLength: size,
        Key: uniqueKey,
        ACL: "public-read",
    });

    const presignedUrl = await getSignedUrl(
        s3,
        command,
        { expiresIn: 360, } // URL valid for 6 minutes
    );

    const responsePayload = {
      presignedUrl,
      key: uniqueKey,
    };

    console.log("Presigned URL process retyurned: ", responsePayload);
    return NextResponse.json(responsePayload);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate preszigned URL" },
      { status: 500 }
    );
  }
}