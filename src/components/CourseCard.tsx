import { useState } from 'react'
import { BookOpen, Star, Play, X, Send, Award, Lock } from 'lucide-react'
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
  const [isPremium, setIsPremium] = useState(false) // افتراضياً المستخدم مجاني

  const colors = colorMap[course.color] || colorMap.blue

  const getEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
  }

  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault() // منع الانتقال الخارجي تماماً
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
      alert('تم إرسال تقييمك بنجاح!')
      setComment('')
    } catch (err) {
      alert('حدث خطأ في الإرسال')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300" dir="rtl">
        {/* Banner */}
        <div className={`bg-gradient-to-br ${colors.bg} p-6 flex items-center justify-between relative`}>
          <span className="text-5xl drop-shadow-md">{course.icon}</span>
          <div className="flex flex-col items-end gap-2">
             <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm uppercase tracking-tighter">
              {course.difficulty}
            </span>
            {course.is_premium && <Lock size={16} className="text-amber-300" />}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 text-right">
          <h3 className="text-lg font-black text-neutral-800 mb-2 leading-tight">{course.title}</h3>
          <p className="text-xs text-neutral-500 mb-5 leading-relaxed flex-1">{course.description}</p>
          
          <div className="flex items-center justify-between mb-6 bg-neutral-50 p-3 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-600">
              <BookOpen size={14} className="text-blue-500" />
              <span>{course.lessons_count} دروس</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-neutral-700">{course.rating}</span>
            </div>
          </div>

          <button 
            onClick={handleStart} 
            className={`w-full ${colors.btn} text-white text-sm font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2`}
          >
            <Play size={16} className="fill-white" />
            إبدأ الدرس الآن
          </button>
        </div>
      </div>

      {/* Modal النافذة المنبثقة */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-2 sm:p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden relative shadow-2xl my-auto border border-white/20">
            
            {/* Modal Header */}
            <div className="p-5 flex justify-between items-center border-b bg-white sticky top-0 z-10">
              <button 
                onClick={() => setShowModal(false)}
                className="bg-neutral-100 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="text-right">
                <h3 className="font-black text-neutral-800 text-sm sm:text-base">{course.title}</h3>
                <p className="text-[10px] text-emerald-600 font-bold">أنت تشاهد الآن على TaalimiLearn</p>
              </div>
            </div>
            
            {/* Video Player */}
            <div className="relative pt-[56.25%] bg-black group">
              <iframe
                src={getEmbedUrl(course.youtube_url)}
                className="absolute top-0 left-0 w-full h-full shadow-inner"
                allow="autoplay; fullscreen"
              />
            </div>

            {/* User Interaction Area */}
            <div className="p-6 bg-neutral-50 text-right space-y-6" dir="rtl">
               
               {/* Progress & Certificate Hint */}
              <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex items-center justify-between">
                <div className="flex-1 ml-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-bold text-neutral-400">تقدمك في الدورة</span>
                    <span className="text-xs font-black text-emerald-500">60%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[60%]" />
                  </div>
                </div>
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
                  <Award size={24} className="text-amber-500" />
                </div>
              </div>

              {/* Review Form */}
              <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                <h4 className="text-sm font-black text-neutral-800 mb-4 flex items-center gap-2">
                  <span className="bg-amber-100 p-1.5 rounded-lg text-amber-600 font-bold text-xs">جديد</span>
                  ما تقييمك لهذا المحتوى؟
                </h4>
                
                <div className="flex gap-2 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button 
                      key={s} 
                      onClick={() => setUserRating(s)} 
                      className={`text-3xl transition-transform active:scale-125 ${userRating >= s ? 'text-amber-400' : 'text-neutral-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea 
                  className="w-full border-2 border-neutral-50 rounded-2xl p-4 text-xs mb-4 outline-none focus:border-emerald-500 focus:bg-white bg-neutral-50 transition-all"
                  placeholder="أخبرنا عن تجربتك.. هل كان الشرح واضحاً؟"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={submitReview}
                    disabled={isSubmitting}
                    className="flex-1 bg-neutral-900 text-white py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
                    <Send size={14} />
                  </button>
                  
                  {!isPremium && (
                    <button className="flex-1 bg-amber-500 text-white py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all">
                      تفعيل الشهادة (1$)
                      <Award size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
