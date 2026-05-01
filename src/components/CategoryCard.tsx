import type { Category } from '../data/categories'

type Props = {
  category: Category
}

export default function CategoryCard({ category }: Props) {
  const handleClick = () => {
    window.open(category.youtubeUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className={`${category.bgColor} border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 card-hover group w-full`}
    >
      <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
        {category.icon}
      </div>
      <span className={`text-sm font-bold ${category.color}`}>{category.label}</span>
    </button>
  )
}
