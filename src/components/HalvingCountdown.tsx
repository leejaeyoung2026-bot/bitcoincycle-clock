"use client";
import { useCountdown } from "@/hooks/useCountdown";

interface HalvingCountdownProps {
  targetDate: string;
  targetBlock: number;
  nextReward: number;
}

export default function HalvingCountdown({
  targetDate,
  targetBlock,
  nextReward,
}: HalvingCountdownProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div style={{ textAlign: "center", padding: "4px 0" }}>
      {/* Label */}
      <p className="readout-label" style={{ marginBottom: "10px" }}>
        Next Halving Countdown
      </p>

      {/* Digit blocks */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: "4px",
          flexWrap: "wrap",
        }}
      >
        {[
          { value: String(days), unit: "D" },
          { value: String(hours).padStart(2, "0"), unit: "H" },
          { value: String(minutes).padStart(2, "0"), unit: "M" },
          { value: String(seconds).padStart(2, "0"), unit: "S" },
        ].map(({ value, unit }, i) => (
          <span key={unit} style={{ display: "flex", alignItems: "baseline", gap: "0px" }}>
            {i > 0 && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(1rem, 2vw, 1.5rem)",
                  color: "var(--ink-muted)",
                  margin: "0 2px",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                :
              </span>
            )}
            <span className="countdown-digits">
              {value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: "var(--ink-muted)",
                marginLeft: "2px",
                alignSelf: "flex-end",
                marginBottom: "3px",
              }}
            >
              {unit}
            </span>
          </span>
        ))}
      </div>

      {/* Meta info */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          fontSize: "0.72rem",
          fontFamily: "var(--font-mono)",
          color: "var(--ink-muted)",
          letterSpacing: "0.04em",
        }}
      >
        <span>Block {targetBlock.toLocaleString()}</span>
        <span style={{ color: "var(--border)" }}>|</span>
        <span>Reward &rarr; {nextReward} BTC</span>
      </div>
    </div>
  );
}
