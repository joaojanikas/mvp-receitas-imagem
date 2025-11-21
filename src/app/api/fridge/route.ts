import { NextRequest, NextResponse } from 'next/server'
import { getFridgeItems, addFridgeItem, removeFridgeItem } from '@/lib/database'
import { getMockUserId } from '@/lib/auth'

// GET - Buscar itens do frigorífico
export async function GET(request: NextRequest) {
  try {
    const userId = getMockUserId()
    const items = await getFridgeItems(userId)
    
    return NextResponse.json({ items })
  } catch (error: any) {
    console.error('Erro ao buscar itens do frigorífico:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar itens', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Adicionar item ao frigorífico
export async function POST(request: NextRequest) {
  try {
    const userId = getMockUserId()
    const item = await request.json()
    
    const savedItem = await addFridgeItem(item, userId)
    
    return NextResponse.json({ item: savedItem })
  } catch (error: any) {
    console.error('Erro ao adicionar item:', error)
    return NextResponse.json(
      { error: 'Erro ao adicionar item', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Remover item do frigorífico
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get('id')
    
    if (!itemId) {
      return NextResponse.json(
        { error: 'ID do item não fornecido' },
        { status: 400 }
      )
    }
    
    await removeFridgeItem(itemId)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erro ao remover item:', error)
    return NextResponse.json(
      { error: 'Erro ao remover item', details: error.message },
      { status: 500 }
    )
  }
}
