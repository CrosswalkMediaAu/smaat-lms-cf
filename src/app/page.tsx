import Link from "next/link";
import { Button } from "../components/ui/button";
import { BookOpen, CheckCircle, GraduationCap, Users } from "lucide-react";

export default function Home() {
  // Mock courses data (replace with your actual data source)
  // const mockCourses = [
  //   { id: "1", title: "Introduction to React" },
  //   { id: "2", title: "Advanced JavaScript" },
  // ];

  // Get published courses from localStorage or use mock data
  // const getPublishedCourses = () => {
  //   try {
  //     const publishedCoursesData = localStorage.getItem("published-courses");
  //     if (publishedCoursesData) {
  //       return JSON.parse(publishedCoursesData);
  //     }
  //   } catch (error) {
  //     console.error("Error getting published courses:", error);
  //   }
  //   // Default to showing all mock courses as published
  //   return mockCourses;
  // };

  // const publishedCourses = getPublishedCourses(); //added to fix typescript error and below in h1

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Learn at your own pace with our online courses
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our learning management system provides high-quality courses
                  with interactive lessons and assessments.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/dashboard">Browse Courses</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] rounded-lg bg-gradient-to-b from-primary/20 to-primary/5 p-4 flex items-center justify-center">
                <GraduationCap className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features that make learning easier
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is designed to provide the best learning experience
                for students and instructors.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <BookOpen className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Comprehensive Courses</h3>
              <p className="text-center text-muted-foreground">
                Access a wide range of courses with detailed lessons and
                materials.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <CheckCircle className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Interactive Assessments</h3>
              <p className="text-center text-muted-foreground">
                Test your knowledge with quizzes and assignments at the end of
                each course.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Admin Management</h3>
              <p className="text-center text-muted-foreground">
                Powerful tools for administrators to manage courses and track
                student progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to start learning?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of students who are already learning on our
                platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
