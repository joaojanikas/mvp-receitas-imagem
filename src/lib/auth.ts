import { supabase } from './supabase'

// Função para obter usuário atual
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Função para fazer login
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

// Função para fazer signup
export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  })
  if (error) throw error
  
  // Criar perfil do usuário
  if (data.user) {
    await supabase.from('user_profiles').insert([
      {
        user_id: data.user.id,
        name,
        email,
        is_premium: false
      }
    ])
  }
  
  return data
}

// Função para fazer logout
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Função para obter ID do usuário (mock para desenvolvimento)
export function getMockUserId(): string {
  // Para desenvolvimento, retorna um ID fixo
  // Em produção, isso virá do Supabase Auth
  return '00000000-0000-0000-0000-000000000001'
}

// Hook para verificar se está autenticado
export async function isAuthenticated() {
  try {
    const user = await getCurrentUser()
    return !!user
  } catch {
    return false
  }
}
