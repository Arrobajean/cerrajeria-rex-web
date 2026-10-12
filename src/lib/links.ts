/**
 * Constructores de enlaces de contacto. Son funciones puras: validan la entrada y
 * lanzan un error si el dato no sirve, para que un número mal escrito no llegue a producción en silencio.
 */

/** Enlace tel: con formato internacional. Admite espacios o guiones en la entrada. */
export function buildTelHref(phone: string): string {
  const compact = phone.replace(/[^\d+]/g, "");
  if (!/^\+?\d{6,15}$/.test(compact)) {
    throw new Error(`Teléfono no válido para tel: ${phone}`);
  }
  return `tel:${compact}`;
}

/** Enlace de WhatsApp con mensaje prellenado. El número va solo con dígitos y prefijo de país. */
export function buildWhatsAppHref(digits: string, message: string): string {
  if (!/^\d{8,15}$/.test(digits)) {
    throw new Error(`Número de WhatsApp no válido: ${digits}`);
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Enlace mailto: sin asunto, para no rellenar datos que el usuario no ha escrito. */
export function buildMailtoHref(email: string): string {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`Correo no válido: ${email}`);
  }
  return `mailto:${email}`;
}
