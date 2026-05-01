import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Course = {
  id: string
  title: string
  description: string
  category: string
  sub_category: string
  difficulty: string
  lessons_count: number
  rating: number
  youtube_url: string
  icon: string
  color: string
  created_at: string
}
