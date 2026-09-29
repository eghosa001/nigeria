import { ImageResponse } from "next/og";

export const alt = "MyNigeriaGuide — Nigerian movies, services and travel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Mark() {
  return (
    <svg width="82" height="82" viewBox="0 0 82 82">
      <rect width="82" height="82" rx="23" fill="#063F2D" />
      <circle cx="41" cy="58" r="5.4" fill="#D1A24A" />
      <path d="M41 53V40" fill="none" stroke="#FFFDF8" strokeWidth="5.6" strokeLinecap="round" />
      <path d="M41 41C34.8 34.8 29.4 30.3 22.5 26" fill="none" stroke="#FFFDF8" strokeWidth="5.6" strokeLinecap="round" />
      <path d="M41 41C47.3 34.5 52.9 30 59.7 26" fill="none" stroke="#FFFDF8" strokeWidth="5.6" strokeLinecap="round" />
      <circle cx="21.7" cy="25.5" r="4.2" fill="#FFFDF8" />
      <rect x="36.8" y="17.1" width="8.4" height="8.4" rx="2.3" fill="#FFFDF8" />
      <path d="m60.4 18.1 6 6-6 6-6-6 6-6Z" fill="#FFFDF8" />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 72px", background: "#F8F5ED", color: "#10251C", fontFamily: "Arial, sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "250px", right: "-180px", top: "-220px", background: "#E3F1E8" }} />
        <div style={{ position: "absolute", width: "330px", height: "330px", borderRadius: "165px", right: "25px", bottom: "-235px", background: "#F3E8D1" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "20px", zIndex: 2 }}>
          <Mark />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: "36px", letterSpacing: "-1px" }}>MyNigeriaGuide</strong>
            <span style={{ fontSize: "20px", color: "#607168" }}>Movies · Services · Tour Nigeria</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 2 }}>
          <div style={{ fontSize: "65px", fontWeight: 800, lineHeight: 1.02, maxWidth: "920px", letterSpacing: "-2.5px" }}>
            Nigeria, easier to explore.
          </div>
          <div style={{ marginTop: "25px", fontSize: "24px", color: "#607168" }}>
            Movies · services · places to go
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
          <div style={{ display: "flex", gap: "12px", fontSize: "18px", color: "#063F2D", fontWeight: 700 }}>
            <span>MyNigeriaGuide</span>
          </div>
          <div style={{ width: "130px", height: "5px", borderRadius: "999px", background: "#D1A24A" }} />
        </div>
      </div>
    ),
    size,
  );
}
