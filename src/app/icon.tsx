import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Monograma con los colores de marca: fondo casi negro azulado y la inicial en verde de acento.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c161b",
          color: "#3fcf97",
          fontSize: 42,
          fontWeight: 700,
          borderRadius: 14,
        }}
      >
        R
      </div>
    ),
    size,
  );
}
