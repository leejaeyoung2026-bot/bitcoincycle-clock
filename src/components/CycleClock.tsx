"use client";
import { useRef, useEffect, useCallback } from "react";
import { CyclePhase } from "@/types/cycle";
import { getPhaseLabel } from "@/lib/cycle-engine";

interface CycleClockProps {
  dayInCycle: number;
  totalDays: number;
  phase: CyclePhase;
  progress: number;
}

interface ClockColors {
  accumulation: string;
  markup: string;
  blowoff: string;
  distribution: string;
  accent: string;
  ink: string;
  inkMuted: string;
  border: string;
  bgElevated: string;
}

function readCssColors(): ClockColors {
  const s = getComputedStyle(document.documentElement);
  const get = (v: string, fallback: string) =>
    s.getPropertyValue(v).trim() || fallback;
  return {
    accumulation: get("--phase-accumulation", "#2BA68C"),
    markup: get("--phase-markup", "#2D7DD2"),
    blowoff: get("--phase-blowoff", "#E07B30"),
    distribution: get("--phase-distribution", "#C42B2B"),
    accent: get("--cycle-accent", "#E8A020"),
    ink: get("--ink", "#111318"),
    inkMuted: get("--ink-muted", "#7A8292"),
    border: get("--border", "#D4D8DF"),
    bgElevated: get("--bg-elevated", "#FFFFFF"),
  };
}

function drawClock(
  ctx: CanvasRenderingContext2D,
  size: number,
  props: CycleClockProps
): void {
  const cx = size / 2;
  const cy = size / 2;
  // Inset the radius to leave room for phase labels outside.
  // Slightly smaller ratio at narrow sizes ensures corner labels fit.
  const radius = size * 0.33;

  const colors = readCssColors();

  ctx.clearRect(0, 0, size, size);

  // ------------------------------------------------------------------
  // 1. Outer background ring (subtle border)
  // ------------------------------------------------------------------
  ctx.beginPath();
  ctx.arc(cx, cy, radius + size * 0.07, 0, 2 * Math.PI);
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;
  ctx.stroke();

  // ------------------------------------------------------------------
  // 2. Phase arcs — four colored quarter-arcs
  //    12:00 = -PI/2, clockwise
  //    Arc order: Accumulation(12→3), Markup(3→6), Blow-off(6→9), Distribution(9→12)
  // ------------------------------------------------------------------
  const ARC_WIDTH = size * 0.06;
  const phaseArcs = [
    {
      start: -Math.PI / 2,
      end: 0,
      color: colors.accumulation,
      phase: "accumulation" as CyclePhase,
    },
    {
      start: 0,
      end: Math.PI / 2,
      color: colors.markup,
      phase: "markup" as CyclePhase,
    },
    {
      start: Math.PI / 2,
      end: Math.PI,
      color: colors.blowoff,
      phase: "blowoff" as CyclePhase,
    },
    {
      start: Math.PI,
      end: (3 * Math.PI) / 2,
      color: colors.distribution,
      phase: "distribution" as CyclePhase,
    },
  ];

  for (const arc of phaseArcs) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, arc.start, arc.end);
    ctx.strokeStyle = arc.color;
    ctx.lineWidth = ARC_WIDTH;
    ctx.lineCap = "butt";
    ctx.stroke();
  }

  // ------------------------------------------------------------------
  // 3. Tick marks — 60 ticks like a clock face, major at every 5
  // ------------------------------------------------------------------
  const tickOuterR = radius - ARC_WIDTH / 2 - size * 0.005;
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
    const isMajor = i % 5 === 0;
    const tickLen = isMajor ? size * 0.04 : size * 0.02;
    const innerR = tickOuterR - tickLen;

    ctx.beginPath();
    ctx.moveTo(
      cx + tickOuterR * Math.cos(angle),
      cy + tickOuterR * Math.sin(angle)
    );
    ctx.lineTo(
      cx + innerR * Math.cos(angle),
      cy + innerR * Math.sin(angle)
    );
    ctx.strokeStyle = isMajor ? colors.ink : colors.inkMuted;
    ctx.lineWidth = isMajor ? 2 : 1;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  // ------------------------------------------------------------------
  // 4. Phase labels — positioned at the midpoint angle of each arc
  //    outside the arc ring
  // ------------------------------------------------------------------
  const labelRadius = radius + ARC_WIDTH / 2 + size * 0.055;
  const labelFontSize = Math.max(8, size * 0.024);
  ctx.font = `500 ${labelFontSize}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const labelData = [
    { angle: -Math.PI / 4, label: "Accumulation", color: colors.accumulation },
    { angle: Math.PI / 4, label: "Markup", color: colors.markup },
    { angle: (3 * Math.PI) / 4, label: "Blow-off", color: colors.blowoff },
    { angle: -(3 * Math.PI) / 4, label: "Distribution", color: colors.distribution },
  ];

  for (const ld of labelData) {
    ctx.fillStyle = ld.color;
    ctx.fillText(
      ld.label,
      cx + labelRadius * Math.cos(ld.angle),
      cy + labelRadius * Math.sin(ld.angle)
    );
  }

  // ------------------------------------------------------------------
  // 5. "HALVING" label at 12 o'clock (above the ring)
  // ------------------------------------------------------------------
  const halvingFontSize = Math.max(10, size * 0.028);
  ctx.font = `700 ${halvingFontSize}px system-ui, sans-serif`;
  ctx.fillStyle = colors.accent;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("HALVING", cx, cy - labelRadius - halvingFontSize * 0.3);

  // ------------------------------------------------------------------
  // 6. Clock hand — from center to cycle position on the arc
  // ------------------------------------------------------------------
  const handAngle = props.progress * 2 * Math.PI - Math.PI / 2;
  // Hand tip reaches just inside the inner edge of the phase arc
  const handLength = radius - ARC_WIDTH / 2 - size * 0.01;

  const tipX = cx + handLength * Math.cos(handAngle);
  const tipY = cy + handLength * Math.sin(handAngle);

  // Shadow for depth
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = size * 0.015;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(tipX, tipY);
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = size * 0.016;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.restore();

  // Tip dot
  ctx.beginPath();
  ctx.arc(tipX, tipY, size * 0.018, 0, 2 * Math.PI);
  ctx.fillStyle = colors.accent;
  ctx.fill();

  // Center hub dot
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.028, 0, 2 * Math.PI);
  ctx.fillStyle = colors.accent;
  ctx.fill();

  // Small white center pin on the hub
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.010, 0, 2 * Math.PI);
  ctx.fillStyle = colors.border;
  ctx.fill();

  // ------------------------------------------------------------------
  // 7. Center text: Day, "of ~1,460", Phase name
  //    A background disc masks the hand behind the text area.
  // ------------------------------------------------------------------
  const dayFontSize = Math.max(16, size * 0.068);
  const subFontSize = Math.max(11, size * 0.033);
  const phaseNameSize = Math.max(10, size * 0.03);
  const lineSpacing = dayFontSize * 0.25;
  const textBlockTop = cy - dayFontSize * 0.8;

  // Calculate the furthest text extent from center to determine mask radius
  const textBottom =
    textBlockTop + dayFontSize * 0.9 + lineSpacing + subFontSize * 1.3 + phaseNameSize * 0.35;
  const textTop = textBlockTop - dayFontSize * 0.75;
  const maskRadius =
    Math.max(Math.abs(textBottom - cy), Math.abs(textTop - cy)) + size * 0.02;

  // Background disc — masks the hand behind center text
  ctx.beginPath();
  ctx.arc(cx, cy, maskRadius, 0, 2 * Math.PI);
  ctx.fillStyle = colors.bgElevated;
  ctx.fill();

  // Re-draw center hub dot on top of the mask
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.010, 0, 2 * Math.PI);
  ctx.fillStyle = colors.border;
  ctx.fill();

  // "Day N" — large
  ctx.fillStyle = colors.ink;
  ctx.font = `600 ${dayFontSize}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillText(`Day ${props.dayInCycle}`, cx, textBlockTop);

  // "of ~N" — muted, smaller
  ctx.fillStyle = colors.inkMuted;
  ctx.font = `400 ${subFontSize}px system-ui, sans-serif`;
  ctx.fillText(
    `of ~${props.totalDays.toLocaleString()}`,
    cx,
    textBlockTop + dayFontSize * 0.9 + lineSpacing
  );

  // Phase name — colored
  const currentPhaseArc = phaseArcs.find((a) => a.phase === props.phase);
  const phaseColor = currentPhaseArc?.color ?? colors.accent;
  ctx.fillStyle = phaseColor;
  ctx.font = `500 ${phaseNameSize}px system-ui, sans-serif`;
  ctx.fillText(
    getPhaseLabel(props.phase),
    cx,
    textBlockTop + dayFontSize * 0.9 + lineSpacing + subFontSize * 1.3
  );
}

