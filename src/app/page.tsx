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
  mvrv: { min: -2, max: 10 },
  piCycle: { min: 0, max: 1.2 },
  puellMultiple: { min: 0, max: 6 },
  s2fDeviation: { min: -100, max: 500 },
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
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid var(--border)",
            borderTopColor: "var(--cycle-accent)",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
          }}
          aria-hidden="true"
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: "0.95rem" }}>Loading cycle data...</p>
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
        className="max-w-4xl mx-auto px-4 py-10"
        style={{ fontFamily: "var(--font-sans)" }}
      >

        {/* ----------------------------------------------------------------
            Error banner — shown when data fetch fails but we still render
        ---------------------------------------------------------------- */}
        {error && (
          <div
            role="alert"
            style={{
              marginBottom: "24px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #D1704A",
              background: "rgba(209,112,74,0.08)",
              color: "#D1704A",
              fontSize: "0.875rem",
            }}
          >
            <strong>Data notice:</strong> {error}. Showing approximate values.
          </div>
        )}

        {/* ----------------------------------------------------------------
            1. Hero section
        ---------------------------------------------------------------- */}
        <section className="text-center mb-10">
          <h1
            className="font-serif text-4xl sm:text-5xl font-bold leading-tight"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Where Are We in the Bitcoin Cycle?
          </h1>

          {price != null && (
            <p
              className="mt-4 text-2xl sm:text-3xl font-semibold"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--cycle-accent)",
              }}
            >
              BTC ${price.toLocaleString()}
            </p>
          )}

          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "var(--ink-muted)" }}
          >
            Real-time cycle position based on the 4-year halving pattern
          </p>

          {/* Current phase badge */}
          {cyclePosition && (
            <div className="mt-4 inline-flex items-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 14px",
                  borderRadius: "99px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  background: phaseColor,
                  color: "#fff",
                  letterSpacing: "0.02em",
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
          <section className="mb-8">
            <CycleClock
              dayInCycle={dayInCycle}
              totalDays={totalDays}
              phase={phase}
              progress={progress}
            />
            <p
              className="text-center mt-3 text-sm"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ink-muted)",
              }}
            >
              Cycle Time: {formatCycleTime(progress)}
            </p>
          </section>
        )}

        {/* ----------------------------------------------------------------
            3. Halving Countdown
        ---------------------------------------------------------------- */}
        <section
          className="mb-8 rounded-xl px-4"
          style={{
            border: "1px solid var(--border)",
            background: "var(--cream)",
          }}
        >
          <HalvingCountdown
            targetDate="2028-03-15"
            targetBlock={1050000}
            nextReward={1.5625}
          />
        </section>

        {/* ----------------------------------------------------------------
            4. Ad Unit (first)
        ---------------------------------------------------------------- */}
        <section className="mb-8">
          <AdUnit slot="1234567890" format="auto" />
        </section>

        {/* ----------------------------------------------------------------
            5. Indicator Gauges
        ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            Cycle Indicators
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "var(--ink-muted)" }}
          >
            Multiple on-chain metrics point to the same conclusion
          </p>

          {indicators.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {indicators.map((ind) => {
                const config = thresholds[ind.key];
                const range = GAUGE_RANGES[ind.key] ?? { min: 0, max: 10 };
                return (
                  <div
                    key={ind.key}
                    className="rounded-xl p-4"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--cream)",
                    }}
                  >
                    <IndicatorGauge
                      label={config?.name ?? ind.key}
                      value={ind.value}
                      min={range.min}
                      max={range.max}
                      zones={config?.zones ?? ind.zone ? [ind.zone] : []}
                      unit={config?.unit ?? ""}
                      approximate={ind.approximate}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p
              className="text-sm"
              style={{ color: "var(--ink-muted)" }}
            >
              Indicator data loading...
            </p>
          )}
        </section>

        {/* ----------------------------------------------------------------
            6. Share button
        ---------------------------------------------------------------- */}
        <section className="mb-10 flex justify-center">
          <button
            onClick={() => setShareOpen(true)}
            className="px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "var(--cycle-accent)", color: "#fff" }}
          >
            Share This Moment
          </button>
        </section>

        {/* ----------------------------------------------------------------
            6b. Trust Stats
        ---------------------------------------------------------------- */}
        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "4", label: "On-chain indicators" },
              { value: "3", label: "Cycles tracked" },
              { value: "2017", label: "Investing since" },
              { value: "7", label: "Learn articles" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--cycle-accent)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------------
            7. Historical Cycle Overlay
        ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            Historical Cycle Comparison
          </h2>
          <p
            className="text-sm mb-4"
            style={{ color: "var(--ink-muted)" }}
          >
            Price performance normalized to each halving date (log scale)
          </p>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <CycleOverlay currentDay={dayInCycle} />
          </div>
        </section>

        {/* ----------------------------------------------------------------
            8. Ad Unit (second)
        ---------------------------------------------------------------- */}
        <section className="mb-10">
          <AdUnit slot="0987654321" format="auto" />
        </section>

        {/* ----------------------------------------------------------------
            9. Educational Content
        ---------------------------------------------------------------- */}
        <section
          className="mb-10"
          style={{
            color: "var(--ink)",
            lineHeight: "1.75",
          }}
        >
          {/* How to Read the Bitcoin Cycle Clock */}
          <h2
            className="text-2xl font-bold mt-10 mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.01em",
            }}
          >
            How to Read the Bitcoin Cycle Clock
          </h2>
          <p className="mb-3">
            The Bitcoin Cycle Clock borrows the familiar face of an analog clock to visualize where
            we are inside the current 4-year halving cycle. Twelve o&apos;clock represents the
            halving event itself — the moment every four years when Bitcoin&apos;s block reward is
            cut in half. From there the hand sweeps clockwise through the full cycle until the next
            halving brings it back to twelve.
          </p>
          <p className="mb-3">
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
          <h2
            className="text-2xl font-bold mt-10 mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.01em",
            }}
          >
            What Are Bitcoin Halving Cycles?
          </h2>
          <p className="mb-3">
            Roughly every four years — or more precisely, every 210,000 blocks — the Bitcoin
            protocol automatically cuts the reward that miners receive for adding a new block to
            the blockchain. This event is called the halving. When Bitcoin launched in 2009 the
            reward was 50 BTC per block. It was halved to 25 BTC in 2012, to 12.5 BTC in 2016, to
            6.25 BTC in 2020, and most recently to 3.125 BTC in April 2024. The next halving,
            expected around March 2028, will reduce the reward to 1.5625 BTC.
          </p>
          <p className="mb-3">
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
            <Link href="/learn/bitcoin-halving-history" style={{ color: "var(--cycle-accent)" }}>
              See the full halving timeline →
            </Link>
          </p>

          {/* Understanding the Indicators */}
          <h2
            className="text-2xl font-bold mt-10 mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.01em",
            }}
          >
            Understanding the Indicators
          </h2>
          <p className="mb-4">
            The Cycle Clock is complemented by four on-chain metrics that have historically
            provided early warning of major cycle turning points. Each indicator measures a
            different facet of market behavior, and when multiple metrics flash the same signal
            simultaneously, confidence in that reading increases considerably.
          </p>

          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--ink)" }}
          >
            MVRV Z-Score
          </h3>
          <p className="mb-4">
            The Market Value to Realized Value (MVRV) Z-Score compares Bitcoin&apos;s current
            market capitalization against its &quot;realized cap&quot; — the aggregate value of all
            coins at the price they last moved on-chain. The Z-Score normalizes this ratio using
            standard deviations from the historical mean. Values below zero suggest the market is
            undervalued relative to the cost basis of all holders, historically a buying
            opportunity. Values above 7 have historically coincided with cycle tops. The current
            reading gives a snapshot of whether the broad market is stretched or oversold.{" "}
            <Link href="/learn/mvrv-z-score-explained" style={{ color: "var(--cycle-accent)" }}>
              Read the full guide →
            </Link>
          </p>

          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--ink)" }}
          >
            Pi Cycle Top Indicator
          </h3>
          <p className="mb-4">
            The Pi Cycle Top Indicator tracks the ratio between Bitcoin&apos;s 111-day simple
            moving average and twice its 350-day moving average. The indicator gets its name
            because 350 divided by 111 is approximately the mathematical constant pi (3.142). When
            the 111-day MA approaches and crosses above 2x the 350-day MA — pushing the ratio
            toward 1.0 — the indicator has historically signaled a cycle top within days. On the
            gauge, a ratio below 0.6 is considered cool, while values approaching 0.95 are
            historically associated with topping conditions.{" "}
            <Link href="/learn/pi-cycle-top-indicator" style={{ color: "var(--cycle-accent)" }}>
              Read the full guide →
            </Link>
          </p>

          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--ink)" }}
          >
            Puell Multiple
          </h3>
          <p className="mb-4">
            The Puell Multiple measures the USD value of newly issued Bitcoin on any given day
            relative to the 365-day moving average of that value. Because miners must sell some
            portion of their earnings to cover operating costs, the indicator captures miner
            selling pressure. When the Puell Multiple is extremely low (below 0.5), miners are
            earning far less than their annual average — often coinciding with capitulation bottoms.
            When it is extremely high (above 4), miners are earning multiples of their annual
            average and are incentivized to sell aggressively, historically marking cycle tops.{" "}
            <Link href="/learn/puell-multiple-guide" style={{ color: "var(--cycle-accent)" }}>
              Read the full guide →
            </Link>
          </p>

          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--ink)" }}
          >
            Stock-to-Flow Deviation
          </h3>
          <p className="mb-5">
            The Stock-to-Flow (S2F) model treats Bitcoin like a scarce commodity — gold or silver —
            and derives a &quot;fair value&quot; price based purely on how much Bitcoin exists
            relative to how much new supply is produced each year. The S2F Deviation indicator
            shows how far the current price sits above or below that model price, expressed as a
            percentage. A reading of +100% means Bitcoin trades at double the model price —
            historically associated with euphoric tops — while a deeply negative reading suggests
            undervaluation relative to the scarcity model.{" "}
            <Link href="/learn/stock-to-flow-model" style={{ color: "var(--cycle-accent)" }}>
              Read the full guide →
            </Link>
          </p>

          {/* Why Cycles Matter */}
          <h2
            className="text-2xl font-bold mt-10 mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.01em",
            }}
          >
            Why Cycles Matter for Investors
          </h2>
          <p className="mb-3">
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
            <Link href="/learn/dollar-cost-averaging-bitcoin" style={{ color: "var(--cycle-accent)" }}>
              Learn about cycle-aware DCA →
            </Link>
          </p>

          {/* About the Creator */}
          <h2
            className="text-2xl font-bold mt-10 mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.01em",
            }}
          >
            About the Creator
          </h2>
          <p>
            This tool was built by Jay, a Bitcoin investor since 2017 who has lived through the
            full cycle firsthand — the 2017 bull run, the brutal 2018 bear market, the 2021 all-time
            highs, and the 2022 capitulation. That experience underscored the value of keeping
            cycle context in view at all times. Jay also built{" "}
            <a
              href="https://backtest.vibed-lab.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--cycle-accent)", textDecoration: "underline" }}
            >
              CryptoBacktest
            </a>
            , a free tool for backtesting cryptocurrency strategies. The BitcoinCycle Clock is part
            of the same effort to give independent investors better analytical tools.
          </p>

          {/* Explore Articles */}
          <h2
            className="text-2xl font-bold mt-10 mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.01em",
            }}
          >
            Explore Our Learn Hub
          </h2>
          <ul className="space-y-1 mb-4">
            {[
              { href: "/learn/understanding-bitcoin-cycle", text: "Understanding Bitcoin's 4-Year Cycle" },
              { href: "/learn/mvrv-z-score-explained", text: "MVRV Z-Score Explained" },
              { href: "/learn/pi-cycle-top-indicator", text: "Pi Cycle Top Indicator" },
              { href: "/learn/bitcoin-halving-history", text: "Bitcoin Halving History" },
              { href: "/learn/dollar-cost-averaging-bitcoin", text: "Dollar Cost Averaging Bitcoin" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} style={{ color: "var(--cycle-accent)" }}>
                  {link.text} →
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/learn" style={{ color: "var(--cycle-accent)" }}>
              View all 7 articles →
            </Link>
          </p>
        </section>

        {/* ----------------------------------------------------------------
            10. Disclaimer
        ---------------------------------------------------------------- */}
        <section
          className="mb-10 px-5 py-4 rounded-xl text-sm"
          style={{
            border: "1px solid var(--border)",
            color: "var(--ink-muted)",
            lineHeight: "1.65",
          }}
        >
          <strong style={{ color: "var(--ink)" }}>Disclaimer:</strong> This tool is for
          educational purposes only. It does not constitute financial advice, investment
          recommendations, or trading signals. Past cycles do not guarantee future performance.
          Always do your own research and consult a qualified financial advisor before making
          investment decisions.
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
