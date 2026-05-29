'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/',           label: 'Inicio',   icon: '🏠' },
  { href: '/ofertas',    label: 'Ofertas',  icon: '🏷️' },
  { href: '/comparador', label: 'Comparar', icon: '⚖️' },
  { href: '/comercios',  label: 'Tiendas',  icon: '🏪' },
  { href: '/favoritos',  label: 'Guardados',icon: '❤️' },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff', borderTop: '1px solid #F0F0F0',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.08)', zIndex: 100,
      display: 'grid', gridTemplateColumns: 'repeat(5,1fr)',
      padding: '6px 0 env(safe-area-inset-bottom, 6px)',
    }}>
      {ITEMS.map(item => {
        const active = pathname === item.href
        return (
          <Link key={item.href} href={item.href} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '6px 4px', textDecoration: 'none', position: 'relative',
          }}>
            {active && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 24, height: 3, background: '#00C853', borderRadius: '0 0 3px 3px' }} />}
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: active ? '#00C853' : '#6B7280' }}>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
