import { BookOpen, Star, Play } from 'lucide-react'
import type { Course } from '../lib/supabase'

type Props = {
  course: Course
}

const colorMap: Record<string, { bg: string; badge: string; btn: string }> = {
  blue: {
    bg: 'from-blue-500 to-blue-700',
    badge: 'bg-blue-100 text-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  green: {
    bg: 'from-emerald-500 to-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
  },
  cyan: {
    bg: 'from-cyan-500 to-cyan-700',
    badge: 'bg-cyan-100 text-cyan-700',
    btn: 'bg-cyan-600 hover:bg-cyan-700',
  },
  orange: {
    bg: 'from-orange-500 to-orange-700',
    badge: 'bg-orange-100 text-orange-700',
    btn: 'bg-orange-600 hover:bg-orange-700',
  },
  emerald: {
    bg: 'from-teal-500 to-teal-700',
    badge: 'bg-teal-100 text-teal-700',
    btn: 'bg-teal-600 hover:bg-teal-700',
  },
  rose: {
    bg: 'from-rose-500 to-rose-700',
    badge: 'bg-rose-100 text-rose-700',
    btn: 'bg-rose-600 hover:bg-rose-700',
  },
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}
        />
      ))}
      <span className="text-xs text-neutral-500 mr-1">{rating}</span>
    </div>
  )
}

export default function CourseCard({ course }: Props) {
  const colors = colorMap[course.color] || colorMap.blue

  const handleStart = () => {
    window.open(course.youtube_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden card-hover flex flex-col">
      {/* Card header banner */}
      <div className={`bg-gradient-to-br ${colors.bg} p-5 flex items-center justify-between`}>
        <span className="text-4xl">{course.icon}</span>
        <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
          {course.difficulty}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-neutral-800 mb-1 leading-snug">{course.title}</h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-3 flex-1">{course.description}</p>

        {/* Meta */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <BookOpen size={13} />
            <span>{course.lessons_count} درس</span>
          </div>
          <Stars rating={course.rating} />
        </div>

        {/* Difficulty badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
            {course.difficulty}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          className={`w-full ${colors.btn} text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95`}
        >
          <Play size={14} className="fill-white" />
          ابدأ الآن
        </button>
      </div>
    </div>
  )
}
