# BitcoinCycle Clock Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a real-time Bitcoin market cycle dashboard at `cycle.vibed-lab.com` that visualizes the 4-year halving cycle as an analog clock with indicator gauges.

**Architecture:** Static Next.js app (output: "export") with client-side data fetching from CoinGecko Free API. All indicator calculations run in-browser using bundled historical data + live price. Canvas-based main clock visualization, SVG-based indicator gauges.

**Tech Stack:** Next.js 16 + TypeScript strict + Tailwind CSS v4 + MDX + Canvas API + html2canvas + Cloudflare Pages

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `mdx-components.tsx`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`

**Step 1: Initialize Next.js project**

```bash
cd D:/coding/bitcoincycle-clock
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

Pick defaults. Then remove boilerplate.

**Step 2: Install dependencies**

```bash
npm install @mdx-js/loader @mdx-js/react @next/mdx html2canvas remark-gfm rehype-slug rehype-autolink-headings
```

**Step 3: Configure next.config.ts**

Replace with:

```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { unoptimized: true },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug", "rehype-autolink-headings"],
  },
});

export default withMDX(nextConfig);
```

**Step 4: Create mdx-components.tsx at project root**

```typescript
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
```

**Step 5: Set up globals.css with design system CSS variables**

```css
@import "tailwindcss";

:root {
  --cream: #F5F1EB;
  --ink: #2C2825;
  --ink-muted: #9A9490;
  --border: #E8E5E0;

  --cycle-accent: #D4A574;
  --cycle-accent-hover: #C08F5E;

  --phase-accumulation: #759F7D;
  --phase-markup: #4A90D9;
  --phase-blowoff: #D1704A;
  --phase-distribution: #B83232;

  --gauge-low: #759F7D;
  --gauge-mid: #D4A574;
  --gauge-high: #D1704A;
  --gauge-extreme: #B83232;

  --font-serif: var(--font-dm-serif);
  --font-sans: var(--font-dm-sans);
  --font-mono: var(--font-dm-mono);
}

[data-theme="dark"] {
  --cream: #1A1815;
  --ink: #F0EDE8;
  --ink-muted: #8A8580;
  --border: #3F3D3A;
  --cycle-accent: #D4A574;
}

body {
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-sans), system-ui, sans-serif;
}
```

**Step 6: Create layout.tsx with fonts, GA4, AdSense, ThemeProvider**

Based on ClearRx pattern. DM Serif Display, DM Sans, DM Mono via `next/font/google`. GA4 `G-6WTB59J1FT`, AdSense `ca-pub-6874320463657568`. Metadata for `cycle.vibed-lab.com`.

**Step 7: Create placeholder page.tsx**

```typescript
export default function Home() {
  return <div className="max-w-4xl mx-auto px-4 py-8"><h1 className="font-serif text-3xl">BitcoinCycle Clock</h1><p className="mt-4 font-sans">Coming soon...</p></div>;
}
```

**Step 8: Verify build**

```bash
npm run build
```

Expected: Successful static export to `out/` directory.

**Step 9: Initialize git and commit**

```bash
cd D:/coding/bitcoincycle-clock
git init
git add -A
git commit -m "feat: initialize Next.js project with Tailwind v4, MDX, and design system"
```

---

## Task 2: TypeScript Types & Static Data

**Files:**
- Create: `src/types/cycle.ts`
- Create: `public/data/halving-dates.json`
- Create: `public/data/historical-cycles.json`
- Create: `public/data/indicator-thresholds.json`
- Create: `public/data/precomputed-indicators.json`

**Step 1: Define all TypeScript types in `src/types/cycle.ts`**

```typescript
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
  progress: number; // 0-1
  phase: CyclePhase;
  angle: number; // radians, 12 o'clock = -PI/2
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
  normalized: number; // halving price = 1.0
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
  prices: [number, number][]; // [timestamp, price]
}
```

**Step 2: Create `public/data/halving-dates.json`**

