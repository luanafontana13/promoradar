/**
 * Algoritmo de comparación inteligente de productos.
 * Detecta coincidencias aunque los nombres estén escritos diferente.
 * Ej: "Coca Cola 2.25" ≈ "Coca-Cola 2,25L" ≈ "Coca 2250ml"
 */

const STOPWORDS = new Set(['de','la','el','los','las','por','con','x','y','a','en','un','una'])

export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // quitar acentos
    .replace(/[^a-z0-9\s]/g, ' ')      // solo letras, números y espacios
    .replace(/\b(\d+)[,.](\d+)\b/g, '$1$2') // "2.25" → "225", "2,25" → "225"
    .replace(/(\d+)\s*ml\b/g, (_, n) => String(Math.round(Number(n) / 1000) * 1000) + 'ml') // 2250ml → 2000ml bucket
    .replace(/\s+/g, ' ')
    .trim()
}

export function tokenize(str: string): string[] {
  return normalize(str)
    .split(' ')
    .filter(t => t.length > 1 && !STOPWORDS.has(t))
}

export function jaccardSimilarity(a: string, b: string): number {
  const sa = new Set(tokenize(a))
  const sb = new Set(tokenize(b))
  const intersection = [...sa].filter(x => sb.has(x)).length
  const union = new Set([...sa, ...sb]).size
  return union === 0 ? 0 : intersection / union
}

export function findSimilarProducts<T extends { nombre: string; aliases?: string[] }>(
  query: string,
  products: T[],
  threshold = 0.28
): (T & { score: number })[] {
  return products
    .map(p => ({
      ...p,
      score: Math.max(
        jaccardSimilarity(query, p.nombre),
        ...(p.aliases ?? []).map((a: string) => jaccardSimilarity(query, a))
      ),
    }))
    .filter(p => p.score >= threshold)
    .sort((a, b) => b.score - a.score)
}
