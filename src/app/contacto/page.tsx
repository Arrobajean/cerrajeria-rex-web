import type { Metadata } from "next";
import { ContactChannels } from "@/components/contact/contact-channels";
import { QuoteForm } from "@/components/contact/quote-form";
import { JsonLd } from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Teléfono, WhatsApp y correo de Cerrajería REX, y un formulario de solicitud de demostración.",
  alternates: { canonical: ROUTES.contact },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: ROUTES.home },
          { name: "Contacto", path: ROUTES.contact },
        ])}
      />
      <div className="container-page py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Contacto</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Para una urgencia, llama. Si no es urgente, escribe por WhatsApp o rellena el formulario.
        </p>

        <div className="mt-10">
          <ContactChannels />
        </div>

        <section aria-labelledby="titulo-formulario" className="mt-16 max-w-2xl">
          <h2 id="titulo-formulario" className="font-display text-2xl font-bold">
            Pedir ayuda por formulario
          </h2>
          <p className="mt-3 text-muted">
            Esto es una demostración: el formulario comprueba los datos, pero no envía nada a ningún cerrajero.
          </p>
          <div className="mt-8">
            <QuoteForm />
          </div>
        </section>
      </div>
    </>
  );
}
