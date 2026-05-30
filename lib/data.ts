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
  { id: '9', nombre: 'Gastronomía', icono: '🍽️', color: '#F97316', orden: 9 },
]


export const COMERCIOS: Comercio[] = [] via 310',         whatsapp: '3446567890', instagram: '@elgaucho',       verificado: true,  premium: false, activo: true, rating: 4.3, total_ofertas: 28 },


export const OFERTAS: Oferta[] = []
 

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
