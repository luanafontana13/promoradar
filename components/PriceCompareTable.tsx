import type { ProductoConPrecios } from '@/types'
import { fmt } from '@/lib/utils'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { COMERCIOS } from '@/lib/data'
import { whatsappUrl } from '@/lib/utils'

interface Props {
  product: ProductoConPrecios & { score: number }
}

export default function PriceCompareTable({ product }: Props) {
  const sorted = [...product.precios].sort((a, b) => a.precio - b.precio)
  const cheapest = sorted[0]
  const diff = sorted.length > 1 ? sorted[sorted.length - 1].precio - cheapest.precio : 0

  const handleWA = (comercioId: string) => {
    const c = COMERCIOS.find(x => x.id === comercioId)
    if (!c?.whatsapp) return
    window.open(whatsappUrl(c.whatsapp, `Hola! Vi el precio de ${product.nombre} en PromoRadar. ¿Está disponible?`), '_blank')
  }

  return (
    <div style={{ background: '#fff', borderRadius: 18, padding: 24, marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #F0F0F0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', margin: '0 0 6px' }}>{product.nombre}</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge color="#00C853">🎯 Coincidencia: {Math.round(product.score * 100)}%</Badge>
          </div>
        </div>
        {diff > 0 && (
          <div style={{ background: '#E8F5E9', borderRadius: 10, padding: '10px 16px', border: '1px solid #00C85333', textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Podés ahorrar hasta</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#00C853' }}>{fmt(diff)}</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>comprando en {cheapest.comercio}</div>
          </div>
        )}
      </div>

      {sorted.map((entry, i) => {
        const isCheapest = i === 0
        return (
          <div key={entry.comercio_id} style={{
            display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', gap: 12,
            padding: '14px 16px', background: isCheapest ? '#00C85308' : '#fff', borderRadius: 12,
            border: `1.5px solid ${isCheapest ? '#00C853' : '#F0F0F0'}`, marginBottom: 8,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: isCheapest ? '#00C853' : '#F3F4F6', color: isCheapest ? '#fff' : '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A' }}>{entry.comercio}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Actualizado {entry.updated}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: isCheapest ? '#00C853' : '#1A1A1A' }}>{fmt(entry.precio)}</div>
              {isCheapest && <Badge color="#00C853" small>Más barato</Badge>}
              {!entry.stock && <Badge color="#EF4444" small>Sin stock</Badge>}
            </div>
            <Button variant="whatsapp" size="sm" onClick={() => handleWA(entry.comercio_id)}>💬</Button>
          </div>
        )
      })}
    </div>
  )
}
