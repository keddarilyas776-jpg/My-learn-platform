import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Counts = {
  courses: number
  quizzes: number
  games: number
  students: number
}

type StatConfig = {
  key: keyof Counts
  label: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
}

const statConfigs: StatConfig[] = [
  {
    key: 'courses',
    label: 'كورس متاح',
    icon: '📚',
    color: 'text-primary-700',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
  },
  {
    key: 'quizzes',
    label: 'اختبار تفاعلي',
    icon: '📝',
    color: 'text-secondary-700',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-200',
  },
  {
    key: 'games',
    label: 'لعبة تعليمية',
    icon: '🎮',
    color: 'text-accent-700',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-200',
  },
  {
    key: 'students',
    label: 'طالب نشط',
    icon: '👨‍🎓',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
]

function formatCount(n: number): string {
  if (n === 0) return '0'
  return `+${n.toLocaleString('ar-EG')}`
}

export default function StatsSection() {
  const [counts, setCounts] = useState<Counts>({ courses: 0, quizzes: 0, games: 0, students: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      const [coursesRes, quizzesRes, gamesRes, studentsRes] = await Promise.all([
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase.from('quizzes').select('id', { count: 'exact', head: true }),
        supabase.from('games').select('id', { count: 'exact', head: true }),
        supabase.from('users_profile').select('id', { count: 'exact', head: true }),
      ])

      setCounts({
        courses:  coursesRes.count  ?? 0,
        quizzes:  quizzesRes.count  ?? 0,
        games:    gamesRes.count    ?? 0,
        students: studentsRes.count ?? 0,
      })
      setLoading(false)
    }

    fetchCounts()
  }, [])

  return (
    <section className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statConfigs.map((stat) => (
          <div
            key={stat.key}
            className={`${stat.bgColor} border ${stat.borderColor} rounded-2xl p-5 text-center card-hover cursor-default`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            {loading ? (
              <div className="skeleton h-8 w-16 rounded-lg mx-auto mb-1" />
            ) : (
              <div className={`text-3xl font-black ${stat.color} leading-none mb-1`}>
                {formatCount(counts[stat.key])}
              </div>
            )}
            <div className="text-sm font-medium text-neutral-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
