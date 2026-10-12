import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import type { QuoteStatus as Status } from "@/hooks/use-quote-form";

interface QuoteStatusProps {
  status: Status;
}

/** Resultado del envío. Siempre en una región viva para que el lector de pantalla lo anuncie. */
export function QuoteStatus({ status }: QuoteStatusProps) {
  if (status.phase === "sending") {
    return (
      <p role="status" className="text-sm font-semibold text-muted">
        Enviando la solicitud...
      </p>
    );
  }

  if (status.phase === "demo") {
    return (
      <div role="status" className="flex gap-3 rounded-xl border border-accent bg-surface-2 p-4">
        <CheckCircle aria-hidden="true" focusable="false" size={24} weight="duotone" className="mt-0.5 shrink-0 text-accent-text" />
        <div>
          <p className="font-semibold">Demostración completada</p>
          <p className="mt-1 text-sm text-muted">{status.message}</p>
        </div>
      </div>
    );
  }

  if (status.phase === "error") {
    return (
      <div role="alert" className="flex gap-3 rounded-xl border border-danger bg-surface-2 p-4">
        <WarningCircle aria-hidden="true" focusable="false" size={24} weight="duotone" className="mt-0.5 shrink-0 text-danger" />
        <p className="text-sm font-semibold">{status.message}</p>
      </div>
    );
  }

  return <p role="status" className="sr-only" />;
}
