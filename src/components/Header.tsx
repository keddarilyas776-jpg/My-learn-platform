import { useState } from 'react'
import { Menu, X, BookOpen, LogOut, Star, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Page = 'home' | 'tests' | 'certificates' | 'profile' | 'admin'

type Props = {
  activePage: Page
  onNavigate: (page: Page) => void
  coins: number
  onSubscribe: () => void
  isAdmin: boolean
}

const baseNavItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'tests', label: 'الاختبارات' },
  { id: 'certificates', label: 'الشهادات' },
  { id: 'profile', label: 'الملف الشخصي' },
]

export default function Header({ activePage, onNavigate, coins, onSubscribe, isAdmin }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, isPro, signOut } = useAuth()

  const navItems = isAdmin
    ? [...baseNavItems, { id: 'admin' as Page, label: 'الإدارة' }]
    : baseNavItems

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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activePage === item.id
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                }`}
              >
                {item.id === 'admin' && <ShieldCheck size={14} />}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side: coins + pro + user */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
              <span className="text-sm font-bold text-amber-700">{coins.toLocaleString('ar-EG')}</span>
              <span className="text-amber-500 text-base">🪙</span>
            </div>

            {isPro ? (
              <span className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
                <Star size={11} className="fill-white" />
                PRO
              </span>
            ) : (
              <button
                onClick={onSubscribe}
                className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all active:scale-95"
              >
                اشترك الآن
              </button>
            )}

            {user && (
              <div className="flex items-center gap-2 mr-1">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm font-bold text-primary-700">
                  {(user.user_metadata?.display_name || user.email || 'U')[0].toUpperCase()}
                </div>
                <button
                  onClick={signOut}
                  className="hidden sm:flex items-center gap-1 text-xs text-neutral-500 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                  title="تسجيل الخروج"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-100 pb-3 pt-2 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMenuOpen(false) }}
                className={`w-full text-right px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1 flex items-center gap-2 ${
                  activePage === item.id
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {item.id === 'admin' && <ShieldCheck size={14} />}
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 pt-2 border-t border-neutral-100 mt-1">
              {!isPro && (
                <button
                  onClick={() => { onSubscribe(); setMenuOpen(false) }}
                  className="flex-1 bg-primary-600 text-white text-sm font-bold py-2.5 rounded-xl text-center"
                >
                  اشترك الآن · $1/شهر
                </button>
              )}
              {user && (
                <button
                  onClick={signOut}
                  className="flex items-center gap-1 text-sm text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl"
                >
                  <LogOut size={14} />
                  خروج
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
