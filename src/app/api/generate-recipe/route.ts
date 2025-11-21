import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { saveRecipe } from '@/lib/database'
import { getMockUserId } from '@/lib/auth'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const { ingredients, recipeType, saveToDatabase = true } = await request.json()

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Ingredientes são obrigatórios' },
        { status: 400 }
      )
    }

    const prompt = `Crie uma receita ${recipeType || 'tradicional'} detalhada usando os seguintes ingredientes: ${ingredients.join(', ')}.

A receita deve incluir:
1. Título criativo e apetitoso
2. Descrição breve (2-3 frases)
3. Lista completa de ingredientes com quantidades
4. Passos detalhados de preparo
5. Tempo de preparo e cozimento
6. Nível de dificuldade
7. Número de porções
8. Informações nutricionais aproximadas

Retorne no formato JSON:
{
  "title": "Nome da receita",
  "description": "Descrição breve",
  "ingredients": [{"name": "ingrediente", "quantity": "quantidade", "category": "categoria"}],
  "steps": [{"number": 1, "instruction": "passo", "time": "tempo", "tip": "dica"}],
  "cookTime": "tempo total",
  "prepTime": "tempo de preparo",
  "difficulty": "Fácil|Médio|Difícil",
  "servings": 4,
  "calories": 350,
  "category": "categoria",
  "nutrition": {"protein": "42g", "carbs": "28g", "fat": "12g", "fiber": "6g"},
  "tags": ["tag1", "tag2"],
  "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um chef profissional especializado em criar receitas deliciosas e detalhadas. Sempre retorne respostas em formato JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    })

    const recipe = JSON.parse(completion.choices[0].message.content || '{}')

    // Salvar receita no banco de dados
    let savedRecipe = null
    if (saveToDatabase) {
      try {
        const userId = getMockUserId()
        savedRecipe = await saveRecipe(recipe, userId)
      } catch (dbError) {
        console.error('Erro ao salvar receita no banco:', dbError)
        // Continua mesmo se falhar ao salvar
      }
    }

    return NextResponse.json({
      success: true,
      recipe: savedRecipe || {
        ...recipe,
        detectedIngredients: ingredients,
        recipeType: recipeType || 'tradicional',
        timestamp: Date.now()
      }
    })
  } catch (error) {
    console.error('Erro ao gerar receita:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar receita com IA' },
      { status: 500 }
    )
  }
}
