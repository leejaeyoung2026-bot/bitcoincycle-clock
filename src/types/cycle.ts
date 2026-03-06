export interface HalvingEvent {
  number: number;
  date: string;
  block: number;
  reward: number;
}

export interface HalvingData {
  halvings: HalvingEvent[];
  nextHalving: {
    estimatedDate: string;
    block: number;
    reward: number;
  };
  cycleLengthDays: number;
}

export type CyclePhase = "accumulation" | "markup" | "blowoff" | "distribution";

export interface CyclePosition {
  dayInCycle: number;
  totalDays: number;
  progress: number;
  phase: CyclePhase;
  angle: number;
  halvingNumber: number;
}

export interface IndicatorZone {
  label: string;
  min: number;
  max: number;
  color: string;
}

export interface IndicatorConfig {
  name: string;
  key: string;
  unit: string;
  zones: IndicatorZone[];
  description: string;
}

export interface IndicatorValue {
  key: string;
  value: number;
  zone: IndicatorZone;
  approximate: boolean;
}

export interface GaugeConfig {
  label: string;
  value: number;
  min: number;
  max: number;
  zones: IndicatorZone[];
  unit: string;
}

export interface HistoricalCycleDay {
  day: number;
  price: number;
  normalized: number;
}

export interface HistoricalCycle {
  halvingNumber: number;
  halvingDate: string;
  halvingPrice: number;
  data: HistoricalCycleDay[];
}

export interface PrecomputedIndicators {
  realizedPrice: { date: string; value: number }[];
  puellMultiple: { date: string; value: number }[];
  s2fModel: { date: string; modelPrice: number }[];
  lastUpdated: string;
}

export interface CoinGeckoPrice {
  bitcoin: { usd: number };
}

export interface CoinGeckoMarketChart {
  prices: [number, number][];
}
