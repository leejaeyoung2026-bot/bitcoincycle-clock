"use client";
import { useState, useEffect, useCallback } from "react";
import {
  CyclePosition,
  IndicatorValue,
  HalvingData,
  PrecomputedIndicators,
  IndicatorConfig,
} from "@/types/cycle";
import { getCyclePosition } from "@/lib/cycle-engine";
import {
  calculateMVRV,
  calculatePiCycle,
  calculateS2FDeviation,
  getIndicatorZone,
} from "@/lib/indicators";
import { fetchBtcPrice, fetchBtcHistory } from "@/lib/coingecko";

interface CycleData {
  cyclePosition: CyclePosition | null;
  indicators: IndicatorValue[];
  price: number | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useCycleData(): CycleData {
  const [data, setData] = useState<CycleData>({
    cyclePosition: null,
    indicators: [],
    price: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchData = useCallback(async () => {
    try {
      // Load static data files
      const [halvingRes, thresholdsRes, precomputedRes] = await Promise.all([
        fetch("/data/halving-dates.json"),
        fetch("/data/indicator-thresholds.json"),
        fetch("/data/precomputed-indicators.json"),
      ]);

      const halvingData: HalvingData = (await halvingRes.json()) as HalvingData;
      const thresholds: Record<string, IndicatorConfig> = (await thresholdsRes.json()) as Record<
        string,
        IndicatorConfig
      >;
      const precomputed: PrecomputedIndicators =
        (await precomputedRes.json()) as PrecomputedIndicators;

      // Fetch live data from CoinGecko with fallback
      let price: number;
      let priceHistory: [number, number][];
      try {
        [price, priceHistory] = await Promise.all([
          fetchBtcPrice(),
          fetchBtcHistory(365),
        ]);
      } catch {
        // Fallback to last known approximate price when API is unavailable
        price = 88000;
        priceHistory = [];
      }

      // Calculate cycle position from halving data
      const cyclePosition = getCyclePosition(new Date(), halvingData);

      // Build indicator values array
      const indicators: IndicatorValue[] = [];

      // MVRV: Market Value to Realized Value ratio
      const latestRealized =
        precomputed.realizedPrice[precomputed.realizedPrice.length - 1];
      if (latestRealized) {
        const mvrvValue = calculateMVRV(price, latestRealized.value);
        indicators.push({
          key: "mvrv",
          value: mvrvValue,
          zone: getIndicatorZone(mvrvValue, thresholds["mvrv"]?.zones ?? []),
          approximate: true,
        });
      }

      // Pi Cycle Top: ratio of 111DMA to 2x350DMA
      if (priceHistory.length >= 350) {
        const prices = priceHistory.map(([, p]) => p);
        const piValue = calculatePiCycle(prices);
        indicators.push({
          key: "piCycle",
          value: piValue,
          zone: getIndicatorZone(piValue, thresholds["piCycle"]?.zones ?? []),
          approximate: false,
        });
      } else {
        // Approximate fallback when insufficient price history
        indicators.push({
          key: "piCycle",
          value: 0.72,
          zone: getIndicatorZone(0.72, thresholds["piCycle"]?.zones ?? []),
          approximate: true,
        });
      }

      // Puell Multiple: miner revenue relative to 365-day average
      const latestPuell =
        precomputed.puellMultiple[precomputed.puellMultiple.length - 1];
      if (latestPuell) {
        indicators.push({
          key: "puellMultiple",
          value: latestPuell.value,
          zone: getIndicatorZone(
            latestPuell.value,
            thresholds["puellMultiple"]?.zones ?? []
          ),
          approximate: true,
        });
      }

      // S2F Deviation: current price vs Stock-to-Flow model price
      const latestS2f = precomputed.s2fModel[precomputed.s2fModel.length - 1];
      if (latestS2f) {
        const s2fDev = calculateS2FDeviation(price, latestS2f.modelPrice);
        indicators.push({
          key: "s2fDeviation",
          value: s2fDev,
          zone: getIndicatorZone(
            s2fDev,
            thresholds["s2fDeviation"]?.zones ?? []
          ),
          approximate: true,
        });
      }

      setData({
        cyclePosition,
        indicators,
        price,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error:
          err instanceof Error ? err.message : "Failed to load data",
      }));
    }
  }, []);

  useEffect(() => {
    void fetchData();
    // Refresh every 5 minutes to keep price data current
    const interval = setInterval(() => void fetchData(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return data;
}
