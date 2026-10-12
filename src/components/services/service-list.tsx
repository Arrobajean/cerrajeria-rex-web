import { SERVICES } from "@/content/services";
import { Icon } from "../ui/icon";

/** Servicios completos de la página de servicios: título a la izquierda, descripción a la derecha. */
export function ServiceList() {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {SERVICES.map((service) => (
        <li key={service.slug} id={service.slug} className="grid scroll-mt-44 gap-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10 md:scroll-mt-24">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent-text">
              <Icon name={service.icon} size={26} />
            </span>
            <h2 className="font-display text-xl font-bold">{service.title}</h2>
          </div>
          <p className="text-lg text-muted">{service.summary}</p>
        </li>
      ))}
    </ul>
  );
}
