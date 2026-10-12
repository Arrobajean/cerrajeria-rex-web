import { expect, fillValidQuote, test } from "./fixtures";

test.describe("formulario de solicitud", () => {
  test("enviar vacío muestra un error por campo y enfoca el primero", async ({ page }) => {
    await page.goto("/contacto");
    await page.getByRole("button", { name: "Enviar solicitud" }).click();

    await expect(page.getByText("Escribe tu nombre.")).toBeVisible();
    await expect(page.getByText("Revisa el teléfono: deben ser 9 cifras.")).toBeVisible();
    await expect(page.getByText("Indica la calle y el número.")).toBeVisible();
    await expect(page.getByText("Elige el tipo de urgencia.")).toBeVisible();
    await expect(page.getByLabel("Nombre completo")).toBeFocused();
    await expect(page.getByLabel("Nombre completo")).toHaveAttribute("aria-invalid", "true");
  });

  test("un teléfono con formato incorrecto se rechaza en el cliente", async ({ page }) => {
    await page.goto("/contacto");
    await fillValidQuote(page);
    await page.getByLabel("Teléfono de contacto").fill("12345");
    await page.getByRole("button", { name: "Enviar solicitud" }).click();
    await expect(page.getByText("Revisa el teléfono: deben ser 9 cifras.")).toBeVisible();
    await expect(page.getByLabel("Teléfono de contacto")).toBeFocused();
    await expect(page.getByRole("status").filter({ hasText: "Demostración" })).toHaveCount(0);
  });

  test("una solicitud válida muestra la respuesta de demostración", async ({ page }) => {
    await page.goto("/contacto");
    await fillValidQuote(page);
    await page.getByRole("button", { name: "Enviar solicitud" }).click();

    const result = page.getByRole("status").filter({ hasText: "Demostración completada" });
    await expect(result).toBeVisible();
    await expect(result).toContainText("no se ha enviado a ningún cerrajero");
  });

  test("el campo trampa no es visible ni enfocable", async ({ page }) => {
    await page.goto("/contacto");
    await expect(page.locator("#campo-web")).toBeHidden();
    await expect(page.locator("#campo-web")).toHaveAttribute("tabindex", "-1");
  });

  test("los canales de contacto tienen enlaces reales", async ({ page }) => {
    await page.goto("/contacto");
    const main = page.getByRole("main");
    await expect(main.getByRole("link", { name: "900 123 456" })).toHaveAttribute("href", "tel:+34900123456");
    await expect(main.getByRole("link", { name: "600 123 456" })).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/34600123456\?text=/,
    );
    await expect(main.getByRole("link", { name: "info@cerrajeriarex.com" })).toHaveAttribute(
      "href",
      "mailto:info@cerrajeriarex.com",
    );
  });
});
