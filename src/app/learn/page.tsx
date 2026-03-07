import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Educational articles about Bitcoin halving cycles, on-chain indicators, and market analysis. Written by Jay, Bitcoin investor since 2017.",
};

const articles = [
  {
    slug: "understanding-bitcoin-cycle",
    title: "Understanding Bitcoin's 4-Year Cycle",
    description:
      "How Bitcoin halvings create predictable market cycles and what indicators reveal about each phase.",
    readTime: "5 min read",
  },
  {
    slug: "mvrv-z-score-explained",
    title: "MVRV Z-Score Explained: The Most Reliable Bitcoin Cycle Indicator",
    description:
      "What market cap vs realized cap means, how the Z-Score works, and why it has called every major top and bottom.",
    readTime: "5 min read",
  },
  {
    slug: "pi-cycle-top-indicator",
    title: "Pi Cycle Top Indicator: How Two Moving Averages Called Every Bitcoin Peak",
    description:
      "The math behind the 111-day and 350-day moving averages, why their ratio approximates pi, and historical accuracy.",
    readTime: "4 min read",
  },
  {
    slug: "bitcoin-halving-history",
    title: "Bitcoin Halving History: What Happened After Each Supply Cut",
    description:
      "Detailed timeline of all four halvings, price performance after each event, and the diminishing returns pattern.",
    readTime: "6 min read",
  },
  {
    slug: "puell-multiple-guide",
    title: "Puell Multiple: Reading Miner Stress to Time the Bitcoin Market",
    description:
      "How daily miner issuance value signals cycle extremes, and why halvings mechanically reset this indicator.",
    readTime: "4 min read",
  },
  {
    slug: "stock-to-flow-model",
    title: "Stock-to-Flow Model: Can Bitcoin's Scarcity Predict Its Price?",
    description:
      "What the S2F model measures, why it works as a mental framework, and where it falls short as a trading tool.",
    readTime: "5 min read",
  },
  {
    slug: "dollar-cost-averaging-bitcoin",
    title: "Dollar Cost Averaging Bitcoin: The Strategy That Beats Timing",
    description:
      "How DCA works, historical returns, cycle-aware strategies, and the emotional benefits of consistent investing.",
    readTime: "6 min read",
  },
  {
    slug: "bitcoin-fear-greed-index",
    title: "Fear and Greed Index: Reading the Market's Emotions",
    description:
      "How Bitcoin's Fear and Greed Index correlates with cycle phases and complements on-chain indicators.",
    readTime: "5 min read",
  },
  {
    slug: "bitcoin-rainbow-chart",
    title: "The Bitcoin Rainbow Chart: A Visual Guide to Long-Term Valuation",
    description:
      "Logarithmic regression bands, color meanings, and how the Rainbow Chart complements cycle analysis.",
    readTime: "5 min read",
  },
  {
    slug: "on-chain-vs-technical-analysis",
    title: "On-Chain vs Technical Analysis: Which One Should You Trust?",
    description:
      "Comparing on-chain and technical analysis, when each excels, and how BitcoinCycle Clock integrates both.",
    readTime: "6 min read",
  },
  {
    slug: "bitcoin-dominance-cycles",
    title: "Bitcoin Dominance Cycles: What BTC Market Share Tells You About the Cycle",
    description:
      "How Bitcoin dominance shifts across cycles, why altseason signals a maturing bull market, and using dominance as a timing tool.",
    readTime: "6 min read",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Bitcoin Cycle Learning Hub",
  description:
    "Educational articles about Bitcoin halving cycles, on-chain indicators, and market analysis.",
  url: "https://cycle.vibed-lab.com/learn",
  isPartOf: {
    "@type": "WebSite",
    name: "BitcoinCycle Clock",
    url: "https://cycle.vibed-lab.com",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: articles.length,
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://cycle.vibed-lab.com/learn/${a.slug}`,
      name: a.title,
    })),
  },
};

export default function LearnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Learn
      </h1>
      <p className="mb-8" style={{ color: "var(--ink-muted)" }}>
        Educational articles about Bitcoin market cycles and on-chain analysis.
        Written by Jay, a Bitcoin investor since 2017 who has survived two
        complete market cycles.
      </p>
      <div className="space-y-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/learn/${a.slug}`}
            className="block p-6 rounded-lg border transition-colors hover:border-current"
            style={{ borderColor: "var(--border)", background: "var(--cream)" }}
          >
            <h2
              className="text-lg font-medium mb-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {a.title}
            </h2>
            <p className="text-sm mb-2" style={{ color: "var(--ink-muted)" }}>
              {a.description}
            </p>
            <span
              className="text-xs font-mono"
              style={{ color: "var(--cycle-accent)" }}
            >
              {a.readTime}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
