import { getAdminCourses } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AdminCourseCard } from "./_components/admin-course-card";

export default async function CoursesPage() {

  const courses = await getAdminCourses();

  return (
    <>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Courses</h1>

            <Link href="/admin/courses/create" className={buttonVariants()}>
                Create Course
            </Link>
        </div>

        <div>
            {courses.length === 0 ? (
                <p className="mt-4 text-muted-foreground">No courses found. Start by creating a new course.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                    {courses.map((course) => (
                        <AdminCourseCard key={course.id} data={course} />
                    ))}
                </div>
            )}
        </div>
    </>
  );
}