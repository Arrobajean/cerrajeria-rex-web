import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/** Solo páginas públicas. La API y los enlaces con ancla no entran aquí. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [ROUTES.home, ROUTES.services, ROUTES.contact, ROUTES.notice].map((path) => ({ url: absoluteUrl(path) }));
}
