'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import OfferCard from '@/components/OfferCard'
import { OFERTAS } from '@/lib/data'

export default function FavoritosPage() {
  const [saved, setSaved] = useState<string[]>(['1', '4'])
  const favs = OFERTAS.filter(o => saved.includes(o.id))
  const toggle = (id: string) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <>
      <Header />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1A1A1A', marginBottom: 20, fontFamily: "'Syne',sans-serif" }}>
          ❤️ Mis Favoritos
        </h1>
        {favs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 18, border: '1px solid #F0F0F0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🤍</div>
            <div style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 18, marginBottom: 8 }}>Aún no guardaste nada</div>
            <div style={{ color: '#6B7280' }}>Tocá el corazón en las ofertas para guardarlas aquí</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16, paddingBottom: 100 }}>
            {favs.map(o => <OfferCard key={o.id} oferta={o} saved onSave={toggle} />)}
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
