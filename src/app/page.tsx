"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Car } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona automaticamente para o dashboard
    router.push('/dashboard')
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950">
      <Car className="h-16 w-16 text-blue-600 animate-pulse" />
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        Meu Mecânico
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Carregando...
      </p>
    </div>
  )
}
