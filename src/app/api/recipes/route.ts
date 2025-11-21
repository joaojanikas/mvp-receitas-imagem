import { NextRequest, NextResponse } from 'next/server'
import { getUserRecipes, saveRecipe } from '@/lib/database'
import { getMockUserId } from '@/lib/auth'

// GET - Buscar todas as receitas do usuário
export async function GET(request: NextRequest) {
  try {
    const userId = getMockUserId()
    const recipes = await getUserRecipes(userId)
    
    return NextResponse.json({ recipes })
  } catch (error: any) {
    console.error('Erro ao buscar receitas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar receitas', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Criar nova receita
export async function POST(request: NextRequest) {
  try {
    const userId = getMockUserId()
    const recipe = await request.json()
    
    const savedRecipe = await saveRecipe(recipe, userId)
    
    return NextResponse.json({ recipe: savedRecipe })
  } catch (error: any) {
    console.error('Erro ao salvar receita:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar receita', details: error.message },
      { status: 500 }
    )
  }
}
