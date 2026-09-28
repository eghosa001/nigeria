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
            <svg width="68" height="68" viewBox="0 0 68 68">
              <rect width="68" height="68" rx="18" fill="#063F2D" />
              <path d="M18 49C22 41 26 44 30 37C34 29 39 28 45 28" fill="none" stroke="#FFFDF8" strokeWidth="4.2" strokeLinecap="round" />
              <circle cx="18" cy="49" r="4.2" fill="#D1A24A" stroke="#FFFDF8" strokeWidth="1.8" />
              <path d="M46 20C40 20 36 24 36 30C36 38 46 50 46 50C46 50 56 38 56 30C56 24 52 20 46 20Z" fill="#D1A24A" stroke="#FFFDF8" strokeWidth="1.8" />
              <path d="M42 30L45 33L51 27" fill="none" stroke="#063F2D" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
