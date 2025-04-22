-- USERS (Clerk-managed, with custom roles stored here)
CREATE TABLE users (
  id TEXT PRIMARY KEY,  -- Clerk user ID
  name TEXT,
  email TEXT UNIQUE,
  role TEXT NOT NULL DEFAULT 'student', -- 'student' or 'admin'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- COURSES
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT,
  is_published INTEGER NOT NULL DEFAULT 0, -- 0 = draft, 1 = published
  created_by TEXT REFERENCES users(id),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- SECTIONS (within a course)
CREATE TABLE course_sections (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- LESSONS (within a section)
CREATE TABLE course_lessons (
  id TEXT PRIMARY KEY,
  section_id TEXT REFERENCES course_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT,
  transcript TEXT,
  "order" INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ENROLMENTS (tracks which users are enrolled in which courses)
CREATE TABLE enrolments (
  user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  enrolled_at TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- LESSON COMPLETIONS (user-specific lesson progress)
CREATE TABLE lesson_completions (
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
);

-- COURSE COMPLETIONS (marks if user finished the whole course)
CREATE TABLE course_completions (
  user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
