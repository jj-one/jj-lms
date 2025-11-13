"use server";

import { requireAdminUser } from "@/app/data/admin/require-admin";
import { dbConn } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { CourseFormType, courseSchema } from "@/lib/zodSchema";

export async function editCourse( data: CourseFormType, courseId: string ): Promise<ApiResponse> {
    const user = await requireAdminUser();

    try {
        const result = await courseSchema.safeParse(data);
        if (!result.success) {
            return {
                status: "error",
                message: "Invalid form data",
            };
        }

        await dbConn.course.update({
            where: {
                id: courseId,
                userid: user.id,
            },
            data: {
                ...result.data,
            },
        });

        return {
            status: "success",
            message: "Course updated successfully",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Failed to update course",
        };
    }
}