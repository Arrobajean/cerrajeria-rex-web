import Link from "next/link";
import { CONTACT, SITE } from "@/content/site";
import { NAV_LINKS } from "@/content/navigation";
import { ROUTES } from "@/lib/routes";
import { buildMailtoHref, buildTelHref } from "@/lib/links";
import { Icon } from "../ui/icon";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">{SITE.name}</p>
          <p className="mt-3 max-w-sm text-muted">{SITE.tagline}.</p>
          <p className="mt-4 max-w-sm rounded-xl border border-line bg-bg p-4 text-sm">
            <span className="font-semibold">Esto es una demostración.</span> Los datos de contacto son de ejemplo.{" "}
            <Link href={ROUTES.notice} className="font-semibold text-accent-text underline underline-offset-4">
              Leer el aviso
            </Link>
          </p>
        </div>

        <nav aria-label="Pie de página" className="flex flex-col gap-3 text-sm">
          <p className="font-semibold">Web</p>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="w-fit text-muted underline-offset-4 hover:text-ink hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <p className="font-semibold">Contacto</p>
          <a href={buildTelHref(CONTACT.phoneE164)} className="flex items-center gap-2 text-muted hover:text-ink">
            <Icon name="phone" size={18} />
            <span>{CONTACT.phoneDisplay}</span>
          </a>
          <a href={buildMailtoHref(CONTACT.email)} className="flex items-center gap-2 text-muted hover:text-ink">
            <Icon name="mail" size={18} />
            <span>{CONTACT.email}</span>
          </a>
          <p className="flex items-start gap-2 text-muted">
            <Icon name="pin" size={18} className="mt-0.5 shrink-0" />
            <span>
              {CONTACT.address.street}, {CONTACT.address.postalCode} {CONTACT.address.locality}
            </span>
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-sm text-muted">
          © {year} {SITE.name}. Proyecto de demostración.
        </p>
      </div>
    </footer>
  );
}
