import type { QuoteRequest } from "./schemas";
import { ROUTES } from "./routes";
import type { ApiErrorBody, DemoQuoteResponse } from "./types";

/** Error de la API con el mensaje ya listo para mostrarlo al usuario. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly field?: string,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Único punto del cliente que usa fetch. */
async function request<T>(url: string, init: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    throw new ApiError("No hay conexión. Inténtalo de nuevo en unos segundos.", 0);
  }

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const body = (data ?? {}) as ApiErrorBody;
    throw new ApiError(body.error ?? "No se pudo completar la solicitud.", response.status, body.field, body.code);
  }
  return data as T;
}

export function submitQuote(payload: QuoteRequest): Promise<DemoQuoteResponse> {
  return request<DemoQuoteResponse>(ROUTES.quoteApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}
