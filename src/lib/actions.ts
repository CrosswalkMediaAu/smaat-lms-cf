"use server";

// Type for test result submission
export interface TestResult {
  courseId: string;
  userId: string;
  userName: string;
  userEmail: string;
  score: number;
  passed: boolean;
  timeSpent: number;
  submittedAt: string;
}

// In-memory storage for test results (in a real app, this would be a database)
const testResults: TestResult[] = [];

/**
 * Submit test results
 */
export async function submitTestResults(result: TestResult) {
  // In a real app, this would save to a database
  testResults.push(result);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}

/**
 * Get all test results (for admin)
 */
export async function getTestResults() {
  // In a real app, this would fetch from a database
  return testResults;
}

/**
 * Get test results for a specific user
 */
export async function getUserTestResults(userId: string) {
  // In a real app, this would query a database
  return testResults.filter((result) => result.userId === userId);
}

/**
 * Get test results for a specific course
 */
export async function getCourseTestResults(courseId: string) {
  // In a real app, this would query a database
  return testResults.filter((result) => result.courseId === courseId);
}
