import Link from "next/link";
import type { ReactNode } from "react";
import type { IconName } from "@/lib/types";
import { Icon } from "./icon";

type Variant = "primary" | "secondary";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:brightness-110",
  secondary: "border border-line bg-surface text-ink hover:bg-surface-2",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: IconName;
  size?: "md" | "lg";
  className?: string;
}

/**
 * Enlace con aspecto de botón. Para tel:, mailto: o rutas internas; nunca cambia de color al pasar
 * por encima sin cambiar el fondo, así el contraste del texto se mantiene.
 */
export function ButtonLink({ href, children, variant = "primary", icon, size = "md", className = "" }: ButtonLinkProps) {
  const sizing = size === "lg" ? "min-h-12 px-6 text-base" : "min-h-11 px-5 text-sm";
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition duration-200 active:scale-[0.98] ${sizing} ${VARIANTS[variant]} ${className}`}
    >
      {icon ? <Icon name={icon} size={size === "lg" ? 22 : 18} /> : null}
      <span>{children}</span>
    </Link>
  );
}
