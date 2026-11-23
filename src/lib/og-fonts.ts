import { readFile } from "node:fs/promises";
import { join } from "node:path";

const dir = join(process.cwd(), "node_modules/@fontsource/archivo/files");

/** Archivo pour les images générées (Satori lit le WOFF, pas le WOFF2). */
export async function ogFonts() {
  const [regular, black] = await Promise.all([
    readFile(join(dir, "archivo-latin-500-normal.woff")),
    readFile(join(dir, "archivo-latin-800-normal.woff")),
  ]);
  return [
    { name: "Archivo", data: regular, weight: 500 as const, style: "normal" as const },
    { name: "Archivo", data: black, weight: 800 as const, style: "normal" as const },
  ];
}
