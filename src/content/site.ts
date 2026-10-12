/** Datos del negocio. Son los del proyecto original; los de contacto son de ejemplo y así se indica en /aviso. */
export const SITE = {
  name: "Cerrajería REX",
  city: "Madrid",
  lang: "es",
  locale: "es_ES",
  tagline: "Cerrajeros 24 horas en Madrid",
  description:
    "Cerrajería de urgencia en Madrid, abierta las 24 horas: apertura de puertas, cambio de bombines y cerraduras electrónicas.",
} as const;

export const CONTACT = {
  phoneDisplay: "900 123 456",
  /** Formato internacional para enlaces tel: y datos estructurados. */
  phoneE164: "+34900123456",
  whatsappDisplay: "600 123 456",
  /** wa.me exige solo dígitos, con prefijo de país. */
  whatsappDigits: "34600123456",
  whatsappMessage: "Hola, necesito un cerrajero urgente en Madrid.",
  email: "info@cerrajeriarex.com",
  address: {
    street: "Calle Gran Vía 123",
    postalCode: "28013",
    locality: "Madrid",
    country: "ES",
  },
  hours: "Abierto las 24 horas, todos los días, también en festivos.",
} as const;