```json
{
  "halvings": [
    { "number": 1, "date": "2012-11-28", "block": 210000, "reward": 25 },
    { "number": 2, "date": "2016-07-09", "block": 420000, "reward": 12.5 },
    { "number": 3, "date": "2020-05-11", "block": 630000, "reward": 6.25 },
    { "number": 4, "date": "2024-04-19", "block": 840000, "reward": 3.125 }
  ],
  "nextHalving": {
    "estimatedDate": "2028-03-15",
    "block": 1050000,
    "reward": 1.5625
  },
  "cycleLengthDays": 1460
}
```

**Step 3: Create `public/data/historical-cycles.json`**

Generate realistic normalized price data for each cycle (2012, 2016, 2020, 2024). Each entry has `day` (0-1460), `price` (USD at that day), `normalized` (price / halving-day price). Use publicly known historical Bitcoin prices. The 2024 cycle should have data up to the current day (~687 days post-halving as of March 2026).

**Step 4: Create `public/data/indicator-thresholds.json`**

```json
{
  "mvrv": {
    "name": "MVRV Z-Score",
    "key": "mvrv",
    "unit": "",
    "description": "Market Value to Realized Value Z-Score. Measures how far market cap deviates from realized cap.",
    "zones": [
      { "label": "Undervalued", "min": -999, "max": 0, "color": "var(--phase-accumulation)" },
      { "label": "Fair Value", "min": 0, "max": 3, "color": "var(--gauge-mid)" },
      { "label": "Overheated", "min": 3, "max": 7, "color": "var(--gauge-high)" },
      { "label": "Extreme", "min": 7, "max": 999, "color": "var(--gauge-extreme)" }
    ]
  },
  "piCycle": {
    "name": "Pi Cycle Top",
    "key": "piCycle",
    "unit": "",
    "description": "Ratio of 111-day MA to 350-day MA x2. When ratio approaches 1.0, historically signals cycle tops.",
    "zones": [
      { "label": "Cool", "min": 0, "max": 0.6, "color": "var(--phase-accumulation)" },
      { "label": "Warming", "min": 0.6, "max": 0.85, "color": "var(--gauge-mid)" },
      { "label": "Hot", "min": 0.85, "max": 0.95, "color": "var(--gauge-high)" },
      { "label": "Top Signal", "min": 0.95, "max": 999, "color": "var(--gauge-extreme)" }
    ]
  },
  "puellMultiple": {
    "name": "Puell Multiple",
    "key": "puellMultiple",
    "unit": "x",
    "description": "Daily coin issuance value vs 365-day average. High values signal miner profit-taking.",
    "zones": [
      { "label": "Undervalued", "min": 0, "max": 0.5, "color": "var(--phase-accumulation)" },
      { "label": "Fair", "min": 0.5, "max": 1.2, "color": "var(--gauge-mid)" },
      { "label": "Overheated", "min": 1.2, "max": 4, "color": "var(--gauge-high)" },
      { "label": "Extreme", "min": 4, "max": 999, "color": "var(--gauge-extreme)" }
    ]
  },
  "s2fDeviation": {
    "name": "Stock-to-Flow Deviation",
    "key": "s2fDeviation",
    "unit": "%",
    "description": "Current price deviation from Stock-to-Flow model price. Positive = above model.",
    "zones": [
      { "label": "Below Model", "min": -999, "max": -50, "color": "var(--phase-accumulation)" },
      { "label": "Fair Range", "min": -50, "max": 100, "color": "var(--gauge-mid)" },
      { "label": "Above Model", "min": 100, "max": 300, "color": "var(--gauge-high)" },
      { "label": "Extreme", "min": 300, "max": 999, "color": "var(--gauge-extreme)" }
    ]
  }
}
```

**Step 5: Create `public/data/precomputed-indicators.json`**

Bundle approximate historical data for realized price, puell multiple, and S2F model values. These are pre-computed since CoinGecko free tier doesn't provide on-chain metrics.

