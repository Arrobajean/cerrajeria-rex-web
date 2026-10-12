import { describe, expect, it } from "vitest";
import { acknowledgeQuote, DEMO_QUOTE_MESSAGE, isHoneypotFilled } from "./quotes";
import type { QuoteRequest } from "./schemas";

const REQUEST: QuoteRequest = {
  name: "Marta Ibáñez",
  phone: "612345678",
  address: "Calle Mayor 10",
  kind: "lock_change",
  details: "",
  website: "",
};

describe("acknowledgeQuote", () => {
  it("responde siempre de demostración, con el mensaje claro", () => {
    expect(acknowledgeQuote(REQUEST)).toEqual({ status: "demo", message: DEMO_QUOTE_MESSAGE });
    expect(DEMO_QUOTE_MESSAGE).toContain("no se ha enviado a ningún cerrajero");
  });

  it("responde igual a un robot que rellena el campo trampa", () => {
    const bot = { ...REQUEST, website: "http://spam.example" };
    expect(isHoneypotFilled(bot)).toBe(true);
    expect(acknowledgeQuote(bot)).toEqual(acknowledgeQuote(REQUEST));
  });

  it("no considera rellenado un campo trampa con solo espacios", () => {
    expect(isHoneypotFilled({ ...REQUEST, website: "   " })).toBe(false);
  });
});
