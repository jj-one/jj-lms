import "server-only";
import { requireAdminUser } from "./require-admin";
import { dbConn } from "@/lib/db";
import { notFound } from "next/navigation";
import { id } from "zod/v4/locales";

export async function getAdminCourse(courseid: string) {
    await requireAdminUser();

    const data = await dbConn.course.findUnique({
        where: {
            id: courseid,
        },
        select: {
            id: true,
            title: true,
            slug: true,
            smallDescription: true,
            fileKey: true,
            description: true,
            price: true,
            duration: true,
            level: true,
            status: true,
            category: true,

            chapters: {
                select: {
                    id: true,
                    title: true,
                    position: true,

                    lessons: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            thumbnailKey: true,
                            position: true,
                            videoKey: true,
                        }
                    }
                }
            }
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export type AdminSingleCourseType = Awaited<ReturnType<typeof getAdminCourse>>;