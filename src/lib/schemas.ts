import { z } from "zod";
import { QUOTE_KINDS } from "@/content/quote-kinds";
import { normalizeSpanishPhone } from "./phone";
import type { QuoteKind } from "./types";

const KIND_VALUES = QUOTE_KINDS.map((kind) => kind.value) as [QuoteKind, ...QuoteKind[]];

/**
 * Esquema compartido por el formulario (cliente) y por la API (servidor).
 * `strictObject` rechaza campos desconocidos. `website` es un campo trampa: debe llegar vacío.
 */
export const quoteRequestSchema = z.strictObject({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80, "El nombre es demasiado largo."),
  phone: z
    .string()
    .trim()
    .refine((value) => normalizeSpanishPhone(value) !== null, "Revisa el teléfono: deben ser 9 cifras."),
  address: z.string().trim().min(5, "Indica la calle y el número.").max(160, "La dirección es demasiado larga."),
  kind: z.enum(KIND_VALUES, { error: "Elige el tipo de urgencia." }),
  details: z.string().trim().max(500, "Máximo 500 caracteres.").default(""),
  website: z.string().max(200).default(""),
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
export type QuoteField = keyof QuoteRequest;

/** Todos los campos conocidos: un error del servidor solo puede apuntar a uno de ellos. */
export const QUOTE_FIELDS = Object.keys(quoteRequestSchema.shape) as QuoteField[];

export function isQuoteField(value: unknown): value is QuoteField {
  return QUOTE_FIELDS.some((field) => field === value);
}

/** Orden de los campos en el formulario: el primer error en este orden recibe el foco. */
export const QUOTE_FIELD_ORDER: readonly QuoteField[] = ["name", "phone", "address", "kind", "details"];

export type QuoteFieldErrors = Partial<Record<QuoteField, string>>;

export type QuoteValidation = { ok: true; data: QuoteRequest } | { ok: false; errors: QuoteFieldErrors };

/** Valida cualquier entrada y devuelve el primer mensaje de cada campo con error. */
export function validateQuote(input: unknown): QuoteValidation {
  const parsed = quoteRequestSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };

  const { fieldErrors } = z.flattenError(parsed.error);
  const errors: QuoteFieldErrors = {};
  for (const field of Object.keys(fieldErrors) as QuoteField[]) {
    const first = fieldErrors[field]?.[0];
    if (first) errors[field] = first;
  }
  return { ok: false, errors };
}

/** Primer campo con error en el orden del formulario, o null si no hay ninguno. */
export function firstInvalidField(errors: QuoteFieldErrors): QuoteField | null {
  return QUOTE_FIELD_ORDER.find((field) => errors[field] !== undefined) ?? null;
}