export default function CycleClock({
  dayInCycle,
  totalDays,
  phase,
  progress,
}: CycleClockProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Store the latest props in a ref so callbacks can access them without
  // stale closures — avoids re-creating observers on every render.
  const propsRef = useRef<CycleClockProps>({ dayInCycle, totalDays, phase, progress });
  propsRef.current = { dayInCycle, totalDays, phase, progress };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const containerWidth = container.clientWidth;
    // Clamp logical size between 280px and 500px
    const logicalSize = Math.min(500, Math.max(280, containerWidth));

    // Only resize the backing store when the size actually changes
    const expectedPhysicalSize = Math.round(logicalSize * dpr);
    if (canvas.width !== expectedPhysicalSize) {
      canvas.width = expectedPhysicalSize;
      canvas.height = expectedPhysicalSize;
      canvas.style.width = `${logicalSize}px`;
      canvas.style.height = `${logicalSize}px`;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale all draw calls by DPR for crisp retina output
    ctx.save();
    ctx.scale(dpr, dpr);
    drawClock(ctx, logicalSize, propsRef.current);
    ctx.restore();
  }, []);

  // Redraw whenever visible props change
  useEffect(() => {
    render();
  }, [dayInCycle, totalDays, phase, progress, render]);

  // ResizeObserver: redraw when container width changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      render();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [render]);

  // MutationObserver: redraw when data-theme attribute changes on <html>
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          render();
          break;
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [render]);

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="w-full"
        style={{ maxWidth: "500px" }}
      >
        <canvas
          ref={canvasRef}
          className="block"
          style={{ width: "100%", height: "auto" }}
          aria-label={`Bitcoin cycle clock showing Day ${dayInCycle} of ${totalDays}. Current phase: ${getPhaseLabel(phase)}.`}
          role="img"
        />
      </div>
    </div>
  );
}
