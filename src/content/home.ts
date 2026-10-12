/** Textos de la portada. La cabecera de la portada tiene como máximo cuatro elementos de texto. */
export const HOME_COPY = {
  hero: {
    headline: "Cerrajeros 24 horas en Madrid",
    subtext:
      "Apertura de puertas, cambio de bombines y cerraduras electrónicas, también de noche, en fin de semana y en festivos.",
    primaryCta: "Llamar ahora",
    secondaryCta: "Ver servicios",
    imageAlt: "Cerrajero abriendo una puerta con sus llaves",
  },
  services: {
    heading: "Nuestros servicios",
    intro: "Soluciones de cerrajería para casas y negocios, de día y de noche.",
  },
  coverage: {
    heading: "Zonas con servicio",
    intro:
      "Atendemos en los distritos de Madrid que aparecen en esta lista. Si tu zona no aparece, consúltanos: en poblaciones cercanas el tiempo de llegada puede ser mayor.",
  },
  whyUs: {
    heading: "Por qué elegirnos",
    items: [
      {
        title: "Atención 24/7",
        body: "Disponibles todos los días del año, incluidos festivos, noches y fines de semana.",
        icon: "clock",
      },
      {
        title: "Sin dañar la puerta",
        body: "Abrimos con técnicas no destructivas siempre que es posible.",
        icon: "shield",
      },
      {
        title: "Formas de pago",
        body: "Aceptamos efectivo, transferencia y tarjeta.",
        icon: "card",
      },
    ],
  },
  contact: {
    heading: "Contacto",
    intro: "Para una urgencia, llama. Para una consulta, escribe por WhatsApp o por correo.",
  },
} as const;
