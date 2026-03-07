"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { HistoricalCycle } from "@/types/cycle";

interface CycleOverlayProps {
  currentDay: number;
}

// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const CYCLE_COLORS = [
  "rgba(43, 166, 140, 0.55)",  // Cycle 1 – teal (phase-accumulation family)
  "rgba(45, 125, 210, 0.55)",  // Cycle 2 – signal blue (phase-markup family)
  "rgba(224, 123, 48, 0.50)",  // Cycle 3 – amber-orange (phase-blowoff family)
] as const;

const CYCLE_LABELS = ["2012 Halving", "2016 Halving", "2020 Halving", "2024 Halving (current)"];

const X_MAX_DAYS = 1460;

// Log-scale Y range (in normalised multiples)
const Y_MIN_LOG = Math.log10(0.5);   // 0.5×
const Y_MAX_LOG = Math.log10(120);   // 120×

// Horizontal gridlines (normalised multiples)
const GRID_Y = [0.5, 1, 2, 5, 10, 20, 50, 100];

// Vertical axis tick labels (days)
const GRID_X = [0, 365, 730, 1095, 1460];

// Margins (logical px)
const MARGIN = { top: 24, right: 20, bottom: 40, left: 52 };

// -----------------------------------------------------------------------
// CSS variable reader (client side only)
// -----------------------------------------------------------------------

function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

// -----------------------------------------------------------------------
// Scale helpers
// -----------------------------------------------------------------------

function xScale(day: number, chartW: number): number {
  return (day / X_MAX_DAYS) * chartW;
}

function yScale(normalized: number, chartH: number): number {
  const safeVal = Math.max(normalized, 0.01);
  const logVal = Math.log10(safeVal);
  const ratio = (logVal - Y_MIN_LOG) / (Y_MAX_LOG - Y_MIN_LOG);
  // Flip: large values → top of chart (small y pixel)
  return chartH - ratio * chartH;
}

// -----------------------------------------------------------------------
// Drawing
// -----------------------------------------------------------------------

function drawChart(
  ctx: CanvasRenderingContext2D,
  logicalW: number,
  logicalH: number,
  cycles: HistoricalCycle[],
  currentDay: number
): void {
  const chartW = logicalW - MARGIN.left - MARGIN.right;
  const chartH = logicalH - MARGIN.top - MARGIN.bottom;

  // CSS colors
  const inkColor      = readVar("--ink",         "#111318");
  const inkMuted      = readVar("--ink-muted",   "#7A8292");
  const borderColor   = readVar("--border",      "#D4D8DF");
  const accentColor   = readVar("--cycle-accent","#E8A020");
  const bgColor       = readVar("--bg-elevated", "#FFFFFF");

  ctx.clearRect(0, 0, logicalW, logicalH);

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, logicalW, logicalH);

  // Chart area clip
  ctx.save();
  ctx.translate(MARGIN.left, MARGIN.top);

  // ---- Grid lines (horizontal) ----
  ctx.setLineDash([3, 5]);
  ctx.lineWidth = 1;

  for (const mult of GRID_Y) {
    const yPx = yScale(mult, chartH);
    if (yPx < 0 || yPx > chartH) continue;

    ctx.strokeStyle = borderColor;
    ctx.beginPath();
    ctx.moveTo(0, yPx);
    ctx.lineTo(chartW, yPx);
    ctx.stroke();

    // Y-axis label
    ctx.setLineDash([]);
    ctx.fillStyle = inkMuted;
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(`${mult}x`, -6, yPx);
    ctx.setLineDash([3, 5]);
  }

  // ---- Grid lines (vertical) ----
  for (const day of GRID_X) {
    const xPx = xScale(day, chartW);
    ctx.strokeStyle = borderColor;
    ctx.beginPath();
    ctx.moveTo(xPx, 0);
    ctx.lineTo(xPx, chartH);
    ctx.stroke();

    // X-axis label
    ctx.setLineDash([]);
    ctx.fillStyle = inkMuted;
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = day === 0 ? "left" : day === X_MAX_DAYS ? "right" : "center";
    ctx.textBaseline = "top";
    ctx.fillText(`Day ${day}`, xPx, chartH + 8);
    ctx.setLineDash([3, 5]);
  }

  ctx.setLineDash([]);

  // ---- Cycle lines ----
  for (let ci = 0; ci < cycles.length; ci++) {
    const cycle = cycles[ci];
    const isCurrentCycle = ci === cycles.length - 1;
    const color = isCurrentCycle ? accentColor : (CYCLE_COLORS[ci] ?? CYCLE_COLORS[CYCLE_COLORS.length - 1]);

    if (!cycle.data || cycle.data.length === 0) continue;

    ctx.beginPath();
    ctx.lineWidth = isCurrentCycle ? 2.5 : 1.5;
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const sortedData = [...cycle.data].sort((a, b) => a.day - b.day);
    let started = false;
    for (const point of sortedData) {
      if (point.day > X_MAX_DAYS) break;
      const xPx = xScale(point.day, chartW);
      const yPx = yScale(point.normalized, chartH);

      if (!started) {
        ctx.moveTo(xPx, yPx);
        started = true;
      } else {
        ctx.lineTo(xPx, yPx);
      }
    }
    ctx.stroke();
  }

  // ---- Current day vertical marker ----
  const clampedDay = Math.min(currentDay, X_MAX_DAYS);
  const markerX = xScale(clampedDay, chartW);

  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.moveTo(markerX, 0);
  ctx.lineTo(markerX, chartH);
  ctx.stroke();
  ctx.restore();

  // Dot on the current cycle at the current day
  const currentCycle = cycles[cycles.length - 1];
  if (currentCycle && currentDay <= X_MAX_DAYS) {
    // Find the interpolated normalised value at currentDay
    const data = currentCycle.data;
    let normalizedAtDay = 1;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].day <= currentDay && data[i + 1].day >= currentDay) {
        const t = (currentDay - data[i].day) / (data[i + 1].day - data[i].day);
        normalizedAtDay = data[i].normalized + t * (data[i + 1].normalized - data[i].normalized);
        break;
      }
      // If currentDay is beyond the last data point, use the last value
      if (i === data.length - 2 && currentDay >= data[i + 1].day) {
        normalizedAtDay = data[i + 1].normalized;
      }
    }
    const dotY = yScale(normalizedAtDay, chartH);
    ctx.beginPath();
    ctx.arc(markerX, dotY, 5, 0, Math.PI * 2);
    ctx.fillStyle = accentColor;
    ctx.fill();
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // ---- "Today" label above the marker ----
  ctx.font = "bold 10px system-ui, sans-serif";
  ctx.fillStyle = accentColor;
  ctx.textAlign = markerX > chartW * 0.85 ? "right" : "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("Today", markerX + (markerX > chartW * 0.85 ? -4 : 0), -4);

  // ---- Axes ----
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, chartH);
  ctx.lineTo(chartW, chartH);
  ctx.stroke();

  ctx.restore(); // end chart area translate

  // ---- Legend (bottom right) ----
  drawLegend(ctx, logicalW, logicalH, cycles, accentColor, inkColor, inkMuted);
}