**Step 6: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add TypeScript types and static data files"
```

---

## Task 3: Core Library Functions

**Files:**
- Create: `src/lib/cycle-engine.ts`
- Create: `src/lib/indicators.ts`
- Create: `src/lib/coingecko.ts`
- Create: `src/lib/generate-png.ts`

**Step 1: Implement `src/lib/cycle-engine.ts`**

Pure functions:
- `getCyclePosition(currentDate: Date, halvingData: HalvingData): CyclePosition` — calculates day in cycle, progress, phase, angle
- `getPhase(progress: number): CyclePhase` — 0-0.25 accumulation, 0.25-0.5 markup, 0.5-0.75 blowoff, 0.75-1.0 distribution
- `getAngle(progress: number): number` — maps progress to clock angle (0 = 12 o'clock = -PI/2)
- `formatCycleTime(progress: number): string` — returns "7:20" style clock time string
- `getDaysSinceHalving(currentDate: Date, halvingData: HalvingData): number`

**Step 2: Implement `src/lib/indicators.ts`**

Pure functions:
- `calculateMVRV(currentPrice: number, realizedPrice: number): number`
- `calculatePiCycle(prices: number[]): number` — compute 111DMA / (350DMA * 2) ratio
- `calculatePuellMultiple(currentIssuanceValue: number, avg365IssuanceValue: number): number`
- `calculateS2FDeviation(currentPrice: number, s2fModelPrice: number): number`
- `getIndicatorZone(value: number, zones: IndicatorZone[]): IndicatorZone`
- `calculateMovingAverage(prices: number[], period: number): number`

**Step 3: Implement `src/lib/coingecko.ts`**

- `fetchBtcPrice(): Promise<number>` — current BTC price
- `fetchBtcHistory(days: number): Promise<[number, number][]>` — price history [timestamp, price]
- Internal `fetchWithCache(url: string, ttl?: number): Promise<any>` — localStorage cache with 5-min TTL
- Handle rate limit errors gracefully, return cached data if fresh request fails

**Step 4: Implement `src/lib/generate-png.ts`**

- `generatePng(element: HTMLElement, scale?: number): Promise<Blob>` — html2canvas wrapper
- `downloadPng(blob: Blob, filename: string): void` — trigger download

**Step 5: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add cycle engine, indicator calculations, API client, and PNG generator"
```

---

## Task 4: ThemeProvider, Nav, Footer, VibedLabLogo

**Files:**
- Create: `src/components/ThemeProvider.tsx` (copy from ClearRx)
- Create: `src/components/VibedLabLogo.tsx` (copy from ClearRx verbatim)
- Create: `src/components/Nav.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/AdUnit.tsx` (copy from ClearRx)
- Create: `src/components/JsonLd.tsx`

**Step 1: Copy VibedLabLogo.tsx verbatim from ClearRx**

Exact copy of `D:/coding/clearrx/src/components/VibedLabLogo.tsx`.

**Step 2: Copy ThemeProvider.tsx from ClearRx**

Exact copy of `D:/coding/clearrx/src/components/ThemeProvider.tsx`.

**Step 3: Create Nav.tsx**

Adapt ClearRx Nav: replace "ClearRx" with "BitcoinCycle Clock", `--rx-accent` with `--cycle-accent`, add links: Learn, About, theme toggle.

**Step 4: Create Footer.tsx**

Adapt ClearRx Footer: replace "ClearRx" with "BitcoinCycle Clock", domain with `cycle.vibed-lab.com`. Include VibedLabLogo, same hover pattern. Links: About, Privacy, Contact, Learn. Disclaimer: "Bitcoin investor since 2017. Not financial advice."

**Step 5: Copy AdUnit.tsx from ClearRx verbatim**

Same publisher ID `ca-pub-6874320463657568`.

**Step 6: Create JsonLd.tsx**

