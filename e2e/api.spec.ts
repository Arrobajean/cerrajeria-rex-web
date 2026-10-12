import { expect, test } from "./fixtures";

const VALID = {
  name: "Marta Ibáñez",
  phone: "612 345 678",
  address: "Calle Mayor 10",
  kind: "lock_repair",
  details: "",
  website: "",
};

test.describe("contrato de la API de solicitudes", () => {
  test("una solicitud válida responde 202 con el estado de demostración", async ({ api }) => {
    const response = await api.post("/api/solicitudes", { data: VALID });
    expect(response.status()).toBe(202);
    const body = await response.json();
    expect(body.status).toBe("demo");
    expect(body.message).toContain("demostración");
  });

  test("un teléfono inválido responde 400 con el campo señalado", async ({ api }) => {
    const response = await api.post("/api/solicitudes", { data: { ...VALID, phone: "1" } });
    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ code: "invalid_request", field: "phone" });
  });

  test("un campo desconocido responde 400 sin señalar ningún campo", async ({ api }) => {
    const response = await api.post("/api/solicitudes", { data: { ...VALID, price: 0 } });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.code).toBe("invalid_request");
    expect(body.field).toBeUndefined();
  });

  test("un cuerpo que no es JSON responde 400 invalid_json", async ({ api }) => {
    const response = await api.post("/api/solicitudes", {
      headers: { "Content-Type": "application/json" },
      data: Buffer.from("{no-json"),
    });
    expect(response.status()).toBe(400);
    expect((await response.json()).code).toBe("invalid_json");
  });

  test("el campo trampa relleno recibe la misma respuesta de demostración", async ({ api }) => {
    const response = await api.post("/api/solicitudes", { data: { ...VALID, website: "http://spam.example" } });
    expect(response.status()).toBe(202);
    expect((await response.json()).status).toBe("demo");
  });

  test("la sexta solicitud desde la misma IP responde 429 con Retry-After", async ({ api }) => {
    for (let index = 0; index < 5; index += 1) {
      expect((await api.post("/api/solicitudes", { data: VALID })).status()).toBe(202);
    }
    const blocked = await api.post("/api/solicitudes", { data: VALID });
    expect(blocked.status()).toBe(429);
    expect(Number(blocked.headers()["retry-after"])).toBeGreaterThan(0);
  });

  test("solo acepta POST", async ({ api }) => {
    const response = await api.get("/api/solicitudes");
    expect(response.status()).toBe(405);
  });
});

test.describe("rastreo y metadatos", () => {
  test("el sitemap lista solo las páginas públicas", async ({ api }) => {
    const xml = await (await api.get("/sitemap.xml")).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(urls.map((url) => new URL(url ?? "").pathname)).toEqual(["/", "/servicios", "/contacto", "/aviso"]);
  });

  test("robots.txt apunta al sitemap y no indexa la API", async ({ api }) => {
    const text = await (await api.get("/robots.txt")).text();
    expect(text).toContain("Disallow: /api/");
    expect(text).toContain("Sitemap:");
  });

  test("la imagen de compartir y el icono se generan como PNG", async ({ api }) => {
    for (const path of ["/opengraph-image", "/icon"]) {
      const response = await api.get(path);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  });

  test("la portada incluye datos estructurados de cerrajero sin valoraciones", async ({ page }) => {
    await page.goto("/");
    const json = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(json).toContain('"@type":"Locksmith"');
    expect(json).not.toContain("aggregateRating");
  });

  test("cada página pública tiene un título y una descripción propios", async ({ page }) => {
    const titles = new Set<string>();
    for (const path of ["/", "/servicios", "/contacto", "/aviso"]) {
      await page.goto(path);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(5);
      titles.add(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{20,}/);
    }
    expect(titles.size).toBe(4);
  });
});
