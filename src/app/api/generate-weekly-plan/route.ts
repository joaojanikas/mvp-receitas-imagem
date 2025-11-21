import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const { days, dietaryPreferences, allergies, calorieGoal } = await request.json()

    const prompt = `Crie um plano semanal de refeições para ${days || 7} dias.

Preferências dietéticas: ${dietaryPreferences?.join(', ') || 'Nenhuma'}
Alergias: ${allergies?.join(', ') || 'Nenhuma'}
Meta calórica diária: ${calorieGoal || 2000} kcal

Para cada dia, inclua:
- Café da manhã
- Almoço
- Jantar
- 2 lanches saudáveis

Retorne no formato JSON:
{
  "weekStart": "data",
  "meals": [
    {
      "day": "Segunda-feira",
      "date": "2024-01-01",
      "breakfast": {"name": "receita", "calories": 350, "time": "15 min"},
      "lunch": {"name": "receita", "calories": 600, "time": "30 min"},
      "dinner": {"name": "receita", "calories": 550, "time": "40 min"},
      "snacks": [
        {"name": "lanche", "calories": 150, "time": "5 min"},
        {"name": "lanche", "calories": 150, "time": "5 min"}
      ],
      "totalCalories": 1800
    }
  ],
  "shoppingList": [
    {"name": "ingrediente", "quantity": "quantidade", "category": "categoria"}
  ],
  "tips": ["dica1", "dica2"]
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um nutricionista especializado em criar planos alimentares equilibrados e personalizados. Sempre retorne respostas em formato JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const plan = JSON.parse(completion.choices[0].message.content || '{}')

    return NextResponse.json({
      success: true,
      plan
    })
  } catch (error) {
    console.error('Erro ao gerar plano semanal:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar plano semanal com IA' },
      { status: 500 }
    )
  }
}
