'use client'
import { useState } from 'react'
import type { Oferta } from '@/types'
import { fmt, whatsappUrl } from '@/lib/utils'
import { getProductIcon, COMERCIOS } from '@/lib/data'
import Badge from './ui/Badge'
import Button from './ui/Button'

interface Props {
  oferta: Oferta
  saved?: boolean
  onSave?: (id: string) => void
}

export default function OfferCard({ oferta, saved, onSave }: Props) {
  const [showWA, setShowWA] = useState(false)
  const comercio = COMERCIOS.find(c => c.id === oferta.comercio_id)
  const icon = getProductIcon(oferta.nombre_producto)

  const handleWA = () => {
    if (!comercio?.whatsapp) return
    const msg = `Hola! Vi la oferta de ${oferta.nombre_producto} a ${fmt(oferta.precio)} en PromoRadar. ¿Está disponible?`
    window.open(whatsappUrl(comercio.whatsapp, msg), '_blank')
  }

  return (
    <div style={{
      background: '#fff', borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #F0F0F0',
      transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer',
      position: 'relative',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)' }}
    >
      {oferta.destacada && (
        <div style={{ position: 'absolute', top: 12, left: 12, background: '#FF6B35', color: '#fff', borderRadius: 8, padding: '3px 9px', fontSize: 11, fontWeight: 800, zIndex: 2 }}>
          🔥 HOT
        </div>
      )}

      {onSave && (
        <button
          onClick={e => { e.stopPropagation(); onSave(oferta.id) }}
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, background: saved ? '#00C853' : 'rgba(0,0,0,0.15)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      )}

      {/* Image area */}
      <div style={{ background: 'linear-gradient(135deg,#F0FFF4,#E8F5E9)', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 58 }}>
        {icon}
      </div>

      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          <Badge color="#00C853" small>Almacén</Badge>
          <Badge color="#EF4444" small>-{oferta.descuento_pct}%</Badge>
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A', marginBottom: 4, lineHeight: 1.3 }}>
          {oferta.nombre_producto}
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
          🏪 {comercio?.nombre ?? 'Comercio'} · 📍 {comercio?.direccion ?? ''}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#00C853' }}>{fmt(oferta.precio)}</span>
          {oferta.precio_anterior && (
            <span style={{ fontSize: 13, color: '#6B7280', textDecoration: 'line-through' }}>{fmt(oferta.precio_anterior)}</span>
          )}
        </div>

        <Button variant="whatsapp" size="sm" fullWidth onClick={handleWA}>
          💬 Consultar por WhatsApp
        </Button>
      </div>
    </div>
  )
}
