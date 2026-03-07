"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCycleData } from "@/hooks/useCycleData";
import { formatCycleTime, getPhaseLabel, getPhaseColor } from "@/lib/cycle-engine";
import CycleClock from "@/components/CycleClock";
import HalvingCountdown from "@/components/HalvingCountdown";
import IndicatorGauge from "@/components/IndicatorGauge";
import CycleOverlay from "@/components/CycleOverlay";
import ShareModal from "@/components/ShareModal";
import AdUnit from "@/components/AdUnit";
import { IndicatorConfig } from "@/types/cycle";

// Gauge display ranges for each indicator
const GAUGE_RANGES: Record<string, { min: number; max: number }> = {
  mvrv: { min: -1, max: 8 },
  piCycle: { min: 0, max: 1.1 },
  puellMultiple: { min: 0, max: 5 },
  s2fDeviation: { min: -100, max: 200 },
};

export default function Home() {
  const { cyclePosition, indicators, price, loading, error } = useCycleData();
  const [shareOpen, setShareOpen] = useState(false);
  const [thresholds, setThresholds] = useState<Record<string, IndicatorConfig>>({});

  // Load indicator threshold configs for gauge zones and labels
  useEffect(() => {
    fetch("/data/indicator-thresholds.json")
      .then((r) => r.json())
      .then((data: Record<string, IndicatorConfig>) => setThresholds(data))
      .catch(() => {/* silently fail; gauges will render without zone colors */});
  }, []);

  // Map indicators to the format ShareModal expects
  const shareIndicators = indicators.map((ind) => ({
    key: ind.key,
    value: ind.value,
    label: thresholds[ind.key]?.name ?? ind.key,
  }));

  // ----------------------------------------------------------------
  // Loading state
  // ----------------------------------------------------------------
  if (loading && !cyclePosition) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ color: "var(--ink-muted)" }}
      >
        <div className="spinner" aria-hidden="true" />
        <p style={{ fontSize: "0.875rem", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
          Loading cycle data...
        </p>
      </div>
    );
  }

  const progress = cyclePosition?.progress ?? 0;
  const phase = cyclePosition?.phase ?? "accumulation";
  const dayInCycle = cyclePosition?.dayInCycle ?? 0;
  const totalDays = cyclePosition?.totalDays ?? 1460;
  const phaseColor = getPhaseColor(phase);

  return (
    <>
      <main
        className="max-w-4xl mx-auto px-4"
        style={{ fontFamily: "var(--font-sans)", paddingTop: "40px", paddingBottom: "80px" }}
      >

        {/* ----------------------------------------------------------------
            Error banner
        ---------------------------------------------------------------- */}
        {error && (
          <div className="error-banner" role="alert">
            <strong>Data notice:</strong> {error}. Showing approximate values.
          </div>
        )}

        {/* ----------------------------------------------------------------
            1. Hero section
        ---------------------------------------------------------------- */}
        <section style={{ textAlign: "center", marginBottom: "36px" }}>

          {/* Page title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 400,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              margin: "0 0 16px",
            }}
          >
            Where Are We in the Bitcoin Cycle?
          </h1>

          {/* Live price readout */}
          {price != null && (
            <div style={{ marginBottom: "12px" }}>
              <span
                className="readout-label"
                style={{ display: "block", marginBottom: "4px" }}
              >
                BTC / USD — Live
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                  fontWeight: 500,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                ${price.toLocaleString()}
              </span>
            </div>
          )}

          {/* Subtitle */}
          <p style={{ color: "var(--ink-muted)", fontSize: "0.875rem", margin: "0 0 16px" }}>
            Real-time cycle position based on the 4-year halving pattern
          </p>

          {/* Current phase badge */}
          {cyclePosition && (
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 16px",
                  borderRadius: "99px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: phaseColor,
                  color: "#fff",
                }}
              >
                {getPhaseLabel(phase)}
              </span>
            </div>
          )}
        </section>

        {/* ----------------------------------------------------------------
            2. Cycle Clock
        ---------------------------------------------------------------- */}
        {cyclePosition && (
          <section style={{ marginBottom: "28px" }}>
            {/* Clock panel */}
            <div
              className="panel"
              style={{
                padding: "28px 16px 20px",
                position: "relative",
              }}
            >
              <CycleClock
                dayInCycle={dayInCycle}
                totalDays={totalDays}
                phase={phase}
                progress={progress}
              />
              <p
                style={{
                  textAlign: "center",
                  marginTop: "14px",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                Cycle Time: {formatCycleTime(progress)}
              </p>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------
            3. Halving Countdown
        ---------------------------------------------------------------- */}
        <section style={{ marginBottom: "28px" }}>
          <div className="countdown-strip">
            <HalvingCountdown
              targetDate="2028-03-15"
              targetBlock={1050000}
              nextReward={1.5625}
            />
          </div>
        </section>

        {/* ----------------------------------------------------------------
            4. Ad Unit (first)
        ---------------------------------------------------------------- */}
        <section style={{ marginBottom: "28px" }}>
          <AdUnit slot="1234567890" format="auto" />
        </section>

        {/* ----------------------------------------------------------------
            5. Indicator Gauges
        ---------------------------------------------------------------- */}
        <section style={{ marginBottom: "36px" }}>
          <div className="section-label" style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Cycle Indicators
            </h2>
          </div>
          <p style={{ color: "var(--ink-muted)", fontSize: "0.82rem", marginBottom: "20px", marginTop: "-12px" }}>
            Multiple on-chain metrics point to the same conclusion
          </p>

          {indicators.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "14px",
              }}
              className="sm:grid-cols-4"
            >
              {indicators.map((ind) => {
                const config = thresholds[ind.key];
                const range = GAUGE_RANGES[ind.key] ?? { min: 0, max: 10 };

                // Determine the zone color for the top stripe
                const zones = config?.zones ?? (ind.zone ? [ind.zone] : []);
                const currentZone = zones.find(
                  (z: { min: number; max: number; color: string; label: string }) => ind.value >= z.min && ind.value < z.max
                ) ?? zones[zones.length - 1];
                const zoneColor = currentZone?.color ?? "var(--border)";

                return (
                  <div
                    key={ind.key}
                    className="gauge-card"
                    style={{ "--gauge-zone-color": zoneColor } as React.CSSProperties}
                  >
                    <IndicatorGauge
                      label={config?.name ?? ind.key}
                      value={ind.value}
                      min={range.min}
                      max={range.max}
                      zones={zones}
                      unit={config?.unit ?? ""}
                      approximate={ind.approximate}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: "var(--ink-muted)", fontSize: "0.875rem" }}>
              Indicator data loading...
            </p>
          )}
        </section>

        {/* ----------------------------------------------------------------
            6. Share button
        ---------------------------------------------------------------- */}
        <section style={{ marginBottom: "40px", display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setShareOpen(true)}
            className="btn-primary"
            style={{ minWidth: "180px" }}
          >
            Share This Moment
          </button>
        </section>

        {/* ----------------------------------------------------------------
            6b. Trust Stats
        ---------------------------------------------------------------- */}
        <section style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              background: "var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
            className="sm:grid-cols-4"
          >
            {[
              { value: "4", label: "On-chain indicators" },
              { value: "3", label: "Cycles tracked" },
              { value: "2017", label: "Investing since" },
              { value: "12", label: "Learn articles" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--bg-elevated)",
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------------
            7. Historical Cycle Overlay
        ---------------------------------------------------------------- */}
        <section style={{ marginBottom: "40px" }}>
          <div className="section-label" style={{ marginBottom: "8px" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Historical Cycle Comparison
            </h2>
          </div>
          <p style={{ color: "var(--ink-muted)", fontSize: "0.82rem", marginBottom: "16px" }}>
            Price performance normalized to each halving date (log scale)
          </p>
          <div className="chart-container">
            <CycleOverlay currentDay={dayInCycle} />
          </div>
        </section>

        {/* ----------------------------------------------------------------
            8. Ad Unit (second)
        ---------------------------------------------------------------- */}
        <section style={{ marginBottom: "40px" }}>
          <AdUnit slot="0987654321" format="auto" />
        </section>

        {/* ----------------------------------------------------------------
            9. Educational Content
        ---------------------------------------------------------------- */}
        <section className="prose" style={{ marginBottom: "40px" }}>

          {/* How to Read the Bitcoin Cycle Clock */}
          <h2>How to Read the Bitcoin Cycle Clock</h2>
          <p>
            The Bitcoin Cycle Clock borrows the familiar face of an analog clock to visualize where
            we are inside the current 4-year halving cycle. Twelve o&apos;clock represents the
            halving event itself — the moment every four years when Bitcoin&apos;s block reward is
            cut in half. From there the hand sweeps clockwise through the full cycle until the next
            halving brings it back to twelve.
          </p>
          <p>
            The clock face is divided into four colored quadrants, each representing a distinct
            market phase. The upper-right quadrant (12 to 3 o&apos;clock) is the{" "}
            <strong>Accumulation</strong> phase — the calm after the halving, when prices are often
            still flat or recovering. Moving clockwise to the lower-right (3 to 6) is the{" "}
            <strong>Early Markup</strong> phase, where momentum builds and prices rise steadily.
            The lower-left quadrant (6 to 9) is the <strong>Blow-off Top</strong> — the euphoric,
            parabolic surge that has historically preceded each major peak. Finally, the upper-left
            (9 to 12) is the <strong>Distribution</strong> phase, where smart money sells into
            retail demand before the next bear market.
          </p>
          <p>
            The position of the hand tells you the current moment. A hand near 3 o&apos;clock means
            you are roughly one year past the halving — historically a period of accelerating price
            action. A hand near 9 o&apos;clock suggests you are deep into distribution. The clock
            is a compass, not a timer: exact tops and bottoms cannot be predicted, but the broad
            phase gives useful directional context.
          </p>

          {/* What Are Bitcoin Halving Cycles */}
          <h2>What Are Bitcoin Halving Cycles?</h2>
          <p>
            Roughly every four years — or more precisely, every 210,000 blocks — the Bitcoin
            protocol automatically cuts the reward that miners receive for adding a new block to
            the blockchain. This event is called the halving. When Bitcoin launched in 2009 the
            reward was 50 BTC per block. It was halved to 25 BTC in 2012, to 12.5 BTC in 2016, to
            6.25 BTC in 2020, and most recently to 3.125 BTC in April 2024. The next halving,
            expected around March 2028, will reduce the reward to 1.5625 BTC.
          </p>
          <p>
            Each halving cuts the rate at which new Bitcoin enters circulation. If demand stays
            constant or increases while new supply is cut, basic economics suggests price should
            rise. Historically, each halving has been followed — with varying lags of several
            months to over a year — by a significant bull market.
          </p>
          <p>
            The 2012 halving preceded a roughly 8,000% price gain in the following year. The 2016
            halving was followed by the celebrated 2017 bull run. The 2020 halving led to the
            all-time highs of late 2021. While past performance does not guarantee future results,
            the structural supply shock of each halving continues to be one of the most closely
            watched events in the cryptocurrency space.{" "}
            <Link href="/learn/bitcoin-halving-history">
              See the full halving timeline &rarr;
            </Link>
          </p>

          {/* Understanding the Indicators */}
          <h2>Understanding the Indicators</h2>
          <p>
            The Cycle Clock is complemented by four on-chain metrics that have historically
            provided early warning of major cycle turning points. Each indicator measures a
            different facet of market behavior, and when multiple metrics flash the same signal
            simultaneously, confidence in that reading increases considerably.
          </p>

          <h3>MVRV Z-Score</h3>
          <p>
            The Market Value to Realized Value (MVRV) Z-Score compares Bitcoin&apos;s current
            market capitalization against its &quot;realized cap&quot; — the aggregate value of all
            coins at the price they last moved on-chain. The Z-Score normalizes this ratio using
            standard deviations from the historical mean. Values below zero suggest the market is
            undervalued relative to the cost basis of all holders, historically a buying
            opportunity. Values above 7 have historically coincided with cycle tops.{" "}
            <Link href="/learn/mvrv-z-score-explained">
              Read the full guide &rarr;
            </Link>
          </p>

          <h3>Pi Cycle Top Indicator</h3>
          <p>
            The Pi Cycle Top Indicator tracks the ratio between Bitcoin&apos;s 111-day simple
            moving average and twice its 350-day moving average. The indicator gets its name
            because 350 divided by 111 is approximately the mathematical constant pi (3.142). When
            the 111-day MA approaches and crosses above 2x the 350-day MA — pushing the ratio
            toward 1.0 — the indicator has historically signaled a cycle top within days.{" "}
            <Link href="/learn/pi-cycle-top-indicator">
              Read the full guide &rarr;
            </Link>
          </p>

          <h3>Puell Multiple</h3>
          <p>
            The Puell Multiple measures the USD value of newly issued Bitcoin on any given day
            relative to the 365-day moving average of that value. When the Puell Multiple is
            extremely low (below 0.5), miners are earning far less than their annual average —
            often coinciding with capitulation bottoms. When it is extremely high (above 4), miners
            are incentivized to sell aggressively, historically marking cycle tops.{" "}
            <Link href="/learn/puell-multiple-guide">
              Read the full guide &rarr;
            </Link>
          </p>

          <h3>Stock-to-Flow Deviation</h3>
          <p>
            The Stock-to-Flow (S2F) model treats Bitcoin like a scarce commodity and derives a
            &quot;fair value&quot; price based purely on how much Bitcoin exists relative to how
            much new supply is produced each year. The S2F Deviation indicator shows how far the
            current price sits above or below that model price, expressed as a percentage. A
            reading of +100% means Bitcoin trades at double the model price — historically
            associated with euphoric tops.{" "}
            <Link href="/learn/stock-to-flow-model">
              Read the full guide &rarr;
            </Link>
          </p>

          {/* Why Cycles Matter */}
          <h2>Why Cycles Matter for Investors</h2>
          <p>
            Understanding cycle position does not require predicting the exact top or bottom —
            nobody can do that reliably. What it offers is a probabilistic framework: knowing that
            you are likely in an early accumulation phase (1–2 years post-halving) is different
            from knowing you are likely approaching a blow-off top (2.5–3 years post-halving).
          </p>
          <p>
            Dollar-cost averaging (DCA) combined with cycle awareness is a strategy many long-term
            investors use. Rather than trying to time the market perfectly, cycle awareness helps
            you calibrate expectations, avoid panic-selling in bear markets, and maintain
            conviction during volatile periods. The clock is a tool for informed perspective —
            not a trading signal.{" "}
            <Link href="/learn/dollar-cost-averaging-bitcoin">
              Learn about cycle-aware DCA &rarr;
            </Link>
          </p>

          {/* About the Creator */}
          <h2>About the Creator</h2>
          <p>
            This tool was built by Jay, a Bitcoin investor since 2017 who has lived through the
            full cycle firsthand — the 2017 bull run, the brutal 2018 bear market, the 2021
            all-time highs, and the 2022 capitulation. That experience underscored the value of
            keeping cycle context in view at all times. Jay also built{" "}
            <a
              href="https://backtest.vibed-lab.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              CryptoBacktest
            </a>
            , a free tool for backtesting cryptocurrency strategies. The BitcoinCycle Clock is
            part of the same effort to give independent investors better analytical tools.
          </p>

          {/* Explore Articles */}
          <h2>Explore Our Learn Hub</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { href: "/learn/understanding-bitcoin-cycle", text: "Understanding Bitcoin's 4-Year Cycle" },
              { href: "/learn/mvrv-z-score-explained", text: "MVRV Z-Score Explained" },
              { href: "/learn/pi-cycle-top-indicator", text: "Pi Cycle Top Indicator" },
              { href: "/learn/bitcoin-halving-history", text: "Bitcoin Halving History" },
              { href: "/learn/dollar-cost-averaging-bitcoin", text: "Dollar Cost Averaging Bitcoin" },
              { href: "/learn/bitcoin-fear-greed-index", text: "Fear and Greed Index: Reading Market Emotions" },
              { href: "/learn/on-chain-vs-technical-analysis", text: "On-Chain vs Technical Analysis" },
              { href: "/learn/bitcoin-dominance-cycles", text: "Bitcoin Dominance Cycles: Reading Market Share" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  {link.text} &rarr;
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/learn">
              View all 12 articles &rarr;
            </Link>
          </p>
        </section>

        {/* ----------------------------------------------------------------
            10. Disclaimer
        ---------------------------------------------------------------- */}
        <section style={{ marginBottom: "40px" }}>
          <div className="disclaimer">
            <strong>Disclaimer:</strong> This tool is for educational purposes only. It does not
            constitute financial advice, investment recommendations, or trading signals. Past cycles
            do not guarantee future performance. Always do your own research and consult a qualified
            financial advisor before making investment decisions.
          </div>
        </section>

      </main>

      {/* ----------------------------------------------------------------
          11. Share Modal — rendered at page level, outside <main>
      ---------------------------------------------------------------- */}
      {cyclePosition && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          dayInCycle={dayInCycle}
          totalDays={totalDays}
          phase={phase}
          progress={progress}
          price={price}
          indicators={shareIndicators}
        />
      )}
    </>
  );
}
