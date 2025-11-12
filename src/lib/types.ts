export type PlanoTipo = 'free' | 'pro' | 'premium'

export interface Usuario {
  id: string
  email: string
  nome: string
  plano: PlanoTipo
  created_at: string
}

export interface Veiculo {
  id: string
  usuario_id: string
  marca: string
  modelo: string
  ano: number
  placa: string
  km_atual: number
  created_at: string
}

export interface Revisao {
  id: string
  veiculo_id: string
  tipo: 'oleo' | 'alinhamento' | 'balanceamento' | 'freios' | 'filtros' | 'outros'
  descricao: string
  km_realizado: number
  km_proximo: number
  data_realizada: string
  data_proxima: string
  status: 'pendente' | 'realizada' | 'atrasada'
  created_at: string
}

export const LIMITES_PLANOS = {
  free: 1,
  pro: 3,
  premium: 10
}

export const TIPOS_REVISAO = [
  { value: 'oleo', label: 'Troca de Óleo', km_intervalo: 5000 },
  { value: 'alinhamento', label: 'Alinhamento', km_intervalo: 10000 },
  { value: 'balanceamento', label: 'Balanceamento', km_intervalo: 10000 },
  { value: 'freios', label: 'Revisão de Freios', km_intervalo: 15000 },
  { value: 'filtros', label: 'Troca de Filtros', km_intervalo: 10000 },
  { value: 'outros', label: 'Outros', km_intervalo: 0 }
]
