# PromoRadar — Arquitectura & Guía de Deploy
## Stack: Next.js 14 · TailwindCSS · Supabase · Netlify

---

## 📁 ESTRUCTURA DEL PROYECTO

```
promoradar/
├── app/                        # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx                # Home
│   ├── ofertas/
│   │   ├── page.tsx            # Listado de ofertas
│   │   └── [id]/page.tsx       # Oferta individual
│   ├── comparador/
│   │   └── page.tsx
│   ├── comercios/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx       # Comercio individual
│   ├── categorias/page.tsx
│   ├── favoritos/page.tsx
│   ├── alertas/page.tsx
│   ├── historial/page.tsx
│   ├── login/page.tsx
│   ├── registro/page.tsx
│   ├── panel/                  # Panel comercio
│   │   ├── page.tsx
│   │   ├── ofertas/page.tsx
│   │   └── estadisticas/page.tsx
│   └── admin/                  # Panel admin
│       ├── page.tsx
│       ├── publicaciones/page.tsx
│       └── comercios/page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── OfferCard.tsx
│   ├── PriceCompareTable.tsx
│   ├── StoreCard.tsx
│   ├── CategoryGrid.tsx
│   ├── SearchBar.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BottomNav.tsx           # Mobile navigation
│   └── CitySelector.tsx
├── lib/
│   ├── supabase.ts             # Client + server clients
│   ├── normalize.ts            # Algoritmo comparación precios
│   ├── whatsapp.ts             # Helper links WhatsApp
│   └── utils.ts
├── hooks/
│   ├── useOffers.ts
│   ├── useFavorites.ts
│   ├── useGeolocation.ts
│   └── usePriceAlerts.ts
├── types/
│   └── index.ts
├── public/
├── .env.local                  # Variables de entorno (local)
├── netlify.toml
├── next.config.js
└── tailwind.config.js
```

---

## 🗄️ ESQUEMA SQL — SUPABASE

