'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { OFERTAS, CATEGORIAS } from '@/lib/data'
import { fmt } from '@/lib/utils'

const SECTIONS = [
  { id: 'overview', label: '📊 Resumen' },
  { id: 'offers', label: '🏷️ Mis Ofertas' },
  { id: 'new', label: '➕ Nueva Oferta' },
  { id: 'stats', label: '📈 Estadísticas' },
]

export default function PanelPage() {
  const [section, setSection] = useState('overview')
  const myOffers = OFERTAS.filter(o => o.comercio_id === '1')

  return (
    <>
      <Header />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px', paddingBottom: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🏪</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1A1A1A', margin: '0 0 4px', fontFamily: "'Syne',sans-serif" }}>Panel de Comercio</h1>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#6B7280' }}>Súper El Ahorro</span>
              <Badge color="#F59E0B" small>PRO</Badge>
              <Badge color="#00C853" small>✅ Verificado</Badge>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)}
              style={{ padding: '9px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                background: section === s.id ? '#00C853' : '#fff', color: section === s.id ? '#fff' : '#6B7280',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>
              {s.label}
            </button>
          ))}
        </div>

        {section === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14, marginBottom: 24 }}>
              {[{ icon: '👁️', value: '1,248', label: 'Vistas este mes' }, { icon: '🏷️', value: '34', label: 'Ofertas activas' }, { icon: '❤️', value: '89', label: 'Guardados' }, { icon: '💬', value: '23', label: 'Consultas WhatsApp', color: '#FF6B35' }].map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: ((s.color || '#00C853') + '18'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A' }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #F0F0F0' }}>
              <h3 style={{ fontWeight: 800, color: '#1A1A1A', margin: '0 0 16px' }}>Últimas ofertas</h3>
              {myOffers.map(o => (
                <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F0F0F0' }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{o.nombre_producto}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#00C853' }}>{fmt(o.precio)}</span>
                    <Badge color="#EF4444" small>-{o.descuento_pct}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'offers' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {myOffers.map(o => (
              <div key={o.id} style={{ background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{o.nombre_producto}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Badge color="#00C853" small>Activa</Badge>
                    <Badge color="#EF4444" small>-{o.descuento_pct}%</Badge>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>{fmt(o.precio)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="ghost" size="sm">✏️ Editar</Button>
                  <Button variant="danger" size="sm">🗑️</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'new' && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #F0F0F0' }}>
            <h3 style={{ fontWeight: 800, color: '#1A1A1A', margin: '0 0 20px' }}>➕ Publicar nueva oferta</h3>
            <div style={{ display: 'grid', gap: 14 }}>
              {[['Nombre del producto', 'Ej: Coca Cola 2.25L', 'text'], ['Precio actual ($)', '1850', 'number'], ['Precio anterior ($)', '2200', 'number']].map(([label, ph, type]) => (
                <div key={label as string}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>{label}</label>
                  <input type={type as string} placeholder={ph as string}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Categoría</label>
                <select style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A', background: '#fff', cursor: 'pointer' }}>
                  {CATEGORIAS.map(c => <option key={c.id}>{c.icono} {c.nombre}</option>)}
                </select>
              </div>
              <div style={{ background: '#F3F4F6', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px dashed #D1D5DB', cursor: 'pointer' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
                <div style={{ fontSize: 14, color: '#6B7280' }}>Subir imagen del producto</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>PNG, JPG hasta 5MB</div>
              </div>
              <Button variant="primary" size="lg" fullWidth>📤 Publicar Oferta</Button>
            </div>
          </div>
        )}

        {section === 'stats' && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #F0F0F0' }}>
            <h3 style={{ fontWeight: 800, color: '#1A1A1A', margin: '0 0 20px' }}>📈 Estadísticas</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {[{ label: 'Vistas totales', value: '4,821', change: '+12%', good: true }, { label: 'Clics en WhatsApp', value: '234', change: '+8%', good: true }, { label: 'Guardados por usuarios', value: '89', change: '+21%', good: true }, { label: 'Posición en ranking ciudad', value: '#2', change: '▲1', good: true }].map(stat => (
                <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#F9FAFB', borderRadius: 10 }}>
                  <span style={{ fontSize: 14, color: '#1A1A1A' }}>{stat.label}</span>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>{stat.value}</span>
                    <Badge color={stat.good ? '#00C853' : '#EF4444'} small>{stat.change}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
