import { ImageResponse } from "next/og";

export const alt = "MyNigeriaGuide — clear steps for Nigerian government services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Mark() {
  return (
    <svg width="82" height="82" viewBox="0 0 82 82">
      <rect width="82" height="82" rx="22" fill="#063F2D" />
      <circle cx="41" cy="41" r="25.5" fill="none" stroke="rgba(255,253,248,.18)" strokeWidth="2" />
      <path d="M23 59C27 49 32 53 36 44C40 34 46 32 54 32" fill="none" stroke="#FFFDF8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="23" cy="59" r="5" fill="#D1A24A" stroke="#FFFDF8" strokeWidth="2" />
      <path d="M55 22C48 22 43 27 43 34C43 43 55 57 55 57C55 57 67 43 67 34C67 27 62 22 55 22Z" fill="#D1A24A" stroke="#FFFDF8" strokeWidth="2" />
      <path d="M50 34L54 38L61 30" fill="none" stroke="#063F2D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 72px", background: "#F8F5ED", color: "#10251C", fontFamily: "Arial, sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "480px", height: "480px", borderRadius: "240px", right: "-160px", top: "-210px", background: "#E3F1E8" }} />
        <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "150px", right: "30px", bottom: "-220px", background: "#F3E8D1" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "20px", zIndex: 2 }}>
          <Mark />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: "36px", letterSpacing: "-1px" }}>MyNigeriaGuide</strong>
            <span style={{ fontSize: "20px", color: "#607168" }}>Clear steps. Verified sources.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 2 }}>
          <div style={{ fontSize: "68px", fontWeight: 800, lineHeight: 1.02, maxWidth: "920px", letterSpacing: "-2.5px" }}>
            Get government services done with clearer steps.
          </div>
          <div style={{ marginTop: "26px", fontSize: "25px", color: "#607168" }}>
            Fees · requirements · online & physical routes · official links
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
