"use client";

import type { FormEvent } from "react";
import { useQuoteForm } from "@/hooks/use-quote-form";
import { FIELD_IDS, QuoteFormFields } from "./quote-form-fields";
import { QuoteStatus } from "./quote-status";

/** Contenedor del formulario: el estado vive en el hook; aquí solo se compone y se enfoca el primer error. */
export function QuoteForm() {
  const { values, errors, status, setField, submit } = useQuoteForm();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await submit();
    if (!result.ok && result.firstInvalid) {
      document.getElementById(FIELD_IDS[result.firstInvalid])?.focus();
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5" aria-labelledby="titulo-formulario">
      <QuoteFormFields values={values} errors={errors} onChange={setField} />
      <QuoteStatus status={status} />
      <button
        type="submit"
        disabled={status.phase === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-6 font-semibold text-accent-ink transition duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-fit"
      >
        Enviar solicitud
      </button>
    </form>
  );
}
