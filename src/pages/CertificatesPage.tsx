import { useEffect, useState } from 'react'
import { Award, Download, Share2, Calendar, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

type Certificate = {
  id: string
  issued_at: string
  quizzes: {
    title: string
    category: string
  }
}

export default function CertificatesPage() {
  const { profile, user } = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const studentName = profile?.display_name || 'الطالب الكريم'

  useEffect(() => {
    async function fetchCertificates() {
      if (!user) return
      try {
        const { data, error } = await supabase
          .from('user_certificates')
          .select(`
            id,
            issued_at,
            quizzes (
              title,
              category
            )
          `)
          .eq('user_id', user.id)

        if (error) throw error
        setCertificates(data || [])
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCertificates()
  }, [user])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-right" dir="rtl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-neutral-800 mb-1">الشهادات</h2>
        <p className="text-neutral-500 text-sm">شهاداتك المكتسبة وإنجازاتك على المنصة</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-amber-700">{certificates.length}</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">شهادة مكتسبة</div>
        </div>
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-primary-700">0</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">قيد الإنجاز</div>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-secondary-700">
            {certificates.length > 0 ? '100%' : '0%'}
          </div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">معدل الإكمال</div>
        </div>
      </div>

      <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
        <Award size={18} className="text-amber-500" />
        الشهادات المكتسبة
      </h3>
      
      {loading ? (
        <div className="p-10 text-center bg-white rounded-2xl border border-neutral-100">
           <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
           <p className="text-neutral-500">جاري جلب شهاداتك...</p>
        </div>
      ) : certificates.length === 0 ? (
        <div className="bg-white border border-dashed border-neutral-200 rounded-2xl p-10 text-center mb-8">
          <p className="text-neutral-400 text-sm">لم تحصل على أي شهادة بعد. أكمل اختباراً بنجاح للحصول عليها!</p>
        </div>
      ) : (
        <div className="grid gap-5 mb-8">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-neutral-800">{cert.quizzes.title}</h4>
                <p className="text-xs text-neutral-500">تاريخ الإصدار: {new Date(cert.issued_at).toLocaleDateString('ar-EG')}</p>
              </div>
              <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-700 transition-colors">
                <Download size={16} />
                تحميل الشهادة
              </button>
            </div>
          ))}
        </div>
      )}

      {/* قسم قيد الإنجاز بدون الدائرة التي تدور للأبد */}
      <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
        <Calendar size={18} className="text-primary-500" />
        قيد الإنجاز
      </h3>
      <div className="bg-white border border-dashed border-neutral-200 rounded-2xl p-10 text-center">
        <p className="text-neutral-400 text-sm">لا توجد دورات قيد الإنجاز حالياً.</p>
      </div>
    </div>
  )
}
