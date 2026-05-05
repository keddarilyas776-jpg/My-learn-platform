import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type UserProfile = {
  id: string
  display_name: string
  coins: number
  avatar_url: string | null
  badge: string
  is_pro: boolean
  is_subscribed: boolean
  is_admin: boolean
  created_at: string
}

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: UserProfile | null
  isPro: boolean
  isAdmin: boolean
  loading: boolean
  setIsPro: (v: boolean) => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isPro: false,
  isAdmin: false,
  loading: true,
  setIsPro: () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isPro, setIsPro] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      if (data.session?.user) fetchProfile(data.session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      if (newSession?.user) {
        (async () => { await fetchProfile(newSession.user.id) })()
      } else {
        setProfile(null)
        setIsPro(false)
        setIsAdmin(false)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from('users_profile')
      .select('id, display_name, coins, avatar_url, badge, is_pro, is_subscribed, is_admin, created_at')
      .eq('id', userId)
      .maybeSingle()
    if (data) {
      setProfile(data as UserProfile)
      setIsPro(data.is_subscribed ?? data.is_pro ?? false)
      setIsAdmin(data.is_admin ?? false)
    } else {
      setIsPro(false)
      setIsAdmin(false)
    }
    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, user, profile, isPro, isAdmin, loading, setIsPro, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
