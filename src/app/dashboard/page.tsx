"use client"

import { useState, useEffect } from 'react'
import { Car, Plus, AlertCircle, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Navbar from '@/components/custom/navbar'
import Link from 'next/link'
import { LIMITES_PLANOS, type PlanoTipo } from '@/lib/types'

export default function DashboardPage() {
  const [planoAtual] = useState<PlanoTipo>('free')
  const [veiculosCount] = useState(0)
  const [revisoesProximas] = useState(0)
  const [revisoesAtrasadas] = useState(0)

  const limiteVeiculos = LIMITES_PLANOS[planoAtual]
  const percentualUso = (veiculosCount / limiteVeiculos) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie seus veículos e revisões em um só lugar
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Veículos Cadastrados
              </CardTitle>
              <Car className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {veiculosCount} / {limiteVeiculos}
              </div>
              <Progress value={percentualUso} className="mt-2" />
              <p className="text-xs text-gray-500 mt-2">
                Plano {planoAtual.toUpperCase()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Revisões Próximas
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {revisoesProximas}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Nos próximos 30 dias
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Revisões Atrasadas
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {revisoesAtrasadas}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Requer atenção imediata
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Seu Plano
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {planoAtual.toUpperCase()}
              </div>
              <Button variant="secondary" size="sm" className="w-full">
                Fazer Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Comece gerenciando seus veículos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/veiculos">
                <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Plus className="h-4 w-4" />
                  Adicionar Veículo
                </Button>
              </Link>
              <Button variant="outline" className="w-full gap-2">
                <Car className="h-4 w-4" />
                Ver Todos os Veículos
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Revisões</CardTitle>
              <CardDescription>
                Mantenha seus veículos em dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              {revisoesProximas === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma revisão agendada</p>
                  <p className="text-sm mt-1">Adicione veículos para começar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Lista de revisões será implementada no Módulo 2 */}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Planos Info */}
        {veiculosCount >= limiteVeiculos && (
          <Card className="mt-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
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
      </main>
    </div>
  )
}
