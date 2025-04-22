"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TestResult } from "@/lib/actions";
import { mockCourses } from "@/lib/mock-data";
import { getTestResults } from "@/lib/actions";

export default function TestResultsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [results, setResults] = useState<TestResult[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getTestResults();
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch test results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchResults();
    }
  }, [user]);

  // Filter and sort results
  const filteredResults = results
    .filter((result) => {
      // Text search
      const matchesSearch =
        searchTerm === "" ||
        result.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.courseId.toLowerCase().includes(searchTerm.toLowerCase());

      // Course filter
      const matchesCourse =
        courseFilter === "all" || result.courseId === courseFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "passed" && result.passed) ||
        (statusFilter === "failed" && !result.passed);

      return matchesSearch && matchesCourse && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by date
      if (sortOrder === "newest") {
        return (
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
      } else {
        return (
          new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
        );
      }
    });

  // Get course name from course ID
  const getCourseTitle = (courseId: string) => {
    const course = mockCourses.find((c) => c.id === courseId);
    return course ? course.title : courseId;
  };

  if (isLoading || !user || user.role !== "admin") {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Results</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
          <CardDescription>
            View and manage all test submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Input
              placeholder="Search by name, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-1/3"
            />
            <div className="flex flex-wrap gap-2">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortOrder}
                onValueChange={(value: "newest" | "oldest") =>
                  setSortOrder(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">Export CSV</Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-6">
              Loading test results...
            </div>
          ) : results.length === 0 ? (
            <div className="flex items-center justify-center p-6">
              No test results found.
            </div>
          ) : (
            <div className="mt-4 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time Spent</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{result.userName}</div>
                          <div className="text-sm text-muted-foreground">
                            {result.userEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCourseTitle(result.courseId)}</TableCell>
                      <TableCell>{result.score}%</TableCell>
                      <TableCell>
                        {result.passed ? (
                          <Badge className="bg-green-500">Passed</Badge>
                        ) : (
                          <Badge variant="destructive">Failed</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {Math.floor(result.timeSpent / 60)}m{" "}
                        {result.timeSpent % 60}s
                      </TableCell>
                      <TableCell>
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
