"use client";
import { CyclePhase } from "@/types/cycle";
import { getPhaseLabel } from "@/lib/cycle-engine";
import { forwardRef } from "react";

interface ClockCardProps {
  dayInCycle: number;
  totalDays: number;
  phase: CyclePhase;
  price: number | null;
  indicators: { key: string; value: number; label: string }[];
  clockTime: string;
}

// Hardcoded light-theme palette — CSS vars are not reliable inside html2canvas
const C = {
  bg: "#F5F1EB",
  ink: "#2C2825",
  muted: "#9A9490",
  border: "#E8E5E0",
  accent: "#D4A574",
  accumulation: "#759F7D",
  markup: "#4A90D9",
  blowoff: "#D1704A",
  distribution: "#B83232",
} as const;

function phaseColor(phase: CyclePhase): string {
  const map: Record<CyclePhase, string> = {
    accumulation: C.accumulation,
    markup: C.markup,
    blowoff: C.blowoff,
    distribution: C.distribution,
  };
  return map[phase];
}

function formatPrice(price: number | null): string {
  if (price === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatIndicatorValue(key: string, value: number): string {
  if (key === "s2fRatio") {
    const pct = (value - 1) * 100;
    return `${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%`;
  }
  if (key === "puellMultiple") return `${value.toFixed(2)}x`;
  return value.toFixed(2);
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const ClockCard = forwardRef<HTMLDivElement, ClockCardProps>(function ClockCard(
  { dayInCycle, totalDays, phase, price, indicators, clockTime },
  ref
) {
  const phaseCol = phaseColor(phase);
  const phaseLabel = getPhaseLabel(phase);

  // Show up to 4 indicators in a 2x2 grid
  const displayIndicators = indicators.slice(0, 4);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        width: "600px",
        height: "400px",
        backgroundColor: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: "16px",
        padding: "40px 48px",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Top section */}
      <div>
        {/* Title */}
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.accent,
            marginBottom: "20px",
          }}
        >
          BitcoinCycle Clock
        </div>

        {/* Clock time — large */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
            }}
          >
            {clockTime}
          </span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: C.muted,
              lineHeight: 1,
            }}
          >
            out of 12:00
          </span>
        </div>

        {/* Day + Phase row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: C.muted,
            }}
          >
            Day {dayInCycle.toLocaleString()} of ~{totalDays.toLocaleString()}
          </span>
          <span
            style={{
              display: "inline-block",
              backgroundColor: phaseCol + "22",
              color: phaseCol,
              borderRadius: "4px",
              padding: "2px 8px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            {phaseLabel}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: C.border,
            marginBottom: "20px",
          }}
        />

        {/* Price + Indicators row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "40px",
          }}
        >
          {/* BTC Price */}
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                fontSize: "11px",
                color: C.muted,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              BTC Price
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: C.ink,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.01em",
              }}
            >
              {formatPrice(price)}
            </div>
          </div>

          {/* Indicators 2x2 grid */}
          {displayIndicators.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px 32px",
                flex: 1,
              }}
            >
              {displayIndicators.map((ind) => (
                <div key={ind.key}>
                  <div
                    style={{
                      fontSize: "11px",
                      color: C.muted,
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      marginBottom: "2px",
                    }}
                  >
                    {ind.label}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: C.ink,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {formatIndicatorValue(ind.key, ind.value)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom: date + watermark */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "12px", color: C.muted }}>
          {formatDate()}
        </span>
        <span
          style={{
            fontSize: "12px",
            color: C.muted,
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          cycle.vibed-lab.com
        </span>
      </div>
    </div>
  );
});

export default ClockCard;
