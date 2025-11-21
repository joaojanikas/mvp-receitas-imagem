import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Verificar se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: "API Key da OpenAI não configurada. Configure OPENAI_API_KEY no arquivo .env.local",
          code: "MISSING_API_KEY"
        },
        { status: 500 }
      )
    }

    const { ingredients } = await request.json()

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: "Lista de ingredientes inválida ou vazia" },
        { status: 400 }
      )
    }

    const ingredientsList = ingredients.join(", ")

    // Chamar OpenAI para gerar receita
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um chef profissional especializado em criar receitas criativas e deliciosas.
Sempre responda em português de Portugal.
Retorne APENAS JSON válido, sem markdown ou texto adicional.`,
        },
        {
          role: "user",
          content: `Crie UMA receita deliciosa usando estes ingredientes: ${ingredientsList}

REGRAS:
- Use TODOS os ingredientes listados
- Pode adicionar ingredientes básicos comuns (sal, pimenta, azeite, água)
- Seja criativo mas realista
- Receita deve ser executável e saborosa

Formato de resposta (JSON válido):
{
  "title": "Nome da Receita",
  "ingredients": [
    { "name": "ingrediente", "quantity": "quantidade" }
  ],
  "steps": [
    "Passo 1 detalhado",
    "Passo 2 detalhado"
  ],
  "cookTime": "30 minutos",
  "difficulty": "Fácil"
}

IMPORTANTE: Retorne APENAS o JSON, sem markdown ou explicações.`,
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: "Resposta vazia da OpenAI" },
        { status: 500 }
      )
    }

    // Parse do JSON retornado
    let parsedContent
    try {
      // Remover markdown se existir
      const cleanContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
      parsedContent = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error("Erro ao fazer parse da resposta:", content)
      return NextResponse.json(
        { error: "Formato de resposta inválido da OpenAI" },
        { status: 500 }
      )
    }

    // Validar estrutura da resposta
    if (!parsedContent.title || !parsedContent.ingredients || !parsedContent.steps) {
      return NextResponse.json(
        { error: "Receita gerada com formato inválido" },
        { status: 500 }
      )
    }

    // Garantir que difficulty é um dos valores válidos
    if (!["Fácil", "Médio", "Difícil"].includes(parsedContent.difficulty)) {
      parsedContent.difficulty = "Médio"
    }

    return NextResponse.json(parsedContent)
  } catch (error: any) {
    console.error("Erro na API de geração de receita:", error)

    // Tratamento de erros específicos da OpenAI
    if (error?.status === 401) {
      return NextResponse.json(
        { 
          error: "Chave da OpenAI inválida. Verifique sua OPENAI_API_KEY",
          code: "INVALID_API_KEY"
        },
        { status: 401 }
      )
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { 
          error: "Limite de requisições atingido. Aguarde alguns minutos.",
          code: "RATE_LIMIT"
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { 
        error: error?.message || "Erro ao gerar receita",
        code: "UNKNOWN_ERROR"
      },
      { status: 500 }
    )
  }
}
