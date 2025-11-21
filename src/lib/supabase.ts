import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export type Recipe = {
  id: string
  user_id: string
  title: string
  description: string
  ingredients: any[]
  steps: any[]
  cook_time: string
  prep_time: string
  difficulty: string
  servings: number
  calories: number
  category: string
  image_url?: string
  nutrition?: any
  tags?: string[]
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export type WeeklyPlan = {
  id: string
  user_id: string
  week_start: string
  meals: any[]
  created_at: string
  updated_at: string
}

export type ShoppingList = {
  id: string
  user_id: string
  items: any[]
  created_at: string
  updated_at: string
}

export type FridgeItem = {
  id: string
  user_id: string
  name: string
  quantity: string
  category: string
  expiry_date?: string
  added_at: string
}

export type UserProfile = {
  id: string
  user_id: string
  name: string
  email: string
  dietary_preferences?: string[]
  allergies?: string[]
  nutrition_goals?: any
  is_premium: boolean
  premium_expires_at?: string
  created_at: string
  updated_at: string
}
