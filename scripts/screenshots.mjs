// Capturas reales de la aplicación en ejecución, para el README. Requiere `pnpm start` en el puerto 3201.
//
//   pnpm screenshots
//
// Usa PW_CHROMIUM_PATH si está definido; si no, el Chromium que instaló Playwright.
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3201";
const OUT_DIR = "docs/img";
const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 390, height: 844 };

const SHOTS = [
  { name: "home-light", url: "/", theme: "light", viewport: DESKTOP },
  { name: "home-dark", url: "/", theme: "dark", viewport: DESKTOP },
  { name: "servicios-dark", url: "/servicios", theme: "dark", viewport: DESKTOP },
  { name: "contacto-light", url: "/contacto", theme: "light", viewport: DESKTOP },
  { name: "home-mobile-light", url: "/", theme: "light", viewport: MOBILE },
  { name: "contacto-mobile-dark", url: "/contacto", theme: "dark", viewport: MOBILE },
];

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const executablePath = process.env.PW_CHROMIUM_PATH || undefined;
  const browser = await chromium.launch({ executablePath });

  try {
    for (const shot of SHOTS) {
      const context = await browser.newContext({
        viewport: shot.viewport,
        locale: "es-ES",
        timezoneId: "Europe/Madrid",
        reducedMotion: "reduce",
        deviceScaleFactor: 1,
      });
      await context.addInitScript((theme) => localStorage.setItem("cr:theme", theme), shot.theme);
      const page = await context.newPage();
      await page.goto(`${BASE_URL}${shot.url}`, { waitUntil: "networkidle" });
      const png = await page.screenshot({ type: "png", fullPage: false });
      await sharp(png).webp({ quality: 82 }).toFile(path.join(OUT_DIR, `${shot.name}.webp`));
      console.log(`captura: ${shot.name}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
