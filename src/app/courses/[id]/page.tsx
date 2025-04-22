"use client";

// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, GraduationCap, Star } from "lucide-react";
import { mockCourseDetails } from "@/lib/mock-data";
import { useAuth } from "@/components/mock-auth-provider";
// import { useToast } from "@/hooks/use-toast";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  // const { toast } = useToast();
  // const [isEnrolled, setIsEnrolled] = useState(false);

  // In a real app, you would fetch the course details based on the ID
  const course = mockCourseDetails;

  return (
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div className="text-sm text-muted-foreground mb-1">
              {course.category}
            </div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
          </div>

          <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
            <Image
              src={course.image || "/placeholder.svg?height=360&width=640"}
              alt={course.title}
              className="object-cover"
              fill
              sizes="(min-width: 640px) 100vw, 100vw" // You can adjust based on layout
            />
          </div>

          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">About This Course</h2>
                <p className="text-muted-foreground">{course.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">What Youll Learn</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Prerequisites</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="mt-4">
              <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
              <Accordion type="single" collapsible className="w-full">
                {course.sections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{section.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {section.lessons.length} lessons
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between rounded-md border p-3"
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                              ) : (
                                <div className="mr-2 h-4 w-4 rounded-full border-2" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{course.finalTest.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.finalTest.questions} questions •{" "}
                      {course.finalTest.duration} • Passing score:{" "}
                      {course.finalTest.passingScore}%
                    </p>
                  </div>
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                {user && (
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link href={`/courses/${id}/test`}>Take Final Test</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="instructor" className="mt-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={course.instructorImage || "/placeholder.svg"}
                    alt={course.instructor}
                    className="object-cover"
                    fill
                    sizes="100%"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{course.instructor}</h2>
                  <p className="text-muted-foreground mt-2">
                    {course.instructorBio}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant="secondary">{course.duration}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="ml-1 text-sm font-medium">
                      {course.rating}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      ({course.students} students)
                    </span>
                  </div>
                </div>

                {user ? (
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/courses/${id}/learn`}>Start Course</Link>
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/login">Log in to Start</Link>
                  </Button>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Lessons</span>
                    <span className="text-sm font-medium">
                      {course.sections.reduce(
                        (acc, section) => acc + section.lessons.length,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Level</span>
                    <span className="text-sm font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Certificate</span>
                    <span className="text-sm font-medium">Yes</span>
                  </div>
                </div>

                {!user && (
                  <div className="text-center text-sm">
                    <Link
                      href="/login"
                      className="text-primary hover:underline"
                    >
                      Log in
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="/register"
                      className="text-primary hover:underline"
                    >
                      create an account
                    </Link>{" "}
                    to track your progress
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
