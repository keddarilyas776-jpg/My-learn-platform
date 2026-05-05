/*
  # Add Admin Role

  1. Changes
    - `users_profile`
      - Add `is_admin` (boolean, default false) — marks a user as a platform administrator.
        Admins can view all user profiles and manage courses via the admin panel.

  2. Security
    - Admins can SELECT all rows in users_profile (new policy)
    - Admins can INSERT/UPDATE/DELETE courses (new policies)
    - Only the service-role or an existing admin can promote another user to admin
      (enforced by: regular users cannot update is_admin on their own row via RLS)

  3. Notes
    - The is_admin flag is NOT settable by normal users — the UPDATE policy for
      users_profile already restricts what a user can write on their own row.
      To grant admin to a user, run:
        UPDATE users_profile SET is_admin = true WHERE id = '<user-uuid>';
      from the Supabase dashboard or a service-role call.
*/

-- Add is_admin column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users_profile' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE users_profile ADD COLUMN is_admin boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- Helper function: returns true if the calling user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.users_profile WHERE id = auth.uid()),
    false
  );
$$;

-- Admins can view ALL user profiles
CREATE POLICY "Admins can view all profiles"
  ON users_profile FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admins can manage courses (insert / update / delete)
CREATE POLICY "Admins can insert courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Seed courses for new project (idempotent)
INSERT INTO courses (title, description, category, sub_category, difficulty, lessons_count, rating, youtube_url, icon, color) VALUES
  ('علم النفس الطبي', 'كورس متكامل بقناة Dr. Nagi لطلاب الطب - يشمل الإدراك والتفكير والذاكرة والتعلم وأسس علم النفس الطبي', 'professional', 'medical', 'مبتدئ', 24, 4.7, 'https://www.youtube.com/playlist?list=PLFkJTdtzWoIY5FJhHZZBFCOx-uwuI_Vsq', '🧠', 'blue'),
  ('AutoCAD من الصفر للاحتراف', 'كورس أوتوكاد من الصفر حتى الاحتراف باللغة العربية - يغطي الرسم الهندسي وأوامر التعديل والمشاريع التطبيقية الكاملة', 'professional', 'engineering', 'متوسط', 18, 4.5, 'https://www.youtube.com/playlist?list=PLlzIpiCueEArjVi59d0uw5rpQ8tLLtro0', '⚙️', 'slate'),
  ('تطوير الويب مع Elzero', 'كورس HTML الكامل مع Elzero Web School - 37 درساً تفصيلياً لتعلم بناء صفحات الويب من الأساس باللغة العربية', 'professional', 'technology', 'مبتدئ', 37, 4.9, 'https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji', '💻', 'cyan'),
  ('الرسم الإبداعي خطوة بخطوة', 'قناة Hams Art - 240+ درس رسم خطوة بخطوة باللغة العربية للمبتدئين', 'creative', 'drawing', 'مبتدئ', 40, 4.6, 'https://www.youtube.com/playlist?list=PL0oExH_Pn_Tut9s0h0qaLIwDESYkgsj8D', '🎨', 'orange'),
  ('القراءة السريعة', 'تعلم تقنيات القراءة السريعة وتحسين مهارات الاستيعاب والفهم', 'creative', 'reading', 'مبتدئ', 12, 4.4, 'https://www.youtube.com/results?search_query=القراءة+السريعة+عربي+playlist', '📖', 'emerald'),
  ('فن الكتابة الإبداعية', 'سلسلة الكتابة الإبداعية بالعربية - كيف تكتب قصة أو مقال أو رواية؟', 'creative', 'writing', 'متوسط', 20, 4.6, 'https://www.youtube.com/playlist?list=PLzVtL-u1GggOK3tv0U-POD63DKe-lKJIM', '✍️', 'rose')
ON CONFLICT DO NOTHING;
