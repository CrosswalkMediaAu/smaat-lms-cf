"use client";

import { useEffect } from "react";
import Link from "next/link";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users } from "lucide-react";
import { mockAdminStats } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") {
    return <div className="container py-10">Loading...</div>;
  }

  // Mock recently completed tests
  const recentlyCompleted = [
    {
      id: 1,
      userName: "Jane Cooper",
      courseName: "Introduction to Web Development",
      score: 85,
      date: "2025-04-15",
    },
    {
      id: 2,
      userName: "Robert Fox",
      courseName: "Advanced React Techniques",
      score: 92,
      date: "2025-04-14",
    },
    {
      id: 3,
      userName: "Cody Fisher",
      courseName: "Node.js Backend Development",
      score: 78,
      date: "2025-04-13",
    },
    {
      id: 4,
      userName: "Esther Howard",
      courseName: "UI/UX Design Fundamentals",
      score: 95,
      date: "2025-04-12",
    },
    {
      id: 5,
      userName: "Cameron Williamson",
      courseName: "Full-Stack JavaScript Development",
      score: 88,
      date: "2025-04-11",
    },
  ];

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/courses/new">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            New Course
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>
                All registered users on the platform
              </CardDescription>
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAdminStats.totalUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              {mockAdminStats.recentUsers.length} users joined recently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAdminStats.recentUsers.slice(0, 5).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-right">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/users">
                  View all users
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recently Completed Tests</CardTitle>
            <CardDescription>
              Students who have recently passed their tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentlyCompleted.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">
                      {result.userName}
                    </TableCell>
                    <TableCell>{result.courseName}</TableCell>
                    <TableCell>{result.score}%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Passed</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(result.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-right">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/tests">
                  View all results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
