"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function NewCoursePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Course Created",
        description: `"${courseData.title}" has been created successfully.`,
      });
      router.push("/admin/courses");
    }, 1000);
  };

  if (isLoading || !user || user.role !== "admin") {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                  Enter the basic information about your course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Introduction to Web Development"
                    value={courseData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of your course"
                    rows={5}
                    value={courseData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="full-stack">Full-Stack</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select
                      value={courseData.level}
                      onValueChange={(value) =>
                        handleSelectChange("level", value)
                      }
                    >
                      <SelectTrigger id="level">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 8 weeks"
                    value={courseData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Image</CardTitle>
                <CardDescription>
                  Upload a cover image for your course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px] rounded-md border-2 border-dashed p-4">
                  <div className="text-center">
                    <div className="text-muted-foreground mb-2">
                      Drag and drop an image, or click to browse
                    </div>
                    <Button variant="outline" type="button">
                      Upload Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Structure</CardTitle>
                <CardDescription>
                  Add sections and lessons to your course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px] rounded-md border-2 border-dashed p-4">
                  <div className="text-center">
                    <div className="text-muted-foreground mb-2">
                      You can add sections and lessons after creating the course
                    </div>
                    <Button variant="outline" type="button" disabled>
                      Add Section
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Final Test</CardTitle>
                <CardDescription>Create a test for your course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px] rounded-md border-2 border-dashed p-4">
                  <div className="text-center">
                    <div className="text-muted-foreground mb-2">
                      You can create a test after creating the course
                    </div>
                    <Button variant="outline" type="button" disabled>
                      Create Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Course"}
          </Button>
        </div>
      </form>
    </div>
  );
}
