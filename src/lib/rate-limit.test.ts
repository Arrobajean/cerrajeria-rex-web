import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

function clock(start = 0) {
  let current = start;
  return {
    now: () => current,
    advance: (ms: number) => {
      current += ms;
    },
  };
}

describe("createRateLimiter", () => {
  it("permite hasta el límite y bloquea el siguiente intento", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 2, windowMs: 60_000, now: time.now });
    expect(limiter.hit("ip").allowed).toBe(true);
    expect(limiter.hit("ip").allowed).toBe(true);
    const blocked = limiter.hit("ip");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(60);
  });

  it("libera el cupo cuando sale de la ventana", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: time.now });
    expect(limiter.hit("ip").allowed).toBe(true);
    expect(limiter.hit("ip").allowed).toBe(false);
    time.advance(60_000);
    expect(limiter.hit("ip").allowed).toBe(true);
  });

  it("cuenta cada clave por separado", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: time.now });
    expect(limiter.hit("a").allowed).toBe(true);
    expect(limiter.hit("b").allowed).toBe(true);
    expect(limiter.hit("a").allowed).toBe(false);
  });
});
