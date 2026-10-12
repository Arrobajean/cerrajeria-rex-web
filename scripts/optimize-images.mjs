// Convierte los originales de images-src/<nombre>.jpg|png en public/images/<nombre>.webp.
// Los originales no se versionan (ver .gitignore); solo las WebP resultantes.
//
//   pnpm images
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "images-src";
const DEST = "public/images";
const MAX_SIDE = 1600; // nunca se amplía: un original menor se conserva tal cual
const QUALITY = 78;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  await fs.mkdir(DEST, { recursive: true });
  const entries = (await fs.readdir(SRC)).filter((name) => EXTENSIONS.has(path.extname(name).toLowerCase()));

  let before = 0;
  let after = 0;
  for (const entry of entries) {
    const input = path.join(SRC, entry);
    const output = path.join(DEST, `${path.basename(entry, path.extname(entry))}.webp`);
    await sharp(input)
      .rotate() // respeta la orientación EXIF
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(output);
    before += (await fs.stat(input)).size;
    after += (await fs.stat(output)).size;
  }

  console.log(`${entries.length} imágenes: ${kb(before)} -> ${kb(after)} (${Math.round((1 - after / before) * 100)}% menos)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
