import type { QuoteKind } from "@/lib/types";

/** Tipos de urgencia del formulario. El orden es el orden en que se muestran. */
export const QUOTE_KINDS: readonly { value: QuoteKind; label: string }[] = [
  { value: "door_opening", label: "Apertura de puerta" },
  { value: "lock_repair", label: "Reparación de cerradura" },
  { value: "lock_change", label: "Cambio de bombín" },
  { value: "electronic_lock", label: "Cerradura electrónica" },
  { value: "other", label: "Otro" },
];
