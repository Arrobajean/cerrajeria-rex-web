import Link from "next/link";
import { Key } from "@phosphor-icons/react/dist/ssr";
import { CONTACT } from "@/content/site";
import { NAV_LINKS } from "@/content/navigation";
import { ROUTES } from "@/lib/routes";
import { buildTelHref } from "@/lib/links";
import { ButtonLink } from "../ui/button-link";
import { ThemeToggle } from "./theme-toggle";

/** Cabecera de una línea en escritorio; en móvil, la navegación baja a una segunda fila. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3 md:h-16 md:flex-nowrap md:py-0">
        <Link href={ROUTES.home} className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <Key aria-hidden="true" focusable="false" size={24} weight="duotone" className="text-accent-text" />
          <span>Cerrajería REX</span>
        </Link>

        <nav aria-label="Principal" className="order-last w-full md:order-none md:w-auto">
          <ul className="flex items-center justify-center gap-6 text-sm font-medium md:justify-start">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-md py-1 text-ink underline-offset-4 hover:text-accent-text hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={buildTelHref(CONTACT.phoneE164)} icon="phone">
            Llamar ahora
          </ButtonLink>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
