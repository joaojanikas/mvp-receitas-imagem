import { NextRequest, NextResponse } from 'next/server'
import { getFridgeItems, getUserRecipes } from '@/lib/database'
import { getMockUserId } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const userId = getMockUserId()
    
    // Buscar ingredientes do frigorífico
    const fridgeItems = await getFridgeItems(userId)
    
    // Buscar receitas do usuário
    const userRecipes = await getUserRecipes(userId)
    
    // Filtrar receitas que podem ser feitas com ingredientes disponíveis
    const suggestedRecipes = userRecipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map((ing: any) => 
        ing.name?.toLowerCase() || ing.toLowerCase()
      )
      
      const fridgeIngredients = fridgeItems.map(item => 
        item.name.toLowerCase()
      )
      
      // Verificar quantos ingredientes da receita estão no frigorífico
      const matchCount = recipeIngredients.filter((ing: string) =>
        fridgeIngredients.some(fridgeIng => 
          fridgeIng.includes(ing) || ing.includes(fridgeIng)
        )
      ).length
      
      // Sugerir se pelo menos 50% dos ingredientes estão disponíveis
      return matchCount >= recipeIngredients.length * 0.5
    })
    
    // Ordenar por número de ingredientes disponíveis
    suggestedRecipes.sort((a, b) => {
      const aIngredients = a.ingredients.map((ing: any) => 
        ing.name?.toLowerCase() || ing.toLowerCase()
      )
      const bIngredients = b.ingredients.map((ing: any) => 
        ing.name?.toLowerCase() || ing.toLowerCase()
      )
      
      const fridgeIngredients = fridgeItems.map(item => 
        item.name.toLowerCase()
      )
      
      const aMatch = aIngredients.filter((ing: string) =>
        fridgeIngredients.some(fridgeIng => 
          fridgeIng.includes(ing) || ing.includes(fridgeIng)
        )
      ).length
      
      const bMatch = bIngredients.filter((ing: string) =>
        fridgeIngredients.some(fridgeIng => 
          fridgeIng.includes(ing) || ing.includes(fridgeIng)
        )
      ).length
      
      return bMatch - aMatch
    })
    
    return NextResponse.json({ 
      recipes: suggestedRecipes,
      fridgeItems: fridgeItems.map(item => item.name)
    })
  } catch (error: any) {
    console.error('Erro ao buscar receitas sugeridas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar sugestões', details: error.message },
      { status: 500 }
    )
  }
}