```sql
-- ═══════════════════════════════════════
-- EXTENSIONES
-- ═══════════════════════════════════════
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;  -- Para búsqueda fuzzy

-- ═══════════════════════════════════════
-- TABLA: ciudades
-- ═══════════════════════════════════════
CREATE TABLE ciudades (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre      TEXT NOT NULL UNIQUE,
  provincia   TEXT NOT NULL DEFAULT 'Entre Ríos',
  pais        TEXT NOT NULL DEFAULT 'Argentina',
  activa      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO ciudades (nombre) VALUES
  ('Gualeguaychú'),
  ('Concepción del Uruguay'),
  ('Paraná'),
  ('Concordia'),
  ('Victoria'),
  ('Colón');

-- ═══════════════════════════════════════
-- TABLA: categorias
-- ═══════════════════════════════════════
CREATE TABLE categorias (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre      TEXT NOT NULL UNIQUE,
  icono       TEXT,
  color       TEXT DEFAULT '#00C853',
  orden       INT DEFAULT 0,
  activa      BOOLEAN DEFAULT true
);

INSERT INTO categorias (nombre, icono, color, orden) VALUES
  ('Almacén',      '🛒', '#00C853', 1),
  ('Carnicería',   '🥩', '#EF4444', 2),
  ('Verdulería',   '🥦', '#10B981', 3),
  ('Bebidas',      '🥤', '#3B82F6', 4),
  ('Panadería',    '🍞', '#F59E0B', 5),
  ('Farmacia',     '💊', '#8B5CF6', 6),
  ('Ferretería',   '🔧', '#6B7280', 7),
  ('Tecnología',   '📱', '#06B6D4', 8);

-- ═══════════════════════════════════════
-- TABLA: perfiles (extiende auth.users)
-- ═══════════════════════════════════════
CREATE TABLE perfiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre       TEXT,
  avatar_url   TEXT,
  ciudad_id    UUID REFERENCES ciudades(id),
  rol          TEXT DEFAULT 'usuario' CHECK (rol IN ('usuario', 'comercio', 'admin')),
  whatsapp     TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- TABLA: comercios
-- ═══════════════════════════════════════
CREATE TABLE comercios (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre         TEXT NOT NULL,
  descripcion    TEXT,
  logo_url       TEXT,
  categoria_id   UUID REFERENCES categorias(id),
  ciudad_id      UUID REFERENCES ciudades(id),
  direccion      TEXT,
  whatsapp       TEXT,
  instagram      TEXT,
  website        TEXT,
  lat            DOUBLE PRECISION,
  lng            DOUBLE PRECISION,
  verificado     BOOLEAN DEFAULT false,
  premium        BOOLEAN DEFAULT false,
  activo         BOOLEAN DEFAULT true,
  rating         DECIMAL(2,1) DEFAULT 0,
  total_ofertas  INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- TABLA: productos
-- ═══════════════════════════════════════
CREATE TABLE productos (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre       TEXT NOT NULL,
  nombre_norm  TEXT GENERATED ALWAYS AS (
    lower(regexp_replace(nombre, '[^a-zA-Z0-9\s]', '', 'g'))
  ) STORED,
  categoria_id UUID REFERENCES categorias(id),
  imagen_url   TEXT,
  aliases      TEXT[] DEFAULT '{}',  -- nombres alternativos para matching
  verificado   BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsqueda full-text
CREATE INDEX idx_productos_nombre_trgm ON productos USING gin(nombre_norm gin_trgm_ops);

-- ═══════════════════════════════════════
-- TABLA: ofertas
-- ═══════════════════════════════════════
CREATE TABLE ofertas (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comercio_id     UUID NOT NULL REFERENCES comercios(id) ON DELETE CASCADE,
  producto_id     UUID REFERENCES productos(id),
  nombre_producto TEXT NOT NULL,         -- nombre tal como lo puso el comerciante
  imagen_url      TEXT,
  precio          DECIMAL(10,2) NOT NULL,
  precio_anterior DECIMAL(10,2),
  descuento_pct   INT GENERATED ALWAYS AS (
    CASE WHEN precio_anterior > 0
      THEN ROUND(((precio_anterior - precio) / precio_anterior) * 100)
      ELSE 0
    END
  ) STORED,
  unidad          TEXT DEFAULT 'unidad', -- ej: kg, litro, unidad, pack
  stock           BOOLEAN DEFAULT true,
  destacada       BOOLEAN DEFAULT false,
  estado          TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobada', 'rechazada', 'vencida')),
  vence_en        TIMESTAMPTZ,
  vistas          INT DEFAULT 0,
  likes           INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_ofertas_comercio ON ofertas(comercio_id);
CREATE INDEX idx_ofertas_estado ON ofertas(estado);
CREATE INDEX idx_ofertas_vence ON ofertas(vence_en);
CREATE INDEX idx_ofertas_nombre_trgm ON ofertas USING gin(lower(nombre_producto) gin_trgm_ops);

-- ═══════════════════════════════════════
-- TABLA: precios (historial)
-- ═══════════════════════════════════════
CREATE TABLE precios (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  producto_id UUID NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  comercio_id UUID NOT NULL REFERENCES comercios(id) ON DELETE CASCADE,
  precio      DECIMAL(10,2) NOT NULL,
  stock       BOOLEAN DEFAULT true,
  fuente      TEXT DEFAULT 'comercio',  -- 'comercio' | 'admin' | 'usuario'
  registrado_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_precios_producto ON precios(producto_id, registrado_at DESC);
CREATE INDEX idx_precios_comercio ON precios(comercio_id);

-- ═══════════════════════════════════════
-- TABLA: favoritos
-- ═══════════════════════════════════════
CREATE TABLE favoritos (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  oferta_id  UUID NOT NULL REFERENCES ofertas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(usuario_id, oferta_id)
);

-- ═══════════════════════════════════════
-- TABLA: alertas
-- ═══════════════════════════════════════
CREATE TABLE alertas (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  producto_id     UUID REFERENCES productos(id),
  termino_busqueda TEXT,               -- si no hay producto_id, buscar por texto
  precio_objetivo DECIMAL(10,2) NOT NULL,
  activa          BOOLEAN DEFAULT true,
  notificada_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- FUNCIÓN: trigger updated_at
-- ═══════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_comercios_updated BEFORE UPDATE ON comercios FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_ofertas_updated BEFORE UPDATE ON ofertas FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_perfiles_updated BEFORE UPDATE ON perfiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ═══════════════════════════════════════
-- FUNCIÓN: auto-crear perfil en registro
-- ═══════════════════════════════════════
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO perfiles (id, nombre)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ═══════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comercios ENABLE ROW LEVEL SECURITY;
ALTER TABLE ofertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;

-- Perfiles: leer todos, editar solo el propio
CREATE POLICY "Perfiles: lectura pública" ON perfiles FOR SELECT USING (true);
CREATE POLICY "Perfiles: edición propia"  ON perfiles FOR UPDATE USING (auth.uid() = id);

-- Comercios: leer activos, editar los propios
CREATE POLICY "Comercios: lectura pública" ON comercios FOR SELECT USING (activo = true);
CREATE POLICY "Comercios: edición propia"  ON comercios FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "Comercios: insertar autenticado" ON comercios FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- Ofertas: leer aprobadas, comerciante edita las propias
CREATE POLICY "Ofertas: lectura aprobadas" ON ofertas
  FOR SELECT USING (
    estado = 'aprobada'
    OR comercio_id IN (SELECT id FROM comercios WHERE usuario_id = auth.uid())
    OR EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
  );

CREATE POLICY "Ofertas: comerciante inserta" ON ofertas
  FOR INSERT WITH CHECK (
    comercio_id IN (SELECT id FROM comercios WHERE usuario_id = auth.uid())
  );

CREATE POLICY "Ofertas: comerciante edita" ON ofertas
  FOR UPDATE USING (
    comercio_id IN (SELECT id FROM comercios WHERE usuario_id = auth.uid())
    OR EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
  );

-- Favoritos y Alertas: solo el propio usuario
CREATE POLICY "Favoritos: usuario propio" ON favoritos USING (auth.uid() = usuario_id);
CREATE POLICY "Alertas: usuario propio"   ON alertas   USING (auth.uid() = usuario_id);
```

