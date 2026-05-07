/*
  # Create quizzes and games tables with seed data

  1. New Tables
    - `quizzes`
      - `id` (uuid, primary key)
      - `title` (text) — quiz display name
      - `category` (text) — subject area, e.g. 'HTML', 'Python'
      - `questions_count` (integer) — number of questions
      - `passing_score` (integer) — minimum % to pass
      - `created_at` (timestamptz)
    - `games`
      - `id` (uuid, primary key)
      - `title` (text) — game display name
      - `category` (text) — subject area
      - `difficulty` (text) — سهل / متوسط / صعب
      - `url` (text) — external game URL
      - `created_at` (timestamptz)

  2. Security
    - RLS enabled on both tables
    - Authenticated users can SELECT all rows (public catalogue)
    - Only admins (via is_admin on users_profile) can INSERT/UPDATE/DELETE

  3. Seed Data
    - 8 interactive quizzes across web dev, programming, and design subjects
    - 5 educational games (logic, coding, math puzzles)
*/

-- ─── quizzes ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS quizzes (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL,
  category       text NOT NULL DEFAULT '',
  questions_count integer NOT NULL DEFAULT 10,
  passing_score  integer NOT NULL DEFAULT 75,
  created_at     timestamptz DEFAULT now()
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view quizzes"
  ON quizzes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert quizzes"
  ON quizzes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.is_admin = true
    )
  );

CREATE POLICY "Admins can update quizzes"
  ON quizzes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.is_admin = true
    )
  );

CREATE POLICY "Admins can delete quizzes"
  ON quizzes FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.is_admin = true
    )
  );

-- ─── games ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS games (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text NOT NULL,
  category   text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'سهل',
  url        text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view games"
  ON games FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert games"
  ON games FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.is_admin = true
    )
  );

CREATE POLICY "Admins can update games"
  ON games FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.is_admin = true
    )
  );

CREATE POLICY "Admins can delete games"
  ON games FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.is_admin = true
    )
  );

-- ─── seed: quizzes ───────────────────────────────────────────────────────────

INSERT INTO quizzes (title, category, questions_count, passing_score) VALUES
  ('اختبار HTML الأساسي',                  'تطوير الويب',   15, 70),
  ('اختبار CSS والتصميم',                   'تطوير الويب',   12, 70),
  ('اختبار JavaScript للمبتدئين',           'تطوير الويب',   20, 75),
  ('اختبار Python المستوى الأول',           'برمجة',         18, 75),
  ('اختبار قواعد البيانات SQL',             'برمجة',         15, 70),
  ('اختبار أساسيات الشبكات',               'تكنولوجيا',     12, 70),
  ('اختبار الأمن السيبراني المبدئي',        'تكنولوجيا',     10, 75),
  ('اختبار الذكاء الاصطناعي - مقدمة',      'تكنولوجيا',     10, 70),
  ('اختبار AutoCAD الأساسي',               'هندسة',         12, 70),
  ('اختبار الخط العربي - المستوى الأول',   'فنون',           8, 75),
  ('اختبار التصوير الفوتوغرافي',            'فنون',          10, 70),
  ('اختبار مونتاج الفيديو',                'فنون',           10, 70),
  ('اختبار اللغة الإنجليزية المتوسطة',     'لغات',          20, 75),
  ('اختبار اللغة الفرنسية الأساسي',        'لغات',          15, 70),
  ('اختبار القراءة السريعة',               'مهارات',         8, 75),
  ('اختبار إدارة الوقت',                   'مهارات',         8, 70),
  ('اختبار الخطابة والإلقاء',              'مهارات',        10, 70),
  ('اختبار الرسم الإبداعي',               'فنون',           10, 70),
  ('اختبار الرسوم المتحركة 2D',            'فنون',           12, 70),
  ('اختبار الأدب العربي الكلاسيكي',        'أدب',           15, 70),
  ('اختبار علم النفس الطبي',               'طب',            15, 75),
  ('اختبار إلكترونيات المبتدئين',          'هندسة',         12, 70),
  ('اختبار TIA Portal - PLC',             'هندسة',         10, 75),
  ('اختبار Blender ثلاثي الأبعاد',        'تصميم',         12, 70),
  ('اختبار فن الكتابة الإبداعية',          'أدب',           10, 70),
  ('اختبار أساسيات الكيمياء',             'علوم',          15, 70),
  ('اختبار الرياضيات المتقدمة',            'علوم',          20, 75),
  ('اختبار الجغرافيا العربية',             'علوم',          12, 70),
  ('اختبار التاريخ الإسلامي',              'تاريخ',         15, 70),
  ('اختبار التربية المدنية',               'قيم',           10, 70);

-- ─── seed: games ─────────────────────────────────────────────────────────────

INSERT INTO games (title, category, difficulty, url) VALUES
  ('تعلم الترميز مع Code.org',     'تكنولوجيا', 'سهل',   'https://studio.code.org/hoc/1'),
  ('ألغاز Blockly البرمجية',       'تكنولوجيا', 'متوسط', 'https://blockly.games'),
  ('سباق جداول الضرب',             'رياضيات',   'سهل',   'https://www.multiplication.com/games/all-games'),
  ('خريطة العالم التفاعلية',       'جغرافيا',   'متوسط', 'https://www.seterra.com'),
  ('ألغاز المنطق - BrainBashers',  'تفكير',     'صعب',   'https://www.brainbashers.com/logic.asp'),
  ('تصنيف الكائنات الحية',         'علوم',      'سهل',   'https://www.sheppardsoftware.com/scienceforkids'),
  ('اختبار الأعلام والدول',         'جغرافيا',   'سهل',   'https://flagle.io'),
  ('موسيقى تفاعلية - النوتات',     'فنون',      'متوسط', 'https://www.musictheory.net/exercises'),
  ('تحدي المفردات الإنجليزية',     'لغات',      'متوسط', 'https://www.vocabulary.com/play'),
  ('اختبار الذاكرة - بطاقات',      'تفكير',     'سهل',   'https://www.memozor.com');
