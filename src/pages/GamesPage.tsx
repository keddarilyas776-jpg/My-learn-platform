import { useState } from 'react'
import { Gamepad2, Lock, Play } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Game = {
  id: number
  title: string
  description: string
  icon: string
  category: string
  difficulty: 'سهل' | 'متوسط' | 'صعب'
  color: string
  bgGradient: string
  url: string
}

const games: Game[] = [
  // لغة عربية
  { id: 1, title: 'تكوين الكلمات', description: 'رتّب الحروف لتكوين كلمات صحيحة', icon: '🔤', category: 'لغة عربية', difficulty: 'سهل', color: 'text-blue-700', bgGradient: 'from-blue-400 to-blue-600', url: 'https://www.abcya.com/games/word_parts' },
  { id: 2, title: 'لعبة الكلمات المتقاطعة', description: 'احلل الكلمات المتقاطعة باللغة العربية', icon: '📰', category: 'لغة عربية', difficulty: 'متوسط', color: 'text-blue-700', bgGradient: 'from-blue-500 to-blue-700', url: 'https://www.educaplay.com/learning-resources/crossword.html' },
  { id: 3, title: 'مطابقة المرادفات', description: 'طابق بين الكلمات ومعانيها', icon: '🔗', category: 'لغة عربية', difficulty: 'متوسط', color: 'text-blue-700', bgGradient: 'from-sky-400 to-sky-600', url: 'https://www.vocabulary.com/play' },
  { id: 4, title: 'قصة مع فراغات', description: 'أكمل الجمل الناقصة في القصة', icon: '📖', category: 'لغة عربية', difficulty: 'سهل', color: 'text-blue-700', bgGradient: 'from-cyan-400 to-cyan-600', url: 'https://www.educaplay.com' },
  { id: 5, title: 'الإملاء التفاعلي', description: 'استمع واكتب الكلمات بشكل صحيح', icon: '✍️', category: 'لغة عربية', difficulty: 'متوسط', color: 'text-blue-700', bgGradient: 'from-indigo-400 to-blue-600', url: 'https://www.spellingcity.com' },

  // رياضيات
  { id: 6, title: 'سباق الضرب', description: 'حل جداول الضرب في أسرع وقت ممكن', icon: '✖️', category: 'رياضيات', difficulty: 'سهل', color: 'text-emerald-700', bgGradient: 'from-emerald-400 to-emerald-600', url: 'https://www.multiplication.com/games/all-games' },
  { id: 7, title: 'حل المعادلات', description: 'حل المعادلات الرياضية المتدرجة', icon: '🔢', category: 'رياضيات', difficulty: 'صعب', color: 'text-emerald-700', bgGradient: 'from-green-500 to-emerald-700', url: 'https://www.mathplayground.com' },
  { id: 8, title: 'الأشكال الهندسية', description: 'تعرّف على الأشكال وخصائصها', icon: '📐', category: 'رياضيات', difficulty: 'سهل', color: 'text-emerald-700', bgGradient: 'from-teal-400 to-teal-600', url: 'https://www.abcya.com/games/geometry_quiz' },
  { id: 9, title: 'الكسور المرحة', description: 'تعلّم الكسور من خلال الألعاب', icon: '🍕', category: 'رياضيات', difficulty: 'متوسط', color: 'text-emerald-700', bgGradient: 'from-lime-400 to-green-600', url: 'https://www.coolmathgames.com' },
  { id: 10, title: 'بناء الأعداد', description: 'فهم القيم المكانية للأرقام', icon: '🧮', category: 'رياضيات', difficulty: 'سهل', color: 'text-emerald-700', bgGradient: 'from-green-400 to-emerald-600', url: 'https://www.abcya.com/games/place_value' },

  // علوم
  { id: 11, title: 'تصنيف الكائنات', description: 'صنّف الحيوانات والنباتات حسب خصائصها', icon: '🦁', category: 'علوم', difficulty: 'سهل', color: 'text-orange-700', bgGradient: 'from-orange-400 to-orange-600', url: 'https://www.sheppardsoftware.com/scienceforkids' },
  { id: 12, title: 'دورة الماء', description: 'استكشف مراحل دورة الماء في الطبيعة', icon: '💧', category: 'علوم', difficulty: 'متوسط', color: 'text-orange-700', bgGradient: 'from-amber-400 to-orange-600', url: 'https://www.brainpop.com/science/earthsystem/waterycle' },
  { id: 13, title: 'المجموعة الشمسية', description: 'استكشف الكواكب والنجوم', icon: '🪐', category: 'علوم', difficulty: 'متوسط', color: 'text-orange-700', bgGradient: 'from-yellow-400 to-orange-600', url: 'https://spaceplace.nasa.gov/menu/play' },
  { id: 14, title: 'الجدول الدوري', description: 'تعلّم العناصر الكيميائية بطريقة ممتعة', icon: '⚗️', category: 'علوم', difficulty: 'صعب', color: 'text-orange-700', bgGradient: 'from-red-400 to-orange-600', url: 'https://www.chemicool.com' },
  { id: 15, title: 'الجسم البشري', description: 'اكتشف أعضاء الجسم ووظائفها', icon: '🫀', category: 'علوم', difficulty: 'متوسط', color: 'text-orange-700', bgGradient: 'from-rose-400 to-orange-600', url: 'https://www.bbc.co.uk/cbbc/quizzes/blue-peter-human-body-quiz' },

  // تاريخ وجغرافيا
  { id: 16, title: 'خريطة العالم', description: 'تعرّف على دول العالم وعواصمها', icon: '🌍', category: 'جغرافيا', difficulty: 'متوسط', color: 'text-rose-700', bgGradient: 'from-rose-400 to-rose-600', url: 'https://www.seterra.com' },
  { id: 17, title: 'الأعلام والدول', description: 'طابق الأعلام مع أسماء الدول', icon: '🏳️', category: 'جغرافيا', difficulty: 'سهل', color: 'text-rose-700', bgGradient: 'from-pink-400 to-rose-600', url: 'https://flagle.io' },
  { id: 18, title: 'التسلسل التاريخي', description: 'رتّب الأحداث التاريخية بالترتيب الصحيح', icon: '📜', category: 'تاريخ', difficulty: 'صعب', color: 'text-rose-700', bgGradient: 'from-red-400 to-rose-600', url: 'https://www.purposegames.com/game/history' },
  { id: 19, title: 'الحضارات القديمة', description: 'اكتشف حضارات مصر والرومان واليونان', icon: '🏛️', category: 'تاريخ', difficulty: 'متوسط', color: 'text-rose-700', bgGradient: 'from-amber-500 to-rose-600', url: 'https://www.ducksters.com/history' },
  { id: 20, title: 'العواصم العربية', description: 'تعرّف على عواصم الدول العربية', icon: '🕌', category: 'جغرافيا', difficulty: 'سهل', color: 'text-rose-700', bgGradient: 'from-rose-500 to-pink-700', url: 'https://www.seterra.com/ar/vgp/3143' },

  // فنون وإبداع
  { id: 21, title: 'الألوان والخلط', description: 'تعلّم كيفية خلط الألوان الأساسية', icon: '🎨', category: 'فنون', difficulty: 'سهل', color: 'text-violet-700', bgGradient: 'from-violet-400 to-violet-600', url: 'https://www.abcya.com/games/color_mixing' },
  { id: 22, title: 'رسم بالأرقام', description: 'اتبع الأرقام لتكتمل اللوحة', icon: '🖌️', category: 'فنون', difficulty: 'سهل', color: 'text-violet-700', bgGradient: 'from-purple-400 to-violet-600', url: 'https://www.colornumbers.net' },
  { id: 23, title: 'الموسيقى التفاعلية', description: 'تعلّم النوتات الموسيقية الأساسية', icon: '🎵', category: 'فنون', difficulty: 'متوسط', color: 'text-violet-700', bgGradient: 'from-fuchsia-400 to-violet-600', url: 'https://www.musictheory.net/exercises' },
  { id: 24, title: 'الشعر والإيقاع', description: 'اكتشف وزن الشعر العربي', icon: '📝', category: 'فنون', difficulty: 'صعب', color: 'text-violet-700', bgGradient: 'from-violet-500 to-purple-700', url: 'https://www.readwritethink.org/classroom-resources/student-interactives' },
  { id: 25, title: 'قصص مصوّرة', description: 'أنشئ قصتك المصورة الخاصة', icon: '📚', category: 'فنون', difficulty: 'متوسط', color: 'text-violet-700', bgGradient: 'from-pink-400 to-violet-600', url: 'https://storybird.com' },

  // تكنولوجيا
  { id: 26, title: 'تعلّم الترميز', description: 'برمج شخصيتك الخاصة خطوة بخطوة', icon: '💻', category: 'تكنولوجيا', difficulty: 'سهل', color: 'text-cyan-700', bgGradient: 'from-cyan-400 to-cyan-600', url: 'https://studio.code.org/hoc/1' },
  { id: 27, title: 'ألغاز البرمجة', description: 'حل الألغاز البرمجية التفاعلية', icon: '🧩', category: 'تكنولوجيا', difficulty: 'متوسط', color: 'text-cyan-700', bgGradient: 'from-teal-400 to-cyan-600', url: 'https://blockly.games' },
  { id: 28, title: 'بناء الروبوت', description: 'صمّم روبوتاً افتراضياً بسيطاً', icon: '🤖', category: 'تكنولوجيا', difficulty: 'صعب', color: 'text-cyan-700', bgGradient: 'from-blue-400 to-cyan-600', url: 'https://www.scratchjr.org' },
  { id: 29, title: 'شبكات الكمبيوتر', description: 'تعلّم كيف تعمل الإنترنت والشبكات', icon: '🌐', category: 'تكنولوجيا', difficulty: 'صعب', color: 'text-cyan-700', bgGradient: 'from-sky-400 to-teal-600', url: 'https://www.cisco.com/c/m/en_us/netsol/no46/index.html' },
  { id: 30, title: 'الذكاء الاصطناعي للأطفال', description: 'استكشف مفاهيم الذكاء الاصطناعي', icon: '🧠', category: 'تكنولوجيا', difficulty: 'متوسط', color: 'text-cyan-700', bgGradient: 'from-cyan-500 to-blue-700', url: 'https://machinelearningforkids.co.uk/#!/pretrained' },

  // رياضة وصحة
  { id: 31, title: 'أولمبياد المعرفة', description: 'اختبر معلوماتك عن الرياضات الأولمبية', icon: '🏅', category: 'رياضة', difficulty: 'متوسط', color: 'text-amber-700', bgGradient: 'from-amber-400 to-amber-600', url: 'https://www.olympic.org/athlete365/games/quiz' },
  { id: 32, title: 'التغذية السليمة', description: 'تعلّم عن الأطعمة الصحية والمغذيات', icon: '🥗', category: 'صحة', difficulty: 'سهل', color: 'text-amber-700', bgGradient: 'from-lime-400 to-amber-600', url: 'https://www.choosemyplate.gov/resources/games-activities' },
  { id: 33, title: 'رياضة القلب', description: 'تحديات اللياقة البدنية التفاعلية', icon: '❤️', category: 'صحة', difficulty: 'سهل', color: 'text-amber-700', bgGradient: 'from-red-400 to-amber-500', url: 'https://kidshealth.org/en/kids/fitness-center/fit-quiz' },
  { id: 34, title: 'رياضة الأذهان', description: 'تمارين ذهنية لتقوية الذاكرة', icon: '🧘', category: 'صحة', difficulty: 'متوسط', color: 'text-amber-700', bgGradient: 'from-yellow-400 to-amber-600', url: 'https://www.lumosity.com' },
  { id: 35, title: 'قواعد الألعاب', description: 'اكتشف قواعد الرياضات العالمية', icon: '⚽', category: 'رياضة', difficulty: 'سهل', color: 'text-amber-700', bgGradient: 'from-green-400 to-amber-500', url: 'https://www.ducksters.com/sports' },

  // منطق وتفكير
  { id: 36, title: 'ألغاز المنطق', description: 'حل الألغاز المنطقية المتدرجة', icon: '🧩', category: 'تفكير', difficulty: 'صعب', color: 'text-slate-700', bgGradient: 'from-slate-400 to-slate-600', url: 'https://www.brainbashers.com/logic.asp' },
  { id: 37, title: 'الشطرنج للمبتدئين', description: 'تعلّم قواعد الشطرنج وابدأ اللعب', icon: '♟️', category: 'تفكير', difficulty: 'صعب', color: 'text-slate-700', bgGradient: 'from-zinc-400 to-slate-600', url: 'https://www.chess.com/learn-how-to-play-chess' },
  { id: 38, title: 'اختبار الذاكرة', description: 'طابق البطاقات واختبر ذاكرتك', icon: '🃏', category: 'تفكير', difficulty: 'سهل', color: 'text-slate-700', bgGradient: 'from-gray-400 to-slate-600', url: 'https://www.memozor.com' },
  { id: 39, title: 'تسلسل الأنماط', description: 'اكتشف النمط وأكمل السلسلة', icon: '🔺', category: 'تفكير', difficulty: 'متوسط', color: 'text-slate-700', bgGradient: 'from-stone-400 to-slate-600', url: 'https://www.mathplayground.com/thinking_blocks.html' },
  { id: 40, title: 'الأحجية المرئية', description: 'حل الأحاجي البصرية المتنوعة', icon: '👁️', category: 'تفكير', difficulty: 'متوسط', color: 'text-slate-700', bgGradient: 'from-slate-500 to-gray-700', url: 'https://www.eyeq.org' },

  // دين وقيم
  { id: 41, title: 'أسماء الله الحسنى', description: 'تعلّم أسماء الله الحسنى ومعانيها', icon: '☪️', category: 'دين وقيم', difficulty: 'سهل', color: 'text-teal-700', bgGradient: 'from-teal-400 to-teal-600', url: 'https://www.islamicstudies.info' },
  { id: 42, title: 'السيرة النبوية', description: 'اختبر معلوماتك عن السيرة النبوية', icon: '🌙', category: 'دين وقيم', difficulty: 'متوسط', color: 'text-teal-700', bgGradient: 'from-emerald-400 to-teal-600', url: 'https://www.islamicstudies.info/prophetmuhammed' },
  { id: 43, title: 'القيم والأخلاق', description: 'اختر الاستجابة الأخلاقية الصحيحة', icon: '🤝', category: 'دين وقيم', difficulty: 'سهل', color: 'text-teal-700', bgGradient: 'from-green-400 to-teal-600', url: 'https://www.charactercounts.org' },
  { id: 44, title: 'حفظ القرآن', description: 'تمارين تساعدك على حفظ الآيات الكريمة', icon: '📿', category: 'دين وقيم', difficulty: 'متوسط', color: 'text-teal-700', bgGradient: 'from-teal-500 to-emerald-700', url: 'https://quran.com' },
  { id: 45, title: 'التربية المدنية', description: 'تعلّم حقوق وواجبات المواطن', icon: '🏫', category: 'دين وقيم', difficulty: 'سهل', color: 'text-teal-700', bgGradient: 'from-cyan-400 to-teal-600', url: 'https://www.icivics.org' },

  // لغات أجنبية
  { id: 46, title: 'كلمات إنجليزية', description: 'وسّع مفرداتك الإنجليزية يومياً', icon: '🇬🇧', category: 'لغات', difficulty: 'سهل', color: 'text-indigo-700', bgGradient: 'from-indigo-400 to-blue-600', url: 'https://www.vocabulary.com/play' },
  { id: 47, title: 'ترجمة سريعة', description: 'رجمة الجمل بين العربية والإنجليزية', icon: '🌐', category: 'لغات', difficulty: 'متوسط', color: 'text-indigo-700', bgGradient: 'from-blue-400 to-indigo-600', url: 'https://www.duolingo.com' },
  { id: 48, title: 'الفرنسية للمبتدئين', description: 'تعلّم أساسيات اللغة الفرنسية', icon: '🇫🇷', category: 'لغات', difficulty: 'سهل', color: 'text-indigo-700', bgGradient: 'from-sky-400 to-indigo-600', url: 'https://www.duolingo.com' },
  { id: 49, title: 'نطق صحيح', description: 'تحسين النطق والاستماع باللغة العربية', icon: '🗣️', category: 'لغات', difficulty: 'متوسط', color: 'text-indigo-700', bgGradient: 'from-indigo-500 to-blue-700', url: 'https://forvo.com' },
  { id: 50, title: 'تحدي اللغات', description: 'تنافس مع أصدقائك في مسابقة اللغات', icon: '🏆', category: 'لغات', difficulty: 'صعب', color: 'text-indigo-700', bgGradient: 'from-violet-400 to-indigo-600', url: 'https://quizlet.com/latest' },
]

