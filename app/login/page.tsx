'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) { setError('Completá todos los campos'); return }
    // TODO: integrar con Supabase Auth
    // const { error } = await supabase.auth.signInWithPassword({ email, password })
    router.push('/')
  }

  return (
    <>
      <Header />
      <main style={{ maxWidth: 420, margin: '40px auto', padding: '0 20px', paddingBottom: 100 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #F0F0F0' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>🛒</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', fontFamily: "'Syne',sans-serif" }}>Bienvenido de vuelta</h2>
            <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>Iniciá sesión en tu cuenta</p>
          </div>

          {error && <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#EF4444', marginBottom: 16 }}>{error}</div>}

          <div style={{ display: 'grid', gap: 12 }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
              style={{ padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña"
              style={{ padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'inherit', color: '#1A1A1A' }} />
            <Button variant="primary" size="lg" fullWidth onClick={handleLogin}>Iniciar sesión</Button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#6B7280' }}>
            ¿No tenés cuenta?{' '}
            <Link href="/registro" style={{ color: '#00C853', fontWeight: 700, textDecoration: 'none' }}>Registrate gratis</Link>
          </div>
        </div>
      </main>
    </>
  )
}
