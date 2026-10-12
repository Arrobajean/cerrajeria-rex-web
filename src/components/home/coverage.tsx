import { DISTRICTS } from "@/content/districts";
import { HOME_COPY } from "@/content/home";
import { Icon } from "../ui/icon";
import { SectionHeading } from "../ui/section-heading";

/** Zonas con servicio: panel de superficie con la lista de distritos en dos columnas. */
export function Coverage() {
  return (
    <section id="zonas" aria-labelledby="titulo-zonas" className="scroll-mt-44 md:scroll-mt-20 bg-surface">
      <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:py-24">
        <SectionHeading id="titulo-zonas" title={HOME_COPY.coverage.heading} intro={HOME_COPY.coverage.intro} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DISTRICTS.map((district) => (
            <li key={district} className="flex items-center gap-2 rounded-xl border border-line bg-bg px-4 py-3 font-medium">
              <Icon name="pin" size={18} className="shrink-0 text-accent-text" />
              <span>{district}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
