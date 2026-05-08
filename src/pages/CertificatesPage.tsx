import { Award, Download, Share2, Calendar } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Certificate = {
  id: number
  title: string
  issuer: string
  date: string
  icon: string
  color: string
  bgGradient: string
  passingScore: number
  userScore: number
}

// تم إفراغ المصفوفة لتبدأ من الصفر
const certificates: Certificate[] = []

// تم إفراغ المصفوفة لتبدأ من الصفر
const locked: { title: string; icon: string; progress: number }[] = []

function generateCertificatePDF(cert: Certificate, studentName: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 1122
  canvas.height = 794
  const ctx = canvas.getContext('2d')!

  // Background
  ctx.fillStyle = '#fafaf9'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Outer border
  ctx.strokeStyle = '#b45309'
  ctx.lineWidth = 6
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48)

  // Inner border
  ctx.strokeStyle = '#d97706'
  ctx.lineWidth = 2
  ctx.strokeRect(38, 38, canvas.width - 76, canvas.height - 76)

  // Top decorative band
  const topGrad = ctx.createLinearGradient(0, 0, canvas.width, 0)
  topGrad.addColorStop(0, '#1d4ed8')
  topGrad.addColorStop(1, '#0369a1')
  ctx.fillStyle = topGrad
  ctx.fillRect(38, 38, canvas.width - 76, 110)

  // Bottom band
  ctx.fillStyle = topGrad
  ctx.fillRect(38, canvas.height - 148, canvas.width - 76, 110)

  // Academy name (top band)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 28px serif'
  ctx.textAlign = 'center'
  ctx.fillText('أكاديمية TaalimiLearn التعليمية', canvas.width / 2, 88)
  ctx.font = '18px serif'
  ctx.fillStyle = '#bfdbfe'
  ctx.fillText('TaalimiLearn Educational Academy', canvas.width / 2, 122)

  // Certificate of Completion
  ctx.fillStyle = '#92400e'
  ctx.font = 'bold 20px serif'
  ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 200)

  ctx.fillStyle = '#1e3a5f'
  ctx.font = 'bold 38px serif'
  ctx.fillText('شهادة إتمام وتميز', canvas.width / 2, 250)

  // Divider
  ctx.strokeStyle = '#d97706'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(200, 268)
  ctx.lineTo(922, 268)
  ctx.stroke()

  // "Presented to"
  ctx.fillStyle = '#6b7280'
  ctx.font = 'italic 20px serif'
  ctx.fillText('تُمنح هذه الشهادة إلى', canvas.width / 2, 310)

  // Student name
  ctx.fillStyle = '#1e40af'
  ctx.font = 'bold 44px serif'
  ctx.fillText(studentName, canvas.width / 2, 368)

  // Underline name
  const nameWidth = ctx.measureText(studentName).width
  ctx.strokeStyle = '#d97706'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2 - nameWidth / 2, 378)
  ctx.lineTo(canvas.width / 2 + nameWidth / 2, 378)
  ctx.stroke()

  // Course completion text
  ctx.fillStyle = '#374151'
  ctx.font = '22px serif'
  ctx.fillText('لإتمامه/ها بنجاح متطلبات دورة', canvas.width / 2, 426)

  // Course title
  ctx.fillStyle = '#1e3a5f'
  ctx.font = 'bold 32px serif'
  ctx.fillText(cert.title, canvas.width / 2, 476)

  // Score
  ctx.fillStyle = '#6b7280'
  ctx.font = '20px serif'
  ctx.fillText(`بدرجة ${cert.userScore}% وبتفوق واجتياز الاختبار النهائي`, canvas.width / 2, 516)

  // Bottom band content
  const dateFormatted = new Date(cert.date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 18px serif'
  ctx.textAlign = 'left'
  ctx.fillText('التاريخ:', 120, canvas.height - 108)
  ctx.font = '18px serif'
  ctx.fillText(dateFormatted, 120, canvas.height - 80)

  ctx.textAlign = 'right'
  ctx.font = 'bold 18px serif'
  ctx.fillText(':توقيع المنصة', canvas.width - 120, canvas.height - 108)
  ctx.font = 'italic 20px serif'
  ctx.fillText('TaalimiLearn Academy', canvas.width - 120, canvas.height - 80)

  // Center seal
  ctx.textAlign = 'center'
  ctx.font = '48px serif'
  ctx.fillText('🏅', canvas.width / 2, canvas.height - 76)

  // Convert to PDF via data URL and trigger download
  const imgData = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = imgData
  link.download = `شهادة-${cert.title.replace(/\s+/g, '-')}.png`
  link.click()
}

export default function CertificatesPage() {
  const { profile } = useAuth()
  const studentName = profile?.display_name || 'الطالب الكريم'

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-neutral-800 mb-1">الشهادات</h2>
        <p className="text-neutral-500 text-sm">شهاداتك المكتسبة وإنجازاتك على المنصة</p>
      </div>

      {/* Summary - تم تصفير الأرقام هنا */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-amber-700">0</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">شهادة مكتسبة</div>
        </div>
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-primary-700">0</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">قيد الإنجاز</div>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-secondary-700">0%</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">معدل الإكمال</div>
        </div>
      </div>

      {/* Earned Certificates */}
      <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
        <Award size={18} className="text-amber-500" />
        الشهادات المكتسبة
      </h3>
      
      {certificates.length === 0 ? (
        <div className="bg-white border border-dashed border-neutral-200 rounded-2xl p-10 text-center mb-8">
          <p className="text-neutral-400 text-sm">لم تحصل على أي شهادة بعد. ابدأ التعلم الآن!</p>
        </div>
      ) : (
        <div className="grid gap-5 mb-8">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm card-hover">
               {/* محتوى الشهادة */}
            </div>
          ))}
        </div>
      )}

      {/* In Progress */}
      <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-neutral-400 border-t-primary-500 rounded-full animate-spin" />
        قيد الإنجاز
      </h3>
      
      {locked.length === 0 ? (
        <div className="bg-white border border-dashed border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-neutral-400 text-sm">لا توجد دورات قيد الإنجاز حالياً.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {/* محتوى الدورات قيد الإنجاز */}
        </div>
      )}
    </div>
  )
}
