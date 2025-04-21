import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { BookOpen, Clock } from "lucide-react";

interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  image: string;
  lastAccessed: string;
}

interface EnrolledCourseCardProps {
  course: EnrolledCourse;
}

export function EnrolledCourseCard({ course }: EnrolledCourseCardProps) {
  // Get saved progress from localStorage if it exists
  const getSavedProgress = () => {
    try {
      const savedProgress = localStorage.getItem(
        `course-${course.id}-progress`
      );
      if (savedProgress) {
        return JSON.parse(savedProgress);
      }
    } catch (error) {
      console.error("Error reading saved progress:", error);
    }
    return null;
  };

  // Generate the correct link based on progress
  const getCourseLink = () => {
    if (course.progress === 0) {
      // New course - go to overview
      return `/courses/${course.id}`;
    } else if (course.progress === 100) {
      // Completed course - go to overview
      return `/courses/${course.id}`;
    } else {
      // In progress - go to last accessed lesson
      const savedProgress = getSavedProgress();
      if (savedProgress) {
        return `/courses/${course.id}/learn?section=${savedProgress.sectionIndex}&lesson=${savedProgress.lessonIndex}`;
      }
      // Fallback to first lesson if no saved progress
      return `/courses/${course.id}/learn`;
    }
  };

  // Fix the progress calculation and total lessons count
  const getActualProgress = () => {
    try {
      const savedProgress = localStorage.getItem(
        `course-${course.id}-progress`
      );
      if (savedProgress) {
        const { completedLessons } = JSON.parse(savedProgress);
        if (completedLessons && completedLessons.length) {
          // Calculate based on actual total lessons from the course
          const totalLessonsCount = getTotalLessonsCount();
          return Math.round(
            (completedLessons.length / totalLessonsCount) * 100
          );
        }
      }

      // Check if course is marked as completed
      const completedCourses = localStorage.getItem("completed-courses");
      if (completedCourses) {
        const completed = JSON.parse(completedCourses);
        if (completed.includes(course.id)) {
          return 100;
        }
      }
    } catch (error) {
      console.error("Error calculating progress:", error);
    }
    return course.progress;
  };

  // Get the actual total lessons count from the course structure
  const getTotalLessonsCount = () => {
    try {
      // This is a simplified approach - in a real app, you would fetch this from an API
      // For now, we'll use the course.totalLessons as the source of truth
      return course.totalLessons;
    } catch (error) {
      console.error("Error getting total lessons count:", error);
      return course.totalLessons;
    }
  };

  const actualProgress = getActualProgress();
  const totalLessonsCount = getTotalLessonsCount();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="relative mb-4 h-[150px] overflow-hidden rounded-md bg-muted">
          <Image
            src={course.image ?? `/placeholder.svg`}
            alt={course.title || "Course Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>
                {Math.round((actualProgress / 100) * totalLessonsCount)}/
                {totalLessonsCount} lessons
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>Last: {course.lastAccessed}</span>
            </div>
          </div>
          <Progress value={actualProgress} />
          <div className="text-xs text-muted-foreground text-right">
            {actualProgress}% complete
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={getCourseLink()}>
            {actualProgress === 100
              ? "Review Course"
              : actualProgress > 0
              ? "Continue Learning"
              : "Start Course"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
