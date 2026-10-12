import { expect, test as base, type APIRequestContext, type Page } from "@playwright/test";

let counter = 0;
// La API limita por IP (5 solicitudes cada 10 min): cada test usa una IP propia.
const uniqueIp = () => `198.18.${Math.floor(Math.random() * 250)}.${(counter += 1) % 250 || 1}`;

export const test = base.extend<{ api: APIRequestContext }>({
  context: async ({ context }, provide) => {
    await context.setExtraHTTPHeaders({ "x-forwarded-for": uniqueIp() });
    await provide(context);
  },
  api: async ({ playwright, baseURL }, provide) => {
    const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: { "x-forwarded-for": uniqueIp() } });
    await provide(api);
    await api.dispose();
  },
});

export { expect };

/** Fija el tema antes de que cargue la página, igual que haría la preferencia guardada del usuario. */
export async function useTheme(page: Page, theme: "light" | "dark") {
  await page.addInitScript((value) => localStorage.setItem("cr:theme", value), theme);
}

/** Rellena el formulario con datos válidos. */
export async function fillValidQuote(page: Page) {
  await page.getByLabel("Nombre completo").fill("Marta Ibáñez");
  await page.getByLabel("Teléfono de contacto").fill("612 345 678");
  await page.getByLabel("Dirección").fill("Calle Mayor 10, 2.º B");
  await page.getByLabel("Tipo de urgencia").selectOption("door_opening");
  await page.getByLabel("Detalles (opcional)").fill("Me he quedado fuera de casa.");
}
