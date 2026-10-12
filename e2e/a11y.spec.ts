import AxeBuilder from "@axe-core/playwright";
import { expect, fillValidQuote, test, useTheme } from "./fixtures";

// WCAG 2.1 AA más las buenas prácticas de axe (orden de encabezados, regiones, etc.).
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

const PAGES = [
  ["inicio", "/"],
  ["servicios", "/servicios"],
  ["contacto", "/contacto"],
  ["aviso", "/aviso"],
  ["404", "/no-existe"],
] as const;

async function violationsOf(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  return results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(" | ")}`);
}

for (const theme of ["dark", "light"] as const) {
  test.describe(`accesibilidad (WCAG 2.1 AA) con tema ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await useTheme(page, theme);
    });

    for (const [name, path] of PAGES) {
      test(name, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        expect(await violationsOf(page)).toEqual([]);
      });
    }

    test("formulario con errores visibles", async ({ page }) => {
      await page.goto("/contacto");
      await page.getByRole("button", { name: "Enviar solicitud" }).click();
      await expect(page.getByText("Escribe tu nombre.")).toBeVisible();
      expect(await violationsOf(page)).toEqual([]);
    });

    test("formulario con la respuesta de demostración", async ({ page }) => {
      await page.goto("/contacto");
      await fillValidQuote(page);
      await page.getByRole("button", { name: "Enviar solicitud" }).click();
      await expect(page.getByText("Demostración completada")).toBeVisible();
      expect(await violationsOf(page)).toEqual([]);
    });
  });
}