Schema: SoftwareApplication + FinancialProduct.

```typescript
export default function JsonLd() {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BitcoinCycle Clock",
    description: "Real-time Bitcoin market cycle positioning tool with MVRV, Pi Cycle, Puell Multiple, and S2F indicators.",
    url: "https://cycle.vibed-lab.com",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Jay", url: "https://vibed-lab.com" },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }} />
  );
}
```

**Step 7: Update layout.tsx to use new components**

Wire ThemeProvider, Nav, Footer, JsonLd into layout. Update metadata for BitcoinCycle Clock.

**Step 8: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add ThemeProvider, Nav, Footer, VibedLabLogo, AdUnit, and JsonLd"
```

---

## Task 5: Main Cycle Clock Visualization (Canvas)

**Files:**
- Create: `src/components/CycleClock.tsx`
- Create: `src/hooks/useCycleData.ts`
- Create: `src/hooks/useCountdown.ts`
- Create: `src/components/HalvingCountdown.tsx`

**Step 1: Implement `src/hooks/useCycleData.ts`**

Main data hook that:
1. Loads static JSON data (halving dates, thresholds, precomputed indicators)
2. Fetches live BTC price from CoinGecko
3. Fetches price history (365 days) for moving averages
4. Computes all indicators using `lib/indicators.ts`
5. Computes cycle position using `lib/cycle-engine.ts`
6. Returns: `{ cyclePosition, indicators, price, loading, error, lastUpdated }`
7. Auto-refreshes every 5 minutes

**Step 2: Implement `src/hooks/useCountdown.ts`**

Countdown timer hook:
- Input: target date string
- Output: `{ days, hours, minutes, seconds }`
- Updates every second via `setInterval`

**Step 3: Implement `src/components/CycleClock.tsx`**

"use client" Canvas component:

1. **Phase arcs**: 4 colored arcs (accumulation green, markup blue, blowoff terracotta, distribution red)
2. **Tick marks**: 12 major ticks (hour marks), 60 minor ticks
3. **Phase labels**: "Accumulation", "Markup", "Blow-off", "Distribution" around the circle
4. **Clock hand**: Thick, styled hand pointing to current cycle position
5. **Center text**: "Day X of ~1,460" + current phase name
6. **Responsive**: useRef + ResizeObserver, min 280px mobile, max 500px desktop
7. **Dark mode aware**: reads CSS variables for colors
8. **Animation**: Smooth hand movement on mount

Canvas drawing functions:
- `drawPhaseArcs(ctx, cx, cy, r)` — 4 colored quarter arcs
- `drawTicks(ctx, cx, cy, r)` — hour and minute marks
- `drawHand(ctx, cx, cy, length, angle)` — clock hand with circle at base
- `drawCenterText(ctx, cx, cy, day, total, phase)` — centered text
- `drawOuterLabels(ctx, cx, cy, r)` — phase names around circle

**Step 4: Implement `src/components/HalvingCountdown.tsx`**

Display next halving countdown:
- "Next Halving in: 730d 12h 34m 56s"
- Block number target: 1,050,000
- Reward after: 1.5625 BTC
- Uses `useCountdown` hook
- Styled with `--font-mono` for the timer digits

**Step 5: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add CycleClock canvas visualization and HalvingCountdown"
```

---

## Task 6: Indicator Gauges

**Files:**
- Create: `src/components/IndicatorGauge.tsx`

**Step 1: Implement `src/components/IndicatorGauge.tsx`**

Reusable semi-circle gauge component (SVG-based):

Props: `GaugeConfig` (label, value, min, max, zones, unit)

SVG drawing:
1. Semi-circle arc (180°) divided into colored zone segments
2. Needle pointing to current value position
3. Label below: indicator name
4. Value display: current number + zone label
5. "Approximate" badge if data is estimated

The gauge maps value from [min, max] range to [0°, 180°] angle. Each zone gets a proportional arc segment colored by zone color.

