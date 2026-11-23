import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
          color: "#ecebe6",
          fontFamily: "Archivo",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        AT
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
