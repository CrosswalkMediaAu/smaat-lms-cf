"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  FileText,
  Play,
} from "lucide-react";
import { useAuth } from "@/components/mock-auth-provider";
import { mockCourseDetails } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export default function CourseLearnPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  // Get section and lesson from URL params
  const initialSectionIndex = Number.parseInt(
    searchParams.get("section") || "0"
  );
  const initialLessonIndex = Number.parseInt(searchParams.get("lesson") || "0");

  const [currentSectionIndex, setCurrentSectionIndex] =
    useState(initialSectionIndex);
  const [currentLessonIndex, setCurrentLessonIndex] =
    useState(initialLessonIndex);
  //  const [sidebarOpen, setSidebarOpen] = useState(true)  original for reference
  const [, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLastLesson, setIsLastLesson] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Improve scroll to top functionality
  useEffect(() => {
    // Scroll to top when navigating to a new lesson
    window.scrollTo(0, 0);
  }, [currentSectionIndex, currentLessonIndex]);

  // Fix the progress calculation
  useEffect(() => {
    if (mockCourseDetails) {
      const totalLessons = mockCourseDetails.sections.reduce(
        (acc, section) => acc + section.lessons.length,
        0
      );
      const completed = mockCourseDetails.sections.reduce(
        (acc, section) =>
          acc +
          section.lessons.filter(
            (lesson) => lesson.completed || completedLessons.includes(lesson.id)
          ).length,
        0
      );
      setProgress(Math.round((completed / totalLessons) * 100));

      // Check if current lesson is the last one
      const isLast =
        currentSectionIndex === mockCourseDetails.sections.length - 1 &&
        currentLessonIndex ===
          mockCourseDetails.sections[currentSectionIndex].lessons.length - 1;
      setIsLastLesson(isLast);

      // If all lessons are completed, mark the course as completed
      if (completed === totalLessons) {
        markCourseAsCompleted();
      }

      // Update localStorage with total lessons count for this course
      try {
        localStorage.setItem(
          `course-${id}-total-lessons`,
          totalLessons.toString()
        );
      } catch (error) {
        console.error("Error saving total lessons count:", error);
      }
    }
  }, [completedLessons, currentSectionIndex, currentLessonIndex, id]);

  // Initialize completed lessons from mock data and localStorage
  useEffect(() => {
    if (mockCourseDetails) {
      try {
        // Get completed lessons from localStorage
        const savedProgress = localStorage.getItem(`course-${id}-progress`);
        if (savedProgress) {
          const { completedLessons: savedLessons } = JSON.parse(savedProgress);
          if (savedLessons && savedLessons.length) {
            setCompletedLessons(savedLessons);
            return;
          }
        }

        // Fallback to mock data
        const initialCompletedLessons = mockCourseDetails.sections.flatMap(
          (section) =>
            section.lessons
              .filter((lesson) => lesson.completed)
              .map((lesson) => lesson.id)
        );
        setCompletedLessons(initialCompletedLessons);
      } catch (error) {
        console.error("Error initializing completed lessons:", error);
      }
    }
  }, [id]);

  // Save current lesson progress to localStorage
  useEffect(() => {
    if (mockCourseDetails) {
      localStorage.setItem(
        `course-${id}-progress`,
        JSON.stringify({
          sectionIndex: currentSectionIndex,
          lessonIndex: currentLessonIndex,
          completedLessons,
        })
      );
    }
  }, [id, currentSectionIndex, currentLessonIndex, completedLessons]);

  // Scroll to top when navigating to a new lesson
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [currentSectionIndex, currentLessonIndex]);

  if (!user || !mockCourseDetails) {
    return <div className="container py-10">Loading...</div>;
  }

  const currentSection = mockCourseDetails.sections[currentSectionIndex];
  const currentLesson = currentSection?.lessons[currentLessonIndex];

  const markAsCompleted = () => {
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
  };

  const markCourseAsCompleted = () => {
    try {
      // Get completed courses from localStorage
      const completedCourses =
        localStorage.getItem("completed-courses") || "[]";
      const completed = JSON.parse(completedCourses);

      // Add current course if not already included
      if (!completed.includes(id)) {
        completed.push(id);
        localStorage.setItem("completed-courses", JSON.stringify(completed));

        toast({
          title: "Course Completed!",
          description: "You've completed all lessons in this course.",
        });
      }
    } catch (error) {
      console.error("Error marking course as completed:", error);
    }
  };

  const navigateToNextLesson = () => {
    markAsCompleted();

    // If there are more lessons in the current section
    if (currentLessonIndex < currentSection.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
    // If there are more sections
    else if (currentSectionIndex < mockCourseDetails.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentLessonIndex(0);
    }
    // If this is the last lesson, automatically mark it as completed
    else if (isLastLesson) {
      router.push(`/courses/${id}/test`);
    }
  };

  const navigateToPreviousLesson = () => {
    // If there are previous lessons in the current section
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
    // If there are previous sections
    else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentLessonIndex(
        mockCourseDetails.sections[currentSectionIndex - 1].lessons.length - 1
      );
    }
  };

  const navigateToLesson = (sectionIndex: number, lessonIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentLessonIndex(lessonIndex);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Calculate total lessons and current lesson number
  const totalLessons = mockCourseDetails.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );
  let currentLessonNumber = 1;
  for (let i = 0; i < currentSectionIndex; i++) {
    currentLessonNumber += mockCourseDetails.sections[i].lessons.length;
  }
  currentLessonNumber += currentLessonIndex;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Main content */}
      <div className="flex-1 overflow-auto" ref={contentRef}>
        <div className="container max-w-4xl py-8">
          <div className="mb-8">
            <div className="text-sm text-muted-foreground mb-1">
              <Link href={`/courses/${id}`} className="hover:underline">
                {mockCourseDetails.title}
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-4">{currentLesson.title}</h1>

            {/* Video player placeholder */}
            <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center">
              <Play className="h-16 w-16 text-white opacity-70" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToPreviousLesson}
                  disabled={
                    currentSectionIndex === 0 && currentLessonIndex === 0
                  }
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToNextLesson}
                >
                  {isLastLesson ? "Take Test" : "Next"}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Lesson {currentLessonNumber} of {totalLessons}
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="space-y-6">
              <h2 className="text-xl font-bold">Transcript</h2>

              <div className="prose max-w-none dark:prose-invert">
                <p>
                  <span className="text-muted-foreground">[00:00]</span> Youve
                  just been hired by a client, Mr. McDonald, who runs a
                  successful farming solution startup.
                </p>
                <p>
                  <span className="text-muted-foreground">[00:06]</span> Theyre
                  happy with the design and performance of the website you built
                  for them, but now they want to build and manage new pages
                  without having to ask you to code it from scratch or know how
                  to code it themselves.
                </p>
                <p>
                  <span className="text-muted-foreground">[00:15]</span> Theyve
                  heard about Prismic and after some research decided that this
                  is the CMS for them because of the ability to create a page
                  builder with Prismic, which is fully customizable to their
                  needs and they want you to implement it.
                </p>
                <p>
                  <span className="text-muted-foreground">[00:28]</span> Your
                  first task is to learn more about Prismic and how to use it
                  with your preferred framework Next.js.
                </p>
                <p>
                  <span className="text-muted-foreground">[00:34]</span> This
                  course will take you through all the basics and have you up to
                  speed in no time so that you can deliver an awesome publishing
                  experience to your client using this powerful tool.
                </p>
                <p>
                  <span className="text-muted-foreground">[00:42]</span> Ill be
                  your guide along the way to show you the ropes. Lesson one
                  will give you a quick, high level view of the tools used to
                  integrate a website with Prismic.
                </p>
                <p>
                  <span className="text-muted-foreground">[00:50]</span> Then
                  each follow-up lesson will go into more detail on these tools,
                  helping you to convert Mr. McDonalds website into a
                  page-building application using Prismic.
                </p>
              </div>

              <h2 className="text-xl font-bold mt-8">Summary</h2>
              <p className="text-muted-foreground">
                Youve been hired by a client to convert their hardcoded website
                into a page building application with Prismic and Next.js. This
                course will teach you how to use Prismics page builder
                capabilities to create a customizable content management system
                for your client.
              </p>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={navigateToPreviousLesson}
                  disabled={
                    currentSectionIndex === 0 && currentLessonIndex === 0
                  }
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Lesson
                </Button>

                {isLastLesson ? (
                  <Button
                    onClick={() => {
                      markAsCompleted();
                      router.push(`/courses/${id}/test`);
                    }}
                  >
                    Take Final Test
                  </Button>
                ) : (
                  <Button onClick={navigateToNextLesson}>
                    Next Lesson
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-80 border-l bg-muted/10">
        <div className="p-4 border-b">
          <h2 className="font-medium text-lg">Course content</h2>
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{progress}%</span> complete
            </div>
            <Progress value={progress} className="h-2 w-24" />
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-6">
            {mockCourseDetails.sections.map((section, sectionIndex) => (
              <div key={section.id}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{section.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {section.lessons.length} lessons
                  </span>
                </div>
                <ul className="space-y-1">
                  {section.lessons.map((lesson, lessonIndex) => {
                    const isCompleted =
                      lesson.completed || completedLessons.includes(lesson.id);
                    const isActive =
                      currentSectionIndex === sectionIndex &&
                      currentLessonIndex === lessonIndex;

                    return (
                      <li key={lesson.id}>
                        <button
                          className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : isCompleted
                              ? "text-muted-foreground hover:bg-muted"
                              : "hover:bg-muted"
                          }`}
                          onClick={() =>
                            navigateToLesson(sectionIndex, lessonIndex)
                          }
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                          ) : (
                            <div className="h-4 w-4 flex-shrink-0 rounded-full border-2" />
                          )}
                          <span className="flex-1 truncate">
                            {lesson.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-medium mb-2">Final Test</h3>
              <Link
                href={`/courses/${id}/test`}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">
                  {mockCourseDetails.finalTest.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {mockCourseDetails.finalTest.duration}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
