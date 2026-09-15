#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import ArabicReshaper from "arabic-persian-reshaper";
import sharp from "sharp";

const root = process.cwd();
const WIDTH = 1200;
const HEIGHT = 630;

const convertArabic =
  ArabicReshaper.convertArabic ||
  ArabicReshaper.default?.convertArabic ||
  ArabicReshaper.default;

async function getBase64DataUrl(filePath, mimeType) {
  const fileBuffer = await readFile(filePath);
  return `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
}

// تقسيم النص العربي إلى أسطر متناسقة
function splitArabicIntoLines(text, maxChars = 50) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length > maxChars) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  return lines;
}

// إعادة تشكيل وعكس سطر عربي واحد
function fixArabicLine(text = "") {
  if (!text) return "";

  const clean = text
    .replace(/…/g, "...")
    .replace(/[—–]/g, "-")
    .replace(/[“”«»]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[\u00A0\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const reshaped = typeof convertArabic === "function" ? convertArabic(clean) : clean;
  return reshaped.split(" ").reverse().join(" ");
}

// 1. تحميل الصور والشعارات كـ Base64
const bgBase64 = await getBase64DataUrl(path.join(root, "public/background.png"), "image/png");
const logoArBase64 = await getBase64DataUrl(path.join(root, "public/logo/logo-dark-ar.png"), "image/png");
const logoEnBase64 = await getBase64DataUrl(path.join(root, "public/logo/logo-dark-en.png"), "image/png");

// 2. تحميل الخطوط الكاملة محلياً من مجلد scripts/fonts
const tajawalRegular = await readFile(path.join(root, "scripts/fonts/Tajawal-Regular.ttf"));
const tajawalBold = await readFile(path.join(root, "scripts/fonts/Tajawal-Bold.ttf"));

// 3. تحميل ملفات الترجمة
const messages = {
  ar: JSON.parse(await readFile(path.join(root, "src/i18n/messages/ar.json"), "utf8")),
  en: JSON.parse(await readFile(path.join(root, "src/i18n/messages/en.json"), "utf8")),
};

function h(type, props = {}, children = []) {
  return { type, props: { ...props, children } };
}

async function generate(locale) {
  const meta = messages[locale].Metadata;
  const hero = messages[locale].Hero;
  const isRtl = locale === "ar";

  const currentLogo = isRtl ? logoArBase64 : logoEnBase64;

  const rawHeadlineLines = hero.headline.split("\n").filter(Boolean);
  const rawDescription = meta.description;
  const rawShort =
    rawDescription.length > 160 ? `${rawDescription.slice(0, 157)}...` : rawDescription;

  // معالجة العنوان الرئيسي
  const headlineLines = rawHeadlineLines.map((line) =>
    isRtl ? fixArabicLine(line) : line
  );

  // معالجة الوصف الثانوي
  const descLines = isRtl
    ? splitArabicIntoLines(rawShort, 50).map((line) => fixArabicLine(line))
    : [rawShort];

  const element = h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "Tajawal",
        position: "relative",
      },
    },
    [
      // 1. صورة الخلفية
      h("img", {
        src: bgBase64,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      }),

      // 2. طبقة التعتيم
      h("div", {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          display: "flex",
        },
      }),

      // 3. المحتوى
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "60px 80px",
          },
        },
        [
          // الشعار
          h("img", {
            src: currentLogo,
            style: {
              height: "90px",
              marginBottom: "36px",
              objectFit: "contain",
            },
          }),

          // العنوان الرئيسي
          ...headlineLines.map((line, i) =>
            h(
              "div",
              {
                style: {
                  fontSize: i === 0 ? 52 : 44,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  marginBottom: 10,
                  color: "#ffffff",
                  textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                },
              },
              line
            )
          ),

          // الوصف الثانوي
          h(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
                maxWidth: 920,
              },
            },
            descLines.map((line) =>
              h(
                "div",
                {
                  style: {
                    fontSize: 24,
                    color: "#f1f5f9",
                    lineHeight: 1.4,
                    textShadow: "0 1px 5px rgba(0,0,0,0.6)",
                    marginBottom: 4,
                  },
                },
                line
              )
            )
          ),
        ]
      ),
    ]
  );

  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Tajawal", data: tajawalBold, weight: 700, style: "normal" },
      { name: "Tajawal", data: tajawalRegular, weight: 400, style: "normal" },
    ],
  });

  const rawPng = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  })
    .render()
    .asPng();

  // ضغط صورة PNG باستخدام Sharp لتناسب معايير واتساب (< 300KB)
  const compressedPng = await sharp(rawPng)
    .png({
      quality: 80,
      compressionLevel: 9,
      palette: true, // تحويلها لـ 8-bit مع الحفاظ على الألوان والشفافية
    })
    .toBuffer();

  const out = path.join(root, "public", `og-${locale}.png`);
  await writeFile(out, compressedPng);
  console.log(`✓ Generated ${out} (${(compressedPng.length / 1024).toFixed(1)} KB)`);
}

await generate("ar");
await generate("en");