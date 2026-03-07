import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "BitcoinCycle Clock — Where Are We in the Bitcoin Cycle?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          background: "#F5F1EB",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.2em",
              color: "#D4A574",
              fontWeight: 500,
            }}
          >
            BITCOINCYCLE CLOCK
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 400,
              color: "#2C2825",
              textAlign: "center",
              maxWidth: "80%",
              lineHeight: 1.2,
            }}
          >
            Where Are We in the Bitcoin Cycle?
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#9A9490",
              textAlign: "center",
              maxWidth: "70%",
              marginTop: "8px",
            }}
          >
            Real-time market cycle dashboard with MVRV, Pi Cycle, Puell
            Multiple, and Stock-to-Flow indicators.
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "24px",
              fontSize: 14,
            }}
          >
            <span
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                background: "#759F7D",
                color: "#fff",
              }}
            >
              Accumulation
            </span>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                background: "#4A90D9",
                color: "#fff",
              }}
            >
              Markup
            </span>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                background: "#D1704A",
                color: "#fff",
              }}
            >
              Blow-off
            </span>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                background: "#B83232",
                color: "#fff",
              }}
            >
              Distribution
            </span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: 14,
            color: "#9A9490",
          }}
        >
          cycle.vibed-lab.com
        </div>
      </div>
    ),
    { ...size }
  );
}
