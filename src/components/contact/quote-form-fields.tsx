import { QUOTE_KINDS } from "@/content/quote-kinds";
import type { QuoteField, QuoteFieldErrors } from "@/lib/schemas";
import type { QuoteValues } from "@/hooks/use-quote-form";

export const FIELD_IDS: Record<QuoteField, string> = {
  name: "campo-nombre",
  phone: "campo-telefono",
  address: "campo-direccion",
  kind: "campo-tipo",
  details: "campo-detalles",
  website: "campo-web",
};

const CONTROL =
  "mt-2 w-full rounded-xl border border-control-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted aria-[invalid=true]:border-danger";

interface QuoteFormFieldsProps {
  values: QuoteValues;
  errors: QuoteFieldErrors;
  onChange: (field: QuoteField, value: string) => void;
}

/** Campos del formulario con etiqueta visible encima, error debajo y un campo trampa oculto. */
export function QuoteFormFields({ values, errors, onChange }: QuoteFormFieldsProps) {
  const describedBy = (field: QuoteField) => (errors[field] ? `${FIELD_IDS[field]}-error` : undefined);
  const errorText = (field: QuoteField) =>
    errors[field] ? (
      <p id={`${FIELD_IDS[field]}-error`} className="mt-2 text-sm font-semibold text-danger">
        {errors[field]}
      </p>
    ) : null;

  return (
    <>
      <div>
        <label htmlFor={FIELD_IDS.name} className="block font-semibold">
          Nombre completo
        </label>
        <input
          id={FIELD_IDS.name}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={describedBy("name")}
          className={CONTROL}
        />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor={FIELD_IDS.phone} className="block font-semibold">
          Teléfono de contacto
        </label>
        <p id="campo-telefono-ayuda" className="mt-1 text-sm text-muted">
          Móvil o fijo, 9 cifras.
        </p>
        <input
          id={FIELD_IDS.phone}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          aria-invalid={errors.phone ? "true" : undefined}
          aria-describedby={["campo-telefono-ayuda", describedBy("phone")].filter(Boolean).join(" ")}
          className={CONTROL}
        />
        {errorText("phone")}
      </div>

      <div>
        <label htmlFor={FIELD_IDS.address} className="block font-semibold">
          Dirección
        </label>
        <input
          id={FIELD_IDS.address}
          name="address"
          autoComplete="street-address"
          placeholder="Calle, número y piso"
          value={values.address}
          onChange={(event) => onChange("address", event.target.value)}
          aria-invalid={errors.address ? "true" : undefined}
          aria-describedby={describedBy("address")}
          className={CONTROL}
        />
        {errorText("address")}
      </div>

      <div>
        <label htmlFor={FIELD_IDS.kind} className="block font-semibold">
          Tipo de urgencia
        </label>
        <select
          id={FIELD_IDS.kind}
          name="kind"
          value={values.kind}
          onChange={(event) => onChange("kind", event.target.value)}
          aria-invalid={errors.kind ? "true" : undefined}
          aria-describedby={describedBy("kind")}
          className={CONTROL}
        >
          <option value="">Elige una opción</option>
          {QUOTE_KINDS.map((kind) => (
            <option key={kind.value} value={kind.value}>
              {kind.label}
            </option>
          ))}
        </select>
        {errorText("kind")}
      </div>

      <div>
        <label htmlFor={FIELD_IDS.details} className="block font-semibold">
          Detalles (opcional)
        </label>
        <textarea
          id={FIELD_IDS.details}
          name="details"
          rows={3}
          placeholder="Describe brevemente lo que ha pasado"
          value={values.details}
          onChange={(event) => onChange("details", event.target.value)}
          aria-invalid={errors.details ? "true" : undefined}
          aria-describedby={describedBy("details")}
          className={CONTROL}
        />
        {errorText("details")}
      </div>

      {/* Campo trampa: los robots lo rellenan, las personas no lo ven ni llegan a él con el teclado. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={FIELD_IDS.website}>No rellenar</label>
        <input
          id={FIELD_IDS.website}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => onChange("website", event.target.value)}
        />
      </div>
    </>
  );
}
