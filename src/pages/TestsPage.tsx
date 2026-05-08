              import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, Trophy, TrendingUp, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase' // تأكد من أن مسار ملف supabase صحيح

type TestResult = {
  id: string
  score: number
  completed_at: string
  quizzes: {
    title: string
    category: string
  }
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? 'bg-green-500' : score >= 75 ? 'bg-blue-500' : 'bg-amber-500'
  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="flex-1 bg-neutral-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-bold text-neutral-700 w-10 text-left">{score}%</span>
    </div>
  )
}

export default function TestsPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResults() {
      try {
        const { data, error } = await supabase
          .from('user_tests')
          .select(`
            id,
            score,
            completed_at,
            quizzes (
              title,
              category
            )
          `)
          .order('completed_at', { ascending: false })

        if (error) throw error
        setResults(data || [])
      } catch (err) {
        console.error('Error fetching tests:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  const avgScore = results.length > 0 
    ? Math.round(results.reduce((sum, t) => sum + t.score, 0) / results.length) 
    : 0
  const passedCount = results.filter(t => t.score >= 75).length
  const successRate = results.length > 0 ? Math.round((passedCount / results.length) * 100) : 0

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="text-neutral-500">جاري تحميل نتائجك...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6 text-right" dir="rtl">
        <h2 className="text-2xl font-black text-neutral-800 mb-1">سجل الاختبارات</h2>
        <p className="text-neutral-500 text-sm">تتبّع أداؤك في جميع الاختبارات المكتملة</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" dir="rtl">
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-primary-700">{results.length}</div>
          <div className="text-xs text-neutral-600 mt-1">اختبار مكتمل</div>
          <CheckCircle2 size={20} className="text-primary-500 mx-auto mt-2" />
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-secondary-700">{avgScore}%</div>
          <div className="text-xs text-neutral-600 mt-1">متوسط الدرجات</div>
          <TrendingUp size={20} className="text-secondary-500 mx-auto mt-2" />
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-amber-700">{passedCount}</div>
          <div className="text-xs text-neutral-600 mt-1">اختبار ناجح</div>
          <Trophy size={20} className="text-amber-500 mx-auto mt-2" />
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-rose-700">{successRate}%</div>
          <div className="text-xs text-neutral-600 mt-1">نسبة النجاح</div>
          <Clock size={20} className="text-rose-500 mx-auto mt-2" />
        </div>
      </div>

      {/* Test List Section */}
      <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden" dir="rtl">
        <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
          <h3 className="font-bold text-neutral-800">تفاصيل الاختبارات ({results.length})</h3>
        </div>

        {results.length === 0 ? (
          <div className="p-12 text-center">
            <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-neutral-400" size={32} />
            </div>
            <p className="text-neutral-500 font-medium">لا توجد اختبارات مسجلة حالياً.</p>
            <p className="text-neutral-400 text-xs mt-1">ابدأ بحل أول اختبار لتظهر نتائجك هنا</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-50">
            {results.map((test) => (
              <div key={test.id} className="p-6 hover:bg-neutral-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-neutral-800 mb-1">{test.quizzes?.title || 'اختبار غير معروف'}</h4>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
                        {test.quizzes?.category || 'عام'}
                      </span>
                      <span>{new Date(test.completed_at).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                  <ScoreBar score={test.score} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
