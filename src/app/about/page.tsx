import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Jay, Bitcoin Investor Since 2017",
  description:
    "About BitcoinCycle Clock and its creator Jay — a Bitcoin investor since 2017 who has survived two complete market cycles and built tools for cycle-aware investing.",
};

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jay",
    description:
      "Bitcoin investor since 2017 and creator of BitcoinCycle Clock and CryptoBacktest. Survived two complete Bitcoin market cycles.",
    knowsAbout: [
      "Bitcoin Market Cycles",
      "On-Chain Analysis",
      "MVRV Z-Score",
      "Cryptocurrency Investment",
      "Technical Analysis",
    ],
    url: "https://cycle.vibed-lab.com/about",
    sameAs: ["https://vibed-lab.com", "https://backtest.vibed-lab.com"],
  };

  return (
    <article
      className="max-w-2xl mx-auto px-4 py-12"
      style={{ color: "var(--ink)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <h1
        className="text-3xl mb-6"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        About BitcoinCycle Clock
      </h1>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The Vision
        </h2>
        <p className="mb-4 leading-relaxed">
          BitcoinCycle Clock answers one question: <em>Where are we in the
          Bitcoin cycle right now?</em> That single question drives every
          design decision on this site. Instead of drowning you in raw charts
          and numeric data, we present cycle position the way a clock
          presents time — as a dial you can read in under a second.
        </p>
        <p className="mb-4 leading-relaxed">
          The analog clock metaphor is intentional. A clock does not demand
          that you understand the mechanical movement behind its hands; it
          just tells you what you need to know at a glance. BitcoinCycle
          Clock works the same way. The dial sweeps from the quiet post-bear
          Accumulation phase through Early Markup, into the Blow-off Top, and
          then into Distribution — the full 12 o&apos;clock rotation of a typical
          Bitcoin market cycle, represented visually so you can orient
          yourself instantly.
        </p>
        <p className="leading-relaxed">
          Whether you are a long-time holder reviewing your strategy or a
          newcomer trying to make sense of volatile price action, knowing
          where you stand in the cycle puts everything else in context.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Why Cycles Matter
        </h2>
        <p className="mb-4 leading-relaxed">
          Bitcoin&apos;s 4-year halving schedule creates a recurring supply shock
          that no other asset class has. Every 210,000 blocks — approximately
          every four years — the reward that miners receive for validating
          transactions is cut in half. Fewer new coins entering circulation
          while demand continues to grow is a textbook recipe for price
          appreciation, and history has confirmed this pattern three times
          since Bitcoin&apos;s genesis block in 2009.
        </p>
        <p className="mb-4 leading-relaxed">
          Every completed cycle has followed a remarkably consistent sequence
          of phases: <strong>Accumulation</strong>, where prices are
          suppressed and patient buyers quietly build positions;{" "}
          <strong>Early Markup</strong>, where momentum builds and early
          adopters are rewarded; <strong>Blow-off Top</strong>, where
          parabolic price action and mainstream media coverage reach peak
          intensity; and <strong>Distribution</strong>, where holders who
          bought early begin reducing exposure while latecomers are still
          buying the narrative.
        </p>
        <p className="leading-relaxed">
          Understanding which phase you are in does not guarantee profit, but
          it does help frame your expectations. Buying during Accumulation
          feels uncomfortable because everything looks bleak. Selling during
          Blow-off feels premature because the news is euphoric. Cycle
          awareness is one of the few edges available to retail investors
          competing against institutions with far greater resources.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          About the Creator
        </h2>
        <p className="mb-4 leading-relaxed">
          I&apos;m Jay, a Bitcoin investor since 2017. I have survived two
          complete market cycles — the euphoria of 2017&apos;s bull run to $20K,
          the despair of the 2018 crash to $3,200, the 2021 surge to $69K,
          and the brutal 2022 winter down to $16K. These experiences taught
          me that cycles are the most reliable pattern in crypto, and that
          the emotional narrative of each phase can pull even disciplined
          investors off course if they have no framework to reference.
        </p>
        <p className="mb-4 leading-relaxed">
          Through the 2017 mania I watched friends buy at the top convinced
          it was just the beginning. Through the 2018 crash I watched many
          of those same friends sell at the bottom convinced it was the end.
          The same story repeated in 2021–2022. What protected me — imperfectly,
          but meaningfully — was keeping one eye on the on-chain data and
          asking myself at each milestone: what phase does this look like?
        </p>
        <p className="leading-relaxed">
          BitcoinCycle Clock is the tool I wish I had in 2017. It is built
          for investors who want a quick, honest read of where the market
          stands — not hype, not doom, just a calibrated position on the dial.
        </p>
      </section>

      {/* Credentials Box */}
      <div
        className="p-5 rounded-lg border text-sm mb-10"
        style={{ borderColor: "var(--border)", background: "var(--cream)" }}
      >
        <p
          className="font-mono text-xs uppercase mb-3"
          style={{ color: "var(--cycle-accent)" }}
        >
          Experience &amp; Credentials
        </p>
        <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--ink-muted)" }}>
          <li><strong>Bitcoin investor since 2017</strong> — survived 2 complete market cycles</li>
          <li><strong>Creator of CryptoBacktest</strong> — historical trading strategy backtesting tool</li>
          <li><strong>On-chain analysis practitioner</strong> — MVRV, Pi Cycle, Puell, S2F</li>
          <li><strong>Licensed pharmacist</strong> — analytical and data-driven professional background</li>
          <li><strong>Vibed Lab founder</strong> — building focused tools for independent investors</li>
        </ul>
      </div>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Our Approach
        </h2>
        <p className="mb-4 leading-relaxed">
          No single indicator tells the complete story. BitcoinCycle Clock
          uses multiple on-chain and price-based signals to triangulate cycle
          position: <strong>MVRV Z-Score</strong> compares market value to
          realized value, identifying statistically extreme over- or
          under-valuation; <strong>Pi Cycle Top</strong> uses two moving
          averages whose convergence has historically coincided with cycle
          peaks; <strong>Puell Multiple</strong> measures daily miner revenue
          relative to its 365-day average, highlighting miner stress and
          expansion phases; and <strong>Stock-to-Flow</strong> models
          scarcity-driven price expectations.
        </p>
        <p className="leading-relaxed">
          Each indicator has blind spots, and past performance does not
          guarantee future results. But when multiple independent metrics
          align — all pointing toward overheated or undervalued territory —
          the signal is far more robust than any single data point. The clock
          dial synthesizes these readings into one intuitive position so you
          can spend less time parsing spreadsheets and more time thinking
          about your strategy.
        </p>
      </section>

      {/* Data Sources & Methodology */}
      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Data Sources &amp; Methodology
        </h2>
        <p className="mb-4 leading-relaxed">
          Price data is sourced from the CoinGecko API, one of the most widely
          used cryptocurrency data aggregators. Historical cycle data — including
          halving dates, previous cycle price trajectories, and indicator baselines —
          is pre-computed and bundled with the application for instant load times.
        </p>
        <p className="mb-4 leading-relaxed">
          On-chain indicators like MVRV and Puell Multiple require data that is
          not freely available in real-time from public APIs. For these metrics,
          BitcoinCycle Clock uses approximation models based on historical realized
          price trends and known issuance schedules. All approximate values are
          clearly labeled as such on the dashboard.
        </p>
        <p className="leading-relaxed">
          The cycle clock position is calculated using the elapsed time since the
          most recent halving (April 19, 2024) relative to the expected ~1,460-day
          cycle length. This is a structural measurement, not a prediction — it
          tells you where you are on the map, not where the destination is.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Part of Vibed Lab
        </h2>
        <p className="mb-4 leading-relaxed">
          BitcoinCycle Clock is one project under{" "}
          <a
            href="https://vibed-lab.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cycle-accent)" }}
          >
            Vibed Lab
          </a>
          , a collection of focused, no-frills tools for investors and
          developers. Other projects include:
        </p>
        <div className="space-y-3">
          <div
            className="p-4 rounded-lg border"
            style={{ borderColor: "var(--border)", background: "var(--cream)" }}
          >
            <a
              href="https://backtest.vibed-lab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium"
              style={{ color: "var(--cycle-accent)", fontFamily: "var(--font-serif)" }}
            >
              CryptoBacktest
            </a>
            <p className="text-sm mt-1" style={{ color: "var(--ink-muted)" }}>
              backtest.vibed-lab.com — Backtest historical trading strategies
              against real Bitcoin and crypto price data.
            </p>
          </div>
          <div
            className="p-4 rounded-lg border"
            style={{ borderColor: "var(--border)", background: "var(--cream)" }}
          >
            <a
              href="https://clearrx.vibed-lab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium"
              style={{ color: "var(--cycle-accent)", fontFamily: "var(--font-serif)" }}
            >
              ClearRx
            </a>
            <p className="text-sm mt-1" style={{ color: "var(--ink-muted)" }}>
              clearrx.vibed-lab.com — Drug interaction checker with visual network
              diagrams, written by a licensed pharmacist.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Links */}
      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Explore BitcoinCycle Clock
        </h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="/"
            className="px-4 py-2 rounded-lg border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
          >
            Cycle Dashboard
          </a>
          <a
            href="/learn"
            className="px-4 py-2 rounded-lg border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
          >
            Learn
          </a>
          <a
            href="/faq"
            className="px-4 py-2 rounded-lg border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
          >
            FAQ
          </a>
          <a
            href="/glossary"
            className="px-4 py-2 rounded-lg border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
          >
            Glossary
          </a>
          <a
            href="/contact"
            className="px-4 py-2 rounded-lg border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
          >
            Contact
          </a>
        </div>
      </section>

      <p className="leading-relaxed text-sm" style={{ color: "var(--ink-muted)" }}>
        <em>
          This site is for educational and informational purposes only. It
          does not constitute financial or investment advice. Always do your
          own research before making any investment decision.
        </em>
      </p>
    </article>
  );
}
