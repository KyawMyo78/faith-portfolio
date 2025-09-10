// Simple in-memory server cache with TTL. Not persisted across processes.
type CacheEntry = { expires: number; value: any };

const cache = new Map<string, CacheEntry>();

export function getCached(key: string) {
  const e = cache.get(key);
  if (!e) return null;
  if (Date.now() > e.expires) {
    cache.delete(key);
    return null;
  }
  return e.value;
}

export function setCached(key: string, value: any, ttlMs = 60000) {
  cache.set(key, { value, expires: Date.now() + ttlMs });
}

export function clearCached(key: string) {
  cache.delete(key);
}

export default { getCached, setCached, clearCached };
