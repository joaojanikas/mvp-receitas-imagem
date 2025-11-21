import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { toggleFavorite } from '@/lib/database'

// GET - Buscar receita específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: recipe, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ recipe })
  } catch (error: any) {
    console.error('Erro ao buscar receita:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar receita', details: error.message },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar receita (favorito, etc)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    if (body.is_favorite !== undefined) {
      const recipe = await toggleFavorite(params.id, body.is_favorite)
      return NextResponse.json({ recipe })
    }
    
    // Outras atualizações
    const { data: recipe, error } = await supabase
      .from('recipes')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ recipe })
  } catch (error: any) {
    console.error('Erro ao atualizar receita:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar receita', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Deletar receita
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', params.id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erro ao deletar receita:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar receita', details: error.message },
      { status: 500 }
    )
  }
}
