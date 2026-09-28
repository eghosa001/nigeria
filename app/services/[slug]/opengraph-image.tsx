import { ImageResponse } from "next/og";
import { getPublicService } from "@/lib/data";

export const alt = "MyNigeriaGuide service guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getPublicService(slug);

  const title = service?.shortTitle ?? "Government service guide";
  const fee = service?.feeLabel ?? "Check official guide";
  const category = service?.category ?? "Nigeria";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 72px", background: "#F8F5ED", color: "#10251C", fontFamily: "Arial, sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "420px", height: "420px", borderRadius: "210px", right: "-120px", top: "-180px", background: "#E3F1E8" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ position: "relative", width: "68px", height: "68px", borderRadius: "18px", background: "#063F2D", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "34px" }}>
              M
              <div style={{ position: "absolute", right: "7px", top: "7px", width: "12px", height: "12px", borderRadius: "3px", background: "#D1A24A", transform: "rotate(45deg)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "30px" }}>MyNigeriaGuide</strong>
              <span style={{ fontSize: "18px", color: "#607168" }}>{category}</span>
            </div>
          </div>
          <div style={{ display: "flex", padding: "10px 15px", borderRadius: "999px", background: "#EAF6EE", color: "#063F2D", fontSize: "18px", fontWeight: 700 }}>
            Verified guide
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "1000px", zIndex: 2 }}>
          <div style={{ fontSize: "64px", lineHeight: 1.02, fontWeight: 800, letterSpacing: "-2px" }}>{title}</div>
          <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "21px", color: "#607168" }}>Current fee / status</span>
            <strong style={{ fontSize: "30px", color: "#063F2D" }}>{fee}</strong>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "19px", color: "#607168", zIndex: 2 }}>
          <span>Requirements · steps · official sources</span>
          <div style={{ width: "120px", height: "5px", borderRadius: "999px", background: "#D1A24A" }} />
        </div>
      </div>
    ),
    size,
  );
}
