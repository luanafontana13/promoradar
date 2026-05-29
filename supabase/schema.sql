-- PromoRadar — Schema Supabase
-- Pegar en el SQL Editor de tu proyecto Supabase

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE ciudades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL UNIQUE,
  provincia TEXT NOT NULL DEFAULT 'Entre Ríos',
  pais TEXT NOT NULL DEFAULT 'Argentina',
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO ciudades (nombre) VALUES
  ('Gualeguaychú'),('Concepción del Uruguay'),('Paraná'),
  ('Concordia'),('Victoria'),('Colón'),('Rosario'),('Buenos Aires');

CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL UNIQUE,
  icono TEXT,
  color TEXT DEFAULT '#00C853',
  orden INT DEFAULT 0,
  activa BOOLEAN DEFAULT true
);

INSERT INTO categorias (nombre, icono, color, orden) VALUES
  ('Almacén','🛒','#00C853',1),('Carnicería','🥩','#EF4444',2),
  ('Verdulería','🥦','#10B981',3),('Bebidas','🥤','#3B82F6',4),
  ('Panadería','🍞','#F59E0B',5),('Farmacia','💊','#8B5CF6',6),
  ('Ferretería','🔧','#6B7280',7),('Tecnología','📱','#06B6D4',8);

CREATE TABLE perfiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT,
  avatar_url TEXT,
  ciudad_id UUID REFERENCES ciudades(id),
  rol TEXT DEFAULT 'usuario' CHECK (rol IN ('usuario','comercio','admin')),
  whatsapp TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comercios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  logo_url TEXT,
  categoria_id UUID REFERENCES categorias(id),
  ciudad_id UUID REFERENCES ciudades(id),
  direccion TEXT,
  whatsapp TEXT,
  instagram TEXT,
  website TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  verificado BOOLEAN DEFAULT false,
  premium BOOLEAN DEFAULT false,
  activo BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 0,
  total_ofertas INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  nombre_norm TEXT GENERATED ALWAYS AS (
    lower(regexp_replace(nombre,'[^a-zA-Z0-9\s]','','g'))
  ) STORED,
  categoria_id UUID REFERENCES categorias(id),
  imagen_url TEXT,
  aliases TEXT[] DEFAULT '{}',
  verificado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_productos_nombre_trgm ON productos USING gin(nombre_norm gin_trgm_ops);

CREATE TABLE ofertas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comercio_id UUID NOT NULL REFERENCES comercios(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES productos(id),
  nombre_producto TEXT NOT NULL,
  imagen_url TEXT,
  precio DECIMAL(10,2) NOT NULL,
  precio_anterior DECIMAL(10,2),
  descuento_pct INT GENERATED ALWAYS AS (
    CASE WHEN precio_anterior > 0
      THEN ROUND(((precio_anterior - precio) / precio_anterior) * 100)
      ELSE 0 END
  ) STORED,
  unidad TEXT DEFAULT 'unidad',
  stock BOOLEAN DEFAULT true,
  destacada BOOLEAN DEFAULT false,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente','aprobada','rechazada','vencida')),
  vence_en TIMESTAMPTZ,
  vistas INT DEFAULT 0,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ofertas_estado ON ofertas(estado);
CREATE INDEX idx_ofertas_nombre_trgm ON ofertas USING gin(lower(nombre_producto) gin_trgm_ops);

CREATE TABLE precios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  producto_id UUID NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  comercio_id UUID NOT NULL REFERENCES comercios(id) ON DELETE CASCADE,
  precio DECIMAL(10,2) NOT NULL,
  stock BOOLEAN DEFAULT true,
  registrado_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_precios_producto ON precios(producto_id, registrado_at DESC);

CREATE TABLE favoritos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  oferta_id UUID NOT NULL REFERENCES ofertas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(usuario_id, oferta_id)
);

CREATE TABLE alertas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES productos(id),
  termino_busqueda TEXT,
  precio_objetivo DECIMAL(10,2) NOT NULL,
  activa BOOLEAN DEFAULT true,
  notificada_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_comercios_updated BEFORE UPDATE ON comercios FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_ofertas_updated BEFORE UPDATE ON ofertas FOR EACH ROW EXECUTE FUNCTION update_updated_at();

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

-- Row Level Security
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comercios ENABLE ROW LEVEL SECURITY;
ALTER TABLE ofertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfiles: lectura pública" ON perfiles FOR SELECT USING (true);
CREATE POLICY "Perfiles: edición propia" ON perfiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Comercios: lectura pública" ON comercios FOR SELECT USING (activo = true);
CREATE POLICY "Comercios: edición propia" ON comercios FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "Comercios: insertar autenticado" ON comercios FOR INSERT WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "Ofertas: lectura aprobadas" ON ofertas FOR SELECT USING (estado = 'aprobada' OR comercio_id IN (SELECT id FROM comercios WHERE usuario_id = auth.uid()));
CREATE POLICY "Ofertas: comerciante inserta" ON ofertas FOR INSERT WITH CHECK (comercio_id IN (SELECT id FROM comercios WHERE usuario_id = auth.uid()));
CREATE POLICY "Ofertas: comerciante edita" ON ofertas FOR UPDATE USING (comercio_id IN (SELECT id FROM comercios WHERE usuario_id = auth.uid()));
CREATE POLICY "Favoritos: usuario propio" ON favoritos USING (auth.uid() = usuario_id);
CREATE POLICY "Alertas: usuario propio" ON alertas USING (auth.uid() = usuario_id);
