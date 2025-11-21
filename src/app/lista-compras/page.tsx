"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Check, Trash2, Sparkles, Printer, Share2, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface ShoppingItem {
  id: string
  name: string
  quantity: string
  category: string
  checked: boolean
  inFridge: boolean
}

const mockShoppingList: ShoppingItem[] = [
  { id: "1", name: "Leite", quantity: "2L", category: "Laticínios", checked: false, inFridge: false },
  { id: "2", name: "Ovos", quantity: "12 unidades", category: "Laticínios", checked: false, inFridge: true },
  { id: "3", name: "Tomates", quantity: "1kg", category: "Vegetais", checked: false, inFridge: false },
  { id: "4", name: "Alface", quantity: "1 unidade", category: "Vegetais", checked: true, inFridge: false },
  { id: "5", name: "Frango", quantity: "1kg", category: "Carnes", checked: false, inFridge: false },
  { id: "6", name: "Arroz", quantity: "2kg", category: "Grãos", checked: false, inFridge: true },
  { id: "7", name: "Maçãs", quantity: "6 unidades", category: "Frutas", checked: false, inFridge: false },
  { id: "8", name: "Queijo", quantity: "300g", category: "Laticínios", checked: false, inFridge: false },
  { id: "9", name: "Pão", quantity: "1 unidade", category: "Padaria", checked: false, inFridge: false },
  { id: "10", name: "Azeite", quantity: "500ml", category: "Óleos", checked: false, inFridge: true }
]

const categories = ["Laticínios", "Vegetais", "Carnes", "Frutas", "Grãos", "Padaria", "Óleos", "Outros"]

export default function ListaComprasPage() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(mockShoppingList)
  const [newItem, setNewItem] = useState({ name: "", quantity: "", category: "Outros" })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleToggleItem = (id: string) => {
    setShoppingList(shoppingList.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const handleRemoveItem = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id))
  }

  const handleEditQuantity = (id: string, newQuantity: string) => {
    setShoppingList(shoppingList.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity) {
      alert("Preencha nome e quantidade!")
      return
    }

    const item: ShoppingItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
      checked: false,
      inFridge: false
    }

    setShoppingList([...shoppingList, item])
    setNewItem({ name: "", quantity: "", category: "Outros" })
    setShowAddForm(false)
  }

  const handleClearChecked = () => {
    setShoppingList(shoppingList.filter(item => !item.checked))
  }

  const handleGenerateFromWeeklyPlan = () => {
    alert("🗓️ Gerando lista completa baseada no seu Plano Semanal...")
    // Em produção, buscaria receitas do plano semanal e geraria lista automaticamente
  }

  const handleSendToWhatsApp = () => {
    const listText = shoppingList
      .filter(item => !item.checked)
      .map(item => `• ${item.name} - ${item.quantity}`)
      .join('\n')
    
    const message = encodeURIComponent(`🛒 *Lista de Compras Chef IA*\n\n${listText}`)
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  const totalItems = shoppingList.length
  const checkedItems = shoppingList.filter(item => item.checked).length
  const inFridgeItems = shoppingList.filter(item => item.inFridge).length
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Lista de Compras Inteligente
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Organizada automaticamente por categorias • Sincronizada com seu frigorífico
          </p>
        </div>

        {/* Progresso e Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Progresso
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {checkedItems} de {totalItems} itens
                </p>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {Math.round(progress)}%
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </Card>

          <Card className="p-6 shadow-lg rounded-2xl border-none bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                  Já no Frigorífico
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {inFridgeItems} itens detectados
                </p>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {inFridgeItems}
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg rounded-2xl border-none bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100">
                  Para Comprar
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  {totalItems - checkedItems - inFridgeItems} itens restantes
                </p>
              </div>
              <div className="text-3xl font-bold text-orange-600">
                {totalItems - checkedItems - inFridgeItems}
              </div>
            </div>
          </Card>
        </div>

        {/* Ações Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Button
            size="lg"
            onClick={() => setShowAddForm(!showAddForm)}
            className="h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleGenerateFromWeeklyPlan}
            className="h-14 border-2 border-purple-500 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Do Plano Semanal
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleSendToWhatsApp}
            className="h-14 border-2 border-green-500 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 font-semibold"
          >
            <Share2 className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handlePrint}
            className="h-14 border-2 border-blue-500 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold"
          >
            <Printer className="w-5 h-5 mr-2" />
            Imprimir
          </Button>
        </div>

        {checkedItems > 0 && (
          <div className="mb-6">
            <Button
              size="lg"
              variant="outline"
              onClick={handleClearChecked}
              className="w-full h-14 border-2 border-red-500 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Limpar Itens Marcados ({checkedItems})
            </Button>
          </div>
        )}

        {/* Formulário de Adicionar */}
        {showAddForm && (
          <Card className="p-6 mb-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Adicionar Novo Item
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Nome do item"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="h-12"
              />
              <Input
                placeholder="Quantidade"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
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
              <Button onClick={handleAddItem} className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600">
                Adicionar
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="h-12">
                Cancelar
              </Button>
            </div>
          </Card>
        )}

        {/* Lista por Categoria */}
        <div className="space-y-6">
          {categories.map(category => {
            const categoryItems = shoppingList.filter(item => item.category === category)
            if (categoryItems.length === 0) return null

            return (
              <Card key={category} className="p-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  {category}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    ({categoryItems.length} {categoryItems.length === 1 ? 'item' : 'itens'})
                  </span>
                </h2>
                <div className="space-y-3">
                  {categoryItems.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        item.checked
                          ? "bg-green-50 dark:bg-green-900/20 opacity-60"
                          : item.inFridge
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => handleToggleItem(item.id)}
                        className="w-6 h-6"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold text-lg ${
                            item.checked
                              ? "line-through text-gray-500 dark:text-gray-400"
                              : "text-gray-900 dark:text-white"
                          }`}>
                            {item.name}
                          </h3>
                          {item.inFridge && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                              Já no frigorífico
                            </Badge>
                          )}
                        </div>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => handleEditQuantity(item.id, e.target.value)}
                          className="text-sm text-gray-600 dark:text-gray-400 bg-transparent border-none outline-none focus:text-gray-900 dark:focus:text-white"
                        />
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
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Mensagem quando vazio */}
        {shoppingList.length === 0 && (
          <Card className="p-16 text-center shadow-2xl rounded-3xl border-none">
            <ShoppingCart className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Lista vazia
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Adicione itens para começar suas compras
            </p>
            <Button
              size="lg"
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Primeiro Item
            </Button>
          </Card>
        )}

        {/* Banner Premium */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl shadow-lg">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">
                💡 Funcionalidade Premium
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Com o plano Premium, sua lista de compras é gerada automaticamente baseada no seu plano semanal, organizada por corredores do supermercado e sincronizada em tempo real com seu frigorífico inteligente!
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                Conhecer Premium
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .container * {
            visibility: visible;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
