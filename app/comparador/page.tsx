'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import PriceCompareTable from '@/components/PriceCompareTable'
import Button from '@/components/ui/Button'
import { PRODUCTOS_COMPARADOR } from '@/lib/data'
import { findSimilarProducts } from '@/lib/normalize'

const SUGGESTIONS = ['Coca Cola 2.25', 'Arroz 1kg', 'Pollo entero', 'Aceite girasol', 'Yerba 1kg']

function ComparadorContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<any[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = (q?: string) => {
    const term = q ?? query
    if (!term.trim()) return
    setQuery(term)
    setLoading(true)
    setSearched(false)
    setTimeout(() => {
      setResults(findSimilarProducts(term, PRODUCTOS_COMPARADOR))
      setSearched(true)
      setLoading(false)
    }, 600)
  }

  useEffect(() => {
    if (searchParams.get('q')) handleSearch(searchParams.get('q')!)
  }, [])

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '28px 20px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1A1A1A', marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>
        ⚖️ Comparador de Precios
      </h1>
      <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 24 }}>
        Buscá un producto y encontrá quién lo vende más barato. El sistema detecta nombres similares automáticamente.
      </p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 28, background: '#fff', borderRadius: 14, padding: '8px 8px 8px 18px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #F0F0F0' }}>
        <span style={{ fontSize: 20, lineHeight: '44px' }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder='Ej: "Coca Cola 2.25", "arroz 1kg", "pollo entero"...'
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, background: 'transparent', color: '#1A1A1A', fontFamily: 'inherit' }}
        />
        <Button variant="primary" size="md" onClick={() => handleSearch()}>
          {loading ? 'Buscando...' : 'Comparar'}
        </Button>
      </div>

      {!searched && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 10, fontWeight: 600 }}>BÚSQUEDAS POPULARES:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => handleSearch(s)}
                style={{ padding: '7px 14px', borderRadius: 20, border: '1.5px solid #00C853', background: '#E8F5E9', color: '#00A843', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
          <div>Comparando precios en tu ciudad...</div>
        </div>
      )}

      {searched && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', background: '#fff', borderRadius: 16, border: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>No encontramos ese producto</div>
          <div style={{ color: '#6B7280', fontSize: 14 }}>Probá con un nombre diferente o más general</div>
        </div>
      )}

      {results.map(p => <PriceCompareTable key={p.id} product={p} />)}

      <div style={{ background: '#F8FFF9', border: '1px solid #00C85333', borderRadius: 14, padding: 16, marginTop: 20 }}>
        <div style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 13, marginBottom: 6 }}>🤖 Algoritmo inteligente</div>
        <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>
          Detecta productos similares aunque estén escritos diferente. &quot;Coca Cola 2.25&quot; = &quot;Coca-Cola 2,25L&quot; = &quot;Coca 2250ml&quot;.
          Usa normalización de texto + similitud de Jaccard.
        </div>
      </div>
      <div style={{ height: 100 }} />
    </main>
  )
}

export default function ComparadorPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Cargando...</div>}>
        <ComparadorContent />
      </Suspense>
      <Footer />
      <BottomNav />
    </>
  )
}
