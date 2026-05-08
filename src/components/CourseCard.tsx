import { useState } from 'react'
import { BookOpen, Star, Play, X, CheckCircle, Send } from 'lucide-react'
import ReactPlayer from 'react-player/youtube'
import { supabase } from '../lib/supabase'
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

export default function CourseCard({ course, onSubscribe }: Props) {
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [played, setPlayed] = useState(0)
  const [userRating, setUserRating] = useState(5)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const submitReview = async () => {
    if (!comment.trim()) return
    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('course_reviews')
        .insert([{ 
          course_id: course.id, 
          user_id: user?.id, 
          rating: userRating, 
          comment: comment 
        }])

      if (error) throw error
      alert('تم إرسال تقييمك بنجاح!')
      setComment('')
    } catch (err) {
      alert('حدث خطأ أو ربما قمت بالتقييم مسبقاً')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden card-hover flex flex-col h-full" dir="rtl">
        <div className={`bg-gradient-to-br ${colors.bg} p-5 flex items-center justify-between`}>
          <span className="text-4xl">{course.icon}</span>
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {course.difficulty}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1 text-right">
          <h3 className="text-base font-bold text-neutral-800 mb-1 leading-snug">{course.title}</h3>
          <p className="text-sm text-neutral-500 leading-relaxed mb-3 flex-1">{course.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <BookOpen size={13} />
              <span>{course.lessons_count} درس</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-neutral-600">{course.rating}</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className={`w-full ${colors.btn} text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95`}
          >
            <Play size={14} className="fill-white" />
            إبدأ التعلم
          </button>
        </div>
      </div>

      {/* Modal النافذة المنبثقة */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-neutral-900/95 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-auto">
            
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-neutral-100">
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-neutral-600 p-1">
                <X size={24} />
              </button>
              <h3 className="font-bold text-neutral-800 truncate px-4">{course.title}</h3>
            </div>

            {/* Video Player */}
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

            {/* Progress & Feedback Section */}
            <div className="p-6 bg-neutral-50 text-right" dir="rtl">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-600">تقدمك في المشاهدة</span>
                  <span className="text-xs font-black text-emerald-600">{Math.round(played * 100)}%</span>
                </div>
                <div className="h-2.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${played * 100}%` }}
                  />
                </div>
              </div>

              {/* Review Form */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
                <h4 className="text-sm font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  شاركنا رأيك في هذا الدرس
                </h4>
                
                {/* Stars Selection */}
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      onClick={() => setUserRating(star)}
                      className={`text-2xl transition-transform active:scale-110 ${userRating >= star ? 'text-amber-400' : 'text-neutral-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea 
                  className="w-full border border-neutral-200 rounded-xl p-3 text-sm mb-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="ما الذي أعجبك في هذا الدرس؟"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button 
                  onClick={submitReview}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send size={14} />
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
                }
          
