"use server";

import { requireAdminUser } from "@/app/data/admin/require-admin";
import { dbConn } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { CourseFormType, courseSchema } from "@/lib/zodSchema";

export async function CreateCourse(data: CourseFormType): Promise<ApiResponse> {

    const user = await requireAdminUser();
  
    try{
        const validatedData = courseSchema.safeParse(data);
        if (!validatedData.success) {
            //return { success: false, errors: vadlidatedData.error.flatten() };
            return {
                status: "error",
                message: "Invalid form data",
            }
        }

        const dbResult = await dbConn.course.create({
            data: {
                ...validatedData.data,
                userid: user.id,
            },
        });

        return {
            status: "success",
            message: "Course created successfully",
        }
    } catch {
        return {
            status: "error",
            message: "An error occurred while creating the course",
        }
    }
}