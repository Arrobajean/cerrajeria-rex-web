import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0c161b",
          color: "#e9f1f3",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700 }}>{SITE.name}</div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, maxWidth: 960 }}>{SITE.tagline}</div>
        <div style={{ width: 120, height: 8, background: "#3fcf97", borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}
