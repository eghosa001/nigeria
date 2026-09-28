import { ImageResponse } from "next/og";
import { getPublicService } from "@/lib/data";

export const alt = "GovGuide Nigeria service guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getPublicService(slug);

  const title = service?.shortTitle ?? "Government service guide";
  const fee = service?.feeLabel ?? "Check official guide";
  const status = service?.status === "conflict" ? "Official-source conflict" : "Verified guide";
  const category = service?.category ?? "Nigeria";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background: "#fbfaf5",
          color: "#12211b",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "16px",
                background: "#0b6b46",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "34px",
              }}
            >
              G
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "30px" }}>GovGuide Nigeria</strong>
              <span style={{ fontSize: "18px", color: "#5f6f67" }}>{category}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 15px",
              borderRadius: "999px",
              background: service?.status === "conflict" ? "#fff5df" : "#e9f6ef",
              color: service?.status === "conflict" ? "#7d4300" : "#075339",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            {status}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "1020px" }}>
          <div style={{ fontSize: "64px", lineHeight: 1.02, fontWeight: 800, letterSpacing: "-2px" }}>
            {title}
          </div>
          <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "22px", color: "#5f6f67" }}>Fee/status</span>
            <strong style={{ fontSize: "30px", color: "#075339" }}>{fee}</strong>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "19px", color: "#5f6f67" }}>
          <span>Requirements · steps · official sources</span>
          <span>Independent information service</span>
        </div>
      </div>
    ),
    size,
  );
}
