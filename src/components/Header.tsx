import { useState } from 'react'
import { Menu, X, BookOpen, Coins } from 'lucide-react'

type Page = 'home' | 'tests' | 'certificates' | 'profile'

type Props = {
  activePage: Page
  onNavigate: (page: Page) => void
  coins: number
}

const navItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'tests', label: 'الاختبارات' },
  { id: 'certificates', label: 'الشهادات' },
  { id: 'profile', label: 'الملف الشخصي' },
]

export default function Header({ activePage, onNavigate, coins }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors md:hidden"
            aria-label="القائمة"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-sm">
              <BookOpen size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-neutral-800 leading-none">منصة التعلم</h1>
              <p className="text-xs text-primary-600 font-medium">التفاعلي</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === item.id
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Coins */}
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
            <span className="text-sm font-bold text-amber-700">{coins.toLocaleString('ar-EG')}</span>
            <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-xs">
              <Coins size={12} className="text-amber-900" />
            </div>
            <span className="text-xs text-amber-600 font-medium hidden sm:block">عملة</span>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-100 pb-3 pt-2 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMenuOpen(false) }}
                className={`w-full text-right px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${
                  activePage === item.id
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
