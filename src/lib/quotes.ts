import type { QuoteRequest } from "./schemas";
import type { DemoQuoteResponse } from "./types";

export const DEMO_QUOTE_MESSAGE =
  "Esto es una demostración: tu solicitud no se ha enviado a ningún cerrajero y no se ha guardado ningún dato.";

const DEMO_RESPONSE: DemoQuoteResponse = { status: "demo", message: DEMO_QUOTE_MESSAGE };

/** Campo trampa relleno: un robot lo completa, una persona no lo ve. */
export function isHoneypotFilled(request: QuoteRequest): boolean {
  return request.website.trim().length > 0;
}

/**
 * Acepta una solicitud ya validada y responde de demostración.
 * Un robot que rellena el campo trampa recibe la misma respuesta, pero nunca llega al punto de extensión.
 * Punto de extensión: aquí iría el envío real (correo, CRM o aviso al cerrajero).
 */
export function acknowledgeQuote(request: QuoteRequest): DemoQuoteResponse {
  if (isHoneypotFilled(request)) return DEMO_RESPONSE;
  return DEMO_RESPONSE;
}
