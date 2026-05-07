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
  refreshProfile: () => Promise<void>
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
  refreshProfile: async () => {},
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.user) {
        (async () => { await fetchProfile(newSession.user.id, newSession) })()
      } else {
        setSession(null)
        setUser(null)
        setProfile(null)
        setIsPro(false)
        setIsAdmin(false)
        setLoading(false)
      }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  async function fetchProfile(userId: string, currentSession: Session) {
    const { data } = await supabase
      .from('users_profile')
      .select('id, display_name, coins, avatar_url, badge, is_pro, is_subscribed, is_admin, created_at')
      .eq('id', userId)
      .maybeSingle()

    const pro = data ? (data.is_subscribed || data.is_pro || data.is_admin || false) : false
    const admin = data ? (data.is_admin ?? false) : false

    setSession(currentSession)
    setUser(currentSession.user)
    setProfile(data as UserProfile ?? null)
    setIsPro(pro)
    setIsAdmin(admin)
    setLoading(false)
  }

  async function refreshProfile() {
    if (user && session) await fetchProfile(user.id, session)
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, user, profile, isPro, isAdmin, loading, setIsPro, refreshProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
