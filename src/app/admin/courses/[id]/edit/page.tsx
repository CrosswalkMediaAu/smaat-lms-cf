"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { mockCourses } from "@/lib/mock-data";

export default function EditCoursePage() {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Find the course
  const existingCourse = mockCourses.find((c) => c.id === id);

  // Course data
  const [courseData, setCourseData] = useState({
    title: existingCourse?.title || "",
    description: existingCourse?.description || "",
    category: existingCourse?.category || "",
    level: existingCourse?.level || "",
    duration: existingCourse?.duration || "",
    isPublished: true,
  });

  // Course sections and lessons
  const [sections, setSections] = useState([
    {
      id: "section-1",
      title: "Getting Started",
      lessons: [
        { id: "lesson-1-1", title: "Introduction", duration: "10 min" },
        { id: "lesson-1-2", title: "Setup", duration: "15 min" },
      ],
    },
    {
      id: "section-2",
      title: "Core Concepts",
      lessons: [
        { id: "lesson-2-1", title: "Basic Principles", duration: "20 min" },
        { id: "lesson-2-2", title: "Advanced Techniques", duration: "25 min" },
      ],
    },
  ]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleCourseDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionTitleChange = (sectionIndex: number, title: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].title = title;
    setSections(newSections);
  };

  const handleLessonChange = (
    sectionIndex: number,
    lessonIndex: number,
    field: string,
    value: string
  ) => {
    const newSections = [...sections];
    newSections[sectionIndex].lessons[lessonIndex] = {
      ...newSections[sectionIndex].lessons[lessonIndex],
      [field]: value,
    };
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: `section-${sections.length + 1}`,
        title: `New Section`,
        lessons: [
          {
            id: `lesson-${sections.length + 1}-1`,
            title: "New Lesson",
            duration: "10 min",
          },
        ],
      },
    ]);
  };

  const removeSection = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections.splice(sectionIndex, 1);
    setSections(newSections);
  };

  const addLesson = (sectionIndex: number) => {
    const newSections = [...sections];
    const section = newSections[sectionIndex];
    section.lessons.push({
      id: `lesson-${sectionIndex + 1}-${section.lessons.length + 1}`,
      title: "New Lesson",
      duration: "10 min",
    });
    setSections(newSections);
  };

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].lessons.splice(lessonIndex, 1);
    setSections(newSections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Validate form
    if (
      !courseData.title ||
      !courseData.category ||
      !courseData.level ||
      !courseData.duration
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Success",
        description: "Course has been updated successfully.",
      });
      router.push("/admin/courses");
    }, 1000);
  };

  if (isLoading || !user || user.role !== "admin") {
    return <div className="container py-10">Loading...</div>;
  }

  if (!existingCourse) {
    return <div className="container py-10">Course not found</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Edit Course: {existingCourse.title}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/courses">Cancel</Link>
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save Course"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>
                Edit the basic information about your course
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
                  onChange={handleCourseDataChange}
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
                  onChange={handleCourseDataChange}
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
                      <SelectItem value="intermediate">Intermediate</SelectItem>
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
                  onChange={handleCourseDataChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  checked={courseData.isPublished}
                  onCheckedChange={(checked) =>
                    setCourseData((prev) => ({ ...prev, isPublished: checked }))
                  }
                />
                <Label htmlFor="isPublished">Published</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <div className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <Card key={section.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1 w-full">
                    <div className="flex items-center justify-between">
                      <CardTitle>Section {sectionIndex + 1}</CardTitle>
                      {sections.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSection(sectionIndex)}
                          className="text-destructive"
                        >
                          Remove Section
                        </Button>
                      )}
                    </div>
                    <CardDescription>
                      Organize your course content
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`section-${sectionIndex}-title`}>
                      Section Title
                    </Label>
                    <Input
                      id={`section-${sectionIndex}-title`}
                      value={section.title}
                      onChange={(e) =>
                        handleSectionTitleChange(sectionIndex, e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Lessons</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addLesson(sectionIndex)}
                      >
                        Add Lesson
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex gap-2 items-start">
                          <div className="flex-1 space-y-2">
                            <div className="grid grid-cols-4 gap-2">
                              <Input
                                className="col-span-3"
                                placeholder="Lesson title"
                                value={lesson.title}
                                onChange={(e) =>
                                  handleLessonChange(
                                    sectionIndex,
                                    lessonIndex,
                                    "title",
                                    e.target.value
                                  )
                                }
                                required
                              />
                              <Input
                                placeholder="Duration"
                                value={lesson.duration}
                                onChange={(e) =>
                                  handleLessonChange(
                                    sectionIndex,
                                    lessonIndex,
                                    "duration",
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </div>
                          </div>
                          {section.lessons.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeLesson(sectionIndex, lessonIndex)
                              }
                              className="text-destructive"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button onClick={addSection} className="w-full">
              Add Section
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Course Preview</CardTitle>
              <CardDescription>
                See how your course will appear to students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {courseData.title || "Course Title"}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {courseData.description ||
                      "Course description will appear here"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md border p-4">
                    <div className="font-medium">Category</div>
                    <div className="text-muted-foreground">
                      {courseData.category || "Not specified"}
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="font-medium">Level</div>
                    <div className="text-muted-foreground">
                      {courseData.level || "Not specified"}
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="font-medium">Duration</div>
                    <div className="text-muted-foreground">
                      {courseData.duration || "Not specified"}
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="font-medium">Status</div>
                    <div className="text-muted-foreground">
                      {courseData.isPublished ? "Published" : "Draft"}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Course Content</h3>
                  {sections.map((section, sectionIndex) => (
                    <div key={section.id} className="rounded-md border p-4">
                      <h4 className="font-medium">
                        {section.title} {sectionIndex}
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {section.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="flex justify-between text-sm"
                          >
                            <span>{lesson.title}</span>
                            <span className="text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button asChild>
                    <Link href={`/courses/${id}`} target="_blank">
                      Open Full Preview
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
