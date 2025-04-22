"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/mock-auth-provider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { EnrolledCourseCard } from "../../components/enrolled-course-card";
import { mockEnrolledCourses, mockCourses } from "../../lib/mock-data";
import type { Course } from "@/lib/types";

export default function MyCoursesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Load all published courses
  useEffect(() => {
    try {
      const publishedCoursesData = localStorage.getItem("published-courses");
      if (publishedCoursesData) {
        setAllCourses(JSON.parse(publishedCoursesData));
      } else {
        // Default to mock courses if no published courses found
        setAllCourses(mockCourses);
      }
    } catch (error) {
      console.error("Error loading published courses:", error);
      setAllCourses(mockCourses);
    }
  }, []);

  if (isLoading || !user) {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid gap-6">
        <Tabs defaultValue="in-progress" className="space-y-4">
          <TabsList>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Courses</TabsTrigger>
          </TabsList>
          <TabsContent value="in-progress" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockEnrolledCourses
                .filter((course) => course.progress < 100)
                .map((course) => (
                  <EnrolledCourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockEnrolledCourses
                .filter((course) => course.progress === 100)
                .map((course) => (
                  <EnrolledCourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allCourses.map((course) => (
                <EnrolledCourseCard
                  key={course.id}
                  course={{
                    ...course,
                    progress: 0,
                    totalLessons: 24, // This would come from the actual course data
                    completedLessons: 0,
                    image:
                      course.image || "/placeholder.svg?height=150&width=300",
                    lastAccessed: "Never",
                  }}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
