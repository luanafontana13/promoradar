'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import Badge from '@/components/ui/Badge'
import { COMERCIOS, CIUDADES } from '@/lib/data'

export default function ComerciosPage() {
  const [search, setSearch] = useState('')
  const [filterCity, setFilterCity] = useState('all')

  const filtered = COMERCIOS
    .filter(c => filterCity === 'all' || c.ciudad_id === filterCity)
    .filter(c => !search || c.nombre.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Header />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1A1A1A', marginBottom: 20, fontFamily: "'Syne',sans-serif" }}>
          🏪 Comercios
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24, background: '#fff', borderRadius: 14, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Buscar comercio..."
            style={{ flex: 1, minWidth: 180, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
          <select value={filterCity} onChange={e => setFilterCity(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A', background: '#fff', cursor: 'pointer' }}>
            <option value="all">Todas las ciudades</option>
            {CIUDADES.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16, paddingBottom: 100 }}>
          {filtered.map(c => (
            <div key={c.id} style={{ background: '#fff', borderRadius: 14, padding: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.12)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏪</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{c.nombre}</span>
                    {c.verificado && <span title="Verificado">✅</span>}
                    {c.premium && <Badge color="#F59E0B" small>PRO</Badge>}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>📍 {c.direccion}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
                <span>⭐ {c.rating}</span>
                <span style={{ color: '#6B7280' }}>|</span>
                <span style={{ color: '#00C853', fontWeight: 700 }}>{c.total_ofertas} ofertas</span>
                {c.whatsapp && (
                  <>
                    <span style={{ color: '#6B7280' }}>|</span>
                    <a href={`https://wa.me/54${c.whatsapp}`} target="_blank" rel="noreferrer"
                      style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none' }}>💬 WA</a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
