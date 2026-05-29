/**
 * Datos de demostración.
 * En producción estos vienen de Supabase.
 */
import type { Ciudad, Categoria, Comercio, Oferta, ProductoConPrecios } from '@/types'

export const CIUDADES: Ciudad[] = [
  { id: '1', nombre: 'Gualeguaychú', provincia: 'Entre Ríos', pais: 'Argentina', activa: true },
  { id: '2', nombre: 'Concepción del Uruguay', provincia: 'Entre Ríos', pais: 'Argentina', activa: true },
  { id: '3', nombre: 'Paraná', provincia: 'Entre Ríos', pais: 'Argentina', activa: true },
  { id: '4', nombre: 'Concordia', provincia: 'Entre Ríos', pais: 'Argentina', activa: true },
  { id: '5', nombre: 'Rosario', provincia: 'Santa Fe', pais: 'Argentina', activa: true },
  { id: '6', nombre: 'Buenos Aires', provincia: 'CABA', pais: 'Argentina', activa: true },
]

export const CATEGORIAS: Categoria[] = [
  { id: '1', nombre: 'Almacén',    icono: '🛒', color: '#00C853', orden: 1 },
  { id: '2', nombre: 'Carnicería', icono: '🥩', color: '#EF4444', orden: 2 },
  { id: '3', nombre: 'Verdulería', icono: '🥦', color: '#10B981', orden: 3 },
  { id: '4', nombre: 'Bebidas',    icono: '🥤', color: '#3B82F6', orden: 4 },
  { id: '5', nombre: 'Panadería',  icono: '🍞', color: '#F59E0B', orden: 5 },
  { id: '6', nombre: 'Farmacia',   icono: '💊', color: '#8B5CF6', orden: 6 },
  { id: '7', nombre: 'Ferretería', icono: '🔧', color: '#6B7280', orden: 7 },
  { id: '8', nombre: 'Tecnología', icono: '📱', color: '#06B6D4', orden: 8 },
]

export const COMERCIOS: Comercio[] = [
  { id: '1', usuario_id: 'u1', nombre: 'Súper El Ahorro',    logo_url: null, categoria_id: '1', ciudad_id: '1', direccion: 'Av. San Martín 450',  whatsapp: '3446123456', instagram: '@superelahorro', verificado: true,  premium: true,  activo: true, rating: 4.8, total_ofertas: 34 },
  { id: '2', usuario_id: 'u2', nombre: 'Carnes Del Puerto',  logo_url: null, categoria_id: '2', ciudad_id: '1', direccion: '25 de Mayo 120',       whatsapp: '3446234567', instagram: null,              verificado: true,  premium: false, activo: true, rating: 4.6, total_ofertas: 12 },
  { id: '3', usuario_id: 'u3', nombre: 'Farmacia Central',   logo_url: null, categoria_id: '6', ciudad_id: '1', direccion: 'Urquiza 89',            whatsapp: '3446345678', instagram: '@farmaciacentral',verificado: true,  premium: true,  activo: true, rating: 4.9, total_ofertas: 8  },
  { id: '4', usuario_id: 'u4', nombre: 'Verduras La Granja', logo_url: null, categoria_id: '3', ciudad_id: '1', direccion: 'Pellegrini 230',        whatsapp: '3446456789', instagram: null,              verificado: false, premium: false, activo: true, rating: 4.5, total_ofertas: 21 },
  { id: '5', usuario_id: 'u5', nombre: 'El Gaucho Almacén',  logo_url: null, categoria_id: '1', ciudad_id: '1', direccion: 'Rivadavia 310',         whatsapp: '3446567890', instagram: '@elgaucho',       verificado: true,  premium: false, activo: true, rating: 4.3, total_ofertas: 28 },
]

export const OFERTAS: Oferta[] = [
  { id: '1',  comercio_id: '1', producto_id: null, nombre_producto: 'Coca Cola 2.25L',       imagen_url: null, precio: 1850, precio_anterior: 2200, descuento_pct: 16, unidad: 'unidad', stock: true,  destacada: true,  estado: 'aprobada', vence_en: null, vistas: 234, likes: 18, created_at: new Date().toISOString() },
  { id: '2',  comercio_id: '2', producto_id: null, nombre_producto: 'Asado de Tira x Kg',    imagen_url: null, precio: 4800, precio_anterior: 6200, descuento_pct: 23, unidad: 'kg',     stock: true,  destacada: false, estado: 'aprobada', vence_en: null, vistas: 189, likes: 31, created_at: new Date().toISOString() },
  { id: '3',  comercio_id: '5', producto_id: null, nombre_producto: 'Fideos Spaghetti 500g', imagen_url: null, precio:  890, precio_anterior: 1100, descuento_pct: 20, unidad: 'unidad', stock: true,  destacada: false, estado: 'aprobada', vence_en: null, vistas:  98, likes:  7, created_at: new Date().toISOString() },
  { id: '4',  comercio_id: '1', producto_id: null, nombre_producto: 'Leche Entera 1L x 6',   imagen_url: null, precio: 5400, precio_anterior: 6800, descuento_pct: 21, unidad: 'pack',   stock: true,  destacada: true,  estado: 'aprobada', vence_en: null, vistas: 412, likes: 45, created_at: new Date().toISOString() },
  { id: '5',  comercio_id: '4', producto_id: null, nombre_producto: 'Manzanas Red 1kg',      imagen_url: null, precio:  980, precio_anterior: 1300, descuento_pct: 25, unidad: 'kg',     stock: true,  destacada: true,  estado: 'aprobada', vence_en: null, vistas: 156, likes: 12, created_at: new Date().toISOString() },
  { id: '6',  comercio_id: '3', producto_id: null, nombre_producto: 'Ibuprofeno 400mg x 20', imagen_url: null, precio: 1200, precio_anterior: 1550, descuento_pct: 23, unidad: 'caja',   stock: true,  destacada: false, estado: 'aprobada', vence_en: null, vistas:  87, likes:  9, created_at: new Date().toISOString() },
  { id: '7',  comercio_id: '5', producto_id: null, nombre_producto: 'Yerba Amanda 1kg',      imagen_url: null, precio: 3200, precio_anterior: 4000, descuento_pct: 20, unidad: 'unidad', stock: true,  destacada: false, estado: 'aprobada', vence_en: null, vistas: 203, likes: 22, created_at: new Date().toISOString() },
  { id: '8',  comercio_id: '1', producto_id: null, nombre_producto: 'Aceite Girasol 1.5L',   imagen_url: null, precio: 2750, precio_anterior: 3200, descuento_pct: 14, unidad: 'unidad', stock: true,  destacada: false, estado: 'aprobada', vence_en: null, vistas: 134, likes: 11, created_at: new Date().toISOString() },
]

