import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import { locales, type Locale } from "@/i18n";
import { ogFonts } from "@/lib/og-fonts";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const [first, last] = site.name.toUpperCase().split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 44px 24px",
          background: "#0d0d0d",
          color: "#ecebe6",
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #3a3a38",
            paddingTop: 14,
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <span>{t.loader}</span>
          <span style={{ color: "#8a8985" }}>{site.city}</span>
          <span>{site.url.replace("https://", "")}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 232,
            fontWeight: 800,
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
          }}
        >
          <span>{first}</span>
          <span>{last}</span>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
