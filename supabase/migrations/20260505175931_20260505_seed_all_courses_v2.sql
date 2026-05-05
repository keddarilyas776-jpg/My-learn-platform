/*
  # Seed All Courses (v2)

  Adds unique constraint on courses.title then inserts the full catalogue
  including three new courses:
  - برمجة PLC باستخدام TIA Portal
  - أساسيات الذكاء الاصطناعي
  - أساسيات الأمن السيبراني

  All inserts are idempotent via ON CONFLICT (title) DO NOTHING.
*/

ALTER TABLE courses ADD CONSTRAINT courses_title_key UNIQUE (title);

INSERT INTO courses (title, description, category, sub_category, difficulty, lessons_count, rating, youtube_url, icon, color) VALUES
  ('علم النفس الطبي',
   'كورس متكامل بقناة Dr. Nagi لطلاب الطب - يشمل الإدراك والتفكير والذاكرة والتعلم وأسس علم النفس الطبي',
   'professional', 'medical', 'مبتدئ', 24, 4.7,
   'https://www.youtube.com/playlist?list=PLFkJTdtzWoIY5FJhHZZBFCOx-uwuI_Vsq', '🧠', 'blue'),

  ('AutoCAD من الصفر للاحتراف',
   'كورس أوتوكاد من الصفر حتى الاحتراف باللغة العربية - يغطي الرسم الهندسي وأوامر التعديل والمشاريع التطبيقية الكاملة',
   'professional', 'engineering', 'متوسط', 18, 4.5,
   'https://www.youtube.com/playlist?list=PLlzIpiCueEArjVi59d0uw5rpQ8tLLtro0', '⚙️', 'slate'),

  ('تطوير الويب مع Elzero',
   'كورس HTML الكامل مع Elzero Web School - 37 درساً تفصيلياً لتعلم بناء صفحات الويب من الأساس باللغة العربية',
   'professional', 'technology', 'مبتدئ', 37, 4.9,
   'https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji', '💻', 'cyan'),

  ('الرسم الإبداعي خطوة بخطوة',
   'قناة Hams Art - 240+ درس رسم خطوة بخطوة باللغة العربية للمبتدئين - تعلم الرسم بأسلوب ممتع وسهل',
   'creative', 'drawing', 'مبتدئ', 40, 4.6,
   'https://www.youtube.com/playlist?list=PL0oExH_Pn_Tut9s0h0qaLIwDESYkgsj8D', '🎨', 'orange'),

  ('القراءة السريعة',
   'تعلم تقنيات القراءة السريعة وتحسين مهارات الاستيعاب والفهم - دورة عربية متكاملة لرفع سرعة القراءة وتعزيز التركيز',
   'creative', 'reading', 'مبتدئ', 12, 4.4,
   'https://www.youtube.com/results?search_query=القراءة+السريعة+عربي+playlist', '📖', 'emerald'),

  ('فن الكتابة الإبداعية',
   'سلسلة الكتابة الإبداعية بالعربية - كيف تكتب قصة أو مقال أو رواية؟ تقنيات الكتابة الأدبية والسرد القصصي',
   'creative', 'writing', 'متوسط', 20, 4.6,
   'https://www.youtube.com/playlist?list=PLzVtL-u1GggOK3tv0U-POD63DKe-lKJIM', '✍️', 'rose'),

  ('برمجة PLC باستخدام TIA Portal',
   'كورس متكامل لتعلم برمجة وحدات التحكم المنطقية القابلة للبرمجة PLC باستخدام بيئة Siemens TIA Portal - يشمل السلم التدريجي Ladder Diagram وبرمجة الأتمتة الصناعية من الصفر للاحتراف',
   'professional', 'engineering', 'متوسط', 32, 4.8,
   'https://www.youtube.com/results?search_query=برمجة+PLC+TIA+Portal+عربي', '🏭', 'slate'),

  ('أساسيات الذكاء الاصطناعي',
   'دورة شاملة في مبادئ الذكاء الاصطناعي وتعلم الآلة والشبكات العصبية - تغطي خوارزميات ML وأدوات Python العلمية بأسلوب عربي مبسط',
   'professional', 'technology', 'مبتدئ', 28, 4.9,
   'https://www.youtube.com/results?search_query=الذكاء+الاصطناعي+كورس+عربي', '🤖', 'cyan'),

  ('أساسيات الأمن السيبراني',
   'كورس أمن المعلومات والأمن السيبراني باللغة العربية - يشمل أساسيات الشبكات والتشفير واختبار الاختراق الأخلاقي وحماية الأنظمة',
   'professional', 'technology', 'مبتدئ', 22, 4.7,
   'https://www.youtube.com/results?search_query=الأمن+السيبراني+كورس+عربي', '🔐', 'red')

ON CONFLICT (title) DO NOTHING;
