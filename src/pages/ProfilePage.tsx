import { Trophy, Zap, Gamepad2, BookOpen, Star, TrendingUp, Calendar } from 'lucide-react'

type Badge = {
  icon: string
  label: string
  description: string
  color: string
  bg: string
  earned: boolean
}

const badges: Badge[] = [
  {
    icon: '🎓',
    label: 'طالب نشط',
    description: 'أكملت 10 كورسات على المنصة',
    color: 'text-primary-700',
    bg: 'bg-primary-50 border-primary-200',
    earned: true,
  },
  {
    icon: '⚡',
    label: 'متعلم سريع',
    description: 'أنهيت كورساً خلال 24 ساعة',
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
    earned: true,
  },
  {
    icon: '🎮',
    label: 'محب الألعاب',
    description: 'لعبت 20 لعبة تعليمية',
    color: 'text-secondary-700',
    bg: 'bg-secondary-50 border-secondary-200',
    earned: true,
  },
  {
    icon: '🏆',
    label: 'بطل الاختبارات',
    description: 'حصلت على 100% في اختبار',
    color: 'text-rose-700',
    bg: 'bg-rose-50 border-rose-200',
    earned: false,
  },
  {
    icon: '🔥',
    label: 'متحمس للتعلم',
    description: 'سلسلة تعلم 30 يوماً متتالية',
    color: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-200',
    earned: false,
  },
  {
    icon: '💎',
    label: 'الماسة النادرة',
    description: 'أكملت جميع مسارات التعلم',
    color: 'text-cyan-700',
    bg: 'bg-cyan-50 border-cyan-200',
    earned: false,
  },
]

const stats = [
  { label: 'كورسات مكتملة', value: '10', icon: <BookOpen size={16} className="text-primary-500" /> },
  { label: 'ساعات تعلم', value: '48', icon: <Calendar size={16} className="text-secondary-500" /> },
  { label: 'اختبارات مكتملة', value: '12', icon: <Star size={16} className="text-amber-500" /> },
  { label: 'شهادات مكتسبة', value: '3', icon: <Trophy size={16} className="text-rose-500" /> },
  { label: 'نقاط المكافأة', value: '1250', icon: <TrendingUp size={16} className="text-emerald-500" /> },
  { label: 'ألعاب تعليمية', value: '25', icon: <Gamepad2 size={16} className="text-orange-500" /> },
]

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 mb-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
            👨‍🎓
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black">أحمد محمد</h2>
            <p className="text-primary-200 text-sm mt-1">طالب متميز على المنصة</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                🎓 طالب نشط
              </span>
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                ⚡ متعلم سريع
              </span>
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                🎮 محب الألعاب
              </span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-primary-200 mb-1.5">
            <span>المستوى 7</span>
            <span>1250 / 2000 نقطة XP</span>
          </div>
          <div className="bg-white/20 rounded-full h-2.5">
            <div className="bg-white h-2.5 rounded-full" style={{ width: '62%' }} />
          </div>
          <p className="text-xs text-primary-200 mt-1.5">750 نقطة للمستوى التالي</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-neutral-100 rounded-2xl p-4 text-center shadow-sm card-hover"
          >
            <div className="flex justify-center mb-1">{stat.icon}</div>
            <div className="text-xl font-black text-neutral-800">{stat.value}</div>
            <div className="text-xs text-neutral-500 mt-0.5 leading-snug">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
          <Trophy size={18} className="text-amber-500" />
          الإنجازات والشارات
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className={`border rounded-xl p-4 flex items-center gap-3 transition-all ${
                badge.earned
                  ? `${badge.bg} card-hover`
                  : 'bg-neutral-50 border-neutral-100 opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                  badge.earned ? 'bg-white shadow-sm' : 'bg-neutral-100'
                }`}
              >
                {badge.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-bold text-sm ${badge.earned ? badge.color : 'text-neutral-400'}`}>
                    {badge.label}
                  </p>
                  {badge.earned && (
                    <span className="w-2 h-2 bg-secondary-500 rounded-full flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{badge.description}</p>
              </div>
              {!badge.earned && (
                <div className="text-neutral-300 text-lg flex-shrink-0">🔒</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm mt-5">
        <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
          <Zap size={18} className="text-amber-500" />
          ملخص النشاط الأخير
        </h3>
        <div className="space-y-3">
          {[
            { text: 'أكملت كورس "البرمجة للمبتدئين"', time: 'منذ يومين', icon: '✅' },
            { text: 'حصلت على شهادة الرسم الإبداعي', time: 'منذ أسبوع', icon: '🏆' },
            { text: 'اجتزت اختبار اللغة العربية بتقدير ممتاز', time: 'منذ أسبوع', icon: '⭐' },
            { text: 'انضممت إلى المنصة كطالب نشط', time: 'منذ شهر', icon: '🎓' },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-neutral-50 last:border-0">
              <span className="text-xl flex-shrink-0">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700">{activity.text}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
