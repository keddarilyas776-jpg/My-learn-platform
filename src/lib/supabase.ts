import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  || 'https://uskwvutzqprbsrrixmlf.supabase.co'

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVza3d2dXR6cXByYnNycml4bWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3OTU5OTIsImV4cCI6MjA5MzM3MTk5Mn0.XtG_7hR-Np35lRj1L9cZ_0WFDTzTfuGyDFpkMfObA9Y'

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
