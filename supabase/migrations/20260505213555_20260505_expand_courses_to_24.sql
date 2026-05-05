/*
  # Expand Course Catalogue to 24+ Courses

  Adds 15 new courses across multiple categories:
  - Creative Skills: music, photography, video editing, calligraphy, animation
  - Technical/Professional: Python, networking, databases, electronics, 3D design
  - Literature & Language: Arabic literature, English, French
  - Personal Development: public speaking, time management

  All inserts are idempotent via ON CONFLICT (title) DO NOTHING.
  Relies on the unique constraint courses_title_key added in a prior migration.
*/

INSERT INTO courses (title, description, category, sub_category, difficulty, lessons_count, rating, youtube_url, icon, color) VALUES

  -- Creative Skills - Music
  ('تعلم العزف على الغيتار',
   'دورة عربية كاملة لتعلم الغيتار من الصفر — تشمل المفاتيح الأساسية والأوتار والأغاني الشهيرة خطوة بخطوة',
   'creative', 'music', 'مبتدئ', 30, 4.7,
   'https://www.youtube.com/results?search_query=تعلم+الغيتار+عربي+مبتدئين', '🎸', 'orange'),

  -- Creative Skills - Photography
  ('فن التصوير الفوتوغرافي',
   'أسرار التصوير الاحترافي بالهاتف والكاميرا — الإضاءة والتأطير وتقنيات التحرير بالعربية',
   'creative', 'photography', 'مبتدئ', 22, 4.6,
   'https://www.youtube.com/results?search_query=تصوير+فوتوغرافي+كورس+عربي', '📷', 'amber'),

  -- Creative Skills - Video Editing
  ('مونتاج الفيديو احترافياً',
   'تعلم مونتاج الفيديو باستخدام CapCut وAdobe Premiere باللغة العربية — من الأساسيات حتى الإنتاج الاحترافي',
   'creative', 'video', 'متوسط', 26, 4.8,
   'https://www.youtube.com/results?search_query=مونتاج+فيديو+احترافي+عربي', '🎬', 'rose'),

  -- Creative Skills - Calligraphy
  ('فن الخط العربي',
   'تعلم الخط العربي الأصيل — خط النسخ والرقعة والديواني مع مشاريع تطبيقية عملية للمبتدئين',
   'creative', 'calligraphy', 'مبتدئ', 18, 4.5,
   'https://www.youtube.com/results?search_query=خط+عربي+كورس+مبتدئين', '✒️', 'emerald'),

  -- Creative Skills - Animation
  ('الرسوم المتحركة 2D',
   'تعلم صناعة الرسوم المتحركة ثنائية الأبعاد باستخدام أدوات مجانية — قصة كاملة من الفكرة حتى التصدير',
   'creative', 'animation', 'متوسط', 24, 4.7,
   'https://www.youtube.com/results?search_query=رسوم+متحركة+2D+عربي', '🎞️', 'cyan'),

  -- Technical - Python Programming
  ('تعلم Python من الصفر',
   'كورس برمجة Python الشامل باللغة العربية — المتغيرات والدوال والبيانات وتطبيقات الأتمتة العملية',
   'professional', 'technology', 'مبتدئ', 45, 4.9,
   'https://www.youtube.com/results?search_query=تعلم+Python+عربي+مبتدئين', '🐍', 'blue'),

  -- Technical - Networking
  ('أساسيات الشبكات CCNA',
   'دورة الشبكات العربية الشاملة — نموذج OSI وبروتوكولات TCP/IP وإعداد الأجهزة والتوجيه والتبديل',
   'professional', 'technology', 'متوسط', 38, 4.8,
   'https://www.youtube.com/results?search_query=CCNA+شبكات+عربي', '🌐', 'slate'),

  -- Technical - Databases
  ('قواعد البيانات SQL',
   'تعلم SQL من الصفر للاحتراف باللغة العربية — الاستعلامات والجداول والعلاقات وتصميم قواعد البيانات',
   'professional', 'technology', 'مبتدئ', 28, 4.7,
   'https://www.youtube.com/results?search_query=SQL+قواعد+بيانات+عربي', '🗄️', 'cyan'),

  -- Technical - Electronics
  ('إلكترونيات للمبتدئين',
   'تعلم الإلكترونيات الأساسية — الدوائر الكهربائية والمكونات والقياسات وتطبيقات Arduino العملية',
   'professional', 'engineering', 'مبتدئ', 32, 4.6,
   'https://www.youtube.com/results?search_query=إلكترونيات+للمبتدئين+عربي', '⚡', 'amber'),

  -- Technical - 3D Design
  ('التصميم ثلاثي الأبعاد Blender',
   'كورس Blender باللغة العربية من الصفر — النمذجة والتشكيل والإضاءة والتصيير وتصدير المشاريع',
   'professional', 'engineering', 'متوسط', 35, 4.8,
   'https://www.youtube.com/results?search_query=Blender+3D+عربي+مبتدئين', '🎲', 'orange'),

  -- Literature & Language - Arabic
  ('الأدب العربي الكلاسيكي',
   'رحلة في روائع الأدب العربي — الشعر الجاهلي والأموي والعباسي والنثر الفني للطلاب والمهتمين',
   'creative', 'literature', 'متوسط', 20, 4.5,
   'https://www.youtube.com/results?search_query=أدب+عربي+كلاسيكي+محاضرات', '📜', 'amber'),

  -- Language - English
  ('اللغة الإنجليزية للمتوسطين',
   'كورس الإنجليزية المتوسط باللغة العربية — القواعد والمحادثة والكتابة ومهارات IELTS بأسلوب سهل',
   'creative', 'language', 'متوسط', 40, 4.8,
   'https://www.youtube.com/results?search_query=اللغة+الانجليزية+مستوى+متوسط+عربي', '🇬🇧', 'blue'),

  -- Language - French
  ('تعلم الفرنسية من الصفر',
   'كورس الفرنسية العربي الكامل — الأبجدية والمفردات والجمل الحوارية للمبتدئين العرب',
   'creative', 'language', 'مبتدئ', 30, 4.6,
   'https://www.youtube.com/results?search_query=تعلم+الفرنسية+عربي+مبتدئين', '🇫🇷', 'rose'),

  -- Personal Development - Public Speaking
  ('فن الخطابة والإلقاء',
   'تعلم مهارات الإلقاء والخطابة الفعّالة — بناء الثقة بالنفس وتقنيات التأثير في الجمهور',
   'creative', 'development', 'مبتدئ', 16, 4.7,
   'https://www.youtube.com/results?search_query=فن+الخطابة+والإلقاء+عربي', '🎤', 'emerald'),

  -- Personal Development - Time Management
  ('إدارة الوقت والإنتاجية',
   'تقنيات إدارة الوقت الحديثة — Pomodoro وGTD وبناء العادات الإنتاجية لتحقيق الأهداف',
   'creative', 'development', 'مبتدئ', 14, 4.6,
   'https://www.youtube.com/results?search_query=إدارة+الوقت+والإنتاجية+عربي', '⏰', 'slate')

ON CONFLICT (title) DO NOTHING;
