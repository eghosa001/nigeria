import { ImageResponse } from "next/og";

export const alt = "MyNigeriaGuide — clear steps for Nigerian government services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Mark() {
  return (
    <div style={{ position: "relative", width: "82px", height: "82px", borderRadius: "22px", background: "#063F2D", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "42px", fontWeight: 800 }}>
      M
      <div style={{ position: "absolute", right: "9px", top: "8px", width: "14px", height: "14px", borderRadius: "4px", background: "#D1A24A", transform: "rotate(45deg)" }} />
    </div>
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
