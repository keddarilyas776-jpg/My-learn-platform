import { useState } from 'react'
import { BookOpen, Star, Play, X, CheckCircle } from 'lucide-react'
import ReactPlayer from 'react-player/youtube'
import type { Course } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

type Props = {
  course: Course
  onSubscribe: () => void
}

const colorMap: Record<string, { bg: string; badge: string; btn: string }> = {
  blue: { bg: 'from-blue-500 to-blue-700', badge: 'bg-blue-100 text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700' },
  green: { bg: 'from-emerald-500 to-emerald-700', badge: 'bg-emerald-100 text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  cyan: { bg: 'from-cyan-500 to-cyan-700', badge: 'bg-cyan-100 text-cyan-700', btn: 'bg-cyan-600 hover:bg-cyan-700' },
  orange: { bg: 'from-orange-500 to-orange-700', badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700' },
  emerald: { bg: 'from-teal-500 to-teal-700', badge: 'bg-teal-100 text-teal-700', btn: 'bg-teal-600 hover:bg-teal-700' },
  rose: { bg: 'from-rose-500 to-rose-700', badge: 'bg-rose-100 text-rose-700', btn: 'bg-rose-600 hover:bg-rose-700' },
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

export default function CourseCard({ course, onSubscribe }: Props) {
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [played, setPlayed] = useState(0) // نسبة المشاهدة من 0 إلى 1
  const colors = colorMap[course.color] || colorMap.blue

  const handleStart = () => {
    if (!user) {
      window.location.href = '/auth'
      return
    }
    setShowModal(true)
  }

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played)
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden card-hover flex flex-col h-full">
        {/* Card header banner */}
        <div className={`bg-gradient-to-br ${colors.bg} p-5 flex items-center justify-between relative`}>
          <span className="text-4xl">{course.icon}</span>
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {course.difficulty}
          </span>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1 text-right" dir="rtl">
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
          <div className="flex mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
              {course.difficulty}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={handleStart}
            className={`w-full ${colors.btn} text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-lg shadow-neutral-100`}
          >
            <Play size={14} className="fill-white" />
            إبدأ الدرس الآن
          </button>
        </div>
      </div>

      {/* Modal النافذة المنبثقة */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay الخلفية */}
          <div 
            className="absolute inset-0 bg-neutral-900/90 backdrop-blur-sm" 
            onClick={() => setShowModal(false)} 
          />
          
          {/* Modal Content محتوى النافذة */}
          <div className="bg-neutral-950 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-white/10">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-20">
              <button 
                onClick={() => setShowModal(false)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium hidden sm:block">{course.title}</span>
                <div className="bg-emerald-500 p-1 rounded-full">
                  <CheckCircle size={14} />
                </div>
              </div>
            </div>

            {/* Video Player المشغل */}
            <div className="relative pt-[56.25%] bg-black">
              <ReactPlayer
                url={course.youtube_url}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                onProgress={handleProgress}
                className="absolute top-0 left-0"
              />
            </div>

            {/* Progress Bar & Footer */}
            <div className="bg-neutral-900 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-neutral-400">تقدمك في الدرس</span>
                <span className="text-xs font-bold text-emerald-400">{Math.round(played * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 ease-out" 
                  style={{ width: `${played * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-neutral-500 mt-3 text-center uppercase tracking-widest">
                سيتم حفظ تقدمك تلقائياً عند إغلاق النافذة
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
            }
                
