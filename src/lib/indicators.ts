import { IndicatorZone } from "@/types/cycle";

export function calculateMVRV(
  currentPrice: number,
  realizedPrice: number
): number {
  if (realizedPrice <= 0) return 0;
  return (currentPrice - realizedPrice) / realizedPrice;
}

export function calculatePiCycle(prices: number[]): number {
  if (prices.length < 350) return 0;
  const ma111 = calculateMovingAverage(prices, 111);
  const ma350x2 = calculateMovingAverage(prices, 350) * 2;
  if (ma350x2 <= 0) return 0;
  return ma111 / ma350x2;
}

export function calculatePuellMultiple(
  currentIssuanceValue: number,
  avg365IssuanceValue: number
): number {
  if (avg365IssuanceValue <= 0) return 0;
  return currentIssuanceValue / avg365IssuanceValue;
}

export function calculateS2FDeviation(
  currentPrice: number,
  s2fModelPrice: number
): number {
  if (s2fModelPrice <= 0) return 0;
  return ((currentPrice - s2fModelPrice) / s2fModelPrice) * 100;
}

export function getIndicatorZone(
  value: number,
  zones: IndicatorZone[]
): IndicatorZone {
  for (const zone of zones) {
    if (value >= zone.min && value < zone.max) {
      return zone;
    }
  }
  return zones[zones.length - 1];
}

export function calculateMovingAverage(
  prices: number[],
  period: number
): number {
  if (prices.length < period) return 0;
  const slice = prices.slice(-period);
  return slice.reduce((sum, p) => sum + p, 0) / period;
}