function drawLegend(
  ctx: CanvasRenderingContext2D,
  logicalW: number,
  logicalH: number,
  cycles: HistoricalCycle[],
  accentColor: string,
  inkColor: string,
  inkMuted: string
): void {
  const legendItemH = 16;
  const legendX = MARGIN.left + 12;
  const legendY = MARGIN.top + 10;

  ctx.font = "11px system-ui, sans-serif";
  ctx.textBaseline = "middle";

  for (let ci = 0; ci < cycles.length; ci++) {
    const cycle = cycles[ci];
    const isCurrentCycle = ci === cycles.length - 1;
    const color = isCurrentCycle ? accentColor : (CYCLE_COLORS[ci] ?? CYCLE_COLORS[CYCLE_COLORS.length - 1]);
    const label = CYCLE_LABELS[ci] ?? `Cycle ${cycle.halvingNumber}`;

    const y = legendY + ci * legendItemH;

    // Dot
    ctx.beginPath();
    ctx.arc(legendX + 4, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Label
    ctx.fillStyle = isCurrentCycle ? inkColor : inkMuted;
    ctx.font = isCurrentCycle
      ? "bold 11px system-ui, sans-serif"
      : "11px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(label, legendX + 13, y);
  }

  // Y-axis title (rotated)
  ctx.save();
  ctx.translate(12, logicalH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = inkMuted;
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Price (× halving price, log)", 0, 0);
  ctx.restore();
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

export default function CycleOverlay({ currentDay }: CycleOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cycles, setCycles] = useState<HistoricalCycle[]>([]);

  // Fetch historical data once
  useEffect(() => {
    fetch("/data/historical-cycles.json")
      .then((r) => r.json())
      .then((data: HistoricalCycle[]) => setCycles(data))
      .catch(() => {/* silently fail — chart will be empty */});
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || cycles.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const logicalW = container.clientWidth;
    // Responsive height: 260px mobile → 400px desktop
    const logicalH = Math.min(400, Math.max(260, logicalW * 0.45));

    // Resize backing store only when dimensions change
    const physicalW = Math.round(logicalW * dpr);
    const physicalH = Math.round(logicalH * dpr);

    if (canvas.width !== physicalW || canvas.height !== physicalH) {
      canvas.width = physicalW;
      canvas.height = physicalH;
      canvas.style.width = `${logicalW}px`;
      canvas.style.height = `${logicalH}px`;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);
    drawChart(ctx, logicalW, logicalH, cycles, currentDay);
    ctx.restore();
  }, [cycles, currentDay]);

  // Redraw when data or currentDay changes
  useEffect(() => {
    render();
  }, [render]);

  // ResizeObserver for responsive sizing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => render());
    observer.observe(container);
    return () => observer.disconnect();
  }, [render]);

  // MutationObserver to redraw on theme changes
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
    <div ref={containerRef} className="w-full">
      {cycles.length === 0 ? (
        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink-muted, #9A9490)",
            fontSize: "0.875rem",
          }}
        >
          Loading chart data...
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="block w-full"
          aria-label={`Historical Bitcoin cycle overlay chart. Currently on Day ${currentDay} of the 2024 cycle.`}
          role="img"
        />
      )}
    </div>
  );
}
