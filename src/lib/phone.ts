const SPANISH_PHONE = /^(?:\+?34)?([6789]\d{8})$/;

/**
 * Devuelve los 9 dígitos de un teléfono español (móvil o fijo), o null si no es válido.
 * Acepta espacios, puntos y guiones, y un prefijo +34 o 34 opcional.
 */
export function normalizeSpanishPhone(input: string): string | null {
  const compact = input.replace(/[\s.-]/g, "");
  return SPANISH_PHONE.exec(compact)?.[1] ?? null;
}
