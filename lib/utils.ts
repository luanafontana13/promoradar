export const fmt = (n: number) =>
  `$${n.toLocaleString('es-AR', { minimumFractionDigits: 0 })}`

export const discountPct = (prev: number, curr: number) =>
  Math.round(((prev - curr) / prev) * 100)

export const whatsappUrl = (phone: string, message: string) =>
  `https://wa.me/54${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

export const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'hace unos minutos'
  if (h < 24) return `hace ${h}h`
  return `hace ${Math.floor(h / 24)}d`
}

export const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ')
