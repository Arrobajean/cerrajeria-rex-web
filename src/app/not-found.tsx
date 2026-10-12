import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-start gap-6 py-20">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Página no encontrada</h1>
      <p className="max-w-xl text-lg text-muted">La página que buscas no existe o se ha movido.</p>
      <ButtonLink href={ROUTES.home} variant="secondary">
        Volver al inicio
      </ButtonLink>
    </div>
  );
}
