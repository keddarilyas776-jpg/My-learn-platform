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
    youtubeUrl: 'https://www.youtube.com/playlist?list=PL0oExH_Pn_Tut9s0h0qaLIwDESYkgsj8D',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  },
  {
    id: 'reading',
    label: 'القراءة',
    icon: '📖',
    youtubeUrl: 'https://www.youtube.com/results?search_query=القراءة+السريعة+عربي+playlist',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
  },
  {
    id: 'writing',
    label: 'الكتابة',
    icon: '✍️',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLzVtL-u1GggOK3tv0U-POD63DKe-lKJIM',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  },
  {
    id: 'poetry',
    label: 'الشعر',
    icon: '📜',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLxuf2KVsx2SBmcY0YacybJF5STQd7hC-U',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-200 hover:bg-rose-100',
  },
  {
    id: 'literature',
    label: 'الأدب',
    icon: '📚',
    youtubeUrl: 'https://www.youtube.com/results?search_query=الأدب+العربي+تعليمي+playlist',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
  },
]

export const professionalCategories: Category[] = [
  {
    id: 'medical',
    label: 'الطب',
    icon: '🏥',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLFkJTdtzWoIawU9ms7fo742FB4RKYawQ6',
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200 hover:bg-red-100',
  },
  {
    id: 'engineering',
    label: 'الهندسة',
    icon: '⚙️',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLlzIpiCueEArjVi59d0uw5rpQ8tLLtro0',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50 border-slate-200 hover:bg-slate-100',
  },
  {
    id: 'technology',
    label: 'التكنولوجيا',
    icon: '💻',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
  },
  {
    id: 'technical',
    label: 'التقنية',
    icon: '🔧',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLT4z5nNhG_D7cfEuwEZXYrHh_hAgIdmfs',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
  },
]
