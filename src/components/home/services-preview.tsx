import { SERVICES } from "@/content/services";
import { HOME_COPY } from "@/content/home";
import { SectionHeading } from "../ui/section-heading";
import { Icon } from "../ui/icon";

/** Servicios en filas con icono a la izquierda: una sola mirada, sin tarjetas. */
export function ServicesPreview() {
  return (
    <section aria-labelledby="titulo-servicios" className="container-page border-t border-line py-16 lg:py-24">
      <SectionHeading id="titulo-servicios" title={HOME_COPY.services.heading} intro={HOME_COPY.services.intro} />
      <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
        {SERVICES.map((service) => (
          <li key={service.slug} className="flex gap-4 border-t border-line py-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent-text">
              <Icon name={service.icon} size={24} />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold">{service.title}</h3>
              <p className="mt-1 text-muted">{service.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
