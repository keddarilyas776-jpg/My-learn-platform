/*
  # Add is_pro/subscribed_at columns and seed courses with real Arabic playlists

  1. Adds subscription columns to users_profile if not present
  2. Seeds courses table with real Arabic YouTube playlist URLs
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users_profile' AND column_name = 'is_pro'
  ) THEN
    ALTER TABLE users_profile ADD COLUMN is_pro boolean NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users_profile' AND column_name = 'subscribed_at'
  ) THEN
    ALTER TABLE users_profile ADD COLUMN subscribed_at timestamptz;
  END IF;
END $$;

-- Clear and re-seed courses with real Arabic YouTube playlists
TRUNCATE TABLE courses;

INSERT INTO courses (title, description, category, sub_category, difficulty, lessons_count, rating, youtube_url, icon, color) VALUES
  ('علم النفس الطبي', 'كورس متكامل بقناة Dr. Nagi لطلاب الطب - يشمل الإدراك والتفكير والذاكرة والتعلم وأسس علم النفس الطبي', 'professional', 'medical', 'مبتدئ', 24, 4.7, 'https://www.youtube.com/playlist?list=PLFkJTdtzWoIY5FJhHZZBFCOx-uwuI_Vsq', '🧠', 'blue'),
  ('AutoCAD من الصفر للاحتراف', 'كورس أوتوكاد من الصفر حتى الاحتراف باللغة العربية - يغطي الرسم الهندسي وأوامر التعديل والمشاريع التطبيقية الكاملة', 'professional', 'engineering', 'متوسط', 18, 4.5, 'https://www.youtube.com/playlist?list=PLlzIpiCueEArjVi59d0uw5rpQ8tLLtro0', '⚙️', 'slate'),
  ('تطوير الويب مع Elzero', 'كورس HTML الكامل مع Elzero Web School - 37 درساً تفصيلياً لتعلم بناء صفحات الويب من الأساس باللغة العربية', 'professional', 'technology', 'مبتدئ', 37, 4.9, 'https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji', '💻', 'cyan'),
  ('الرسم الإبداعي خطوة بخطوة', 'قناة Hams Art - 240+ درس رسم خطوة بخطوة باللغة العربية للمبتدئين - تعلم الرسم بأسلوب ممتع وسهل', 'creative', 'drawing', 'مبتدئ', 40, 4.6, 'https://www.youtube.com/playlist?list=PL0oExH_Pn_Tut9s0h0qaLIwDESYkgsj8D', '🎨', 'orange'),
  ('القراءة السريعة', 'تعلم تقنيات القراءة السريعة وتحسين مهارات الاستيعاب والفهم - دورة عربية متكاملة لرفع سرعة القراءة وتعزيز التركيز', 'creative', 'reading', 'مبتدئ', 12, 4.4, 'https://www.youtube.com/results?search_query=القراءة+السريعة+عربي+playlist', '📖', 'emerald'),
  ('فن الكتابة الإبداعية', 'سلسلة الكتابة الإبداعية بالعربية - كيف تكتب قصة أو مقال أو رواية؟ تقنيات الكتابة الأدبية والسرد القصصي', 'creative', 'writing', 'متوسط', 20, 4.6, 'https://www.youtube.com/playlist?list=PLzVtL-u1GggOK3tv0U-POD63DKe-lKJIM', '✍️', 'rose');