Design:
```
     ╭──green──yellow──orange──red──╮
     │            ▲                 │
     ╰──────────────────────────────╯
           MVRV Z-Score: 2.1
              Fair Value
```

Responsive: 140px wide on mobile, 200px on desktop.

**Step 2: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add IndicatorGauge semi-circle SVG component"
```

---

## Task 7: Historical Cycle Overlay Chart

**Files:**
- Create: `src/components/CycleOverlay.tsx`

**Step 1: Implement `src/components/CycleOverlay.tsx`**

Canvas or SVG line chart showing:
- X-axis: Days since halving (0 to 1460)
- Y-axis: Normalized price (halving price = 1x), log scale
- Lines: one per cycle (2012 orange, 2016 blue, 2020 green, 2024 copper/accent)
- Current cycle line is thicker and more opaque
- Current day marked with a vertical dashed line + dot
- Legend showing cycle years
- Responsive: full width, 300px height mobile, 400px desktop

Load data from `public/data/historical-cycles.json`.

**Step 2: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add historical cycle overlay chart"
```

---

## Task 8: Share Modal & Clock Card

**Files:**
- Create: `src/components/ShareModal.tsx`
- Create: `src/components/ClockCard.tsx`

**Step 1: Implement `src/components/ClockCard.tsx`**

Snapshot card for screenshot:
- Fixed 600x400px layout (2x for retina = 1200x800 PNG)
- Contains: mini cycle clock, indicators summary, date, watermark
- Watermark: "cycle.vibed-lab.com"
- Background: cream/dark based on theme
- Hidden by default, rendered offscreen for html2canvas capture

**Step 2: Implement `src/components/ShareModal.tsx`**

Modal with three actions:
1. **Download PNG** — captures ClockCard via html2canvas, triggers download
2. **Copy Link** — copies current URL to clipboard
3. **Share on X** — opens Twitter intent URL with pre-filled text

Modal styling: backdrop blur, centered card, close button.

**Step 3: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add ShareModal and ClockCard for screenshot sharing"
```

---

## Task 9: Home Page Assembly

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Assemble Home page**

Layout (top to bottom):
1. **Hero section**: Title "Where Are We in the Bitcoin Cycle?" + subtitle with current price
2. **CycleClock** — centered, main visualization
3. **HalvingCountdown** — below clock
4. **AdUnit** — between clock and gauges
5. **Indicator Gauges** — 4 gauges in a responsive grid (2x2 mobile, 4-col desktop)
6. **"Share This Moment" button** — opens ShareModal
7. **CycleOverlay** — historical comparison chart
8. **AdUnit** — between chart and content
9. **Educational Content** — "How to Read the Bitcoin Cycle Clock" (700-900 words)
   - Section: How to Read the Bitcoin Cycle Clock
   - Section: What Are Bitcoin Halving Cycles?
   - Section: Understanding the Indicators (MVRV, Pi Cycle, Puell, S2F)
   - Section: Why Cycles Matter for Investors
   - Section: About the Creator (Jay, Bitcoin investor since 2017, CryptoBacktest cross-link)
10. **Disclaimer** — "This tool is for educational purposes only..."
11. **ClockCard** — hidden, for screenshot rendering

**Step 2: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: assemble Home page with all components and educational content"
```

---

## Task 10: Static Pages (About, Privacy, Contact)

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/contact/page.tsx`

**Step 1: Create About page**

Content:
- Jay's background: Bitcoin investor since 2017, survived 2 full cycles (2017-2018, 2020-2021)
- Philosophy: cycles are the most reliable pattern in crypto
- Cross-link to CryptoBacktest (backtest.vibed-lab.com)
- E-E-A-T signals: experience, methodology description
- 400+ words

**Step 2: Create Privacy page**

Content:
- No login required
- No personal data collected
- Google Analytics (anonymized) for traffic analysis
- Google AdSense for ads
- localStorage for theme preference and API cache
- No cookies beyond analytics
- Contact info for questions

**Step 3: Create Contact page**

Content:
- Email: jay@vibed-lab.com (or form placeholder)
- GitHub link
- Other Vibed Lab projects links
- "For partnership or media inquiries"

**Step 4: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add About, Privacy, and Contact pages"
```

