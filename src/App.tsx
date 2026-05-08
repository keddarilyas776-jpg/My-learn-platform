import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import CheckoutModal from './components/CheckoutModal'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import TestsPage from './pages/TestsPage'
import CertificatesPage from './pages/CertificatesPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import GamesPage from './pages/GamesPage'
import { Loader as Loader2 } from 'lucide-react'

type Page = 'home' | 'tests' | 'certificates' | 'games' | 'profile' | 'admin'

function AppInner() {
  const { session, loading, profile, isAdmin, isPro } = useAuth()
  const [activePage, setActivePage] = useState<Page>('home')
  const [showCheckout, setShowCheckout] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={36} className="animate-spin text-primary-500" />
          <p className="text-neutral-500 text-sm font-medium">جارٍ التحميل...</p>
        </div>
      </div>
    )
  }

  // --- التعديل هنا: أزلنا شرط منع الدخول الإجباري ---
  // سنقوم بالتحقق من الجلسة فقط عند الصفحات الحساسة

  const renderPage = () => {
    // إذا لم يسجل دخول وحاول دخول صفحات "الاختبارات" أو "الشهادات" أو "الملف الشخصي"
    if (!session && (activePage === 'tests' || activePage === 'certificates' || activePage === 'profile' || activePage === 'admin')) {
      return <AuthPage />
    }

    switch (activePage) {
      case 'tests': return <TestsPage />
      case 'certificates': return <CertificatesPage />
      case 'games': return <GamesPage onSubscribe={() => window.location.href = '/auth'} />
      case 'profile': return <ProfilePage />
      case 'admin': return isAdmin ? <AdminPage /> : <HomePage onSubscribe={() => window.location.href = '/auth'} />
      default: return <HomePage onSubscribe={() => window.location.href = '/auth'} />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
        coins={profile?.coins ?? 0}
        onSubscribe={() => window.location.href = '/auth'}
        isAdmin={isAdmin}
      />
      <main className="pb-20 md:pb-6">
        {renderPage()}
      </main>
      <BottomNav activePage={activePage} onNavigate={setActivePage} isAdmin={isAdmin} />
      {showCheckout && !isPro && !isAdmin && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onSuccess={() => setShowCheckout(false)}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
