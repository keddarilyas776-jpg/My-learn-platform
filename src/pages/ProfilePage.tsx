import { useEffect, useState } from 'react'
import { Trophy, Zap, BookOpen, Star, TrendingUp, Calendar, Gamepad2, Loader as Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

type Stats = {
  completedCourses: number
  completedTests: number
  certificates: number
}

export default function ProfilePage() {
  const { user, profile } = useAuth()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (!user) return
    async function fetchStats() {
      const [testsResult, certsResult] = await Promise.all([
        supabase.from('user_tests').select('id', { count: 'exact', head: true }).eq('user_id', user!.id),
        supabase.from('user_certificates').select('id', { count: 'exact', head: true }).eq('user_id', user!.id),
      ])
      setStats({
        completedCourses: 0,
        completedTests: testsResult.count ?? 0,
        certificates: certsResult.count ?? 0,
      })
      setLoadingStats(false)
    }
    fetchStats()
  }, [user])

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-primary-500" />
      </div>
    )
  }

  const displayName = profile.display_name || user?.email?.split('@')[0] || '—'
  const avatarLetter = displayName[0]?.toUpperCase() ?? '?'
  const coins = profile.coins ?? 0
  const badge = profile.badge || 'طالب نشط'

  const xp = coins
  const xpMax = Math.ceil(xp / 500) * 500 || 500
  const xpPercent = Math.min(Math.round((xp / xpMax) * 100), 100)
  const level = Math.floor(xp / 500) + 1

  const statItems = [
    { label: 'كورسات مكتملة', value: String(stats?.completedCourses ?? 0), icon: <BookOpen size={16} className="text-primary-500" /> },
    { label: 'ساعات تعلم', value: '—', icon: <Calendar size={16} className="text-secondary-500" /> },
    { label: 'اختبارات مكتملة', value: String(stats?.completedTests ?? 0), icon: <Star size={16} className="text-amber-500" /> },
    { label: 'شهادات مكتسبة', value: String(stats?.certificates ?? 0), icon: <Trophy size={16} className="text-rose-500" /> },
    { label: 'نقاط المكافأة', value: coins.toLocaleString('ar-EG'), icon: <TrendingUp size={16} className="text-emerald-500" /> },
    { label: 'ألعاب تعليمية', value: '—', icon: <Gamepad2 size={16} className="text-orange-500" /> },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 mb-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-black text-white shadow-lg">
            {avatarLetter}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black">{displayName}</h2>
            <p className="text-primary-200 text-sm mt-1">{badge}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {badge}
              </span>
              {profile.is_pro && (
                <span className="bg-amber-400/30 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full">
                  PRO
                </span>
              )}
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-primary-200 mb-1.5">
            <span>المستوى {level}</span>
            <span>{xp.toLocaleString('ar-EG')} / {xpMax.toLocaleString('ar-EG')} نقطة XP</span>
          </div>
          <div className="bg-white/20 rounded-full h-2.5">
            <div className="bg-white h-2.5 rounded-full transition-all" style={{ width: `${xpPercent}%` }} />
          </div>
          <p className="text-xs text-primary-200 mt-1.5">
            {(xpMax - xp).toLocaleString('ar-EG')} نقطة للمستوى التالي
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {loadingStats
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-neutral-100 rounded-2xl p-4 text-center shadow-sm animate-pulse">
                <div className="h-5 w-8 bg-neutral-100 rounded mx-auto mb-1" />
                <div className="h-3 w-16 bg-neutral-100 rounded mx-auto" />
              </div>
            ))
          : statItems.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-neutral-100 rounded-2xl p-4 text-center shadow-sm card-hover"
              >
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <div className="text-xl font-black text-neutral-800">{stat.value}</div>
                <div className="text-xs text-neutral-500 mt-0.5 leading-snug">{stat.label}</div>
              </div>
            ))
        }
      </div>

      {/* Account Info */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
          <Zap size={18} className="text-amber-500" />
          معلومات الحساب
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-neutral-50">
            <span className="text-sm text-neutral-500">البريد الإلكتروني</span>
            <span className="text-sm font-medium text-neutral-800 dir-ltr">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-50">
            <span className="text-sm text-neutral-500">الاسم</span>
            <span className="text-sm font-medium text-neutral-800">{displayName}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-50">
            <span className="text-sm text-neutral-500">الشارة</span>
            <span className="text-sm font-medium text-neutral-800">{badge}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-neutral-500">نوع الحساب</span>
            <span className={`text-sm font-bold ${profile.is_pro ? 'text-amber-600' : 'text-neutral-600'}`}>
              {profile.is_pro ? 'PRO' : 'مجاني'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
