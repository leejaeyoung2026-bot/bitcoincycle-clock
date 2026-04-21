"use client";
import { useEffect, useRef } from "react";

interface Props {
  slotEnvKey: "NEXT_PUBLIC_ADSENSE_SLOT_BELOW_FOLD" | "NEXT_PUBLIC_ADSENSE_SLOT_BELOW_CHART";
  format?: "auto" | "fluid" | "rectangle";
  layout?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const SLOT_MAP: Record<Props["slotEnvKey"], string | undefined> = {
  NEXT_PUBLIC_ADSENSE_SLOT_BELOW_FOLD: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_FOLD,
  NEXT_PUBLIC_ADSENSE_SLOT_BELOW_CHART: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_CHART,
};

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export default function AdUnit({ slotEnvKey, format = "auto", layout, className = "" }: Props) {
  const pushed = useRef(false);
  const slot = SLOT_MAP[slotEnvKey];

  useEffect(() => {
    if (!slot || !CLIENT) return;
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded (dev mode)
    }
  }, [slot]);

  if (!slot || !CLIENT) return null;

  return (
    <div className={`ad-container ${className}`} style={{ minHeight: "90px" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout ? { "data-ad-layout": layout } : {})}
      />
    </div>
  );
}
