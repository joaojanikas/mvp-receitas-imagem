import { NextRequest, NextResponse } from 'next/server'
import { getWeeklyPlan, saveWeeklyPlan } from '@/lib/database'
import { getMockUserId } from '@/lib/auth'

// GET - Buscar plano semanal
export async function GET(request: NextRequest) {
  try {
    const userId = getMockUserId()
    const { searchParams } = new URL(request.url)
    const weekStart = searchParams.get('weekStart') || new Date().toISOString().split('T')[0]
    
    const plan = await getWeeklyPlan(userId, weekStart)
    
    return NextResponse.json({ plan })
  } catch (error: any) {
    console.error('Erro ao buscar plano semanal:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar plano', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Salvar plano semanal
export async function POST(request: NextRequest) {
  try {
    const userId = getMockUserId()
    const { meals, weekStart } = await request.json()
    
    const plan = await saveWeeklyPlan(meals, userId, weekStart)
    
    return NextResponse.json({ plan })
  } catch (error: any) {
    console.error('Erro ao salvar plano:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar plano', details: error.message },
      { status: 500 }
    )
  }
}
