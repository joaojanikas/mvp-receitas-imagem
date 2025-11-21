import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
})

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 }
      )
    }

    // Analisar imagem com OpenAI Vision
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analise esta imagem e identifique TODOS os ingredientes alimentares visíveis. Liste apenas os nomes dos ingredientes em português, separados por vírgula. Seja específico (ex: 'tomate', 'cebola', 'alho', 'frango'). Se não houver alimentos na imagem, retorne uma lista vazia."
            },
            {
              type: "image_url",
              image_url: {
                url: image
              }
            }
          ]
        }
      ],
      max_tokens: 500
    })

    const content = response.choices[0]?.message?.content || ""
    
    // Processar resposta
    const ingredients = content
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0)

    if (ingredients.length === 0) {
      return NextResponse.json(
        { error: "Nenhum ingrediente detectado na imagem" },
        { status: 400 }
      )
    }

    return NextResponse.json({ ingredients })
  } catch (error) {
    console.error("Erro ao analisar ingredientes:", error)
    return NextResponse.json(
      { error: "Erro ao processar imagem" },
      { status: 500 }
    )
  }
}
