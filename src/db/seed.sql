-- src/db/seed.sql

INSERT INTO users (id, name, email, role) VALUES
  ('user_1', 'Alice', 'alice@example.com', 'admin'),
  ('user_2', 'Bob', 'bob@example.com', 'student');

INSERT INTO courses (id, title, description, image, category, is_published, created_by) VALUES
  ('course_1', 'Intro to Quantum Physics', 'Learn the basics of quantum mechanics.', '/images/quantum.jpg', 'Science', 1, 'user_1');

INSERT INTO course_sections (id, course_id, title, "order") VALUES
  ('section_1', 'course_1', 'Fundamentals', 1);

INSERT INTO course_lessons (id, section_id, title, video_url, transcript, "order") VALUES
  ('lesson_1', 'section_1', 'What is Quantum Physics?', 'https://example.com/video1.mp4', 'Quantum physics studies matter at atomic scales...', 1);
