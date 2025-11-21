import { NextResponse } from 'next/server'

// Portal de gerenciamento de assinatura - Plataforma Lasy
export async function POST(request: Request) {
  try {
    // Redirecionar para página de perfil com aba de assinatura
    return NextResponse.json({
      url: '/perfil?tab=subscription'
    })
  } catch (error) {
    console.error('Erro ao criar sessão do portal:', error)
    return NextResponse.json(
      { error: 'Erro ao acessar portal de assinatura' },
      { status: 500 }
    )
  }
}
