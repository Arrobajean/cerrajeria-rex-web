import { acknowledgeQuote } from "@/lib/quotes";
import { createRateLimiter } from "@/lib/rate-limit";
import { firstInvalidField, validateQuote } from "@/lib/schemas";

// 5 solicitudes cada 10 minutos por IP. Es una protección de demostración, no un límite de negocio.
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });
const MAX_BODY_CHARS = 8_000;

function clientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function failure(status: number, error: string, code: string, field?: string, headers?: HeadersInit) {
  return Response.json({ error, code, ...(field ? { field } : {}) }, { status, headers });
}

/** La ruta solo limita, parsea y delega. Las reglas de validación viven en lib/schemas y las de respuesta en lib/quotes. */
export async function POST(request: Request) {
  const limit = limiter.hit(clientKey(request));
  if (!limit.allowed) {
    return failure(429, "Demasiados intentos. Prueba de nuevo en unos minutos.", "rate_limited", undefined, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  const text = await request.text();
  if (text.length > MAX_BODY_CHARS) return failure(413, "La solicitud es demasiado grande.", "payload_too_large");

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return failure(400, "La solicitud no es JSON válido.", "invalid_json");
  }

  const validation = validateQuote(body);
  if (!validation.ok) {
    const field = firstInvalidField(validation.errors);
    const message = (field && validation.errors[field]) || "Solicitud no válida.";
    return failure(400, message, "invalid_request", field ?? undefined);
  }

  return Response.json(acknowledgeQuote(validation.data), { status: 202 });
}
