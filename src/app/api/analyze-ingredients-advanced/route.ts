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

    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 }
      )
    }

    // Chamar OpenAI Vision API para identificar ingredientes
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise esta imagem e identifique TODOS os ingredientes alimentares visíveis.

IMPORTANTE:
- Liste APENAS ingredientes que você consegue ver claramente na imagem
- Seja específico e preciso
- Retorne em formato JSON válido
- Se não houver ingredientes visíveis, retorne array vazio

Formato de resposta:
{
  "ingredients": [
    { "name": "tomate", "quantity": "3 unidades" },
    { "name": "cebola", "quantity": "1 unidade" }
  ]
}`,
            },
            {
              type: "image_url",
              image_url: {
                url: image,
                detail: "low"
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      temperature: 0.3,
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
    if (!parsedContent.ingredients || !Array.isArray(parsedContent.ingredients)) {
      return NextResponse.json(
        { error: "Nenhum ingrediente detectado na imagem" },
        { status: 400 }
      )
    }

    return NextResponse.json(parsedContent)
  } catch (error: any) {
    console.error("Erro na API de análise:", error)

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
        error: error?.message || "Erro ao analisar imagem",
        code: "UNKNOWN_ERROR"
      },
      { status: 500 }
    )
  }
}
