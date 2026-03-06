"use client";

import { IndicatorZone } from "@/types/cycle";

interface IndicatorGaugeProps {
  label: string;
  value: number;
  min: number;
  max: number;
  zones: IndicatorZone[];
  unit: string;
  approximate?: boolean;
}

// -----------------------------------------------------------------------
// SVG geometry helpers
// -----------------------------------------------------------------------

/**
 * Convert a gauge angle (0 = left/9-o'clock, 180 = right/3-o'clock, going
 * clockwise over the top) to a Cartesian point on a circle of radius `r`
 * centred at (cx, cy).
 *
 * angleDeg=0   → left  (cx - r, cy)
 * angleDeg=90  → top   (cx,     cy - r)
 * angleDeg=180 → right (cx + r, cy)
 */
function gaugeAngleToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  // Shift so that 0° is the left (π radians in standard maths),
  // then sweep anti-clockwise (i.e. subtract from π).
  const rad = Math.PI - (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
}

/**
 * Build an SVG arc path for a gauge segment.
 *
 * startDeg / endDeg are in the gauge coordinate system described above.
 * The arc always sweeps from left → top → right (the "over-the-top" direction).
 */
function describeGaugeArc(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const start = gaugeAngleToCartesian(cx, cy, r, startDeg);
  const end = gaugeAngleToCartesian(cx, cy, r, endDeg);
  // sweep-flag = 0 means counter-clockwise in SVG coords (which is clockwise
  // visually because SVG y-axis is flipped). We go from the left-side point
  // over the top to the right — that is the counter-clockwise arc in SVG.
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

export default function IndicatorGauge({
  label,
  value,
  min,
  max,
  zones,
  unit,
  approximate = false,
}: IndicatorGaugeProps) {
  // --- Layout constants (all in SVG user units) ---
  const W = 200;
  const H = 130;
  const cx = W / 2;
  const cy = 100; // Centre of the semicircle near the bottom of the viewBox
  const outerR = 84;
  const strokeW = 18; // Width of the gauge ring
  const midR = outerR - strokeW / 2; // Centreline for stroke-based arcs
  const needleR = outerR - strokeW - 4; // Needle reaches just inside the ring

  // --- Map a value in [min, max] to a gauge angle in [0, 180] ---
  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));

  function valueToAngle(v: number): number {
    const ratio = (clamp(v, min, max) - min) / (max - min);
    return ratio * 180;
  }

  // --- Determine which zone the current value is in ---
  const currentZone: IndicatorZone | undefined = zones.find(
    (z) => value >= z.min && value < z.max
  ) ?? zones[zones.length - 1];

  // --- Build zone arc segments ---
  // Each zone occupies a proportion of [0°, 180°] based on its [min, max]
  // intersected with the display [min, max].
  interface ArcSegment {
    path: string;
    color: string;
    key: string;
  }

  const arcSegments: ArcSegment[] = [];
  for (const zone of zones) {
    const zoneStart = clamp(zone.min, min, max);
    const zoneEnd = clamp(zone.max, min, max);
    if (zoneStart >= zoneEnd) continue;
    const startDeg = valueToAngle(zoneStart);
    const endDeg = valueToAngle(zoneEnd);
    arcSegments.push({
      path: describeGaugeArc(cx, cy, midR, startDeg, endDeg),
      color: zone.color,
      key: zone.label,
    });
  }

  // --- Needle ---
  const needleAngleDeg = valueToAngle(value);
  const needleEnd = gaugeAngleToCartesian(cx, cy, needleR, needleAngleDeg);
  // Needle base is a small offset from centre so it looks anchored
  const needleBase = gaugeAngleToCartesian(cx, cy, 8, needleAngleDeg + 180);

  // --- Formatted value display ---
  const displayValue = Number.isFinite(value)
    ? Math.abs(value) >= 100
      ? value.toFixed(0)
      : value.toFixed(2)
    : "N/A";

  return (
    <div
      className="flex flex-col items-center"
      style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}
    >
      {/* SVG gauge */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        aria-label={`${label} gauge showing ${displayValue}${unit}. Zone: ${currentZone?.label ?? "Unknown"}.`}
        role="img"
        style={{ width: "100%", maxWidth: "220px", overflow: "visible" }}
      >
        {/* ---- Background arc (full 0→180, dim) ---- */}
        <path
          d={describeGaugeArc(cx, cy, midR, 0, 180)}
          fill="none"
          stroke="var(--border, #E8E5E0)"
          strokeWidth={strokeW}
          strokeLinecap="butt"
        />

        {/* ---- Zone arc segments ---- */}
        {arcSegments.map((seg) => (
          <path
            key={seg.key}
            d={seg.path}
            fill="none"
            style={{ stroke: seg.color }}
            strokeWidth={strokeW}
            strokeLinecap="butt"
            opacity={0.85}
          />
        ))}

        {/* ---- Zone divider ticks ---- */}
        {zones.slice(1).map((zone) => {
          const tickDeg = valueToAngle(zone.min);
          if (tickDeg <= 0 || tickDeg >= 180) return null;
          const inner = gaugeAngleToCartesian(
            cx,
            cy,
            outerR - strokeW + 2,
            tickDeg
          );
          const outer = gaugeAngleToCartesian(cx, cy, outerR - 1, tickDeg);
          return (
            <line
              key={`tick-${zone.label}`}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--cream, #F5F1EB)"
              strokeWidth={1.5}
            />
          );
        })}

        {/* ---- Needle ---- */}
        <line
          x1={needleBase.x}
          y1={needleBase.y}
          x2={needleEnd.x}
          y2={needleEnd.y}
          stroke="var(--ink, #2C2825)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* Needle tip dot */}
        <circle
          cx={needleEnd.x}
          cy={needleEnd.y}
          r={4}
          fill="var(--ink, #2C2825)"
        />

        {/* Centre pivot */}
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="var(--ink, #2C2825)"
        />
        <circle
          cx={cx}
          cy={cy}
          r={3}
          fill="var(--cream, #F5F1EB)"
        />

        {/* ---- Value text (centred inside the arc) ---- */}
        <text
          x={cx}
          y={cy - 32}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight="700"
          fill="var(--ink, #2C2825)"
        >
          {displayValue}
          {unit && (
            <tspan fontSize="13" fontWeight="500" fill="var(--ink-muted, #9A9490)">
              {unit}
            </tspan>
          )}
        </text>
      </svg>

      {/* ---- Text block below SVG ---- */}
      <div className="flex flex-col items-center gap-0.5 mt-1" style={{ lineHeight: 1.3 }}>
        {/* Indicator name */}
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "var(--ink, #2C2825)",
            textAlign: "center",
          }}
        >
          {label}
        </span>

        {/* Current zone label — coloured */}
        {currentZone && (
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 500,
              color: currentZone.color,
              textAlign: "center",
            }}
          >
            {currentZone.label}
          </span>
        )}

        {/* Approximate badge */}
        {approximate && (
          <span
            style={{
              fontSize: "0.6rem",
              color: "var(--ink-muted, #9A9490)",
              border: "1px solid var(--border, #E8E5E0)",
              borderRadius: "3px",
              padding: "0px 4px",
              marginTop: "2px",
            }}
          >
            ~ Approximate
          </span>
        )}
      </div>
    </div>
  );
}
