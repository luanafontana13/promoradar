'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Button from '@/components/ui/Button'

export default function RegistroPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'usuario' | 'comercio'>('usuario')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    // TODO: integrar con Supabase Auth
    // const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: nombre, rol: userType } } })
    router.push(userType === 'comercio' ? '/panel' : '/')
  }

  return (
    <>
      <Header />
      <main style={{ maxWidth: 440, margin: '40px auto', padding: '0 20px', paddingBottom: 100 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #F0F0F0' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>🛒</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', fontFamily: "'Syne',sans-serif" }}>Crear cuenta gratis</h2>
          </div>

          {/* Type selector */}
          <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 4, marginBottom: 20 }}>
            {[{ id: 'usuario', label: '👤 Soy usuario' }, { id: 'comercio', label: '🏪 Soy comercio' }].map(t => (
              <button key={t.id} onClick={() => setUserType(t.id as any)}
                style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                  background: userType === t.id ? '#fff' : 'transparent', color: userType === t.id ? '#1A1A1A' : '#6B7280',
                  boxShadow: userType === t.id ? '0 1px 6px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <input value={nombre} onChange={e => setNombre(e.target.value)}
              placeholder={userType === 'comercio' ? 'Nombre del comercio' : 'Tu nombre'}
              style={{ padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
              style={{ padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña (mín. 8 caracteres)"
              style={{ padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
            {userType === 'comercio' && (
              <input placeholder="WhatsApp (sin 0 ni 15)"
                style={{ padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
            )}
            <Button variant="primary" size="lg" fullWidth onClick={handleRegister}>
              {userType === 'comercio' ? '🏪 Registrar mi comercio' : '✅ Crear mi cuenta'}
            </Button>
          </div>

          <div style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 12 }}>
            Publicar ofertas es <strong style={{ color: '#00C853' }}>100% gratis</strong>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: '#6B7280' }}>
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" style={{ color: '#00C853', fontWeight: 700, textDecoration: 'none' }}>Iniciá sesión</Link>
          </div>
        </div>
      </main>
    </>
  )
}
