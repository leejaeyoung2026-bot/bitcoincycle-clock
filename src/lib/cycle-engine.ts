import { CyclePhase, CyclePosition, HalvingData } from "@/types/cycle";

export function getCyclePosition(
  currentDate: Date,
  halvingData: HalvingData
): CyclePosition {
  const { halvings, cycleLengthDays } = halvingData;
  const lastHalving = halvings[halvings.length - 1];
  const halvingDate = new Date(lastHalving.date);
  const diffMs = currentDate.getTime() - halvingDate.getTime();
  const dayInCycle = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalDays = cycleLengthDays;
  const progress = Math.min(dayInCycle / totalDays, 1);

  return {
    dayInCycle: Math.max(0, dayInCycle),
    totalDays,
    progress,
    phase: getPhase(progress),
    angle: getAngle(progress),
    halvingNumber: lastHalving.number,
  };
}

export function getPhase(progress: number): CyclePhase {
  if (progress < 0.25) return "accumulation";
  if (progress < 0.5) return "markup";
  if (progress < 0.75) return "blowoff";
  return "distribution";
}

export function getAngle(progress: number): number {
  // 12 o'clock = -PI/2, clockwise
  return progress * 2 * Math.PI - Math.PI / 2;
}

export function formatCycleTime(progress: number): string {
  const totalMinutes = progress * 12 * 60; // 12-hour clock
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

export function getPhaseLabel(phase: CyclePhase): string {
  const labels: Record<CyclePhase, string> = {
    accumulation: "Accumulation",
    markup: "Early Markup",
    blowoff: "Blow-off Top",
    distribution: "Distribution",
  };
  return labels[phase];
}

export function getPhaseColor(phase: CyclePhase): string {
  const colors: Record<CyclePhase, string> = {
    accumulation: "var(--phase-accumulation)",
    markup: "var(--phase-markup)",
    blowoff: "var(--phase-blowoff)",
    distribution: "var(--phase-distribution)",
  };
  return colors[phase];
}
