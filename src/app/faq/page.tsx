import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about BitcoinCycle Clock — how the cycle positioning works, what indicators mean, data sources, and how to interpret the dashboard.",
};

const faqs = [
  {
    question: "What is BitcoinCycle Clock?",
    answer:
      "BitcoinCycle Clock is a free, visual dashboard that shows where Bitcoin currently sits within its approximately four-year market cycle. It synthesizes multiple on-chain and price-based indicators into a single clock dial so you can gauge cycle positioning at a glance. The project is part of Vibed Lab, a collection of focused tools for investors and developers.",
  },
  {
    question: "How does the cycle clock work?",
    answer:
      "The clock maps Bitcoin’s recurring market cycle onto a 12-hour dial. Starting at roughly 6 o’clock with the post-bear Accumulation phase, the hand sweeps through Early Markup, Blow-off Top, and Distribution as the cycle progresses. The hand’s position is determined by a weighted composite of several independent on-chain and price indicators, each contributing its own assessment of where the market stands.",
  },
  {
    question: "What indicators does BitcoinCycle Clock use?",
    answer:
      "BitcoinCycle Clock uses four primary indicators: MVRV Z-Score, Pi Cycle Top, Puell Multiple, and Stock-to-Flow. Each metric captures a different dimension of Bitcoin’s market behavior — valuation, momentum, miner economics, and scarcity. By combining them, the clock reduces the blind spots that any single indicator would have on its own.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. BitcoinCycle Clock is strictly an educational and informational tool. Nothing on this site constitutes financial, investment, tax, or legal advice. The cycle positioning shown is based on historical patterns that may not repeat in the future. Always conduct your own research and consult a qualified financial advisor before making any investment decisions.",
  },
  {
    question: "How accurate are the cycle predictions?",
    answer:
      "The clock is not a prediction engine — it is a positioning tool. It tells you where the current data places Bitcoin relative to historical cycle patterns, not where the price will go next. Past cycles have followed a broadly similar structure, but the magnitude, timing, and shape of each cycle have varied. Treat the clock as one input among many, not as a crystal ball.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "Indicator data is sourced from publicly available on-chain analytics APIs and Bitcoin blockchain data. Price data is aggregated from major exchanges. All data is fetched in real time and cached briefly on the client side to reduce redundant network requests. We do not alter or editorialize the raw data in any way.",
  },
  {
    question: "What is the MVRV Z-Score?",
    answer:
      "The MVRV Z-Score compares Bitcoin’s market capitalization to its realized capitalization — the value of all coins priced at the time they last moved on-chain. When the Z-Score is high, it suggests the market is overvalued relative to its aggregate cost basis; when it is low, it suggests undervaluation. Historically, extreme Z-Score readings have coincided with major cycle tops and bottoms.",
  },
  {
    question: "What is the Pi Cycle Top indicator?",
    answer:
      "The Pi Cycle Top indicator tracks two moving averages of Bitcoin’s price: the 111-day moving average and the 350-day moving average multiplied by two. When the shorter average crosses above the longer one, it has historically signaled that a cycle top is imminent. The indicator earned its name because the ratio of the two time periods (350 / 111) approximates Pi.",
  },
  {
    question: "What is the Puell Multiple?",
    answer:
      "The Puell Multiple measures the daily value of newly mined Bitcoin (in USD) divided by the 365-day moving average of that same metric. A high Puell Multiple means miners are earning significantly more than their annual average, which historically coincides with overheated markets. A low reading suggests miner stress and has often marked attractive accumulation zones.",
  },
  {
    question: "What is Stock-to-Flow?",
    answer:
      "Stock-to-Flow is a scarcity model that divides Bitcoin’s existing supply (stock) by its annual production rate (flow). Because Bitcoin’s issuance halves every four years, its stock-to-flow ratio increases over time, theoretically supporting higher prices. While the model has tracked historical price trends reasonably well, it is a simplified framework and does not account for demand-side dynamics.",
  },
  {
    question: "How often is the data updated?",
    answer:
      "The dashboard fetches fresh indicator data each time you load the page. Responses are cached locally in your browser for approximately five minutes to avoid excessive API calls. After the cache expires, the next page load will pull the latest available data. There is no manual refresh needed — simply revisit the page.",
  },
  {
    question: "Can I share the cycle clock screenshot?",
    answer:
      "Yes, you are welcome to share screenshots of the BitcoinCycle Clock dashboard on social media, blogs, or educational content. We only ask that you include a link back to cycle.vibed-lab.com so others can explore the live dashboard themselves. Please do not crop out the site name or present the data as your own proprietary analysis.",
  },
  {
    question: "Why does the cycle clock show \"approximate\" values?",
    answer:
      "Cycle positioning is inherently imprecise. On-chain data can lag, exchange prices vary slightly across platforms, and the indicators themselves are backward-looking by design. Labeling values as approximate is an honest acknowledgment that no model can pinpoint an exact cycle position with certainty. The clock is best understood as a directional guide, not a precision instrument.",
  },
  {
    question: "What happens when Bitcoin doesn’t follow the cycle?",
    answer:
      "Bitcoin is not obligated to repeat past patterns. Structural changes — such as spot ETF approvals, sovereign adoption, or major regulatory shifts — could compress, elongate, or fundamentally alter future cycles. If the historical pattern breaks, the clock’s indicators will reflect the new data, but their positioning relative to past norms may become less meaningful. This is precisely why we advise against using the clock as a sole decision-making tool.",
  },
  {
    question: "What is the Fear and Greed Index?",
    answer:
      "The Fear and Greed Index is a composite sentiment indicator ranging from 0 (extreme fear) to 100 (extreme greed). It aggregates market momentum, social media activity, volatility, exchange flows, and other signals. Extreme fear readings have historically aligned with accumulation opportunities near cycle bottoms, while extreme greed readings have coincided with cycle tops. Read our detailed guide in the Learn section.",
  },
  {
    question: "What is the Bitcoin Rainbow Chart?",
    answer:
      "The Bitcoin Rainbow Chart uses logarithmic regression to overlay colored bands on Bitcoin's historical price chart. Each band represents a different standard deviation from the long-term growth trend — from dark blue (extremely undervalued) through green (fair value) to dark red (extremely overvalued). It provides a quick visual reference for long-term valuation but should be used alongside cycle indicators, not in isolation.",
  },
  {
    question: "Should I use on-chain analysis or technical analysis?",
    answer:
      "Both approaches have strengths. Technical analysis (charts, patterns, moving averages) is faster and better for short-term trading decisions. On-chain analysis (blockchain data, wallet movements, exchange flows) is more authentic and better for long-term positioning. BitcoinCycle Clock integrates both approaches. Check our Learn section article comparing the two methods.",
  },
  {
    question: "Who built BitcoinCycle Clock?",
    answer:
      "BitcoinCycle Clock was built by Jay, a Bitcoin investor since 2017 who has lived through two full market cycles. The project is part of Vibed Lab, a suite of investor-focused tools. Jay’s motivation was to create the simple, at-a-glance cycle dashboard he wished he had during the 2017 bull run — one that replaces information overload with a single, intuitive reading.",
  },
  {
    question: "What is Bitcoin dominance and why does it matter?",
    answer:
      "Bitcoin dominance is the percentage of the total cryptocurrency market cap that belongs to Bitcoin. During early bull markets, dominance typically rises as BTC leads price appreciation. Later in the cycle, dominance falls as investors rotate profits into altcoins. This rotation — often called alt season — historically signals a maturing bull market and approaching cycle top. Tracking dominance trends alongside on-chain indicators gives a more complete picture of where the cycle stands.",
  },
  {
    question: "What is alt season and how do I recognize it?",
    answer:
      "Alt season is a period when smaller cryptocurrencies dramatically outperform Bitcoin, often rising 3-10x while Bitcoin consolidates. It typically occurs in the later stages of a bull market when Bitcoin dominance drops from its highs. Classic signs include: Bitcoin dominance falling below 40-45%, retail excitement about obscure coins, parabolic moves across mid and small-cap tokens, and euphoric sentiment in the Fear and Greed Index. Alt seasons have historically preceded major market corrections.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cycle.vibed-lab.com" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://cycle.vibed-lab.com/faq" },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article
        className="max-w-2xl mx-auto px-4 py-12"
        style={{ color: "var(--ink)" }}
      >
        <h1
          className="text-3xl mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Frequently Asked Questions
        </h1>
        <p className="mb-10" style={{ color: "var(--ink-muted)" }}>
          Everything you need to know about BitcoinCycle Clock, the indicators it
          uses, and how to interpret the dashboard.
        </p>

        <div
          className="rounded-lg border overflow-hidden"
          style={{ borderColor: "var(--border)", background: "var(--cream)" }}
        >
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group"
              style={{
                borderBottom:
                  index < faqs.length - 1
                    ? "1px solid var(--border)"
                    : "none",
              }}
            >
              <summary
                className="cursor-pointer select-none px-6 py-5 text-base font-medium list-none flex items-center justify-between gap-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span>{faq.question}</span>
                <span
                  className="shrink-0 text-sm transition-transform group-open:rotate-45"
                  style={{ color: "var(--cycle-accent)" }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div
                className="px-6 pb-5 text-sm leading-relaxed"
                style={{ color: "var(--ink-muted)" }}
              >
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <p
          className="mt-10 text-sm leading-relaxed"
          style={{ color: "var(--ink-muted)" }}
        >
          <em>
            Have a question not covered here? Reach out at{" "}
            <a
              href="mailto:jay@vibed-lab.com"
              style={{ color: "var(--cycle-accent)" }}
            >
              jay@vibed-lab.com
            </a>{" "}
            and we will add it to this page.
          </em>
        </p>
      </article>
    </>
  );
}
