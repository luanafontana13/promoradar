'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import OfferCard from '@/components/OfferCard'
import { OFERTAS, CATEGORIAS } from '@/lib/data'

function OffersContent() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('discount')
  const [filterCat, setFilterCat] = useState(searchParams.get('categoria') || 'all')
  const [savedOffers, setSavedOffers] = useState<string[]>([])

  const filtered = useMemo(() =>
    OFERTAS
      .filter(o => !search || o.nombre_producto.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => sortBy === 'discount' ? b.descuento_pct - a.descuento_pct : a.precio - b.precio),
    [search, sortBy, filterCat]
  )

  const toggleSave = (id: string) =>
    setSavedOffers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1A1A1A', marginBottom: 20, fontFamily: "'Syne',sans-serif" }}>
        🏷️ Todas las Ofertas
      </h1>
      <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Buscar oferta..."
            style={{ flex: 1, minWidth: 180, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A', background: '#fff', cursor: 'pointer' }}>
            <option value="discount">Mayor descuento</option>
            <option value="price">Menor precio</option>
          </select>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A', background: '#fff', cursor: 'pointer' }}>
            <option value="all">Todas las categorías</option>
            {CATEGORIAS.map(c => <option key={c.id} value={c.nombre}>{c.icono} {c.nombre}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 12, fontSize: 13, color: '#6B7280' }}>
        <strong style={{ color: '#1A1A1A' }}>{filtered.length}</strong> ofertas encontradas
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16, paddingBottom: 100 }}>
        {filtered.map(o => <OfferCard key={o.id} oferta={o} saved={savedOffers.includes(o.id)} onSave={toggleSave} />)}
      </div>
    </main>
  )
}

export default function OffersPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Cargando...</div>}>
        <OffersContent />
      </Suspense>
      <Footer />
      <BottomNav />
    </>
  )
}
