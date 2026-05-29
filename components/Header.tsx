'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CIUDADES } from '@/lib/data'

const NAV = [
  { href: '/',           label: 'Inicio',    icon: '🏠' },
  { href: '/ofertas',    label: 'Ofertas',   icon: '🏷️' },
  { href: '/comparador', label: 'Comparar',  icon: '⚖️' },
  { href: '/comercios',  label: 'Comercios', icon: '🏪' },
  { href: '/favoritos',  label: 'Favoritos', icon: '❤️' },
  { href: '/historial',  label: 'Historial', icon: '📈' },
]

export default function Header() {
  const pathname = usePathname()
  const [city, setCity] = useState('Gualeguaychú')

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#fff', borderBottom: '1px solid #F0F0F0',
      boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', height: 58, gap: 12 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#00C853,#00A843)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛒</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 18, color: '#1A1A1A', letterSpacing: '-0.03em' }}>
            Promo<span style={{ color: '#00C853' }}>Radar</span>
          </span>
        </Link>

        {/* City selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#E8F5E9', border: '1px solid #00C85333', borderRadius: 8, padding: '5px 10px', flexShrink: 0 }}>
          <span style={{ fontSize: 13 }}>📍</span>
          <select
            value={city}
            onChange={e => setCity(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 12, fontWeight: 600, color: '#00A843', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {CIUDADES.map(c => <option key={c.id}>{c.nombre}</option>)}
          </select>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 2, flex: 1, overflowX: 'auto' }}>
          {NAV.map(item => (
            <Link key={item.href} href={item.href} style={{
              padding: '7px 12px', borderRadius: 8, textDecoration: 'none',
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
              color: pathname === item.href ? '#00C853' : '#6B7280',
              borderBottom: pathname === item.href ? '2px solid #00C853' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <Link href="/login" style={{ padding: '7px 14px', borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 13, fontWeight: 600, color: '#6B7280', textDecoration: 'none' }}>
            Ingresar
          </Link>
          <Link href="/registro" style={{ padding: '7px 14px', borderRadius: 10, background: '#00C853', fontSize: 13, fontWeight: 700, color: '#fff', textDecoration: 'none', boxShadow: '0 2px 8px #00C85333' }}>
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  )
}
