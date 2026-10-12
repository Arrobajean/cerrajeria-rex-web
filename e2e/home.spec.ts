import { expect, test } from "./fixtures";

test.describe("portada y navegación", () => {
  test("muestra el titular, el teléfono y la llamada directa", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Cerrajeros 24 horas en Madrid" })).toBeVisible();

    // Cabecera y portada usan la misma etiqueta y el mismo enlace tel:.
    const calls = page.getByRole("link", { name: "Llamar ahora" });
    await expect(calls).toHaveCount(2);
    for (const link of await calls.all()) {
      await expect(link).toHaveAttribute("href", "tel:+34900123456");
    }
  });

  test("la portada tiene cuatro elementos de texto en el primer pliegue", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section").first();
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(hero.locator("p")).toHaveCount(1);
    await expect(hero.getByRole("link")).toHaveCount(2);
  });

  test("la navegación lleva a servicios con sus cuatro apartados", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Servicios" }).click();
    await expect(page).toHaveURL(/\/servicios$/);
    await expect(page.getByRole("heading", { level: 1, name: "Servicios de cerrajería" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(4);
  });

  test("el enlace Zonas lleva a la sección de distritos", async ({ page }) => {
    await page.goto("/servicios");
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Zonas" }).click();
    await expect(page).toHaveURL(/\/#zonas$/);
    await expect(page.getByRole("heading", { name: "Zonas con servicio" })).toBeInViewport();
  });

  test("el aviso de demostración es visible en el pie y lleva a /aviso", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Esto es una demostración.").first()).toBeVisible();
    await page.getByRole("link", { name: "Leer el aviso" }).click();
    await expect(page).toHaveURL(/\/aviso$/);
    await expect(page.getByRole("heading", { level: 1, name: "Aviso de demostración" })).toBeVisible();
  });

  test("una ruta que no existe muestra la página 404 con enlace al inicio", async ({ page }) => {
    const response = await page.goto("/no-existe");
    expect(response?.status()).toBe(404);
    await page.getByRole("link", { name: "Volver al inicio" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("tema claro y oscuro", () => {
  test("el botón cambia de tema y lo recuerda al recargar", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: /Cambiar a tema/ });

    await toggle.click();
    await expect(html).toHaveAttribute("data-theme", /^(light|dark)$/);
    const chosen = await html.getAttribute("data-theme");

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", chosen ?? "");
    const stored = await page.evaluate(() => localStorage.getItem("cr:theme"));
    expect(stored).toBe(chosen);
  });
});
