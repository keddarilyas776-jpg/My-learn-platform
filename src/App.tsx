import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import TestsPage from './pages/TestsPage'
import CertificatesPage from './pages/CertificatesPage'
import ProfilePage from './pages/ProfilePage'

type Page = 'home' | 'tests' | 'certificates' | 'profile'

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home')

  const renderPage = () => {
    switch (activePage) {
      case 'tests': return <TestsPage />
      case 'certificates': return <CertificatesPage />
      case 'profile': return <ProfilePage />
      default: return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <Header activePage={activePage} onNavigate={setActivePage} coins={1250} />
      <main className="pb-20 md:pb-6">
        {renderPage()}
      </main>
      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  )
}
