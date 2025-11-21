"use client"

import { useState } from "react"
import { Camera, Plus, Trash2, AlertTriangle, CheckCircle, Clock, Refrigerator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface FoodItem {
  id: string
  name: string
  quantity: string
  expiryDate: string
  daysUntilExpiry: number
  category: string
}

const mockFoodItems: FoodItem[] = [
  {
    id: "1",
    name: "Leite",
    quantity: "1L",
    expiryDate: "2024-01-25",
    daysUntilExpiry: 2,
    category: "Laticínios"
  },
  {
    id: "2",
    name: "Tomates",
    quantity: "500g",
    expiryDate: "2024-01-28",
    daysUntilExpiry: 5,
    category: "Vegetais"
  },
  {
    id: "3",
    name: "Frango",
    quantity: "1kg",
    expiryDate: "2024-01-24",
    daysUntilExpiry: 1,
    category: "Carnes"
  },
  {
    id: "4",
    name: "Queijo",
    quantity: "300g",
    expiryDate: "2024-02-05",
    daysUntilExpiry: 13,
    category: "Laticínios"
  },
  {
    id: "5",
    name: "Alface",
    quantity: "1 unidade",
    expiryDate: "2024-01-26",
    daysUntilExpiry: 3,
    category: "Vegetais"
  }
]

const getExpiryStatus = (days: number) => {
  if (days <= 1) return { color: "bg-red-500", text: "Urgente", icon: AlertTriangle }
  if (days <= 3) return { color: "bg-orange-500", text: "Atenção", icon: Clock }
  if (days <= 7) return { color: "bg-yellow-500", text: "Próximo", icon: Clock }
  return { color: "bg-green-500", text: "Fresco", icon: CheckCircle }
}

const categories = ["Laticínios", "Vegetais", "Carnes", "Frutas", "Grãos", "Outros"]

export default function FrigorificoPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems)
  const [isScanning, setIsScanning] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    category: "Outros"
  })

  const handleScan = async () => {
    setIsScanning(true)
    // Simular scan
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsScanning(false)
    alert("Scan concluído! 3 novos itens detectados.")
  }

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.expiryDate) {
      alert("Preencha todos os campos!")
      return
    }

    const today = new Date()
    const expiry = new Date(newItem.expiryDate)
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    const item: FoodItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      expiryDate: newItem.expiryDate,
      daysUntilExpiry,
      category: newItem.category
    }

    setFoodItems([...foodItems, item])
    setNewItem({ name: "", quantity: "", expiryDate: "", category: "Outros" })
    setShowAddForm(false)
  }

  const handleRemoveItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id))
  }

  const urgentItems = foodItems.filter(item => item.daysUntilExpiry <= 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg">
              <Refrigerator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Frigorífico Inteligente
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Gerencie seus alimentos e receba alertas de validade automaticamente
          </p>
        </div>

        {/* Alertas Urgentes */}
        {urgentItems.length > 0 && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl shadow-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-red-900 dark:text-red-100 mb-2">
                  ⚠️ Atenção! {urgentItems.length} {urgentItems.length === 1 ? 'item vence' : 'itens vencem'} em breve
                </h3>
                <div className="flex flex-wrap gap-2">
                  {urgentItems.map(item => (
                    <Badge key={item.id} variant="destructive" className="text-sm">
                      {item.name} ({item.daysUntilExpiry} {item.daysUntilExpiry === 1 ? 'dia' : 'dias'})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button
            size="lg"
            onClick={handleScan}
            disabled={isScanning}
            className="h-16 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-lg font-semibold shadow-lg"
          >
            <Camera className="w-6 h-6 mr-2" />
            {isScanning ? "Escaneando..." : "Escanear Frigorífico"}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowAddForm(!showAddForm)}
            className="h-16 border-2 border-blue-500 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-lg font-semibold"
          >
            <Plus className="w-6 h-6 mr-2" />
            Adicionar Manualmente
          </Button>
        </div>

        {/* Formulário de Adicionar */}
        {showAddForm && (
          <Card className="p-6 mb-8 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Adicionar Novo Item
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Nome do alimento"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="h-12"
              />
              <Input
                placeholder="Quantidade (ex: 1kg, 500g)"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                className="h-12"
              />
              <Input
                type="date"
                value={newItem.expiryDate}
                onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                className="h-12"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="h-12 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <Button onClick={handleAddItem} className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-600">
                Adicionar
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="h-12">
                Cancelar
              </Button>
            </div>
          </Card>
        )}

        {/* Lista de Alimentos por Categoria */}
        <div className="space-y-6">
          {categories.map(category => {
            const categoryItems = foodItems.filter(item => item.category === category)
            if (categoryItems.length === 0) return null

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {category} ({categoryItems.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryItems.map(item => {
                    const status = getExpiryStatus(item.daysUntilExpiry)
                    const StatusIcon = status.icon

                    return (
                      <Card
                        key={item.id}
                        className="p-5 shadow-lg rounded-2xl border-none bg-white dark:bg-gray-800 hover:shadow-xl transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.quantity}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className={`${status.color} text-white border-none flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.text}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.daysUntilExpiry} {item.daysUntilExpiry === 1 ? 'dia' : 'dias'}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Validade: {new Date(item.expiryDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mensagem quando vazio */}
        {foodItems.length === 0 && (
          <Card className="p-16 text-center shadow-2xl rounded-3xl border-none">
            <Refrigerator className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Frigorífico vazio
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Adicione seus alimentos para começar a gerenciar
            </p>
            <Button
              size="lg"
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Primeiro Item
            </Button>
          </Card>
        )}
      </main>
    </div>
  )
}
