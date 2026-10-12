"use client";

import { useCallback, useState } from "react";
import { ApiError, submitQuote } from "@/lib/api";
import { firstInvalidField, isQuoteField, validateQuote, type QuoteField, type QuoteFieldErrors } from "@/lib/schemas";

export type QuoteValues = Record<QuoteField, string>;

export type QuoteStatus =
  | { phase: "idle" }
  | { phase: "sending" }
  | { phase: "demo"; message: string }
  | { phase: "error"; message: string };

export interface SubmitResult {
  ok: boolean;
  firstInvalid: QuoteField | null;
}

const EMPTY_VALUES: QuoteValues = { name: "", phone: "", address: "", kind: "", details: "", website: "" };
const NETWORK_FALLBACK = "No se pudo enviar la solicitud. Inténtalo de nuevo.";

/** Estado del formulario de solicitud: valores, errores por campo y resultado del envío. */
export function useQuoteForm() {
  const [values, setValues] = useState<QuoteValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [status, setStatus] = useState<QuoteStatus>({ phase: "idle" });

  const setField = useCallback((field: QuoteField, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  }, []);

  const submit = useCallback(async (): Promise<SubmitResult> => {
    const validation = validateQuote(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus({ phase: "idle" });
      return { ok: false, firstInvalid: firstInvalidField(validation.errors) };
    }

    setErrors({});
    setStatus({ phase: "sending" });
    try {
      const response = await submitQuote(validation.data);
      setStatus({ phase: "demo", message: response.message });
      return { ok: true, firstInvalid: null };
    } catch (error) {
      const serverError = error instanceof ApiError ? error : null;
      const message = serverError?.message ?? NETWORK_FALLBACK;
      const field = isQuoteField(serverError?.field) ? serverError.field : null;
      if (field) setErrors({ [field]: message });
      setStatus({ phase: "error", message });
      return { ok: false, firstInvalid: field };
    }
  }, [values]);

  return { values, errors, status, setField, submit };
}
