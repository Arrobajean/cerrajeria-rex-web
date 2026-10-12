import { CONTACT } from "@/content/site";
import { buildMailtoHref, buildTelHref, buildWhatsAppHref } from "@/lib/links";
import type { IconName } from "@/lib/types";
import { Icon } from "../ui/icon";

interface Channel {
  label: string;
  value: string;
  href?: string;
  icon: IconName;
  note: string;
}

/** Canales de contacto con su enlace real: tel:, WhatsApp con mensaje y mailto:. */
export function ContactChannels() {
  const channels: Channel[] = [
    {
      label: "Teléfono, 24 horas",
      value: CONTACT.phoneDisplay,
      href: buildTelHref(CONTACT.phoneE164),
      icon: "phone",
      note: "Para urgencias.",
    },
    {
      label: "WhatsApp",
      value: CONTACT.whatsappDisplay,
      href: buildWhatsAppHref(CONTACT.whatsappDigits, CONTACT.whatsappMessage),
      icon: "whatsapp",
      note: "Para consultas por mensaje.",
    },
    {
      label: "Correo",
      value: CONTACT.email,
      href: buildMailtoHref(CONTACT.email),
      icon: "mail",
      note: "Para consultas que no son urgentes.",
    },
    {
      label: "Dirección",
      value: `${CONTACT.address.street}, ${CONTACT.address.postalCode} ${CONTACT.address.locality}`,
      icon: "pin",
      note: CONTACT.hours,
    },
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {channels.map((channel) => (
        <li key={channel.label} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent-text">
            <Icon name={channel.icon} size={22} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-muted">{channel.label}</p>
            {channel.href ? (
              <a href={channel.href} className="mt-1 block break-words text-lg font-bold text-ink underline-offset-4 hover:text-accent-text hover:underline">
                {channel.value}
              </a>
            ) : (
              <p className="mt-1 break-words text-lg font-bold">{channel.value}</p>
            )}
            <p className="mt-1 text-sm text-muted">{channel.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
