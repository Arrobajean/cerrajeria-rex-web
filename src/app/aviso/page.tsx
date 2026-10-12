import type { Metadata } from "next";
import { NOTICE } from "@/content/notice";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Aviso de demostración",
  description: "Qué es esta web, qué pasa con los datos del formulario y qué licencia tienen los textos y las fotografías.",
  alternates: { canonical: ROUTES.notice },
};

export default function NoticePage() {
  return (
    <div className="container-page py-12 lg:py-20">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{NOTICE.title}</h1>
      <p className="mt-6 max-w-2xl text-lg">{NOTICE.intro}</p>
      <div className="mt-12 grid max-w-2xl gap-10">
        {NOTICE.sections.map((section, index) => (
          <section key={section.heading} aria-labelledby={`aviso-${index}`}>
            <h2 id={`aviso-${index}`} className="font-display text-xl font-bold">
              {section.heading}
            </h2>
            <p className="mt-3 text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
