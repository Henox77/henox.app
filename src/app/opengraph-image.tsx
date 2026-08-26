import { ImageResponse } from "next/og";

export const alt = "henox — Founder of Hypercord";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07040d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#f8fafc",
          border: "1px solid #2e1065",
        }}
      >
        {/* Top Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              background: "#a855f7",
            }}
          />
          <span
            style={{
              fontSize: 20,
              fontFamily: "monospace",
              color: "#c084fc",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            PORTFOLIO // HYPERCORD FOUNDER
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: 68,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            henox
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#e9d5ff",
              margin: 0,
              lineHeight: 1.4,
              maxWidth: "850px",
            }}
          >
            Full-Stack Developer & Founder of Hypercord.
          </p>
        </div>

        {/* Bottom Tag Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {["Hypercord", "React", "Next.js", "Laravel", "Node.js", "PostgreSQL", "Docker"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  background: "#170b2c",
                  border: "1px solid #581c87",
                  fontSize: 16,
                  fontFamily: "monospace",
                  color: "#d8b4fe",
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
