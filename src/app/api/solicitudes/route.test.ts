import { describe, expect, it } from "vitest";
import { DEMO_QUOTE_MESSAGE } from "@/lib/quotes";
import { POST } from "./route";

const VALID = {
  name: "Marta Ibáñez",
  phone: "612 345 678",
  address: "Calle Mayor 10",
  kind: "door_opening",
  details: "Me he quedado fuera de casa.",
  website: "",
};

/** Cada prueba usa su propia IP: el límite de intentos es por cliente y el módulo es el mismo para todas. */
let ipCounter = 0;
function post(body: unknown, options: { ip?: string; raw?: string } = {}) {
  ipCounter += 1;
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-forwarded-for": options.ip ?? `198.51.100.${ipCounter}`,
  });
  return POST(new Request("http://localhost/api/solicitudes", { method: "POST", headers, body: options.raw ?? JSON.stringify(body) }));
}

describe("POST /api/solicitudes", () => {
  it("responde 202 con el mensaje de demostración para una solicitud válida", async () => {
    const response = await post(VALID);
    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ status: "demo", message: DEMO_QUOTE_MESSAGE });
  });

  it("responde 400 con el campo y el mensaje cuando el teléfono no es válido", async () => {
    const response = await post({ ...VALID, phone: "123" });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Revisa el teléfono: deben ser 9 cifras.",
      code: "invalid_request",
      field: "phone",
    });
  });

  it("responde 400 si llega un campo que no existe en el esquema", async () => {
    const response = await post({ ...VALID, price: 0 });
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("invalid_request");
  });

  it("responde 400 si el cuerpo no es JSON", async () => {
    const response = await post(null, { raw: "{no-json" });
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("invalid_json");
  });

  it("acepta el campo trampa relleno con la misma respuesta de demostración", async () => {
    const response = await post({ ...VALID, website: "http://spam.example" });
    expect(response.status).toBe(202);
    expect((await response.json()).status).toBe("demo");
  });

  it("responde 413 si el cuerpo supera el tamaño máximo", async () => {
    const response = await post(null, { raw: JSON.stringify({ ...VALID, details: "x".repeat(9_000) }) });
    expect(response.status).toBe(413);
  });

  it("responde 429 con Retry-After a partir de la sexta solicitud desde la misma IP", async () => {
    const ip = "203.0.113.77";
    for (let index = 0; index < 5; index += 1) {
      expect((await post(VALID, { ip })).status).toBe(202);
    }
    const blocked = await post(VALID, { ip });
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get("Retry-After"))).toBeGreaterThan(0);
  });
});
