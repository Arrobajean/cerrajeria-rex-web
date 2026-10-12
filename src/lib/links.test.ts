import { describe, expect, it } from "vitest";
import { buildMailtoHref, buildTelHref, buildWhatsAppHref } from "./links";

describe("buildTelHref", () => {
  it("quita espacios y guiones y conserva el prefijo internacional", () => {
    expect(buildTelHref("+34 900 123 456")).toBe("tel:+34900123456");
    expect(buildTelHref("900-123-456")).toBe("tel:900123456");
  });

  it("rechaza números demasiado cortos o con letras", () => {
    expect(() => buildTelHref("123")).toThrow(/no válido/);
    expect(() => buildTelHref("llama ya")).toThrow(/no válido/);
  });
});

describe("buildWhatsAppHref", () => {
  it("usa solo dígitos y codifica el mensaje", () => {
    expect(buildWhatsAppHref("34600123456", "Hola, necesito ayuda")).toBe(
      "https://wa.me/34600123456?text=Hola%2C%20necesito%20ayuda",
    );
  });

  it("rechaza un número con signo más o espacios", () => {
    expect(() => buildWhatsAppHref("+34600123456", "hola")).toThrow(/no válido/);
    expect(() => buildWhatsAppHref("34 600 123 456", "hola")).toThrow(/no válido/);
  });
});

describe("buildMailtoHref", () => {
  it("devuelve el enlace sin asunto ni cuerpo prellenados", () => {
    expect(buildMailtoHref("info@cerrajeriarex.com")).toBe("mailto:info@cerrajeriarex.com");
  });

  it("rechaza un correo sin arroba", () => {
    expect(() => buildMailtoHref("info.cerrajeriarex.com")).toThrow(/no válido/);
  });
});
