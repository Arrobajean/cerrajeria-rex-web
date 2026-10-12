export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export interface RateLimiterOptions {
  /** Peticiones permitidas dentro de la ventana, por clave. */
  limit: number;
  windowMs: number;
  now?: () => number;
}

const PRUNE_AFTER_KEYS = 5_000;

/**
 * Ventana deslizante en memoria. Basta para una instancia de demostración.
 * Con varias instancias serverless cada una cuenta por separado: en producción haría falta un almacén compartido.
 */
export function createRateLimiter({ limit, windowMs, now = Date.now }: RateLimiterOptions) {
  const hits = new Map<string, number[]>();

  return {
    hit(key: string): RateLimitResult {
      const current = now();
      const recent = (hits.get(key) ?? []).filter((timestamp) => current - timestamp < windowMs);

      if (recent.length >= limit) {
        hits.set(key, recent);
        const oldest = recent[0] ?? current;
        return { allowed: false, retryAfterSeconds: Math.ceil((windowMs - (current - oldest)) / 1000) };
      }

      recent.push(current);
      hits.set(key, recent);

      if (hits.size > PRUNE_AFTER_KEYS) {
        for (const [otherKey, timestamps] of hits) {
          if (timestamps.every((timestamp) => current - timestamp >= windowMs)) hits.delete(otherKey);
        }
      }
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}