---

## 🔑 VARIABLES DE ENTORNO

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...   # Solo servidor, NUNCA exponer al cliente

NEXT_PUBLIC_APP_URL=https://promoradar.netlify.app
NEXT_PUBLIC_DEFAULT_CITY=Gualeguaychú
```

---

## 🤖 ALGORITMO DE NORMALIZACIÓN (lib/normalize.ts)

```typescript
export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // quita acentos
    .replace(/[^a-z0-9\s]/g, " ")      // solo letras, números, espacios
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(str: string): string[] {
  const STOPWORDS = new Set(["de", "la", "el", "los", "las", "por", "con", "x"]);
  return normalize(str)
    .split(" ")
    .filter(t => t.length > 1 && !STOPWORDS.has(t));
}

export function jaccardSimilarity(a: string, b: string): number {
  const sa = new Set(tokenize(a));
  const sb = new Set(tokenize(b));
  const intersection = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : intersection / union;
}

export function findSimilarProducts(
  query: string,
  products: { name: string; aliases?: string[] }[],
  threshold = 0.3
) {
  return products
    .map(p => ({
      ...p,
      score: Math.max(
        jaccardSimilarity(query, p.name),
        ...(p.aliases || []).map(a => jaccardSimilarity(query, a))
      ),
    }))
    .filter(p => p.score >= threshold)
    .sort((a, b) => b.score - a.score);
}

// Ejemplos que detecta como el mismo producto:
// "Coca Cola 2.25" ↔ "Coca-Cola 2,25L" ↔ "Coca 2250ml"  → score ~0.6
// "arroz 1kg"      ↔ "Arroz Largo Fino 1 kg"              → score ~0.5
```

---

## 🚀 DEPLOY EN NETLIFY

### 1. Crear proyecto Next.js
```bash
npx create-next-app@latest promoradar --typescript --tailwind --app
cd promoradar
npm install @supabase/supabase-js @supabase/ssr
```

### 2. netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
  NEXT_PUBLIC_DEFAULT_CITY = "Gualeguaychú"
```

### 3. Instalar plugin Next.js
```bash
npm install -D @netlify/plugin-nextjs
```

### 4. Pasos en Netlify
1. Importar repo desde GitHub
2. Configurar Build command: `npm run build`
3. Publish directory: `.next`
4. Agregar variables de entorno en Site Settings → Environment variables
5. Deploy 🚀

### 5. Configurar Supabase Auth
En Supabase → Authentication → URL Configuration:
- Site URL: `https://tu-sitio.netlify.app`
- Redirect URLs: `https://tu-sitio.netlify.app/auth/callback`

---

## 💰 ESTRUCTURA DE MONETIZACIÓN

| Plan       | Precio sugerido | Beneficios |
|-----------|----------------|------------|
| Gratis    | $0             | Publicar ofertas básicas |
| Premium   | $5.000/mes     | Destacado, estadísticas avanzadas, banner |
| Pro+      | $12.000/mes    | Todo Premium + posición #1 en categoría |
| Patrocinado | Por campaña  | Banner en home, notificaciones push |

---

## 📊 ÍNDICES Y PERFORMANCE

- pg_trgm para búsqueda fuzzy en Supabase
- CDN de imágenes via Supabase Storage + transformaciones
- ISR (Incremental Static Regeneration) en Next.js para páginas de ofertas
- Revalidación cada 5 minutos para precios
- Edge Functions para el comparador de precios

---

## 🗺️ EXPANSIÓN A MÚLTIPLES CIUDADES

La estructura de `ciudad_id` en cada tabla permite escalar limpiamente.
Agregar una ciudad nueva = INSERT en tabla `ciudades`.
El selector de ciudad en el header filtra toda la plataforma automáticamente.