const categories = ['الكل', ...Array.from(new Set(games.map((g) => g.category)))]

const difficultyColors: Record<string, string> = {
  سهل: 'bg-emerald-100 text-emerald-700',
  متوسط: 'bg-amber-100 text-amber-700',
  صعب: 'bg-rose-100 text-rose-700',
}

export default function GamesPage({ onSubscribe }: { onSubscribe: () => void }) {
  const { isPro } = useAuth()
  const [activeCategory, setActiveCategory] = useState('الكل')

  const filtered = activeCategory === 'الكل'
    ? games
    : games.filter((g) => g.category === activeCategory)

  function handlePlay(game: Game) {
    if (isPro) {
      window.open(game.url, '_blank', 'noopener,noreferrer')
    } else {
      onSubscribe()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-8 text-8xl">🎮</div>
          <div className="absolute bottom-4 right-12 text-6xl">🏆</div>
          <div className="absolute top-1/2 right-1/3 text-7xl -translate-y-1/2">🧩</div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Gamepad2 size={14} />
            <span className="text-xs font-semibold">الألعاب التعليمية التفاعلية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
            تعلّم وأنت تلعب<br />
            <span className="text-emerald-200">+50 لعبة تعليمية مميزة</span>
          </h2>
          <p className="text-emerald-100 text-base max-w-lg">
            اكتشف مجموعة متنوعة من الألعاب التعليمية المصممة لتنمية مهاراتك بطريقة ممتعة وتفاعلية
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-emerald-700">{games.length}</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">لعبة متاحة</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-amber-700">{categories.length - 1}</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">تصنيف تعليمي</div>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-rose-700">{games.filter(g => g.difficulty === 'صعب').length}</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">تحدي متقدم</div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
              activeCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden card-hover flex flex-col"
          >
            {/* Game banner */}
            <div className={`bg-gradient-to-br ${game.bgGradient} p-5 flex items-center justify-between relative`}>
              <span className="text-4xl">{game.icon}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[game.difficulty]}`}>
                {game.difficulty}
              </span>
              {!isPro && (
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Lock size={18} className="text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col flex-1">
              <span className="text-xs text-neutral-400 font-medium mb-1">{game.category}</span>
              <h3 className="text-sm font-bold text-neutral-800 mb-1 leading-snug">{game.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-3 flex-1">{game.description}</p>

              {isPro ? (
                <button
                  onClick={() => handlePlay(game)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <Play size={12} className="fill-white" />
                  العب الآن
                </button>
              ) : (
                <button
                  onClick={onSubscribe}
                  className="w-full bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <Lock size={12} />
                  اشترك للعب
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
