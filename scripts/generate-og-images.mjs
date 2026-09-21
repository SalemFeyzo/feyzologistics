#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import sharp from "sharp";

const root = process.cwd();
const WIDTH = 1200;
const HEIGHT = 630;

// 1. تسجيل الخطوط محلياً في Canvas
GlobalFonts.registerFromPath(
  path.join(root, "scripts/fonts/Tajawal-Regular.ttf"),
  "Tajawal"
);
GlobalFonts.registerFromPath(
  path.join(root, "scripts/fonts/Tajawal-Bold.ttf"),
  "Tajawal"
);

// 2. تحميل ملفات الترجمة
const messages = {
  ar: JSON.parse(await readFile(path.join(root, "src/i18n/messages/ar.json"), "utf8")),
  en: JSON.parse(await readFile(path.join(root, "src/i18n/messages/en.json"), "utf8")),
};

// دالة تقسيم النص التلقائي بناءً على عرض العنصر في Canvas
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0] || "";

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + " " + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  return lines;
}

async function generate(locale) {
  const isRtl = locale === "ar";
  const meta = messages[locale].Metadata;
  const hero = messages[locale].Hero;

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // أ) رسم صورة الخلفية
  const bgImage = await loadImage(path.join(root, "public/background.png"));
  ctx.drawImage(bgImage, 0, 0, WIDTH, HEIGHT);

  // ب) رسم طبقة التعتيم (Overlay)
  ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // ج) رسم الشعار (تم تكبير الارتفاع إلى 160)
  const logoPath = isRtl
    ? path.join(root, "public/logo/logo-dark-ar.png")
    : path.join(root, "public/logo/logo-dark-en.png");
  const logoImage = await loadImage(logoPath);

  const logoHeight = 160; // تكبير اللوجو
  const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
  const logoX = (WIDTH - logoWidth) / 2;
  const logoY = 50; // موضع اللوجو من الأعلى
  ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

  // د) ضبط إعدادات المحاذاة والاتجاه للنصوص
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.direction = isRtl ? "rtl" : "ltr";

  // هـ) رسم العنوان الرئيسي (إزاحة النص للأسفل)
  const headlineLines = hero.headline.split("\n").filter(Boolean);
  let currentY = logoY + logoHeight + 45; // زيادة المسافة أسفل اللوجو لإزاحة النص للأسفل

  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 10;

  for (let i = 0; i < headlineLines.length; i++) {
    const fontSize = i === 0 ? 52 : 44;
    ctx.font = `bold ${fontSize}px Tajawal`;
    const line = headlineLines[i];
    ctx.fillText(line, WIDTH / 2, currentY);
    currentY += fontSize * 1.3;
  }

  // و) رسم الوصف الثانوي
  const rawDescription = meta.description;
  const rawShort =
    rawDescription.length > 160 ? `${rawDescription.slice(0, 157)}...` : rawDescription;

  ctx.font = "400 24px Tajawal";
  ctx.fillStyle = "#f1f5f9";
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 5;

  currentY += 20; // مسافة فاصلة إضافية قبل الوصف
  const descLines = wrapText(ctx, rawShort, 920);

  for (const line of descLines) {
    ctx.fillText(line, WIDTH / 2, currentY);
    currentY += 24 * 1.4;
  }

  // ز) تصدير الصورة وضغطها بواسطة Sharp
  const rawPng = await canvas.toBuffer("image/png");

  const compressedPng = await sharp(rawPng)
    .png({
      quality: 80,
      compressionLevel: 9,
      palette: true,
    })
    .toBuffer();

  const out = path.join(root, "public", `og-${locale}.png`);
  await writeFile(out, compressedPng);
  console.log(`✓ Generated ${out} (${(compressedPng.length / 1024).toFixed(1)} KB)`);
}

await generate("ar");
await generate("en");