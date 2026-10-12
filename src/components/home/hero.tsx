import Image from "next/image";
import { CONTACT } from "@/content/site";
import { HOME_COPY } from "@/content/home";
import { ROUTES } from "@/lib/routes";
import { buildTelHref } from "@/lib/links";
import { ButtonLink } from "../ui/button-link";

/** Portada: cuatro elementos de texto (titular, subtexto y dos botones) y una imagen. Nada más encima. */
export function Hero() {
  const { hero } = HOME_COPY;
  return (
    <section aria-labelledby="titulo-inicio" className="container-page grid items-center gap-10 py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-20">
      <div>
        <h1 id="titulo-inicio" className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{hero.subtext}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={buildTelHref(CONTACT.phoneE164)} icon="phone" size="lg">
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink href={ROUTES.services} variant="secondary" size="lg">
            {hero.secondaryCta}
          </ButtonLink>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
        <Image
          src="/images/locksmith-hero.webp"
          alt={hero.imageAlt}
          width={1600}
          height={900}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] h-auto w-full object-cover sm:aspect-[16/10]"
        />
      </div>
    </section>
  );
}