---

## Task 11: Learn Hub & First Article

**Files:**
- Create: `src/app/learn/page.tsx`
- Create: `src/app/learn/understanding-bitcoin-cycle/page.mdx`

**Step 1: Create Learn index page**

Article listing page with cards:
- Each card: title, description, estimated read time
- First article: "Understanding Bitcoin's 4-Year Cycle"
- Clean grid layout

**Step 2: Create first MDX article**

"Understanding Bitcoin's 4-Year Cycle" (800+ words):
1. What is a Bitcoin Halving? (supply shock mechanism)
2. Historical Pattern (2012→2013, 2016→2017, 2020→2021, 2024→?)
3. The Four Phases (Accumulation → Markup → Blow-off → Distribution)
4. How to Read On-Chain Indicators (brief intro to MVRV, Pi Cycle, Puell, S2F)
5. Current Cycle Context (where we are now, ~687 days post-halving)
6. Key Takeaways for Investors
7. Disclaimer

Add metadata export for SEO. Include AdUnit in article.

**Step 3: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add Learn hub and first article on Bitcoin's 4-year cycle"
```

---

## Task 12: SEO, Sitemap, robots.txt, ads.txt

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `public/robots.txt`
- Create: `public/ads.txt`

**Step 1: Create sitemap.ts**

```typescript
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cycle.vibed-lab.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/learn/understanding-bitcoin-cycle`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
```

**Step 2: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://cycle.vibed-lab.com/sitemap.xml
```

**Step 3: Create ads.txt**

```
google.com, pub-6874320463657568, DIRECT, f08c47fec0942fa0
```

**Step 4: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add sitemap, robots.txt, and ads.txt for SEO"
```

---

## Task 13: Final Integration, Build Verification & Push

**Step 1: Full build test**

```bash
cd D:/coding/bitcoincycle-clock
npm run build
```

Verify `out/` contains all expected HTML files.

**Step 2: Fix any build errors**

Address TypeScript errors, missing imports, SSR issues with Canvas/html2canvas (use dynamic import with `ssr: false`).

**Step 3: Create GitHub repo and push**

```bash
cd D:/coding/bitcoincycle-clock
gh repo create leejaeyoung2026-bot/bitcoincycle-clock --public --source=. --push
```

**Step 4: Final commit if needed**

```bash
git add -A
git commit -m "chore: final build verification and cleanup"
git push
```

---

## Dependency Graph

```
Task 1 (init) ──────────┐
                         ├── Task 4 (components) ─── Task 9 (home page)
Task 2 (types & data) ──┤                                    │
                         ├── Task 3 (lib) ── Task 5 (clock) ─┘
                         │                    Task 6 (gauges) ┘
                         │                    Task 7 (overlay)┘
                         │
                         ├── Task 8 (share) ── Task 9 (home page)
                         │
                         ├── Task 10 (static pages)  [independent]
                         ├── Task 11 (learn hub)     [independent]
                         └── Task 12 (SEO)           [independent]

Task 13 (final) ← all tasks complete
```

## Parallelization Strategy

- **Round 1**: Task 1 (must be first — project init)
- **Round 2**: Task 2 + Task 4 (types/data + shared components — independent after init)
- **Round 3**: Task 3 + Task 10 + Task 12 (lib functions + static pages + SEO — independent)
- **Round 4**: Task 5 + Task 6 + Task 7 + Task 11 (visualizations + learn — depend on lib/data)
- **Round 5**: Task 8 (share — depends on visualizations)
- **Round 6**: Task 9 (home assembly — depends on all components)
- **Round 7**: Task 13 (final build + push)
