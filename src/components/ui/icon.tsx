import {
  CreditCard,
  Clock,
  DoorOpen,
  EnvelopeSimple,
  Key,
  LockKey,
  MapPin,
  Phone,
  ShieldCheck,
  WhatsappLogo,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { IconName } from "@/lib/types";

type PhosphorIcon = typeof DoorOpen;

/** Mapa de iconos del proyecto a Phosphor. Solo presentación: la lógica no conoce componentes. */
const ICONS: Record<IconName, PhosphorIcon> = {
  door: DoorOpen,
  wrench: Wrench,
  key: Key,
  lock: LockKey,
  clock: Clock,
  shield: ShieldCheck,
  card: CreditCard,
  phone: Phone,
  whatsapp: WhatsappLogo,
  mail: EnvelopeSimple,
  pin: MapPin,
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

/** Icono decorativo: el texto de al lado describe la acción, así que se oculta a los lectores de pantalla. */
export function Icon({ name, size = 24, className }: IconProps) {
  const Component = ICONS[name];
  return <Component aria-hidden="true" focusable="false" size={size} weight="duotone" className={className} />;
}
