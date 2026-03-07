import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about BitcoinCycle Clock — how the cycle positioning works, what indicators mean, data sources, and how to interpret the dashboard.",
};

const FAQS = [
  {
    q: "What is BitcoinCycle Clock?",
    a: "BitcoinCycle Clock is a free, real-time dashboard that visualizes where Bitcoin currently sits in its roughly 4-year halving cycle. It uses an analog clock metaphor to make cycle position instantly readable — no charts or spreadsheets required.",
  },
  {
    q: "How does the cycle clock work?",
    a: "The clock maps the ~1,460 days between Bitcoin halvings onto a 12-hour clock face. Twelve o'clock represents the halving event. The hand sweeps clockwise through four phases: Accumulation, Early Markup, Blow-off Top, and Distribution. The current hand position is calculated from the number of days elapsed since the most recent halving (April 19, 2024).",
  },
  {
    q: "What indicators does BitcoinCycle Clock use?",
    a: "Four on-chain and price-based indicators: MVRV Z-Score (market value vs. realized value), Pi Cycle Top (111-day and 350-day moving average convergence), Puell Multiple (daily miner issuance vs. annual average), and Stock-to-Flow Deviation (price vs. scarcity model). Each is displayed as an analog gauge beside the main clock.",
  },
  {
    q: "Is this financial advice?",
    a: "No. BitcoinCycle Clock is an educational tool that presents historical patterns and on-chain data. It does not constitute financial advice, investment recommendations, or trading signals. Past cycle patterns do not guarantee future results. Always do your own research and consult a qualified financial advisor.",
  },
  {
    q: "How accurate are the cycle predictions?",
    a: "BitcoinCycle Clock does not predict anything — it measures where you currently are relative to historical patterns. The four-phase cycle has repeated three times since 2012, but each cycle has varied in timing and magnitude. The clock is a compass for orientation, not a GPS for price targets.",
  },
  {
    q: "Where does the data come from?",
    a: "Real-time price data comes from the CoinGecko API, a widely used cryptocurrency data aggregator. Historical cycle data, halving dates, and indicator baselines are pre-computed and bundled with the application. On-chain metrics like MVRV use approximation models based on historical trends.",
  },
  {
    q: "What is the MVRV Z-Score?",
    a: "MVRV Z-Score compares Bitcoin's market capitalization to its realized capitalization (the aggregate value of all coins at the price they last moved on-chain). Values below zero historically signal undervaluation. Values above 7 have historically coincided with cycle tops.",
  },
  {
    q: "What is the Pi Cycle Top indicator?",
    a: "The Pi Cycle Top tracks the ratio between Bitcoin's 111-day moving average and twice its 350-day moving average. When the shorter average crosses above the longer (ratio approaching 1.0), it has historically signaled cycle peaks within days — three times in a row since 2013.",
  },
  {
    q: "What is the Puell Multiple?",
    a: "The Puell Multiple measures the USD value of newly mined Bitcoin each day relative to its 365-day average. High values (above 4) indicate miners are earning far above average — historically a top signal. Very low values (below 0.5) indicate miner stress — historically a bottom signal.",
  },
  {
    q: "What is Stock-to-Flow?",
    a: "Stock-to-Flow (S2F) models Bitcoin's price based on its scarcity — existing supply divided by annual production. Each halving doubles the S2F ratio. The deviation indicator shows how far the current price sits above or below the model's prediction, expressed as a percentage.",
  },
  {
    q: "How often is the data updated?",
    a: "Price data is fetched from CoinGecko each time you visit the page, with a 5-minute local cache to reduce API calls. Historical indicator baselines are updated periodically as part of site maintenance. The cycle clock position updates automatically based on the current date.",
  },
  {
    q: "Can I share the cycle clock screenshot?",
    a: "Yes! Click the \"Share This Moment\" button to generate a dated screenshot of the current cycle position with all indicator readings. You can download it as a PNG image or copy a shareable link. The image includes a watermark with the date and cycle.vibed-lab.com.",
  },
  {
    q: "Why does the dashboard show \"approximate\" values?",
    a: "Some on-chain metrics — particularly MVRV realized price and Puell daily issuance — require blockchain data that isn't freely available through public APIs. BitcoinCycle Clock uses approximation models based on historical patterns and known issuance schedules. All approximate values are clearly labeled.",
  },
  {
    q: "What happens when Bitcoin doesn't follow the cycle?",
    a: "No two cycles are identical. External factors — interest rates, regulation, institutional adoption, macroeconomic conditions — can compress, extend, or partially override the typical pattern. The cycle framework helps orient expectations but should never be treated as deterministic. Use it alongside your own research.",
  },
  {
    q: "Who built BitcoinCycle Clock?",
    a: "BitcoinCycle Clock was built by Jay, a Bitcoin investor since 2017 who has lived through two complete market cycles. Jay also created CryptoBacktest (backtest.vibed-lab.com) for historical trading strategy testing. Both tools are part of Vibed Lab, a collection of focused tools for independent investors.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <article
      className="max-w-2xl mx-auto px-4 py-12"
      style={{ color: "var(--ink)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Frequently Asked Questions
      </h1>
      <p className="mb-10" style={{ color: "var(--ink-muted)" }}>
        Everything you need to know about BitcoinCycle Clock, the indicators,
        and how to interpret the dashboard.
      </p>

      <div className="space-y-0">
        {FAQS.map((faq, i) => (
          <details
            key={i}
            className="group border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <summary
              className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="text-lg font-medium pr-4">{faq.q}</span>
              <span
                className="text-xl font-light transition-transform duration-200 group-open:rotate-45 shrink-0"
                style={{ color: "var(--cycle-accent)" }}
              >
                +
              </span>
            </summary>
            <p
              className="pb-5 leading-relaxed text-sm"
              style={{ color: "var(--ink-muted)" }}
            >
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      <div
        className="mt-10 p-5 rounded-lg border"
        style={{ borderColor: "var(--border)", background: "var(--cream)" }}
      >
        <p className="font-mono text-xs uppercase mb-2" style={{ color: "var(--cycle-accent)" }}>
          Still have questions?
        </p>
        <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
          Reach out at{" "}
          <a href="/contact" style={{ color: "var(--cycle-accent)" }}>
            the contact page
          </a>{" "}
          or email{" "}
          <a href="mailto:jay@vibed-lab.com" style={{ color: "var(--cycle-accent)" }}>
            jay@vibed-lab.com
          </a>
          .
        </p>
      </div>
    </article>
  );
}
