"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  isPremium: boolean
  refreshPremiumStatus: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  isPremium: false,
  refreshPremiumStatus: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  const refreshPremiumStatus = async () => {
    if (!user) return

    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_premium, premium_expires_at')
        .eq('user_id', user.id)
        .single()

      if (profile) {
        const now = new Date()
        const expiresAt = profile.premium_expires_at ? new Date(profile.premium_expires_at) : null
        
        // Verificar se ainda é premium (não expirou)
        const isStillPremium = profile.is_premium && (!expiresAt || expiresAt > now)
        setIsPremium(isStillPremium)

        // Se expirou, atualizar no banco
        if (profile.is_premium && expiresAt && expiresAt <= now) {
          await supabase
            .from('user_profiles')
            .update({ is_premium: false })
            .eq('user_id', user.id)
        }
      }
    } catch (error) {
      console.error('Erro ao verificar status premium:', error)
    }
  }

  useEffect(() => {
    // Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Verificar status premium quando usuário mudar
  useEffect(() => {
    if (user) {
      refreshPremiumStatus()
    } else {
      setIsPremium(false)
    }
  }, [user])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsPremium(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, isPremium, refreshPremiumStatus }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
