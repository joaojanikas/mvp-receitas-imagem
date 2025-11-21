import { supabase } from './supabase'

// Funções para gerenciar receitas
export async function saveRecipe(recipe: any, userId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .insert([
      {
        user_id: userId,
        title: recipe.title,
        description: recipe.description || '',
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        cook_time: recipe.cookTime,
        prep_time: recipe.prepTime || '15 min',
        difficulty: recipe.difficulty,
        servings: recipe.servings || 4,
        calories: recipe.calories || 0,
        category: recipe.category || 'Geral',
        image_url: recipe.image_url,
        nutrition: recipe.nutrition,
        tags: recipe.tags || [],
        is_favorite: false
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserRecipes(userId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function toggleFavorite(recipeId: string, isFavorite: boolean) {
  const { data, error } = await supabase
    .from('recipes')
    .update({ is_favorite: isFavorite })
    .eq('id', recipeId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Funções para gerenciar plano semanal
export async function saveWeeklyPlan(meals: any[], userId: string, weekStart: string) {
  const { data, error } = await supabase
    .from('weekly_plans')
    .insert([
      {
        user_id: userId,
        week_start: weekStart,
        meals: meals
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getWeeklyPlan(userId: string, weekStart: string) {
  const { data, error } = await supabase
    .from('weekly_plans')
    .select('*')
    .eq('user_id', userId)
    .eq('week_start', weekStart)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// Funções para gerenciar lista de compras
export async function saveShoppingList(items: any[], userId: string) {
  const { data, error } = await supabase
    .from('shopping_lists')
    .upsert([
      {
        user_id: userId,
        items: items
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getShoppingList(userId: string) {
  const { data, error } = await supabase
    .from('shopping_lists')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// Funções para gerenciar frigorífico
export async function addFridgeItem(item: any, userId: string) {
  const { data, error } = await supabase
    .from('fridge_items')
    .insert([
      {
        user_id: userId,
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        expiry_date: item.expiry_date
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getFridgeItems(userId: string) {
  const { data, error } = await supabase
    .from('fridge_items')
    .select('*')
    .eq('user_id', userId)
    .order('added_at', { ascending: false })

  if (error) throw error
  return data
}

export async function removeFridgeItem(itemId: string) {
  const { error } = await supabase
    .from('fridge_items')
    .delete()
    .eq('id', itemId)

  if (error) throw error
}

// Funções para gerenciar perfil do usuário
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert([
      {
        user_id: userId,
        ...updates
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Função para verificar se usuário é premium
export async function checkPremiumStatus(userId: string) {
  const profile = await getUserProfile(userId)
  
  if (!profile || !profile.is_premium) return false
  
  if (profile.premium_expires_at) {
    const expiryDate = new Date(profile.premium_expires_at)
    const now = new Date()
    return expiryDate > now
  }
  
  return false
}
