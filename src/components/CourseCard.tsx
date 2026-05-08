import { useState } from 'react'
import { BookOpen, Star, Play, X, Send } from 'lucide-react'
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
  const [userRating, setUserRating] = useState(5)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const colors = colorMap[course.color] || colorMap.blue

  // تحويل رابط يوتيوب العادي إلى رابط Embed يعمل داخل الموقع
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }

  const handleStart = () => {
    if (!user) {
      window.location.href = '/auth'
      return
    }
    setShowModal(true)
  }

  const submitReview = async () => {
    if (!comment.trim()) return
    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('course_reviews')
        .insert([{ course_id: course.id, user_id: user?.id, rating: userRating, comment: comment }])
      if (error) throw error
      alert('تم إرسال تقييمك!')
      setComment('')
    } catch (err) {
      alert('حدث خطأ في الإرسال')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col h-full" dir="rtl">
        <div className={`bg-gradient-to-br ${colors.bg} p-5 flex items-center justify-between`}>
          <span className="text-4xl">{course.icon}</span>
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">{course.difficulty}</span>
        </div>
        <div className="p-5 flex flex-col flex-1 text-right">
          <h3 className="text-base font-bold text-neutral-800 mb-1">{course.title}</h3>
          <p className="text-sm text-neutral-500 mb-3 flex-1">{course.description}</p>
          <button onClick={handleStart} className={`w-full ${colors.btn} text-white text-sm font-bold py-3 rounded-xl transition-all active:scale-95`}>
            إبدأ التعلم
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden relative my-auto">
            <div className="p-4 flex justify-between items-center border-b">
              <button onClick={() => setShowModal(false)}><X size={24} /></button>
              <h3 className="font-bold text-sm truncate">{course.title}</h3>
            </div>
            
            {/* مشغل فيديو عادي لا يحتاج مكتبات خارجية */}
            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={getEmbedUrl(course.youtube_url)}
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; fullscreen"
              />
            </div>

            <div className="p-4 bg-neutral-50 text-right" dir="rtl">
               {/* شريط تقدم "ثابت" للتجربة حالياً */}
              <div className="mb-6">
                <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%]" /> 
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">شريط التقدم يعمل عند المشاهدة الكاملة</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-neutral-200">
                <h4 className="text-xs font-bold mb-3">ما رأيك في الدرس؟</h4>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setUserRating(s)} className={`text-xl ${userRating >= s ? 'text-amber-400' : 'text-neutral-200'}`}>★</button>
                  ))}
                </div>
                <textarea 
                  className="w-full border rounded-lg p-2 text-xs mb-3 outline-none focus:border-emerald-500"
                  placeholder="اكتب تعليقك..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button 
                  onClick={submitReview}
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Send size={12} /> إرسال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
