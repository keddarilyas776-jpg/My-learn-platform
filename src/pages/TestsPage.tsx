import { CheckCircle2, Clock, Trophy, TrendingUp } from 'lucide-react'

type TestResult = {
  id: number
  name: string
  score: number
  date: string
  category: string
  icon: string
}

// تم تفريغ قائمة الاختبارات لتبدأ من الصفر
const sampleTests: TestResult[] = []

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 90 ? 'bg-secondary-500' :
    score >= 75 ? 'bg-primary-500' :
    'bg-amber-500'

  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="flex-1 bg-neutral-100 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-bold text-neutral-700 w-10 text-left">{score}%</span>
    </div>
  )
}

export default function TestsPage() {
  // الحسابات ستعطي 0 تلقائياً لأن القائمة فارغة
  const avgScore = sampleTests.length > 0 
    ? Math.round(sampleTests.reduce((sum, t) => sum + t.score, 0) / sampleTests.length) 
    : 0
  const passed = sampleTests.filter((t) => t.score >= 75).length

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-neutral-800 mb-1">الاختبارات</h2>
        <p className="text-neutral-500 text-sm">تتبّع أداؤك في جميع الاختبارات المكتملة</p>
      </div>

      {/* Summary Cards - تم تصفير القيم */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-primary-700">0</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">اختبار مكتمل</div>
          <CheckCircle2 size={20} className="text-primary-500 mx-auto mt-2" />
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-secondary-700">0%</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">معدل النجاح</div>
          <TrendingUp size={20} className="text-secondary-500 mx-auto mt-2" />
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-amber-700">0</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">اختبار ناجح</div>
          <Trophy size={20} className="text-amber-500 mx-auto mt-2" />
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-rose-700">0%</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">نسبة النجاح</div>
          <Clock size={20} className="text-rose-500 mx-auto mt-2" />
        </div>
      </div>

      {/* Progress Overview - تم تصفير الرسم البياني */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 mb-6 shadow-sm">
        <h3 className="font-bold text-neutral-800 mb-4">نظرة عامة على الأداء</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" strokeWidth="3"
                strokeDasharray="0 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-neutral-800">0%</span>
            </div>
          </div>
          <div>
            <p className="font-bold text-neutral-800">معدل النجاح الكلي</p>
            <p className="text-sm text-neutral-500">ابدأ أول اختبار لك الآن!</p>
          </div>
        </div>
      </div>

      {/* Test List - حالة القائمة الفارغة */}
      <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="font-bold text-neutral-800">سجل الاختبارات (0)</h3>
        </div>
        {sampleTests.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-neutral-400 text-sm">لا توجد اختبارات مسجلة حالياً.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-50">
            {/* القائمة ستظهر هنا تلقائياً عند إضافة بيانات */}
          </div>
        )}
      </div>
    </div>
  )
}
