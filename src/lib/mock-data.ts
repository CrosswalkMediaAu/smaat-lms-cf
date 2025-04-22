// Mock data for courses
export const mockCourses = [
  {
    id: "course-1",
    title: "Introduction to Web Development",
    description:
      "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "John Smith",
    duration: "8 weeks",
    lessons: 24,
    level: "Beginner",
    category: "Web Development",
    rating: 4.7,
    students: 1245,
    status: "published",
  },
  {
    id: "course-2",
    title: "Advanced React Techniques",
    description:
      "Master advanced React concepts like hooks, context, and performance optimization.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Sarah Johnson",
    duration: "6 weeks",
    lessons: 18,
    level: "Advanced",
    category: "Frontend",
    rating: 4.9,
    students: 876,
    status: "published",
  },
  {
    id: "course-3",
    title: "Node.js Backend Development",
    description:
      "Build scalable backend applications with Node.js, Express, and MongoDB.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Michael Chen",
    duration: "10 weeks",
    lessons: 30,
    level: "Intermediate",
    category: "Backend",
    rating: 4.6,
    students: 932,
    status: "draft",
  },
  {
    id: "course-4",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn the principles of user interface and user experience design.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Emily Rodriguez",
    duration: "5 weeks",
    lessons: 15,
    level: "Beginner",
    category: "Design",
    rating: 4.8,
    students: 1567,
    status: "draft",
  },
  {
    id: "course-5",
    title: "Full-Stack JavaScript Development",
    description:
      "Become a full-stack developer using JavaScript for both frontend and backend.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "David Wilson",
    duration: "12 weeks",
    lessons: 36,
    level: "Intermediate",
    category: "Full-Stack",
    rating: 4.5,
    students: 1089,
    status: "draft",
  },
  {
    id: "course-6",
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile apps using React Native and JavaScript.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Lisa Thompson",
    duration: "8 weeks",
    lessons: 24,
    level: "Intermediate",
    category: "Mobile",
    rating: 4.7,
    students: 743,
    status: "draft",
  },
];

// Mock data for enrolled courses
export const mockEnrolledCourses = [
  {
    id: "course-1",
    title: "Introduction to Web Development",
    description:
      "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    image: "/placeholder.svg?height=150&width=300",
    lastAccessed: "2 days ago",
  },
  {
    id: "course-2",
    title: "Advanced React Techniques",
    description:
      "Master advanced React concepts like hooks, context, and performance optimization.",
    progress: 30,
    totalLessons: 18,
    completedLessons: 5,
    image: "/placeholder.svg?height=150&width=300",
    lastAccessed: "Yesterday",
  },
  {
    id: "course-4",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn the principles of user interface and user experience design.",
    progress: 100,
    totalLessons: 15,
    completedLessons: 15,
    image: "/placeholder.svg?height=150&width=300",
    lastAccessed: "1 week ago",
  },
];

// Mock data for course details with lessons
export const mockCourseDetails = {
  id: "course-1",
  title: "Introduction to Web Development",
  description:
    "Learn the basics of HTML, CSS, and JavaScript to build modern websites. This comprehensive course will take you from a complete beginner to being able to create your own responsive websites.",
  image: "/placeholder.svg?height=300&width=600",
  instructor: "John Smith",
  instructorBio:
    "Senior Web Developer with 10+ years of experience. Previously worked at Google and Amazon.",
  instructorImage: "/placeholder.svg?height=100&width=100",
  duration: "8 weeks",
  level: "Beginner",
  category: "Web Development",
  rating: 4.7,
  students: 1245,
  prerequisites: [
    "Basic computer skills",
    "No prior coding experience required",
  ],
  objectives: [
    "Understand HTML structure and semantics",
    "Create responsive layouts with CSS",
    "Build interactive websites with JavaScript",
    "Deploy websites to production",
  ],
  sections: [
    {
      id: "section-1",
      title: "Getting Started with HTML",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Introduction to HTML",
          duration: "15 min",
          completed: true,
        },
        {
          id: "lesson-1-2",
          title: "HTML Document Structure",
          duration: "20 min",
          completed: true,
        },
        {
          id: "lesson-1-3",
          title: "Working with Text Elements",
          duration: "25 min",
          completed: true,
        },
        {
          id: "lesson-1-4",
          title: "HTML Lists and Tables",
          duration: "30 min",
          completed: false,
        },
      ],
    },
    {
      id: "section-2",
      title: "CSS Fundamentals",
      lessons: [
        {
          id: "lesson-2-1",
          title: "Introduction to CSS",
          duration: "20 min",
          completed: false,
        },
        {
          id: "lesson-2-2",
          title: "CSS Selectors",
          duration: "25 min",
          completed: false,
        },
        {
          id: "lesson-2-3",
          title: "Box Model and Layout",
          duration: "35 min",
          completed: false,
        },
        {
          id: "lesson-2-4",
          title: "Responsive Design",
          duration: "40 min",
          completed: false,
        },
      ],
    },
    {
      id: "section-3",
      title: "JavaScript Basics",
      lessons: [
        {
          id: "lesson-3-1",
          title: "Introduction to JavaScript",
          duration: "25 min",
          completed: false,
        },
        {
          id: "lesson-3-2",
          title: "Variables and Data Types",
          duration: "30 min",
          completed: false,
        },
        {
          id: "lesson-3-3",
          title: "Functions and Control Flow",
          duration: "35 min",
          completed: false,
        },
        {
          id: "lesson-3-4",
          title: "DOM Manipulation",
          duration: "45 min",
          completed: false,
        },
      ],
    },
  ],
  finalTest: {
    id: "test-1",
    title: "Web Development Fundamentals Test",
    questions: 20,
    duration: "60 min",
    passingScore: 70,
  },
};

