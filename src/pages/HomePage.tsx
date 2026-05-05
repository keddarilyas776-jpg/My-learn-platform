import { useEffect, useState } from 'react'
import { supabase, type Course } from '../lib/supabase'
import { creativeCategories, professionalCategories } from '../data/categories'
import StatsSection from '../components/StatsSection'
import CategoryCard from '../components/CategoryCard'
import CourseCard from '../components/CourseCard'
import { Search } from 'lucide-react'

type Props = {
  onSubscribe: () => void
}

export default function HomePage({ onSubscribe }: Props) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchCourses() {
      const { data } = await supabase.from('courses').select('*').order('created_at')
      if (data) setCourses(data)
      setLoading(false)
    }
    fetchCourses()
  }, [])

  const filtered = courses.filter(
    (c) =>
      !searchQuery ||
      c.title.includes(searchQuery) ||
      c.description.includes(searchQuery) ||
      c.sub_category.includes(searchQuery)
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-8 text-8xl">📚</div>
          <div className="absolute bottom-4 right-12 text-6xl">🎓</div>
          <div className="absolute top-1/2 left-1/2 text-7xl -translate-x-1/2 -translate-y-1/2">✨</div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold">🌟 منصة التعلم التفاعلي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
            تعلّم وطوّر مهاراتك<br />
            <span className="text-primary-200">بطريقة ممتعة وتفاعلية</span>
          </h2>
          <p className="text-primary-100 text-base mb-6 max-w-lg">
            اكتشف عالماً من المعرفة مع أكثر من 25 كورس متخصص وأكثر من 150 اختبار تفاعلي
          </p>
          {/* Search */}
          <div className="relative max-w-md">
            <Search size={18} className="absolute top-1/2 -translate-y-1/2 right-4 text-neutral-400" />
            <input
              type="text"
              placeholder="ابحث عن كورس أو مجال..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-neutral-800 rounded-xl pr-11 pl-4 py-3 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-neutral-400"
              dir="rtl"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsSection />

      {/* Creative Talents */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
          <div>
            <h2 className="text-xl font-black text-neutral-800">المواهب الإبداعية</h2>
            <p className="text-xs text-neutral-500">اكتشف وطوّر مواهبك الإبداعية</p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {creativeCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} onSubscribe={onSubscribe} />
          ))}
        </div>
      </section>

      {/* Professional Skills */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-8 bg-primary-500 rounded-full" />
          <div>
            <h2 className="text-xl font-black text-neutral-800">المهارات المهنية</h2>
            <p className="text-xs text-neutral-500">طوّر مهاراتك المهنية والتقنية</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {professionalCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} onSubscribe={onSubscribe} />
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-secondary-500 rounded-full" />
            <div>
              <h2 className="text-xl font-black text-neutral-800">الكورسات المتاحة</h2>
              <p className="text-xs text-neutral-500">
                {filtered.length} كورس متاح لك الآن
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-100">
                <div className="skeleton h-24" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 rounded-lg w-3/4" />
                  <div className="skeleton h-4 rounded-lg w-full" />
                  <div className="skeleton h-4 rounded-lg w-2/3" />
                  <div className="skeleton h-10 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-neutral-500 font-medium">لا توجد نتائج لـ "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} onSubscribe={onSubscribe} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-4 pt-5 pb-2 text-center">
        <p className="text-xs text-neutral-400 font-medium tracking-wide">
          إدارة المنصة: قدار إلياس &amp; ياسين أحمد الجارحي
        </p>
      </footer>
    </div>
  )
}
