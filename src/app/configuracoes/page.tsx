"use client"

import { useState } from 'react'
import { Check, Crown, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/custom/navbar'
import { type PlanoTipo } from '@/lib/types'

const PLANOS = [
  {
    id: 'free' as PlanoTipo,
    nome: 'Free',
    preco: 0,
    icon: Shield,
    cor: 'from-gray-500 to-gray-600',
    veiculos: 1,
    recursos: [
      '1 veículo',
      'Monitoramento básico',
      'Alertas por e-mail',
      'Histórico de 30 dias'
    ]
  },
  {
    id: 'pro' as PlanoTipo,
    nome: 'Pro',
    preco: 29.90,
    icon: Zap,
    cor: 'from-blue-500 to-cyan-600',
    veiculos: 3,
    popular: true,
    recursos: [
      '3 veículos',
      'Monitoramento completo',
      'Alertas por WhatsApp',
      'Histórico ilimitado',
      'Relatórios mensais',
      'Suporte prioritário'
    ]
  },
  {
    id: 'premium' as PlanoTipo,
    nome: 'Premium',
    preco: 59.90,
    icon: Crown,
    cor: 'from-purple-500 to-pink-600',
    veiculos: 10,
    recursos: [
      '10 veículos',
      'Tudo do Pro +',
      'Alertas personalizados',
      'API de integração',
      'Múltiplos usuários',
      'Suporte 24/7',
      'Consultoria especializada'
    ]
  }
]

export default function ConfiguracoesPage() {
  const [planoAtual, setPlanoAtual] = useState<PlanoTipo>('free')

  const handleUpgrade = (plano: PlanoTipo) => {
    if (plano === planoAtual) return
    
    // Aqui seria integrado o sistema de pagamento
    alert(`Upgrade para o plano ${plano.toUpperCase()} será implementado em breve!`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Escolha Seu Plano
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Selecione o plano ideal para suas necessidades
          </p>
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PLANOS.map((plano) => {
            const Icon = plano.icon
            const isAtual = plano.id === planoAtual
            
            return (
              <Card 
                key={plano.id}
                className={`relative ${
                  plano.popular 
                    ? 'border-2 border-blue-500 shadow-xl scale-105' 
                    : isAtual 
                    ? 'border-2 border-green-500'
                    : ''
                }`}
              >
                {plano.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}

                {isAtual && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-600 text-white px-4 py-1">
                      Plano Atual
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${plano.cor} flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{plano.nome}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      R$ {plano.preco.toFixed(2)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/mês</span>
                  </div>
                  <CardDescription className="mt-2">
                    Até {plano.veiculos} veículo{plano.veiculos > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plano.recursos.map((recurso, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {recurso}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleUpgrade(plano.id)}
                    disabled={isAtual}
                    className={`w-full ${
                      plano.popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                        : ''
                    }`}
                    variant={isAtual ? 'outline' : 'default'}
                  >
                    {isAtual ? 'Plano Atual' : `Escolher ${plano.nome}`}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso mudar de plano depois?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  As mudanças são aplicadas imediatamente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como funciona o limite de veículos?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Cada plano permite cadastrar um número específico de veículos. 
                  Se precisar adicionar mais, basta fazer upgrade para um plano superior.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">As notificações por WhatsApp são automáticas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Sim! Nos planos Pro e Premium, você receberá alertas automáticos no WhatsApp 
                  quando suas revisões estiverem próximas ou atrasadas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
