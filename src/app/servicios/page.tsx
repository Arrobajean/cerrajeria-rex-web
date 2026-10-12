import type { Metadata } from "next";
import Link from "next/link";
import { ServiceList } from "@/components/services/service-list";
import { JsonLd } from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Apertura de puertas, reparación de cerraduras, instalación de bombines y cerraduras electrónicas en Madrid, también de noche.",
  alternates: { canonical: ROUTES.services },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: ROUTES.home },
          { name: "Servicios", path: ROUTES.services },
        ])}
      />
      <div className="container-page py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Servicios de cerrajería</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">Estos son los servicios que ofrecemos en Madrid, de día y de noche.</p>
        <div className="mt-12">
          <ServiceList />
        </div>
        <p className="mt-12 text-lg">
          ¿Necesitas otra cosa? <Link href={ROUTES.contact} className="font-semibold text-accent-text underline underline-offset-4">Escríbenos desde el formulario de contacto</Link>.
        </p>
      </div>
    </>
  );
}
