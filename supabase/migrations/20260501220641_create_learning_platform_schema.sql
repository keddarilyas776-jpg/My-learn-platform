/*
  # Interactive Learning Platform Schema

  1. New Tables
    - `users_profile` - Extended user profile with stats and coins
      - `id` (uuid, FK to auth.users)
      - `display_name` (text)
      - `coins` (integer, default 1250)
      - `avatar_url` (text)
      - `badge` (text, e.g., "طالب نشط")
      - `created_at` (timestamp)

    - `courses` - Available courses on the platform
      - `id` (uuid)
      - `title` (text)
      - `description` (text)
      - `category` (text, e.g., creative, professional)
      - `sub_category` (text, e.g., drawing, engineering)
      - `difficulty` (text, e.g., مبتدئ)
      - `lessons_count` (integer)
      - `rating` (numeric)
      - `youtube_url` (text, direct YouTube link)
      - `icon` (text, emoji)
      - `color` (text, tailwind color class)
      - `created_at` (timestamp)

    - `user_tests` - Tests completed by users
      - `id` (uuid)
      - `user_id` (uuid, FK)
      - `test_name` (text)
      - `score` (integer)
      - `completed_at` (timestamp)

    - `user_certificates` - Certificates earned
      - `id` (uuid)
      - `user_id` (uuid, FK)
      - `course_title` (text)
      - `issued_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can read/update their own profile
    - Courses are publicly readable
    - Users manage their own test/certificate records
*/

-- Users Profile
CREATE TABLE IF NOT EXISTS users_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'طالب',
  coins integer NOT NULL DEFAULT 1250,
  avatar_url text DEFAULT '',
  badge text NOT NULL DEFAULT 'طالب نشط',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users_profile FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users_profile FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users_profile FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'general',
  sub_category text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'مبتدئ',
  lessons_count integer NOT NULL DEFAULT 10,
  rating numeric(3,1) NOT NULL DEFAULT 4.5,
  youtube_url text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT '📚',
  color text NOT NULL DEFAULT 'blue',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO anon, authenticated
  USING (true);

-- User Tests
CREATE TABLE IF NOT EXISTS user_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_name text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  completed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tests"
  ON user_tests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tests"
  ON user_tests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User Certificates
CREATE TABLE IF NOT EXISTS user_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_title text NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates"
  ON user_certificates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certificates"
  ON user_certificates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Seed courses data
INSERT INTO courses (title, description, category, sub_category, difficulty, lessons_count, rating, youtube_url, icon, color) VALUES
  ('علم النفس التطبيقي', 'تعلم أساسيات علم النفس وتطبيقاته في الحياة اليومية', 'professional', 'medical', 'مبتدئ', 24, 4.7, 'https://www.youtube.com/results?search_query=علم+النفس+التطبيقي+عربي', '🧠', 'blue'),
  ('الزراعة المستدامة', 'مفاهيم الزراعة الحديثة والتقنيات المستدامة للبيئة', 'professional', 'engineering', 'متوسط', 18, 4.5, 'https://www.youtube.com/results?search_query=الزراعة+المستدامة+عربي', '🌱', 'green'),
  ('البرمجة للمبتدئين', 'تعلم البرمجة من الصفر باستخدام Python وأساسيات التكنولوجيا', 'professional', 'technology', 'مبتدئ', 30, 4.8, 'https://www.youtube.com/results?search_query=البرمجة+للمبتدئين+بالعربي', '💻', 'cyan'),
  ('الرسم الإبداعي', 'أساسيات الرسم والتلوين وتطوير الموهبة الفنية', 'creative', 'drawing', 'مبتدئ', 15, 4.6, 'https://www.youtube.com/results?search_query=تعليم+الرسم+للمبتدئين+عربي', '🎨', 'orange'),
  ('القراءة السريعة', 'تقنيات القراءة السريعة وتحسين مهارات الاستيعاب', 'creative', 'reading', 'مبتدئ', 12, 4.4, 'https://www.youtube.com/results?search_query=القراءة+السريعة+عربي', '📖', 'emerald'),
  ('فن الكتابة الإبداعية', 'تعلم أسرار الكتابة الإبداعية والتعبير الأدبي', 'creative', 'writing', 'متوسط', 20, 4.6, 'https://www.youtube.com/results?search_query=الكتابة+الإبداعية+عربي', '✍️', 'rose')
ON CONFLICT DO NOTHING;
