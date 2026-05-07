import { Lock } from 'lucide-react'
import type { Category } from '../data/categories'
import { useAuth } from '../context/AuthContext'

type Props = {
  category: Category
  onSubscribe: () => void
}

export default function CategoryCard({ category, onSubscribe }: Props) {
  const { isPro } = useAuth()

  function handleClick() {
    if (isPro) {
      window.open(category.youtubeUrl, '_blank', 'noopener,noreferrer')
    } else {
      onSubscribe()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${category.bgColor} border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 card-hover group w-full relative`}
    >
      {!isPro && (
        <div className="absolute top-2 left-2">
          <Lock size={12} className="text-neutral-400" />
        </div>
      )}
      <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
        {category.icon}
      </div>
      <span className={`text-sm font-bold ${category.color}`}>{category.label}</span>
    </button>
  )
}
