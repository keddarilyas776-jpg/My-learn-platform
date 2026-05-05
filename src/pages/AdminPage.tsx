import { useEffect, useState } from 'react'
import { Users, BookOpen, ShieldCheck, TrendingUp, Crown, CircleCheck as CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { UserProfile } from '../context/AuthContext'

type CourseRow = {
  id: string
  title: string
  category: string
  difficulty: string
  lessons_count: number
  rating: number
}

type Stats = {
  totalUsers: number
  proUsers: number
  totalCourses: number
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [courses, setCourses] = useState<CourseRow[]>([])
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, proUsers: 0, totalCourses: 0 })
  const [tab, setTab] = useState<'overview' | 'users' | 'courses'>('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: usersData }, { data: coursesData }] = await Promise.all([
        supabase.from('users_profile').select('id, display_name, coins, avatar_url, badge, is_pro, is_subscribed, is_admin, created_at'),
        supabase.from('courses').select('id, title, category, difficulty, lessons_count, rating').order('created_at'),
      ])

      const u = (usersData as UserProfile[]) ?? []
      const c = (coursesData as CourseRow[]) ?? []

      setUsers(u)
      setCourses(c)
      setStats({
        totalUsers: u.length,
        proUsers: u.filter((x) => x.is_subscribed || x.is_pro).length,
        totalCourses: c.length,
      })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8" dir="rtl">
      {/* Page title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
          <ShieldCheck size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black text-neutral-800">لوحة الإدارة</h1>
          <p className="text-xs text-neutral-500">منصة التعلم التفاعلي</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200">
        {([['overview', 'نظرة عامة'], ['users', 'المستخدمون'], ['courses', 'الكورسات']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              tab === key
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<Users size={22} className="text-blue-600" />}
            bg="bg-blue-50"
            label="إجمالي المستخدمين"
            value={stats.totalUsers}
          />
          <StatCard
            icon={<Crown size={22} className="text-amber-500" />}
            bg="bg-amber-50"
            label="مشتركون PRO"
            value={stats.proUsers}
          />
          <StatCard
            icon={<BookOpen size={22} className="text-emerald-600" />}
            bg="bg-emerald-50"
            label="الكورسات المتاحة"
            value={stats.totalCourses}
          />
        </div>
      )}

      {/* Users table */}
      {tab === 'users' && (
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary-500" />
            <span className="font-bold text-sm text-neutral-700">قائمة المستخدمين ({users.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 text-neutral-500 text-xs">
                  <th className="px-5 py-3 text-right font-semibold">الاسم</th>
                  <th className="px-5 py-3 text-right font-semibold">الوسام</th>
                  <th className="px-5 py-3 text-right font-semibold">النقاط</th>
                  <th className="px-5 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-5 py-3 text-right font-semibold">الصلاحية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-neutral-800">{u.display_name}</td>
                    <td className="px-5 py-3 text-neutral-500">{u.badge}</td>
                    <td className="px-5 py-3 text-neutral-600">{u.coins.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      {(u.is_subscribed || u.is_pro) ? (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          <Crown size={10} /> PRO
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-400">مجاني</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {u.is_admin ? (
                        <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          <ShieldCheck size={10} /> مدير
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-400">مستخدم</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-center text-neutral-400 text-sm py-10">لا يوجد مستخدمون بعد</p>
            )}
          </div>
        </div>
      )}

      {/* Courses table */}
      {tab === 'courses' && (
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-2">
            <BookOpen size={16} className="text-emerald-500" />
            <span className="font-bold text-sm text-neutral-700">قائمة الكورسات ({courses.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 text-neutral-500 text-xs">
                  <th className="px-5 py-3 text-right font-semibold">العنوان</th>
                  <th className="px-5 py-3 text-right font-semibold">التصنيف</th>
                  <th className="px-5 py-3 text-right font-semibold">المستوى</th>
                  <th className="px-5 py-3 text-right font-semibold">الدروس</th>
                  <th className="px-5 py-3 text-right font-semibold">التقييم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-neutral-800">{c.title}</td>
                    <td className="px-5 py-3 text-neutral-500">{c.category}</td>
                    <td className="px-5 py-3">
                      <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full">{c.difficulty}</span>
                    </td>
                    <td className="px-5 py-3 text-neutral-600">{c.lessons_count}</td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <CheckCircle2 size={12} />
                        {c.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {courses.length === 0 && (
              <p className="text-center text-neutral-400 text-sm py-10">لا توجد كورسات بعد</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, bg, label, value }: { icon: React.ReactNode; bg: string; label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-neutral-800">{value}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
      </div>
    </div>
  )
}
