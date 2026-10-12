import { HOME_COPY } from "@/content/home";
import { Icon } from "../ui/icon";
import { SectionHeading } from "../ui/section-heading";

/** Tres razones en columnas, con el icono encima. Los datos son los del texto original. */
export function WhyUs() {
  const { whyUs } = HOME_COPY;
  return (
    <section aria-labelledby="titulo-por-que" className="container-page py-16 lg:py-24">
      <SectionHeading id="titulo-por-que" title={whyUs.heading} />
      <ul className="mt-10 grid gap-8 md:grid-cols-3">
        {whyUs.items.map((item) => (
          <li key={item.title} className="flex flex-col gap-4 border-l-2 border-accent pl-5">
            <Icon name={item.icon} size={28} className="text-accent-text" />
            <h3 className="font-display text-xl font-bold">{item.title}</h3>
            <p className="text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
