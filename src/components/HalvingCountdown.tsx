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
    <div className="text-center py-6">
      <p
        className="text-sm mb-2"
        style={{
          color: "var(--ink-muted)",
          fontFamily: "var(--font-sans)",
        }}
      >
        Next Halving
      </p>
      <div
        className="text-2xl sm:text-3xl tracking-wider"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--cycle-accent)",
        }}
      >
        {days}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m{" "}
        {String(seconds).padStart(2, "0")}s
      </div>
      <div
        className="mt-2 text-xs space-x-4"
        style={{
          color: "var(--ink-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>Block {targetBlock.toLocaleString()}</span>
        <span>&middot;</span>
        <span>Reward &rarr; {nextReward} BTC</span>
      </div>
    </div>
  );
}
