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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { mockCourses, mockCourseTest } from "@/lib/mock-data";

export default function TestBuilderPage() {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Find the course
  const course = mockCourses.find((c) => c.id === id);

  // Test data
  const [testData, setTestData] = useState({
    title: mockCourseTest.title || "",
    description: mockCourseTest.description || "",
    timeLimit: mockCourseTest.timeLimit.toString() || "30",
    passingScore: mockCourseTest.passingScore.toString() || "70",
    isUntimed: false,
  });

  // Questions
  const [questions, setQuestions] = useState(
    mockCourseTest.questions.length > 0
      ? mockCourseTest.questions.map((q) => ({
          id: q.id,
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
        }))
      : [
          {
            id: "q1",
            text: "",
            options: ["", "", "", ""],
            correctAnswer: "",
          },
        ]
  );

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    // Handle untimed checkbox
    if (testData.isUntimed) {
      setTestData((prev) => ({ ...prev, timeLimit: "0" }));
    }
  }, [testData.isUntimed]);

  const handleTestDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUntimedChange = (checked: boolean) => {
    setTestData((prev) => ({
      ...prev,
      isUntimed: checked,
      timeLimit: checked ? "0" : prev.timeLimit === "0" ? "30" : prev.timeLimit,
    }));
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q${questions.length + 1}`,
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Validate form
    if (!testData.title || !testData.passingScore) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    // Validate questions
    const invalidQuestions = questions.some(
      (q) => !q.text || q.options.some((o) => !o) || !q.correctAnswer
    );
    if (invalidQuestions) {
      toast({
        title: "Error",
        description:
          "Please complete all questions with options and correct answers.",
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
        description: "Test has been saved successfully.",
      });
      router.push("/admin/courses");
    }, 1000);
  };

  if (isLoading || !user || user.role !== "admin") {
    return <div className="container py-10">Loading...</div>;
  }

  if (!course) {
    return <div className="container py-10">Course not found</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Test Builder: {course.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/courses">Cancel</Link>
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save Test"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Test Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Test Information</CardTitle>
              <CardDescription>
                Set up the basic information for your test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Test Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Web Development Fundamentals Test"
                  value={testData.title}
                  onChange={handleTestDataChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a description of what this test covers"
                  rows={3}
                  value={testData.description}
                  onChange={handleTestDataChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isUntimed"
                        checked={testData.isUntimed}
                        onCheckedChange={handleUntimedChange}
                      />
                      <label
                        htmlFor="isUntimed"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Untimed
                      </label>
                    </div>
                  </div>
                  <Input
                    id="timeLimit"
                    name="timeLimit"
                    type="number"
                    min="0"
                    max="180"
                    value={testData.timeLimit}
                    onChange={handleTestDataChange}
                    disabled={testData.isUntimed}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingScore">Passing Score (%)</Label>
                  <Input
                    id="passingScore"
                    name="passingScore"
                    type="number"
                    min="1"
                    max="100"
                    value={testData.passingScore}
                    onChange={handleTestDataChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <Card key={question.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>Question {qIndex + 1}</CardTitle>
                    <CardDescription>Multiple choice question</CardDescription>
                  </div>
                  {questions.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeQuestion(qIndex)}
                      className="text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`question-${qIndex}`}>Question Text</Label>
                    <Textarea
                      id={`question-${qIndex}`}
                      placeholder="Enter your question here"
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "text", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Answer Options</Label>
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex gap-2">
                        <Input
                          placeholder={`Option ${oIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant={
                            question.correctAnswer === option
                              ? "default"
                              : "outline"
                          }
                          className="w-[120px]"
                          onClick={() =>
                            handleCorrectAnswerChange(qIndex, option)
                          }
                          disabled={!option}
                        >
                          {question.correctAnswer === option
                            ? "Correct ✓"
                            : "Mark Correct"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button onClick={addQuestion} className="w-full">
              Add Question
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>{testData.title || "Test Preview"}</CardTitle>
              <CardDescription>
                {testData.description || "No description provided"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">Time Limit:</span>{" "}
                  {testData.isUntimed
                    ? "Untimed"
                    : `${testData.timeLimit} minutes`}
                </div>
                <div>
                  <span className="font-medium">Passing Score:</span>{" "}
                  {testData.passingScore}%
                </div>
              </div>

              {questions.map((question, qIndex) => (
                <div
                  key={question.id}
                  className="border rounded-md p-4 space-y-3"
                >
                  <h3 className="font-medium">
                    {qIndex + 1}.{" "}
                    {question.text || "Question text will appear here"}
                  </h3>
                  <div className="space-y-2 pl-5">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2">
                        <div
                          className={`h-4 w-4 rounded-full border ${
                            option === question.correctAnswer
                              ? "bg-primary border-primary"
                              : "border-input"
                          }`}
                        />
                        <span>
                          {option || `Option ${oIndex + 1} will appear here`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {(!testData.title || questions.some((q) => !q.text)) && (
                <div className="text-center text-muted-foreground">
                  Complete the test details and questions to see a full preview
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
