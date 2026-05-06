import { useState } from 'react'
import { Lock, Loader } from 'lucide-react'
import type { Category } from '../data/categories'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

type Props = {
  category: Category
  onSubscribe: () => void
}

export default function CategoryCard({ category, onSubscribe }: Props) {
  const { isPro } = useAuth()
  const [launching, setLaunching] = useState(false)

  async function handleClick() {
    if (isPro) {
      window.open(category.youtubeUrl, '_blank', 'noopener,noreferrer')
      return
    }
    setLaunching(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) { onSubscribe(); return }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
      const res = await fetch(`${supabaseUrl}/functions/v1/check-subscription`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()

      if (json.subscribed === true) {
        window.open(category.youtubeUrl, '_blank', 'noopener,noreferrer')
      } else {
        onSubscribe()
      }
    } catch {
      onSubscribe()
    } finally {
      setLaunching(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={launching}
      className={`${category.bgColor} border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 card-hover group w-full relative disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {!isPro && (
        <div className="absolute top-2 left-2">
          <Lock size={12} className="text-neutral-400" />
        </div>
      )}
      <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
        {launching ? <Loader size={28} className="animate-spin text-neutral-400" /> : category.icon}
      </div>
      <span className={`text-sm font-bold ${category.color}`}>{category.label}</span>
    </button>
  )
}
