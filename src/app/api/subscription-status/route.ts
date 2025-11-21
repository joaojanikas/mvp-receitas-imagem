import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar assinatura ativa do usuário
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (subError && subError.code !== 'PGRST116') {
      console.error('Erro ao buscar assinatura:', subError)
      return NextResponse.json(
        { error: 'Erro ao verificar assinatura' },
        { status: 500 }
      )
    }

    // Buscar perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('is_premium, premium_expires_at')
      .eq('user_id', userId)
      .single()

    if (profileError) {
      console.error('Erro ao buscar perfil:', profileError)
      return NextResponse.json(
        { error: 'Erro ao verificar perfil' },
        { status: 500 }
      )
    }

    const now = new Date()
    const expiresAt = profile?.premium_expires_at ? new Date(profile.premium_expires_at) : null
    const isActive = profile?.is_premium && (!expiresAt || expiresAt > now)

    return NextResponse.json({
      is_premium: isActive,
      subscription: subscription || null,
      expires_at: profile?.premium_expires_at || null
    })
  } catch (error) {
    console.error('Erro ao verificar status da assinatura:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
