import { ImageResponse } from "next/og";

export const alt = "MyNigeriaGuide — Nigerian movies, services and travel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Mark() {
  return (
    <svg width="82" height="82" viewBox="0 0 82 82">
      <rect width="82" height="82" rx="22" fill="#063F2D" />
      <rect x="2" y="2" width="78" height="78" rx="20" fill="none" stroke="rgba(255,253,248,.14)" strokeWidth="2" />
      <path d="M23 59V26L59 58V23" fill="none" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23" cy="59" r="5.5" fill="#D1A24A" stroke="#063F2D" strokeWidth="2" />
      <path d="M59 15L61.5 20.5L67 23L61.5 25.5L59 31L56.5 25.5L51 23L56.5 20.5L59 15Z" fill="#D1A24A" />
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
            <span style={{ fontSize: "20px", color: "#607168" }}>Movies · Services · Travel</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 2 }}>
          <div style={{ fontSize: "65px", fontWeight: 800, lineHeight: 1.02, maxWidth: "920px", letterSpacing: "-2.5px" }}>
            Movies, services and travel in one Nigerian guide.
          </div>
          <div style={{ marginTop: "25px", fontSize: "24px", color: "#607168" }}>
            Nigerian movies · official routes · practical services · places
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
          <div style={{ display: "flex", gap: "12px", fontSize: "18px", color: "#063F2D", fontWeight: 700 }}>
            <span>Independent</span><span>•</span><span>Source-linked</span><span>•</span><span>Nigeria-focused</span>
          </div>
          <div style={{ width: "130px", height: "5px", borderRadius: "999px", background: "#D1A24A" }} />
        </div>
      </div>
    ),
    size,
  );
}
