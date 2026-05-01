import { Award, Download, Share2, Calendar } from 'lucide-react'

type Certificate = {
  id: number
  title: string
  issuer: string
  date: string
  icon: string
  color: string
  bgGradient: string
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'برمجة Python للمبتدئين',
    issuer: 'منصة التعلم التفاعلي',
    date: '2026-04-01',
    icon: '💻',
    color: 'text-cyan-700',
    bgGradient: 'from-cyan-500 to-cyan-700',
  },
  {
    id: 2,
    title: 'أساسيات الرسم الإبداعي',
    issuer: 'منصة التعلم التفاعلي',
    date: '2026-03-15',
    icon: '🎨',
    color: 'text-orange-700',
    bgGradient: 'from-orange-500 to-orange-700',
  },
  {
    id: 3,
    title: 'القراءة السريعة المتقدمة',
    issuer: 'منصة التعلم التفاعلي',
    date: '2026-03-01',
    icon: '📖',
    color: 'text-emerald-700',
    bgGradient: 'from-emerald-500 to-emerald-700',
  },
]

const locked: { title: string; icon: string; progress: number }[] = [
  { title: 'علم النفس التطبيقي', icon: '🧠', progress: 65 },
  { title: 'الزراعة المستدامة', icon: '🌱', progress: 40 },
  { title: 'الهندسة للمبتدئين', icon: '⚙️', progress: 20 },
]

export default function CertificatesPage() {
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
        {certificates.map((cert) => (
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
              <div className="mr-auto">
                <Award size={32} className="text-white/40" />
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
                <button className="flex items-center gap-1.5 text-xs text-white bg-primary-600 hover:bg-primary-700 transition-colors px-3 py-1.5 rounded-lg">
                  <Download size={13} />
                  تنزيل
                </button>
              </div>
            </div>
          </div>
        ))}
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
