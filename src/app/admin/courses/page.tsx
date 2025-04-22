"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/mock-auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";
import { mockCourses } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";

export default function CoursesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>(() => {
    // Try to get courses from localStorage
    try {
      const savedCourses = localStorage.getItem("admin-courses");
      if (savedCourses) {
        return JSON.parse(savedCourses);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    }

    // Default to mock courses with random status
    return mockCourses.map((course) => ({
      ...course,
      status: Math.random() > 0.3 ? "published" : "draft", // Randomly assign status for demo
    }));
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("admin-courses", JSON.stringify(courses));

      // Also save published courses separately for the public view
      const publishedCourses = courses.filter(
        (course) => course.status === "published"
      );
      localStorage.setItem(
        "published-courses",
        JSON.stringify(publishedCourses)
      );
    } catch (error) {
      console.error("Error saving courses:", error);
    }
  }, [courses]);

  const handleStatusChange = (
    courseId: string,
    newStatus: "published" | "draft"
  ) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );

    toast({
      title: "Course Updated",
      description: `Course status changed to ${newStatus}.`,
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));

    toast({
      title: "Course Deleted",
      description: "The course has been deleted.",
    });
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading || !user || user.role !== "admin") {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Courses</CardTitle>
          <CardDescription>
            Create, edit, and publish courses for your students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-1/3"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          course.status === "published" ? "default" : "outline"
                        }
                      >
                        {course.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}/test`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Test
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/courses/${course.id}`}
                              target="_blank"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(
                                course.id,
                                course.status === "published"
                                  ? "draft"
                                  : "published"
                              )
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            {course.status === "published"
                              ? "Unpublish"
                              : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
