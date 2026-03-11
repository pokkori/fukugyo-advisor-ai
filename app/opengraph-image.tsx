import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "副業アドバイザーAI｜あなたのスキルと時間に最適な副業をAIが診断";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #451a03 0%, #78350f 50%, #92400e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 12, display: "flex" }}>💼</div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#fef3c7", marginBottom: 12, textAlign: "center", display: "flex" }}>
          副業アドバイザーAI
        </div>
        <div style={{ fontSize: 26, color: "#fcd34d", textAlign: "center", maxWidth: 900, marginBottom: 8, display: "flex" }}>
          スキル・時間・目標を入力するだけで最適な副業ロードマップを提案
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          {["副業マッチング", "収入シミュレーション", "ロードマップ作成", "¥980/月〜"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                background: "rgba(254,243,199,0.15)",
                border: "1px solid rgba(254,243,199,0.3)",
                borderRadius: 24,
                fontSize: 16,
                color: "#fef3c7",
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
