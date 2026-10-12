interface SectionHeadingProps {
  id: string;
  title: string;
  intro?: string;
}

/** Encabezado de sección: título y, si hace falta, una frase de introducción. Sin etiquetas decorativas encima. */
export function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-lg text-muted">{intro}</p> : null}
    </header>
  );
}
