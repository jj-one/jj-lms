import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeModeToggle } from "@/components/ui/theme-toggle";
import { getCurrentUser } from "@/lib/current-user";
import Image from "next/image";
import Link from "next/link";

interface FeatureType {
    title: string;
    description: string;
    icon: string;
}

const features: FeatureType[] = [
    {
        title: "Comprehensive Courses",
        description: "Access a wide range of carefully curated courses designed by industry experts to enhance your skills and knowledge.",
        icon: "📚",
    },
    {
        title: "Interactive Learning",
        description: "Engage with interactive content, quizzes, and assignments that make learning enjoyable and effective.",
        icon: "🎮",
    },
    {
        title: "Progress Tracking",
        description: "Monitor your learning journey with detailed progress tracking and performance analytics.",
        icon: "📈",
    },
    {
        title: "Community Support",
        description: "Join a vibrant community of learners and instructors to share knowledge, ask questions, and collaborate.",
        icon: "🤝",
    },
];

export default async function Home() {
    const user = await getCurrentUser();
  return (
    <>
        <section className="relative py-20">
            <div className="flex flex-col items-center text-center space-y-8">
                <Badge variant="outline">The future of online edducation</Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Elevate you Learning Experience
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Discover a new way to learn with our modern, interactive learning management system. Access high quality courses anytime anywhere.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link href="/courses" className={ buttonVariants({
                        size: "lg",
                    }) }>Explore Courses</Link>
                    {!user && (
                        <Link href="/login" className={ buttonVariants({
                            size: "lg",
                            variant: "outline",
                        }) }>Sign In</Link>
                    )}
                </div>
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </section>
    </>
  );
}
