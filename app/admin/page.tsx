'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { OFERTAS, COMERCIOS } from '@/lib/data'
import { fmt } from '@/lib/utils'

export default function AdminPage() {
  const [tab, setTab] = useState('pending')
  const pending = OFERTAS.slice(0, 3).map((o, i) => ({ ...o, submittedBy: COMERCIOS[i % COMERCIOS.length].nombre }))

  return (
    <>
      <Header />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px', paddingBottom: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#0A0F0D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⚡</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1A1A1A', margin: 0, fontFamily: "'Syne',sans-serif" }}>Panel Admin</h1>
            <div style={{ fontSize: 13, color: '#6B7280' }}>PromoRadar · Gualeguaychú</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
          {[{ icon: '⏳', value: '3', label: 'Pendientes', color: '#F59E0B' }, { icon: '✅', value: '248', label: 'Activas', color: '#00C853' }, { icon: '🏪', value: '34', label: 'Comercios', color: '#3B82F6' }, { icon: '🚫', value: '2', label: 'Spam reportado', color: '#EF4444' }].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '18px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#6B7280' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[{ id: 'pending', label: '⏳ Pendientes' }, { id: 'active', label: '✅ Activas' }, { id: 'spam', label: '🚫 Spam' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding: '9px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                background: tab === t.id ? '#0A0F0D' : '#fff', color: tab === t.id ? '#fff' : '#6B7280',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'pending' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {pending.map(o => (
              <div key={o.id} style={{ background: '#fff', borderRadius: 14, padding: 18, border: '2px solid #F59E0B44', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 15, marginBottom: 4 }}>{o.nombre_producto}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>Por: {o.submittedBy} · {fmt(o.precio)} · -{o.descuento_pct}%</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="primary" size="sm">✅ Aprobar</Button>
                    <Button variant="danger" size="sm">🗑️ Rechazar</Button>
                    <Button variant="ghost" size="sm">🌟 Destacar</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'active' && (
          <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #F0F0F0', textAlign: 'center', color: '#6B7280' }}>
            ✅ 248 publicaciones activas — todo en orden.
          </div>
        )}

        {tab === 'spam' && (
          <div style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #F0F0F0' }}>
            <div style={{ color: '#EF4444', fontWeight: 600, marginBottom: 12 }}>2 reportes de posible spam</div>
            {[1, 2].map(i => (
              <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#1A1A1A', fontSize: 14 }}>Oferta sospechosa #{i}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>Reportada por 3 usuarios</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="ghost" size="sm">👀 Revisar</Button>
                  <Button variant="danger" size="sm">🗑️ Eliminar</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
