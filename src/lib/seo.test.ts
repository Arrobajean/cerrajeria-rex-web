import { describe, expect, it } from "vitest";
import { absoluteUrl, breadcrumbJsonLd, locksmithJsonLd, SITE_URL } from "./seo";
import { parseTheme, THEME_STORAGE_KEY, themeInitScript } from "./theme";

describe("absoluteUrl", () => {
  it("antepone el dominio con o sin barra inicial", () => {
    expect(absoluteUrl("/servicios")).toBe(`${SITE_URL}/servicios`);
    expect(absoluteUrl("servicios")).toBe(`${SITE_URL}/servicios`);
  });
});

describe("locksmithJsonLd", () => {
  const json = locksmithJsonLd();

  it("describe un cerrajero con el contacto y el horario que la web afirma", () => {
    expect(json["@type"]).toBe("Locksmith");
    expect(json.telephone).toBe("+34900123456");
    expect(json.address).toMatchObject({ "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" });
    expect(json.openingHoursSpecification[0]).toMatchObject({ opens: "00:00", closes: "23:59" });
  });

  it("no incluye valoraciones, precios ni años de actividad", () => {
    const text = JSON.stringify(json);
    expect(text).not.toContain("aggregateRating");
    expect(text).not.toContain("priceRange");
    expect(text).not.toContain("foundingDate");
    expect(text).not.toContain("price");
  });

  it("lista cada distrito como zona de servicio", () => {
    expect(json.areaServed).toHaveLength(8);
    expect(json.areaServed[0]).toEqual({ "@type": "AdministrativeArea", name: "Centro, Madrid" });
  });
});

describe("breadcrumbJsonLd", () => {
  it("numera las posiciones desde 1 y usa URL absolutas", () => {
    const json = breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Servicios", path: "/servicios" },
    ]);
    expect(json.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    expect(json.itemListElement[1]?.item).toBe(`${SITE_URL}/servicios`);
  });
});

describe("theme", () => {
  it("solo acepta claro u oscuro como preferencia guardada", () => {
    expect(parseTheme("dark")).toBe("dark");
    expect(parseTheme("light")).toBe("light");
    expect(parseTheme("system")).toBeNull();
    expect(parseTheme(null)).toBeNull();
  });

  it("el script inicial lee la misma clave que el hook", () => {
    expect(themeInitScript).toContain(THEME_STORAGE_KEY);
    expect(themeInitScript).toContain("data-theme");
  });
});
