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

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'برمجة Python للمبتدئين',
    issuer: 'أكاديمية TaalimiLearn',
    date: '2026-04-01',
    icon: '💻',
    color: 'text-cyan-700',
    bgGradient: 'from-cyan-500 to-cyan-700',
    passingScore: 75,
    userScore: 90,
  },
  {
    id: 2,
    title: 'أساسيات الرسم الإبداعي',
    issuer: 'أكاديمية TaalimiLearn',
    date: '2026-03-15',
    icon: '🎨',
    color: 'text-orange-700',
    bgGradient: 'from-orange-500 to-orange-700',
    passingScore: 75,
    userScore: 88,
  },
  {
    id: 3,
    title: 'القراءة السريعة المتقدمة',
    issuer: 'أكاديمية TaalimiLearn',
    date: '2026-03-01',
    icon: '📖',
    color: 'text-emerald-700',
    bgGradient: 'from-emerald-500 to-emerald-700',
    passingScore: 75,
    userScore: 95,
  },
]

const locked: { title: string; icon: string; progress: number }[] = [
  { title: 'علم النفس التطبيقي', icon: '🧠', progress: 65 },
  { title: 'الزراعة المستدامة', icon: '🌱', progress: 40 },
  { title: 'الهندسة للمبتدئين', icon: '⚙️', progress: 20 },
]

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

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-amber-700">{certificates.length}</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">شهادة مكتسبة</div>
        </div>
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-primary-700">{locked.length}</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">قيد الإنجاز</div>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-secondary-700">100%</div>
          <div className="text-xs text-neutral-600 mt-1 font-medium">معدل الإكمال</div>
        </div>
      </div>

      {/* Earned Certificates */}
      <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
        <Award size={18} className="text-amber-500" />
        الشهادات المكتسبة
      </h3>
      <div className="grid gap-5 mb-8">
        {certificates.map((cert) => {
          const passed = cert.userScore >= cert.passingScore
          return (
            <div
              key={cert.id}
              className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm card-hover"
            >
              {/* Certificate visual */}
              <div className={`bg-gradient-to-r ${cert.bgGradient} p-6 flex items-center gap-4`}>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
                  {cert.icon}
                </div>
                <div className="text-white">
                  <div className="text-xs font-medium opacity-80 mb-1">شهادة إتمام</div>
                  <h4 className="text-lg font-black leading-tight">{cert.title}</h4>
                  <p className="text-sm opacity-80 mt-1">{cert.issuer}</p>
                </div>
                <div className="mr-auto flex flex-col items-end gap-1">
                  <Award size={32} className="text-white/40" />
                  {passed && (
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">
                      {cert.userScore}% ✓
                    </span>
                  )}
                </div>
              </div>
              {/* Actions */}
              <div className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Calendar size={13} />
                  <span>
                    {new Date(cert.date).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-primary-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary-50">
                    <Share2 size={13} />
                    مشاركة
                  </button>
                  {passed ? (
                    <button
                      onClick={() => generateCertificatePDF(cert, studentName)}
                      className="flex items-center gap-1.5 text-xs text-white bg-primary-600 hover:bg-primary-700 transition-colors px-3 py-1.5 rounded-lg"
                    >
                      <Download size={13} />
                      تنزيل الشهادة
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-lg cursor-not-allowed">
                      يجب اجتياز الاختبار أولاً
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* In Progress */}
      <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-neutral-400 border-t-primary-500 rounded-full animate-spin" />
        قيد الإنجاز
      </h3>
      <div className="grid gap-4">
        {locked.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-neutral-700 mb-2">{item.title}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-neutral-100 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-neutral-500">{item.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