// Íconos por categoría para las tarjetas (sin imágenes reales en demo)
export const CATEGORY_ICONS: Record<string, string> = {
  'Almacén': '🛒', 'Carnicería': '🥩', 'Verdulería': '🥦',
  'Bebidas': '🥤',  'Panadería': '🍞',  'Farmacia': '💊',
  'Ferretería': '🔧', 'Tecnología': '📱',
}

export const PRODUCT_ICONS: Record<string, string> = {
  'coca': '🥤', 'leche': '🥛', 'arroz': '🍚', 'pollo': '🍗',
  'aceite': '🫒', 'yerba': '🧉', 'fideos': '🍝', 'pan': '🍞',
  'manzana': '🍎', 'asado': '🥩', 'ibuprofeno': '💊', 'default': '🏷️',
}

export function getProductIcon(nombre: string): string {
  const n = nombre.toLowerCase()
  for (const [key, icon] of Object.entries(PRODUCT_ICONS)) {
    if (n.includes(key)) return icon
  }
  return PRODUCT_ICONS.default
}

export const PRODUCTOS_COMPARADOR: ProductoConPrecios[] = [
  {
    id: 'p1', nombre: 'Coca Cola 2.25L',
    aliases: ['coca cola 2,25', 'coca 2.25', 'coca 2250ml', 'gaseosa cola 2.25', 'cola 2.25'],
    precios: [
      { comercio_id: '1', comercio: 'Súper El Ahorro',    precio: 1850, stock: true,  updated: 'hace 2h' },
      { comercio_id: '5', comercio: 'El Gaucho Almacén',  precio: 1920, stock: true,  updated: 'hace 5h' },
      { comercio_id: '4', comercio: 'Verduras La Granja', precio: 1790, stock: true,  updated: 'hace 1h' },
    ],
  },
  {
    id: 'p2', nombre: 'Arroz Largo Fino 1kg',
    aliases: ['arroz 1kg', 'arroz largo 1 kg', 'arroz fino 1000g', 'arroz'],
    precios: [
      { comercio_id: '1', comercio: 'Súper El Ahorro',   precio: 1250, stock: true, updated: 'hace 3h' },
      { comercio_id: '5', comercio: 'El Gaucho Almacén', precio: 1180, stock: true, updated: 'hace 6h' },
    ],
  },
  {
    id: 'p3', nombre: 'Pollo Entero Kg',
    aliases: ['pollo entero', 'pollo x kg', 'pollo por kilo', 'pollo'],
    precios: [
      { comercio_id: '2', comercio: 'Carnes Del Puerto', precio: 3200, stock: true,  updated: 'hace 1h' },
      { comercio_id: '1', comercio: 'Súper El Ahorro',   precio: 3550, stock: true,  updated: 'hace 4h' },
    ],
  },
  {
    id: 'p4', nombre: 'Aceite Girasol 1.5L',
    aliases: ['aceite 1.5', 'aceite girasol 1500ml', 'aceite de girasol', 'aceite'],
    precios: [
      { comercio_id: '1', comercio: 'Súper El Ahorro',    precio: 2900, stock: true,  updated: 'hace 2h' },
      { comercio_id: '5', comercio: 'El Gaucho Almacén',  precio: 2750, stock: true,  updated: 'hace 8h' },
      { comercio_id: '4', comercio: 'Verduras La Granja', precio: 3100, stock: false, updated: 'hace 3h' },
    ],
  },
  {
    id: 'p5', nombre: 'Yerba Mate Amanda 1kg',
    aliases: ['yerba amanda', 'yerba 1kg', 'mate amanda', 'amanda yerba'],
    precios: [
      { comercio_id: '5', comercio: 'El Gaucho Almacén', precio: 3200, stock: true, updated: 'hace 1h' },
      { comercio_id: '1', comercio: 'Súper El Ahorro',   precio: 3450, stock: true, updated: 'hace 5h' },
    ],
  },
]
