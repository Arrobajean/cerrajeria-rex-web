import { ROUTES } from "@/lib/routes";

export const NAV_LINKS = [
  { href: ROUTES.services, label: "Servicios" },
  { href: ROUTES.zones, label: "Zonas" },
  { href: ROUTES.contact, label: "Contacto" },
] as const;
