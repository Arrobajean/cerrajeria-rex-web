import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { QUOTE_KINDS } from "./quote-kinds";
import { DISTRICTS } from "./districts";
import { HOME_COPY } from "./home";
import { NOTICE } from "./notice";
import { SERVICES } from "./services";
import { CONTACT, SITE } from "./site";
import { buildMailtoHref, buildTelHref, buildWhatsAppHref } from "@/lib/links";

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Recorre un directorio y devuelve todos los archivos de código y texto que se publican (sin tests). */
function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return listFiles(full);
    return /\.(ts|tsx|css)$/.test(entry) && !/\.test\.ts$/.test(entry) ? [full] : [];
  });
}

const contentText = listFiles(path.join(SRC_DIR, "content"))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

describe("contenido: reglas de estilo y de honestidad", () => {
  it("no contiene guiones largos ni medios en ningún archivo publicado", () => {
    for (const file of listFiles(SRC_DIR)) {
      const text = readFileSync(file, "utf8");
      expect(text.includes("—"), `guion largo en ${file}`).toBe(false);
      expect(text.includes("–"), `guion medio en ${file}`).toBe(false);
    }
  });

  it("no afirma datos que el proyecto original no puede comprobar", () => {
    const banned = ["certificad", "años de experiencia", "minutos", "4.9", "opiniones", "Llegamos", "2h", "Respuesta rápida"];
    for (const word of banned) {
      expect(contentText.toLowerCase(), `afirmación no permitida: ${word}`).not.toContain(word.toLowerCase());
    }
  });

  it("la portada tiene un titular corto y un subtexto de 20 palabras como máximo", () => {
    expect(HOME_COPY.hero.headline.split(/\s+/).length).toBeLessThanOrEqual(6);
    expect(HOME_COPY.hero.subtext.split(/\s+/).length).toBeLessThanOrEqual(20);
  });
});

describe("servicios y zonas", () => {
  it("cada servicio tiene un slug único y textos no vacíos", () => {
    const slugs = SERVICES.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const service of SERVICES) {
      expect(service.title.length).toBeGreaterThan(0);
      expect(service.summary.length).toBeGreaterThan(20);
    }
  });

  it("los distritos son únicos", () => {
    expect(new Set(DISTRICTS).size).toBe(DISTRICTS.length);
    expect(DISTRICTS).toHaveLength(8);
  });

  it("los tipos de urgencia tienen valor único y etiqueta", () => {
    const values = QUOTE_KINDS.map((kind) => kind.value);
    expect(new Set(values).size).toBe(values.length);
    for (const kind of QUOTE_KINDS) expect(kind.label.length).toBeGreaterThan(0);
  });
});

describe("datos de contacto", () => {
  it("todos los enlaces se pueden construir sin lanzar error", () => {
    expect(() => buildTelHref(CONTACT.phoneE164)).not.toThrow();
    expect(() => buildWhatsAppHref(CONTACT.whatsappDigits, CONTACT.whatsappMessage)).not.toThrow();
    expect(() => buildMailtoHref(CONTACT.email)).not.toThrow();
  });

  it("el aviso y el nombre del negocio coinciden con los datos del sitio", () => {
    expect(NOTICE.intro).toContain("nombre de ejemplo");
    expect(SITE.name).toBe("Cerrajería REX");
  });
});
