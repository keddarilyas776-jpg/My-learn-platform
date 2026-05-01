import { Home, ClipboardList, Award, User } from 'lucide-react'

type Page = 'home' | 'tests' | 'certificates' | 'profile'

type Props = {
  activePage: Page
  onNavigate: (page: Page) => void
}

const navItems: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'tests', label: 'الاختبارات', icon: ClipboardList },
  { id: 'certificates', label: 'الشهادات', icon: Award },
  { id: 'profile', label: 'الملف', icon: User },
]

export default function BottomNav({ activePage, onNavigate }: Props) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-100 z-50 shadow-lg">
      <div className="flex">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all ${
                active ? 'text-primary-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <Icon size={20} className={active ? 'stroke-2' : 'stroke-1.5'} />
              <span className={`text-xs font-medium ${active ? 'font-bold' : ''}`}>{item.label}</span>
              {active && (
                <div className="absolute bottom-0 w-8 h-0.5 bg-primary-600 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
