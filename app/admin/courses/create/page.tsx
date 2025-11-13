"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courseCategories, CourseFormType, courseLevel, courseSchema, courseStatus } from "@/lib/zodSchema";
import { ArrowLeft, Loader2, PlusIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "@/components/rich-text-editor/editor";
import { Uploader } from "@/components/file-uploader/uploader";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { CreateCourse } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
    const [ pending, startTransition ] = useTransition(); 
    const router = useRouter();

    // 1. Define your form.
  const form = useForm<CourseFormType>({
    resolver: zodResolver(courseSchema) as Resolver<CourseFormType>,
    defaultValues: {
        title: "",
        description: "",
        fileKey: "",
        price: 1,
        duration: 1,
        level: "BEGINNER",
        category: "Health & Fitness",
        smallDescription: "",
        slug: "",
        status: "DRAFT",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: CourseFormType) {
    startTransition(async () => {
        const { data: result, error } = await tryCatch(CreateCourse(values));

        if ( error ) {
            toast.error("An unexpected error occurred, probably network related. Please try again.");
            return;
        }

        if (result.status === "success") {
            toast.success(result.message);
            form.reset();
            router.push("/admin/courses");
            return;
        } else if ( result.status === "error" ) {
            toast.error(result.message);
            return;
        }

    });
  }

  return (
    <>
        <div className="flex items-center gap-4">
            <Link href="/admin/courses" className={buttonVariants({ 
                variant: "outline",
                size: "icon"})}>
                <ArrowLeft className="size-4" />
            </Link>

            <h1 className="text-2xl font-bold">Create Courses</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                    Provide the basic information for the new course you want to create.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField 
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Course Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}                 
                        />

                        <div className="flex gap-4 items-end">
                            <FormField 
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Course Slug" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />

                                <Button type="button" className="w-fit"
                                onClick={() => {
                                    const title = form.getValues("title");
                                    const slug = slugify(title, { lower: true, strict: true });
                                    form.setValue("slug", slug, {shouldValidate: true});
                                }}
                                >
                                    Generate Slug <SparkleIcon className="ml-1 size-4" />
                                </Button>
                        </div>

                        <FormField 
                                control={form.control}
                                name="smallDescription"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Small Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Small Description" {...field} 
                                            className="min-h-[120px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />

                        <FormField 
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <RichTextEditor field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />

                        <FormField 
                                control={form.control}
                                name="fileKey"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Thumbnail Image</FormLabel>
                                        <FormControl>
                                            <Uploader onChange={field.onChange} value={field.value} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField 
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courseCategories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />

                            <FormField 
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Course Level</FormLabel>
                                        <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a course level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courseLevel.map((level) => (
                                                    <SelectItem key={level} value={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />

                            <FormField 
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Duration: (hours)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Duration" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />

                            <FormField 
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Price: ($)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Price" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />
                        </div>

                        <FormField 
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Course Status</FormLabel>
                                        <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courseStatus.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}                 
                                />

                        <Button type="submit" disabled={pending}>
                            {pending ? (
                                    <>
                                        Submitting... 
                                        <Loader2 className="animate-spin ml-1" />
                                    </>
                                ) : (
                                    <>
                                    <PlusIcon className="size-4 mr-2" /> 
                                    Create Course
                                    </>
        )
                            }
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </>
  );
}