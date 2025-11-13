import { z } from "zod";

export const courseLevel = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const courseStatus = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
  "Music",
  "Teaching & Academics"
] as const;

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: z.string().min(3, "Description is required and must be at least 3 characters").max(2000, "Description must be at most 2000 characters"),
  fileKey: z.string().min(1, "File key is required").max(500, "File key must be at most 500 characters"),
  price: z.coerce.number().min(1, "You cannot create a free course"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 hour").max(500, "Duration must be at most 500 hours"),
  level: z.enum(courseLevel),
  category: z.enum(courseCategories, {message: "Category is required"}),
  smallDescription: z.string().min(10, "Small description must be at least 10 characters").max(300, "Small description must be at most 300 characters"),
  slug: z.string().min(3, "Slug is required and must be at least 10 characters"),
  status: z.enum(courseStatus)
});

export type CourseFormType = z.infer<typeof courseSchema>;