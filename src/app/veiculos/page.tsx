"use client"

import { useState } from 'react'
import { Car, Plus, Edit, Trash2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/custom/navbar'
import { LIMITES_PLANOS, type PlanoTipo, type Veiculo } from '@/lib/types'

export default function VeiculosPage() {
  const [planoAtual] = useState<PlanoTipo>('free')
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    placa: '',
    km_atual: 0
  })

  const limiteVeiculos = LIMITES_PLANOS[planoAtual]
  const podeAdicionar = veiculos.length < limiteVeiculos

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!podeAdicionar) {
      alert('Limite de veículos atingido! Faça upgrade do seu plano.')
      return
    }

    const novoVeiculo: Veiculo = {
      id: Math.random().toString(36).substr(2, 9),
      usuario_id: 'user-demo',
      ...formData,
      created_at: new Date().toISOString()
    }

    setVeiculos([...veiculos, novoVeiculo])
    setDialogOpen(false)
    setFormData({
      marca: '',
      modelo: '',
      ano: new Date().getFullYear(),
      placa: '',
      km_atual: 0
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este veículo?')) {
      setVeiculos(veiculos.filter(v => v.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Meus Veículos
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {veiculos.length} de {limiteVeiculos} veículos cadastrados
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                disabled={!podeAdicionar}
              >
                <Plus className="h-4 w-4" />
                Adicionar Veículo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Veículo</DialogTitle>
                <DialogDescription>
                  Preencha os dados do seu veículo para começar o monitoramento
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="marca">Marca</Label>
                    <Input
                      id="marca"
                      placeholder="Ex: Toyota"
                      value={formData.marca}
                      onChange={(e) => setFormData({...formData, marca: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modelo">Modelo</Label>
                    <Input
                      id="modelo"
                      placeholder="Ex: Corolla"
                      value={formData.modelo}
                      onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ano">Ano</Label>
                    <Input
                      id="ano"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      value={formData.ano}
                      onChange={(e) => setFormData({...formData, ano: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="placa">Placa</Label>
                    <Input
                      id="placa"
                      placeholder="ABC-1234"
                      value={formData.placa}
                      onChange={(e) => setFormData({...formData, placa: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="km_atual">Quilometragem Atual</Label>
                  <Input
                    id="km_atual"
                    type="number"
                    min="0"
                    placeholder="Ex: 50000"
                    value={formData.km_atual}
                    onChange={(e) => setFormData({...formData, km_atual: parseInt(e.target.value)})}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Adicionar Veículo
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Limite Warning */}
        {!podeAdicionar && (
          <Card className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <AlertCircle className="h-5 w-5" />
                Limite de Veículos Atingido
              </CardTitle>
              <CardDescription className="text-yellow-700 dark:text-yellow-300">
                Você atingiu o limite de {limiteVeiculos} veículo(s) do plano {planoAtual.toUpperCase()}. 
                Faça upgrade para adicionar mais veículos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                Ver Planos Disponíveis
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Lista de Veículos */}
        {veiculos.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Car className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Nenhum veículo cadastrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                Adicione seu primeiro veículo para começar a monitorar as revisões e manutenções
              </p>
              <Button 
                onClick={() => setDialogOpen(true)}
                className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Plus className="h-4 w-4" />
                Adicionar Primeiro Veículo
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {veiculos.map((veiculo) => (
              <Card key={veiculo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Car className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {veiculo.marca} {veiculo.modelo}
                        </CardTitle>
                        <CardDescription>
                          {veiculo.ano} • {veiculo.placa}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Quilometragem
                      </span>
                      <Badge variant="secondary" className="font-mono">
                        {veiculo.km_atual.toLocaleString('pt-BR')} km
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Edit className="h-3 w-3" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(veiculo.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                        Remover
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
