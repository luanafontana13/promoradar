# 🛒 PromoRadar

Plataforma de ofertas y comparación de precios de comercios locales de Argentina.

**Stack:** Next.js 14 · TailwindCSS · Supabase · Netlify

---

## 🚀 Setup local

```bash
# 1. Clonar el repo
git clone https://github.com/TU_USUARIO/promoradar.git
cd promoradar

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Completar con tus keys de Supabase

# 4. Correr en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Base de datos (Supabase)

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a **SQL Editor** y pegar el contenido de `supabase/schema.sql`
3. Copiar las keys a `.env.local`

---

## 🌐 Deploy en Netlify

1. Subir el proyecto a GitHub
2. En [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Seleccionar el repo
4. Build command: `npm run build`
5. Publish directory: `.next`
6. En **Environment variables** agregar las keys de Supabase
7. Deploy 🚀

---

## 📁 Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con ofertas y categorías |
| `/ofertas` | Listado de todas las ofertas |
| `/comparador` | Comparador de precios |
| `/comercios` | Directorio de comercios |
| `/favoritos` | Ofertas guardadas |
| `/historial` | Historial de precios |
| `/login` | Iniciar sesión |
| `/registro` | Crear cuenta |
| `/panel` | Panel del comercio |
| `/admin` | Panel de administración |

---

## 💰 Monetización

- Publicar ofertas básicas: **GRATIS**
- Plan Premium ($5.000/mes): destacado + estadísticas
- Plan Pro+ ($12.000/mes): posición #1 en categoría
- Banners patrocinados: por campaña
