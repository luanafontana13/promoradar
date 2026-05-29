import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0A0F0D', color: '#6B7280', padding: '32px 20px 100px', marginTop: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00C853,#00A843)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🛒</div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 16, color: '#fff' }}>PromoRadar</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 220 }}>Las mejores ofertas de comercios locales de Argentina.</p>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Plataforma</div>
            {[['/', 'Inicio'], ['/ofertas', 'Ofertas'], ['/comparador', 'Comparador'], ['/comercios', 'Comercios']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: 6 }}>
                <Link href={href} style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none' }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Para Comercios</div>
            {['/registro', '/panel'].map((href, i) => (
              <div key={href} style={{ marginBottom: 6 }}>
                <Link href={href} style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none' }}>
                  {['Registrarse', 'Panel de control'][i]}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Ciudades</div>
            {['Gualeguaychú', 'Concepción del Uruguay', 'Paraná', 'Concordia'].map(c => (
              <div key={c} style={{ fontSize: 13, marginBottom: 6 }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1E2D22', paddingTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', fontSize: 12 }}>
          <span>© {new Date().getFullYear()} PromoRadar · Gualeguaychú, Entre Ríos 🇦🇷</span>
          <span style={{ color: '#00C853' }}>Publicar es gratis para todos los comercios</span>
        </div>
      </div>
    </footer>
  )
}