// Mock data for admin dashboard
export const mockAdminStats = {
  totalUsers: 2547,
  totalCourses: 42,
  totalLessons: 876,
  totalCompletions: 1243,
  recentUsers: [
    {
      id: "user-1",
      name: "Jane Cooper",
      email: "jane@example.com",
      joinedAt: "2 days ago",
    },
    {
      id: "user-2",
      name: "Robert Fox",
      email: "robert@example.com",
      joinedAt: "3 days ago",
    },
    {
      id: "user-3",
      name: "Cody Fisher",
      email: "cody@example.com",
      joinedAt: "1 week ago",
    },
    {
      id: "user-4",
      name: "Esther Howard",
      email: "esther@example.com",
      joinedAt: "1 week ago",
    },
    {
      id: "user-5",
      name: "Cameron Williamson",
      email: "cameron@example.com",
      joinedAt: "2 weeks ago",
    },
  ],
  popularCourses: [
    {
      id: "course-4",
      title: "UI/UX Design Fundamentals",
      students: 1567,
      rating: 4.8,
    },
    {
      id: "course-1",
      title: "Introduction to Web Development",
      students: 1245,
      rating: 4.7,
    },
    {
      id: "course-5",
      title: "Full-Stack JavaScript Development",
      students: 1089,
      rating: 4.5,
    },
    {
      id: "course-3",
      title: "Node.js Backend Development",
      students: 932,
      rating: 4.6,
    },
    {
      id: "course-2",
      title: "Advanced React Techniques",
      students: 876,
      rating: 4.9,
    },
  ],
  testResults: [],
};

// Mock data for course test
export const mockCourseTest = {
  id: "test-1",
  title: "Web Development Fundamentals Test",
  description: "Test your knowledge of HTML, CSS, and JavaScript fundamentals",
  timeLimit: 30, // minutes
  passingScore: 70,
  questions: [
    {
      id: "q1",
      text: "Which HTML tag is used to define an unordered list?",
      options: ["<ol>", "<ul>", "<li>", "<dl>"],
      correctAnswer: "<ul>",
    },
    {
      id: "q2",
      text: "Which CSS property is used to change the text color of an element?",
      options: ["color", "text-color", "font-color", "text-style"],
      correctAnswer: "color",
    },
    {
      id: "q3",
      text: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Object"],
      correctAnswer: "Float",
    },
    {
      id: "q4",
      text: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
      ],
      correctAnswer: "Cascading Style Sheets",
    },
    {
      id: "q5",
      text: "Which HTML attribute is used to define inline styles?",
      options: ["class", "style", "font", "styles"],
      correctAnswer: "style",
    },
    {
      id: "q6",
      text: "How do you select an element with the id 'demo' in CSS?",
      options: [".demo", "#demo", "demo", "*demo"],
      correctAnswer: "#demo",
    },
    {
      id: "q7",
      text: "Which method is used to add an element at the end of an array in JavaScript?",
      options: ["push()", "append()", "addToEnd()", "pop()"],
      correctAnswer: "push()",
    },
    {
      id: "q8",
      text: "Which HTML tag is used to define a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: "<a>",
    },
    {
      id: "q9",
      text: "Which CSS property is used to make text bold?",
      options: ["font-weight", "text-weight", "bold", "text-style"],
      correctAnswer: "font-weight",
    },
    {
      id: "q10",
      text: "What is the correct way to write a JavaScript array?",
      options: [
        "var colors = (1:'red', 2:'green', 3:'blue')",
        "var colors = ['red', 'green', 'blue']",
        "var colors = 'red', 'green', 'blue'",
        "var colors = {red, green, blue}",
      ],
      correctAnswer: "var colors = ['red', 'green', 'blue']",
    },
  ],
};
