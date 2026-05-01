import { CheckCircle2, Clock, Trophy, TrendingUp } from 'lucide-react'

type TestResult = {
  id: number
  name: string
  score: number
  date: string
  category: string
  icon: string
}

const sampleTests: TestResult[] = [
  { id: 1, name: 'اختبار البرمجة الأساسية', score: 90, date: '2026-04-28', category: 'تكنولوجيا', icon: '💻' },
  { id: 2, name: 'اختبار الرياضيات المتقدم', score: 78, date: '2026-04-25', category: 'علوم', icon: '🔢' },
  { id: 3, name: 'اختبار اللغة العربية', score: 95, date: '2026-04-20', category: 'أدب', icon: '📖' },
  { id: 4, name: 'اختبار الفيزياء', score: 82, date: '2026-04-18', category: 'علوم', icon: '⚗️' },
  { id: 5, name: 'اختبار التاريخ', score: 88, date: '2026-04-15', category: 'تاريخ', icon: '🏛️' },
  { id: 6, name: 'اختبار الجغرافيا', score: 74, date: '2026-04-12', category: 'جغرافيا', icon: '🌍' },
  { id: 7, name: 'اختبار الفن والإبداع', score: 92, date: '2026-04-10', category: 'فنون', icon: '🎨' },
  { id: 8, name: 'اختبار الكيمياء', score: 80, date: '2026-04-08', category: 'علوم', icon: '🧪' },
  { id: 9, name: 'اختبار علم النفس', score: 87, date: '2026-04-05', category: 'نفس', icon: '🧠' },
  { id: 10, name: 'اختبار الاقتصاد', score: 71, date: '2026-04-02', category: 'اقتصاد', icon: '📊' },
  { id: 11, name: 'اختبار الهندسة المعمارية', score: 93, date: '2026-03-30', category: 'هندسة', icon: '🏗️' },
  { id: 12, name: 'اختبار العلوم البيئية', score: 85, date: '2026-03-27', category: 'بيئة', icon: '🌿' },
]

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
  const avgScore = Math.round(sampleTests.reduce((sum, t) => sum + t.score, 0) / sampleTests.length)
  const passed = sampleTests.filter((t) => t.score >= 75).length

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-neutral-800 mb-1">الاختبارات</h2>
        <p className="text-neutral-500 text-sm">تتبّع أداؤك في جميع الاختبارات المكتملة</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-primary-700">{sampleTests.length}</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">اختبار مكتمل</div>
          <CheckCircle2 size={20} className="text-primary-500 mx-auto mt-2" />
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-secondary-700">{avgScore}%</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">معدل النجاح</div>
          <TrendingUp size={20} className="text-secondary-500 mx-auto mt-2" />
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-amber-700">{passed}</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">اختبار ناجح</div>
          <Trophy size={20} className="text-amber-500 mx-auto mt-2" />
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-rose-700">85%</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">نسبة النجاح</div>
          <Clock size={20} className="text-rose-500 mx-auto mt-2" />
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 mb-6 shadow-sm">
        <h3 className="font-bold text-neutral-800 mb-4">نظرة عامة على الأداء</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" strokeWidth="3"
                strokeDasharray={`${85 * 1.005} ${100 - 85 * 1.005}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-neutral-800">85%</span>
            </div>
          </div>
          <div>
            <p className="font-bold text-neutral-800">معدل النجاح الكلي</p>
            <p className="text-sm text-neutral-500">أداء ممتاز! استمر في التقدم</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-sm border-t pt-4">
          <div>
            <div className="w-3 h-3 bg-secondary-500 rounded-full mx-auto mb-1" />
            <span className="text-neutral-500">90%+ ممتاز</span>
          </div>
          <div>
            <div className="w-3 h-3 bg-primary-500 rounded-full mx-auto mb-1" />
            <span className="text-neutral-500">75-89% جيد</span>
          </div>
          <div>
            <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-1" />
            <span className="text-neutral-500">أقل من 75%</span>
          </div>
        </div>
      </div>

      {/* Test List */}
      <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="font-bold text-neutral-800">سجل الاختبارات ({sampleTests.length})</h3>
        </div>
        <div className="divide-y divide-neutral-50">
          {sampleTests.map((test) => (
            <div key={test.id} className="px-5 py-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
              <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {test.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-neutral-800 text-sm leading-snug">{test.name}</p>
                  <span className="text-xs text-neutral-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                    {new Date(test.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <ScoreBar score={test.score} />
                </div>
                <span className="text-xs text-neutral-400">{test.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
