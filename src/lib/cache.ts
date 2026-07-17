import 'server-only';

const cache = new Map<string, { data: any; expiresAt: number }>();

export function getCached<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) return null;
  
  if (Date.now() > item.expiresAt) {
    cache.delete(key);
    return null;
  }
  
  return item.data as T;
}

export function setCached<T>(key: string, data: T, ttlMs: number = 3600000): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}
