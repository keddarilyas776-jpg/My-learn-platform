type Stat = {
  value: string
  label: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
}

const stats: Stat[] = [
  {
    value: '+25',
    label: 'كورس متاح',
    icon: '📚',
    color: 'text-primary-700',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
  },
  {
    value: '+150',
    label: 'اختبار تفاعلي',
    icon: '📝',
    color: 'text-secondary-700',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-200',
  },
  {
    value: '+50',
    label: 'لعبة تعليمية',
    icon: '🎮',
    color: 'text-accent-700',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-200',
  },
  {
    value: '+1000',
    label: 'طالب نشط',
    icon: '👨‍🎓',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
]

export default function StatsSection() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} border ${stat.borderColor} rounded-2xl p-5 text-center card-hover cursor-default`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-black ${stat.color} leading-none mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm font-medium text-neutral-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
