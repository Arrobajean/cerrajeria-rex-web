import { DISTRICTS } from "@/content/districts";
import { CONTACT, SITE } from "@/content/site";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3201").replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

/**
 * Datos estructurados del negocio, solo con lo que la web afirma: nombre, zona, horario de 24 horas
 * y contacto de ejemplo. No hay valoraciones, precios ni años de actividad: el proyecto original no los tiene.
 */
export function locksmithJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: SITE.name,
    description: SITE.description,
    url: SITE_URL,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      postalCode: CONTACT.address.postalCode,
      addressLocality: CONTACT.address.locality,
      addressCountry: CONTACT.address.country,
    },
    areaServed: DISTRICTS.map((district) => ({ "@type": "AdministrativeArea", name: `${district}, ${SITE.city}` })),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: [...ALL_DAYS], opens: "00:00", closes: "23:59" },
    ],
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
