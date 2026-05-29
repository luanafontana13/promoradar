export type Rol = 'usuario' | 'comercio' | 'admin'

export interface Ciudad {
  id: string
  nombre: string
  provincia: string
  pais: string
  activa: boolean
}

export interface Categoria {
  id: string
  nombre: string
  icono: string
  color: string
  orden: number
}

export interface Perfil {
  id: string
  nombre?: string | null
  avatar_url?: string | null
  ciudad_id?: string | null
  rol: Rol
  whatsapp?: string | null
}

export interface Comercio {
  id: string
  usuario_id: string
  nombre: string
  descripcion?: string | null
  logo_url: string | null
  categoria_id?: string | null
  ciudad_id?: string | null
  direccion: string | null
  whatsapp?: string | null
  instagram?: string | null
  verificado: boolean
  premium: boolean
  activo: boolean
  rating: number
  total_ofertas: number
  categoria?: Categoria
  ciudad?: Ciudad
}

export interface Oferta {
  id: string
  comercio_id: string
  producto_id: string | null
  nombre_producto: string
  imagen_url: string | null
  precio: number
  precio_anterior: number | null
  descuento_pct: number
  unidad: string
  stock: boolean
  destacada: boolean
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'vencida'
  vence_en: string | null
  vistas: number
  likes: number
  created_at: string
  comercio?: Comercio
}

export interface PrecioHistorial {
  id: string
  producto_id: string
  comercio_id: string
  precio: number
  stock: boolean
  registrado_at: string
  comercio?: Comercio
}

export interface Favorito {
  id: string
  usuario_id: string
  oferta_id: string
  oferta?: Oferta
}

export interface Alerta {
  id: string
  usuario_id: string
  producto_id: string | null
  termino_busqueda: string | null
  precio_objetivo: number
  activa: boolean
  notificada_at: string | null
}

export interface ProductoConPrecios {
  id: string
  nombre: string
  categoria?: Categoria
  aliases: string[]
  precios: {
    comercio_id: string
    comercio: string
    precio: number
    stock: boolean
    updated: string
  }[]
  score?: number
}
