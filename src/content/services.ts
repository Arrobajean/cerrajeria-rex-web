import type { Service } from "@/lib/types";

/** Servicios con el texto original del proyecto, sin los datos que no podemos comprobar (años, certificaciones, tiempos). */
export const SERVICES: readonly Service[] = [
  {
    slug: "apertura-de-puertas",
    title: "Apertura de puertas",
    summary: "Abrimos la puerta sin dañarla, con técnicas no destructivas siempre que sea posible.",
    icon: "door",
  },
  {
    slug: "reparacion-de-cerraduras",
    title: "Reparación de cerraduras",
    summary: "Reparamos cerraduras averiadas, atascadas o dañadas para que vuelvan a funcionar.",
    icon: "wrench",
  },
  {
    slug: "instalacion-de-bombines",
    title: "Instalación de bombines",
    summary: "Cambiamos e instalamos bombines de alta seguridad para proteger tu casa o tu negocio.",
    icon: "key",
  },
  {
    slug: "cerraduras-electronicas",
    title: "Cerraduras electrónicas",
    summary: "Instalamos y configuramos cerraduras digitales y electrónicas.",
    icon: "lock",
  },
];
