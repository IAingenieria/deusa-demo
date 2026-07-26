// Utilidades de formato para el demo.

export const money = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(n || 0))

export const fechaCorta = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso)
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const fechaLarga = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso)
  return d.toLocaleDateString('es-MX', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  })
}

export const diaClave = (iso) => (iso || '').slice(0, 10)

// Etiquetas legibles para estados de pedido
export const LABEL_ESTADO = {
  solicitado: 'Solicitado',
  comprado: 'Comprado',
  en_camino: 'En camino',
  entregado: 'Entregado',
}

export const LABEL_ITEM = {
  pendiente: 'Pendiente',
  comprado: 'Comprado',
  agotado: 'Agotado',
  sustituido: 'Sustituido',
}

// Colores (clases Tailwind) por estado de pedido
export const COLOR_ESTADO = {
  solicitado: 'bg-amber-100 text-amber-700',
  comprado: 'bg-blue-100 text-blue-700',
  en_camino: 'bg-purple-100 text-purple-700',
  entregado: 'bg-green-100 text-green-700',
}

export const COLOR_ITEM = {
  pendiente: 'bg-gray-100 text-gray-600',
  comprado: 'bg-green-100 text-green-700',
  agotado: 'bg-red-100 text-red-700',
  sustituido: 'bg-amber-100 text-amber-700',
}
