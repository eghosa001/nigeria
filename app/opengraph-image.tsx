import { ImageResponse } from "next/og";

export const alt = "MyNigeriaGuide — government services, clearly explained";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "72px", background: "#fbfaf5", color: "#12211b",
        fontFamily: "Arial, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{
            width: "76px", height: "76px", borderRadius: "18px", background: "#0b6b46", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "38px",
          }}>G</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: "34px" }}>MyNigeriaGuide</strong>
            <span style={{ fontSize: "21px", color: "#5f6f67" }}>Nigeria</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "66px", fontWeight: 800, lineHeight: 1.03, maxWidth: "950px", letterSpacing: "-2px" }}>
            Government services, explained without the confusion.
          </div>
          <div style={{ marginTop: "28px", fontSize: "26px", color: "#5f6f67" }}>
            Verified fees · requirements · official portals · source links
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", fontSize: "20px", color: "#0b6b46", fontWeight: 700 }}>
          <span>Independent</span><span>•</span><span>Source-linked</span><span>•</span><span>Nigeria-focused</span>
        </div>
      </div>
    ),
    size,
  );
}
