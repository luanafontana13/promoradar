'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import OfferCard from '@/components/OfferCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { OFERTAS, COMERCIOS, CATEGORIAS } from '@/lib/data'

export default function HomePage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [savedOffers, setSavedOffers] = useState<string[]>([])

  const handleSearch = () => {
    if (search.trim()) router.push(`/comparador?q=${encodeURIComponent(search)}`)
  }

  const toggleSave = (id: string) =>
    setSavedOffers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const featuredOffers = OFERTAS.filter(o => o.destacada || o.descuento_pct >= 20).slice(0, 4)

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#0A1F0D 0%,#0D2B11 50%,#0A1F0D 100%)', padding: '60px 20px 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: '#00C85318', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: '#00C85312', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#00C85322', border: '1px solid #00C85344', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C853', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
              <span style={{ color: '#00C853', fontSize: 13, fontWeight: 600 }}>🇦🇷 Gualeguaychú, Entre Ríos</span>
            </div>

            <h1 style={{ color: '#fff', fontSize: 'clamp(28px,6vw,52px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 16, fontFamily: "'Syne',sans-serif", letterSpacing: '-0.02em' }}>
              Encontrá las mejores<br />
              <span style={{ color: '#00C853' }}>ofertas locales</span>
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
              Compará precios de comercios de tu ciudad y ahorrá en cada compra.
            </p>

            <div style={{ display: 'flex', gap: 10, maxWidth: 560, margin: '0 auto', background: '#fff', borderRadius: 14, padding: '6px 6px 6px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <span style={{ fontSize: 20, lineHeight: '42px' }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder='Ej: Coca Cola 2.25, arroz 1kg...'
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, background: 'transparent', color: '#1A1A1A', fontFamily: 'inherit' }}
              />
              <Button variant="primary" size="md" onClick={handleSearch}>Buscar</Button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '16px 20px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[
              { icon: '🏷️', value: '248', label: 'Ofertas activas' },
              { icon: '🏪', value: '34',  label: 'Comercios registrados' },
              { icon: '💰', value: '40%', label: 'Ahorro promedio' },
            ].map(s => (
              <div key={s.label} style={{ background: '#F9FAFB', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#1A1A1A' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>

          {/* CATEGORIES */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', marginBottom: 16 }}>Categorías</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(96px,1fr))', gap: 10 }}>
              {CATEGORIAS.map(cat => (
                <div key={cat.id}
                  onClick={() => router.push(`/ofertas?categoria=${cat.nombre}`)}
                  style={{ background: '#fff', borderRadius: 14, padding: '16px 8px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F0F0F0'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{cat.icono}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>{cat.nombre}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURED OFFERS */}
          <section style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', margin: 0 }}>🔥 Ofertas Destacadas</h2>
              <Button variant="ghost" size="sm" onClick={() => router.push('/ofertas')}>Ver todas →</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
              {featuredOffers.map(o => (
                <OfferCard key={o.id} oferta={o} saved={savedOffers.includes(o.id)} onSave={toggleSave} />
              ))}
            </div>
          </section>

          {/* CTA COMPARADOR */}
          <section style={{ marginBottom: 40 }}>
            <div style={{ background: 'linear-gradient(135deg,#0A1F0D,#0D3318)', borderRadius: 20, padding: '28px 24px', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: '#00C853', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>⚡ FUNCIÓN PRINCIPAL</div>
                <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '0 0 8px', fontFamily: "'Syne',sans-serif" }}>Comparador de Precios</h3>
                <p style={{ color: '#9CA3AF', fontSize: 14, margin: 0 }}>Buscá un producto y encontrá quién lo tiene más barato.</p>
              </div>
              <Button variant="primary" size="lg" onClick={() => router.push('/comparador')}>🔍 Comparar ahora</Button>
            </div>
          </section>

          {/* COMERCIOS DESTACADOS */}
          <section style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', margin: 0 }}>🏪 Comercios Destacados</h2>
              <Button variant="ghost" size="sm" onClick={() => router.push('/comercios')}>Ver todos →</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
              {COMERCIOS.filter(c => c.premium).map(c => (
                <div key={c.id} style={{ background: '#fff', borderRadius: 14, padding: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', cursor: 'pointer' }}
                  onClick={() => router.push(`/comercios/${c.id}`)}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.12)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏪</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{c.nombre}</span>
                        {c.verificado && <span>✅</span>}
                        {c.premium && <Badge color="#F59E0B" small>PRO</Badge>}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>📍 {c.direccion}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
                    <span>⭐ {c.rating}</span>
                    <span style={{ color: '#6B7280' }}>|</span>
                    <span style={{ color: '#00C853', fontWeight: 700 }}>{c.total_ofertas} ofertas</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
