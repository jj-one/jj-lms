import { dbConn } from "@/lib/db";
import { requireAdminUser } from "./require-admin";

export async function getAdminCourses() {
    //const user = await requireAdminUser();
    await requireAdminUser();

    const data = await dbConn.course.findMany({
        select: {
            id: true,
            title: true,
            smallDescription: true,
            duration: true,
            level: true,
            status: true,
            price: true,
            fileKey: true,
            slug: true,
        },  
        //where: {userid: user.id},
        orderBy: {
            createdAt: 'desc',
        },
    });

    return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof getAdminCourses>>[0];