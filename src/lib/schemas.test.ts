import { describe, expect, it } from "vitest";
import { firstInvalidField, isQuoteField, validateQuote } from "./schemas";

const VALID = {
  name: "Marta Ibáñez",
  phone: "612 345 678",
  address: "Calle Mayor 10, 2.º B",
  kind: "door_opening",
  details: "",
  website: "",
};

describe("validateQuote", () => {
  it("acepta una solicitud completa y recorta los espacios", () => {
    const result = validateQuote({ ...VALID, name: "  Marta Ibáñez  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.name).toBe("Marta Ibáñez");
  });

  it("acepta el detalle vacío y lo deja como cadena vacía", () => {
    const withoutDetails: Record<string, unknown> = { ...VALID };
    delete withoutDetails.details;
    const result = validateQuote(withoutDetails);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.details).toBe("");
  });

  it("devuelve un mensaje por cada campo que falla", () => {
    const result = validateQuote({ ...VALID, name: "A", phone: "123", kind: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBe("Escribe tu nombre.");
      expect(result.errors.phone).toBe("Revisa el teléfono: deben ser 9 cifras.");
      expect(result.errors.kind).toBe("Elige el tipo de urgencia.");
    }
  });

  it("rechaza campos desconocidos sin asignarlos a ningún campo", () => {
    const result = validateQuote({ ...VALID, price: 0 });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it("rechaza una entrada que no es un objeto", () => {
    expect(validateQuote("hola").ok).toBe(false);
    expect(validateQuote(null).ok).toBe(false);
  });

  it("rechaza un tipo de urgencia que no existe", () => {
    const result = validateQuote({ ...VALID, kind: "robot" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.kind).toBe("Elige el tipo de urgencia.");
  });

  it("acepta el campo trampa solo si llega vacío y dentro de su límite", () => {
    expect(validateQuote({ ...VALID, website: "" }).ok).toBe(true);
    expect(validateQuote({ ...VALID, website: "x".repeat(201) }).ok).toBe(false);
  });
});

describe("firstInvalidField", () => {
  it("devuelve el primer campo con error en el orden del formulario", () => {
    expect(firstInvalidField({ address: "x", phone: "y" })).toBe("phone");
    expect(firstInvalidField({ details: "x", kind: "y" })).toBe("kind");
  });

  it("devuelve null cuando no hay errores", () => {
    expect(firstInvalidField({})).toBeNull();
  });
});

describe("isQuoteField", () => {
  it("reconoce solo los campos del esquema", () => {
    expect(isQuoteField("phone")).toBe(true);
    expect(isQuoteField("website")).toBe(true);
    expect(isQuoteField("price")).toBe(false);
    expect(isQuoteField(undefined)).toBe(false);
  });
});
