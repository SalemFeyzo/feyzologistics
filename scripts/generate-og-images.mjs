#!/usr/bin/env node
/**
 * Generates static Open Graph images (public/og-ar.png, public/og-en.png) at
 * build time, mirroring the old Next.js `opengraph-image.tsx` output.
 *
 * Run via `pnpm prebuild` (automatically before `astro build`).
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const root = process.cwd();
const WIDTH = 1200;
const HEIGHT = 630;

const messages = {
  ar: JSON.parse(
    await readFile(path.join(root, "src/i18n/messages/ar.json"), "utf8"),
  ),
  en: JSON.parse(
    await readFile(path.join(root, "src/i18n/messages/en.json"), "utf8"),
  ),
};

const fonts = {
  arabic400: await readFile(
    path.join(root, "node_modules/@fontsource/tajawal/files/tajawal-arabic-400-normal.woff"),
  ),
  arabic700: await readFile(
    path.join(root, "node_modules/@fontsource/tajawal/files/tajawal-arabic-700-normal.woff"),
  ),
  latin400: await readFile(
    path.join(root, "node_modules/@fontsource/tajawal/files/tajawal-latin-400-normal.woff"),
  ),
  latin700: await readFile(
    path.join(root, "node_modules/@fontsource/tajawal/files/tajawal-latin-700-normal.woff"),
  ),
};

function h(type, props = {}, children = []) {
  return { type, props: { ...props, children } };
}

async function generate(locale) {
  const meta = messages[locale].Metadata;
  const hero = messages[locale].Hero;
  const isRtl = locale === "ar";
  const brand = meta.siteName;
  const headline = hero.headline.split("\n").filter(Boolean);
  const description = meta.description;
  const short =
    description.length > 180 ? `${description.slice(0, 177)}…` : description;

  const element = h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 72,
        backgroundColor: "#fafafa",
        color: "#111111",
        textAlign: isRtl ? "right" : "left",
        direction: isRtl ? "rtl" : "ltr",
        fontFamily: "Tajawal",
      },
    },
    [
      h("div", { style: { fontSize: 40, fontWeight: 700, marginBottom: 28 } }, brand),
      ...headline.map((line, i) =>
        h(
          "div",
          {
            style: {
              fontSize: i === 0 ? 52 : 44,
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 10,
            },
          },
          line,
        ),
      ),
      h(
        "div",
        {
          style: {
            marginTop: 28,
            fontSize: 26,
            color: "#3a3a3a",
            maxWidth: 920,
            lineHeight: 1.4,
          },
        },
        short,
      ),
    ],
  );

  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Tajawal", data: fonts.arabic400, weight: 400, style: "normal" },
      { name: "Tajawal", data: fonts.latin400, weight: 400, style: "normal" },
      { name: "Tajawal", data: fonts.arabic700, weight: 700, style: "normal" },
      { name: "Tajawal", data: fonts.latin700, weight: 700, style: "normal" },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
    .render()
    .asPng();

  const out = path.join(root, "public", `og-${locale}.png`);
  await writeFile(out, png);
  console.log(`✓ generated ${out} (${png.length} bytes)`);
}

await generate("ar");
await generate("en");
