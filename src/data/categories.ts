export type Category = {
  id: string
  label: string
  icon: string
  youtubeUrl: string
  color: string
  bgColor: string
}

export const creativeCategories: Category[] = [
  {
    id: 'drawing',
    label: 'الرسم',
    icon: '🎨',
    youtubeUrl: 'https://www.youtube.com/results?search_query=تعليم+الرسم+للمبتدئين+بالعربي',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  },
  {
    id: 'reading',
    label: 'القراءة',
    icon: '📖',
    youtubeUrl: 'https://www.youtube.com/results?search_query=القراءة+السريعة+عربي',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
  },
  {
    id: 'writing',
    label: 'الكتابة',
    icon: '✍️',
    youtubeUrl: 'https://www.youtube.com/results?search_query=الكتابة+الإبداعية+عربي',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  },
  {
    id: 'poetry',
    label: 'الشعر',
    icon: '📜',
    youtubeUrl: 'https://www.youtube.com/results?search_query=تعليم+الشعر+العربي',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-200 hover:bg-rose-100',
  },
  {
    id: 'literature',
    label: 'الأدب',
    icon: '📚',
    youtubeUrl: 'https://www.youtube.com/results?search_query=الأدب+العربي+تعليمي',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
  },
]

export const professionalCategories: Category[] = [
  {
    id: 'medical',
    label: 'الطب',
    icon: '🏥',
    youtubeUrl: 'https://www.youtube.com/results?search_query=تعليم+طبي+عربي+مبسط',
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200 hover:bg-red-100',
  },
  {
    id: 'engineering',
    label: 'الهندسة',
    icon: '⚙️',
    youtubeUrl: 'https://www.youtube.com/results?search_query=شرح+هندسة+عربي',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50 border-slate-200 hover:bg-slate-100',
  },
  {
    id: 'technology',
    label: 'التكنولوجيا',
    icon: '💻',
    youtubeUrl: 'https://www.youtube.com/results?search_query=تعليم+تكنولوجيا+بالعربي',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
  },
  {
    id: 'technical',
    label: 'التقنية',
    icon: '🔧',
    youtubeUrl: 'https://www.youtube.com/results?search_query=تعليم+تقني+بالعربي',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
  },
]
