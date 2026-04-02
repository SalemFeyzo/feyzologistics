import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const runtime = "nodejs";
export const alt = "Feyzo Logistics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const brand = tMeta("ogTitle");
  const headlineLines = tHero("headline").split("\n").filter(Boolean);
  const isRtl = locale === "ar";
  const description = tMeta("description");
  const descriptionShort =
    description.length > 180 ? `${description.slice(0, 177)}…` : description;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          color: "#111111",
          padding: 72,
          textAlign: isRtl ? "right" : "left",
          direction: isRtl ? "rtl" : "ltr",
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            marginBottom: 28,
            letterSpacing: "-0.02em",
          }}
        >
          {brand}
        </div>
        {headlineLines.map((line, index) => (
          <div
            key={line}
            style={{
              fontSize: index === 0 ? 52 : 44,
              fontWeight: 600,
              lineHeight: 1.15,
              marginBottom: 10,
              letterSpacing: "-0.02em",
            }}
          >
            {line}
          </div>
        ))}
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#3a3a3a",
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          {descriptionShort}
        </div>
      </div>
    ),
    { ...size },
  );
}
