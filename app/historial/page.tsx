'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { fmt } from '@/lib/utils'

const HISTORY = [
  { date: '01/05', price: 2200 }, { date: '08/05', price: 2100 },
  { date: '15/05', price: 2050 }, { date: '22/05', price: 1980 },
  { date: '28/05', price: 1850 },
]

export default function HistorialPage() {
  const [alertPrice, setAlertPrice] = useState('')
  const max = Math.max(...HISTORY.map(h => h.price))
  const min = Math.min(...HISTORY.map(h => h.price))

  return (
    <>
      <Header />
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '28px 20px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1A1A1A', marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>
          📈 Historial de Precios
        </h1>
        <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 28 }}>
          Seguí cómo evolucionaron los precios para tomar mejores decisiones de compra.
        </p>

        <div style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #F0F0F0', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#1A1A1A' }}>Coca Cola 2.25L</div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>Súper El Ahorro · Últimos 30 días</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Precio actual</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#00C853' }}>{fmt(1850)}</div>
            </div>
          </div>

          {/* Bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140, padding: '0 4px' }}>
            {HISTORY.map((h, i) => {
              const pct = ((h.price - min) / (max - min + 1)) * 100
              const height = 25 + pct * 0.72
              const isLast = i === HISTORY.length - 1
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isLast ? '#00C853' : '#6B7280' }}>{fmt(h.price)}</div>
                  <div style={{ width: '100%', height: `${height}%`, background: isLast ? '#00C853' : '#00C85344', borderRadius: '6px 6px 0 0', transition: 'all 0.3s' }} />
                  <div style={{ fontSize: 11, color: '#6B7280' }}>{h.date}</div>
                </div>
              )
            })}
          </div>

          <div style={{ marginTop: 16, padding: '12px 16px', background: '#E8F5E9', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#00A843', fontWeight: 600 }}>💰 Bajó {fmt(max - min)} en 30 días</span>
            <Badge color="#00C853">-{Math.round(((max - min) / max) * 100)}%</Badge>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: 18, border: '1px solid #F0F0F0', marginBottom: 100 }}>
          <h3 style={{ fontWeight: 800, color: '#1A1A1A', margin: '0 0 16px' }}>🔔 Crear alerta de precio</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input value={alertPrice} onChange={e => setAlertPrice(e.target.value)}
              placeholder="Precio objetivo: ej. $1700"
              style={{ flex: 1, minWidth: 160, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
            <Button variant="primary" size="md">🔔 Activar alerta</Button>
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 8 }}>Te notificaremos cuando el precio baje a tu objetivo.</div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
