export type Theme = "light" | "dark";

/** Nombres de icono del proyecto. El mapa a Phosphor vive en la capa de UI, no aquí. */
export type IconName =
  | "door"
  | "wrench"
  | "key"
  | "lock"
  | "clock"
  | "shield"
  | "card"
  | "phone"
  | "whatsapp"
  | "mail"
  | "pin";

export interface Service {
  slug: string;
  title: string;
  summary: string;
  icon: IconName;
}

export type QuoteKind = "door_opening" | "lock_repair" | "lock_change" | "electronic_lock" | "other";

/** Respuesta de la API de solicitudes: siempre de demostración, nunca se envía nada. */
export interface DemoQuoteResponse {
  status: "demo";
  message: string;
}

/** Cuerpo de error de la API: el mensaje ya viene redactado para el usuario. */
export interface ApiErrorBody {
  error?: string;
  code?: string;
  field?: string;
}
