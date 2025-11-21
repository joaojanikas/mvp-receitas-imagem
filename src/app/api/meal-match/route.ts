import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
})

export async function POST(request: NextRequest) {
  try {
    const { 
      participants 
    } = await request.json()

    if (!participants || participants.length < 2) {
      return NextResponse.json(
        { error: "É necessário pelo menos 2 participantes" },
        { status: 400 }
      )
    }

    // Combinar todos os ingredientes
    const allIngredients = participants.flatMap((p: any) => p.ingredients)
    const uniqueIngredients = [...new Set(allIngredients)]

    const participantNames = participants.map((p: any) => p.name).join(" e ")

    const prompt = `Crie 3 RECEITAS INCRÍVEIS que combinem os ingredientes de ${participantNames}.

INGREDIENTES DISPONÍVEIS: ${uniqueIngredients.join(", ")}

CONTEXTO: Esta é uma funcionalidade social chamada "MealMatch" onde duas ou mais pessoas combinam seus ingredientes para criar refeições juntas. Seja criativo e crie receitas que:
1. Usem ingredientes de AMBOS os participantes
2. Sejam perfeitas para compartilhar
3. Tenham um toque especial e romântico/social

Retorne um JSON com esta estrutura:

{
  "matches": [
    {
      "title": "Nome romântico/especial da receita",
      "description": "Descrição apetitosa",
      "matchScore": 0-100 (quão bem os ingredientes combinam),
      "ingredients": [
        {
          "name": "ingrediente",
          "quantity": "quantidade",
          "from": "nome do participante que trouxe"
        }
      ],
      "steps": ["passo 1", "passo 2"],
      "prepTime": "15 min",
      "cookTime": "30 min",
      "servings": 2,
      "difficulty": "Fácil" | "Médio" | "Difícil",
      "perfectFor": "Jantar romântico" | "Encontro casual" | "Refeição entre amigos",
      "winePariring": "Sugestão de vinho (opcional)",
      "ambiance": "Sugestão de ambiente/música"
    }
  ],
  "compatibility": {
    "score": 0-100,
    "message": "Mensagem sobre a compatibilidade culinária",
    "sharedPreferences": ["preferência 1", "preferência 2"]
  }
}

Seja CRIATIVO e ESPECIAL. Esta é uma experiência social única!`

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um chef especializado em criar experiências culinárias sociais e românticas."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 3000,
      temperature: 0.9
    })

    const content = response.choices[0]?.message?.content || "{}"
    const mealMatch = JSON.parse(content)

    return NextResponse.json(mealMatch)
  } catch (error) {
    console.error("Erro ao gerar MealMatch:", error)
    return NextResponse.json(
      { error: "Erro ao gerar combinação" },
      { status: 500 }
    )
  }
}
