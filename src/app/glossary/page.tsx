import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitcoin Cycle Glossary",
  description:
    "Plain-English definitions of Bitcoin market cycle terms — halving, MVRV Z-Score, Puell Multiple, accumulation, distribution, and more.",
};

interface GlossaryTerm {
  term: string;
  definition: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Accumulation Phase",
    definition:
      "The early stage of a Bitcoin market cycle where prices are low and trading sideways after a prolonged bear market. During this phase, long-term investors quietly build positions while public sentiment remains pessimistic. Historically, accumulation phases have offered the best risk-to-reward entry points for patient buyers.",
  },
  {
    term: "All-Time High (ATH)",
    definition:
      "The highest price that Bitcoin has ever reached on any exchange. Each cycle has produced a new ATH that surpassed the previous one by a large margin. Breaking past a prior ATH often triggers intense media attention and a wave of new retail interest.",
  },
  {
    term: "Bear Market",
    definition:
      "A prolonged period of declining prices, typically defined as a drop of 50% or more from the cycle\u2019s all-time high. Bitcoin bear markets have historically lasted 12 to 18 months and are characterized by capitulation selling, negative news cycles, and widespread disillusionment.",
  },
  {
    term: "Bitcoin Dominance",
    definition:
      "The percentage of the total cryptocurrency market capitalization that belongs to Bitcoin. When dominance rises, it usually means capital is flowing into Bitcoin and away from altcoins. Declining dominance can signal an \u201Calt season\u201D where smaller tokens outperform BTC.",
  },
  {
    term: "Block Reward",
    definition:
      "The number of new bitcoins awarded to a miner for successfully adding a block of transactions to the blockchain. The block reward started at 50 BTC in 2009 and is cut in half roughly every four years at each halving event. As of the 2024 halving, the reward is 3.125 BTC per block.",
  },
  {
    term: "Blow-off Top",
    definition:
      "A dramatic, near-vertical price surge that typically occurs at the end of a bull market. It is driven by extreme euphoria, heavy leverage, and fear of missing out (FOMO). Blow-off tops are often followed by sharp reversals and mark the beginning of the distribution phase.",
  },
  {
    term: "Bull Market",
    definition:
      "A sustained period of rising Bitcoin prices, usually spanning 12 to 18 months within the four-year cycle. Bull markets are fueled by growing adoption, positive sentiment, and reduced new supply after a halving. They tend to accelerate toward the end before reaching a cycle peak.",
  },
  {
    term: "Capitulation",
    definition:
      "The moment when exhausted holders give up and sell their remaining Bitcoin at a loss, often near the very bottom of a bear market. Capitulation events are marked by extremely high volume and a sudden price drop, and they historically signal that the worst of the downturn is nearly over.",
  },
  {
    term: "Coin Days Destroyed",
    definition:
      "A metric that measures the movement of long-dormant coins. When a bitcoin that has not moved in 100 days is finally spent, it \u201Cdestroys\u201D 100 coin days. Spikes in coin days destroyed suggest that old holders are selling, which can indicate distribution near cycle tops.",
  },
  {
    term: "Cycle Length",
    definition:
      "The approximate duration of one full Bitcoin market cycle, measured from one halving to the next \u2014 roughly 1,460 days or four years. Each cycle contains an accumulation phase, a markup (bull) phase, a blow-off top, and a distribution (bear) phase.",
  },
  {
    term: "DCA (Dollar Cost Averaging)",
    definition:
      "An investment strategy where you buy a fixed dollar amount of Bitcoin at regular intervals regardless of price. DCA removes the stress of trying to time the market and has historically outperformed lump-sum buying for most retail investors across full cycles.",
  },
  {
    term: "Distribution Phase",
    definition:
      "The late stage of a bull market where experienced investors gradually sell into strength while new buyers enter the market at elevated prices. Distribution often coincides with peak media hype and extreme greed readings, and it sets the stage for the subsequent bear market.",
  },
  {
    term: "Fear and Greed Index",
    definition:
      "A composite sentiment indicator that ranges from 0 (extreme fear) to 100 (extreme greed). It aggregates signals like volatility, volume, social media mentions, and surveys. Readings above 80 have historically aligned with cycle tops, while readings below 20 tend to appear near cycle bottoms.",
  },
  {
    term: "Halving",
    definition:
      "A programmatic event that cuts the Bitcoin block reward in half approximately every four years (every 210,000 blocks). By reducing the rate of new supply, halvings create supply shocks that have historically preceded major bull runs. The most recent halving occurred in April 2024.",
  },
  {
    term: "Hash Rate",
    definition:
      "The total computational power being used to mine Bitcoin and secure the network, measured in hashes per second. A rising hash rate indicates growing miner investment and network security. Sharp drops in hash rate can signal miner capitulation during bear markets.",
  },
  {
    term: "HODLer",
    definition:
      "A long-term Bitcoin holder who keeps their coins through both bull and bear markets, regardless of price volatility. The term originated from a misspelling of \u201Chold\u201D in a 2013 Bitcoin forum post. On-chain data tracks HODLer behavior to assess supply availability and cycle positioning.",
  },
  {
    term: "Liquidity",
    definition:
      "The ease with which Bitcoin can be bought or sold without significantly affecting its price. High liquidity means large orders can be executed smoothly, while low liquidity can lead to sudden price swings. Market-wide liquidity conditions, including central bank policy, significantly influence cycle dynamics.",
  },
  {
    term: "Market Cap",
    definition:
      "The total dollar value of all existing bitcoins, calculated by multiplying the current price by the circulating supply. Market cap provides a broad measure of Bitcoin\u2019s size relative to other assets. It does not account for lost or inaccessible coins, which is why metrics like realized cap exist.",
  },
  {
    term: "Markup Phase",
    definition:
      "The middle portion of a bull market where prices rise steadily and public interest begins to grow. Unlike the explosive blow-off top, the markup phase is characterized by healthy pullbacks and higher lows. It is generally considered the most comfortable phase for investors who entered during accumulation.",
  },
  {
    term: "Mining Difficulty",
    definition:
      "A measure of how hard it is to find a valid block hash, automatically adjusted by the Bitcoin network every 2,016 blocks (roughly two weeks). Difficulty rises when more miners join the network and falls when miners leave. It acts as a self-regulating mechanism that keeps block production at about one every 10 minutes.",
  },
  {
    term: "Moving Average (MA)",
    definition:
      "A smoothed line that averages Bitcoin\u2019s price over a specific number of days, filtering out short-term noise. Common moving averages used in cycle analysis include the 200-day MA (a long-term trend indicator) and the 111-day and 350-day MAs used in the Pi Cycle Top indicator.",
  },
  {
    term: "MVRV Z-Score",
    definition:
      "A ratio that compares Bitcoin\u2019s market value (current price times supply) to its realized value (the average price at which each coin last moved on-chain). When the Z-Score is high, the market is significantly overvalued relative to what holders actually paid; when it is low or negative, it suggests undervaluation. It is one of the most reliable on-chain cycle indicators.",
  },
  {
    term: "Logarithmic Regression",
    definition:
      "A statistical technique that fits a curve to Bitcoin's historical price data on a logarithmic scale. Because Bitcoin's percentage gains have diminished over time while remaining positive, logarithmic regression captures the long-term growth trend more accurately than linear models. The Bitcoin Rainbow Chart is built on this method.",
  },
  {
    term: "On-Chain Analysis",
    definition:
      "The practice of studying data recorded directly on the Bitcoin blockchain \u2014 such as transaction volumes, wallet balances, and coin movement patterns \u2014 to gauge market health and cycle positioning. Unlike traditional technical analysis, on-chain analysis uses verifiable, transparent data that cannot be fabricated.",
  },
  {
    term: "Pi Cycle Top",
    definition:
      "An indicator that uses the 111-day moving average and 350-day moving average (multiplied by 2) to identify cycle peaks. When the shorter average crosses above the longer one, it has historically signaled that Bitcoin is at or near its cycle top. The name comes from the mathematical relationship between the two periods.",
  },
  {
    term: "Puell Multiple",
    definition:
      "A metric that divides the daily USD value of newly mined bitcoins by its 365-day moving average. A high Puell Multiple means miners are earning significantly more than usual, which tends to coincide with cycle peaks. A low reading suggests miner revenue is depressed, often aligning with cycle bottoms.",
  },
  {
    term: "Rainbow Chart",
    definition:
      "A long-term Bitcoin valuation tool that overlays colored bands on a logarithmic price chart. Each band represents a different standard deviation from the historical growth trend — from dark blue (extremely undervalued) through green (fair value) to dark red (extremely overvalued). It provides a quick visual reference for where Bitcoin's current price sits relative to its historical range.",
  },
  {
    term: "Realized Cap",
    definition:
      "An alternative to market cap that values each bitcoin at the price it last moved on the blockchain, rather than at the current spot price. Realized cap represents the aggregate cost basis of all holders and strips out the influence of dormant or lost coins. It provides a more grounded view of capital invested in the network.",
  },
  {
    term: "Realized Price",
    definition:
      "The realized cap divided by the current circulating supply, giving the average on-chain cost basis per bitcoin. When the spot price is below the realized price, the average holder is sitting on an unrealized loss \u2014 a condition that has historically only occurred near the deepest bear market bottoms.",
  },
  {
    term: "RSI (Relative Strength Index)",
    definition:
      "A momentum oscillator that measures the speed and magnitude of recent price changes on a scale from 0 to 100. Readings above 70 suggest overbought conditions and readings below 30 suggest oversold conditions. In cycle analysis, monthly RSI reaching extreme levels has historically aligned with major cycle tops and bottoms.",
  },
  {
    term: "Stock-to-Flow (S2F)",
    definition:
      "A scarcity model that compares Bitcoin\u2019s existing supply (stock) to the rate of new production (flow). Higher stock-to-flow ratios imply greater scarcity and, according to the model, higher expected prices. Each halving doubles the S2F ratio, which the model uses to project price targets for each cycle.",
  },
  {
    term: "Technical Analysis",
    definition:
      "The study of price charts and volume patterns to predict future market movements. Unlike on-chain analysis, which uses blockchain data, technical analysis relies on historical price and volume data. Common tools include moving averages, support/resistance levels, RSI, and chart patterns. Most effective when combined with on-chain metrics for cycle positioning.",
  },
  {
    term: "Supply Shock",
    definition:
      "A sudden reduction in the amount of Bitcoin available for sale, often triggered by a halving or a wave of coins moving to long-term storage. When demand remains constant or grows while supply shrinks, the resulting imbalance puts strong upward pressure on price.",
  },
  {
    term: "UTXO",
    definition:
      "Stands for Unspent Transaction Output \u2014 the fundamental unit of Bitcoin ownership on the blockchain. Every bitcoin balance is actually a collection of UTXOs. Analysts study UTXO age distribution and profit/loss status to understand holder behavior and identify cycle phases.",
  },
  {
    term: "Bitcoin Dominance",
    definition:
      "The percentage of the total cryptocurrency market capitalization that belongs to Bitcoin. During Bitcoin's early bull market phases, dominance typically rises as BTC leads the charge. Later in the cycle, dominance often falls as investors rotate profits into altcoins, signaling the alt season. Watching dominance trends helps identify where the cycle is maturing.",
  },
  {
    term: "Altcoin Season",
    definition:
      "A period in the crypto market cycle when smaller cryptocurrencies (altcoins) significantly outperform Bitcoin. Typically occurs in the later stages of a bull market when Bitcoin dominance is falling. Historically, altcoin seasons have marked the final euphoric phase before major corrections.",
  },
  {
    term: "Bleed Phase",
    definition:
      "A prolonged period of slow, grinding price decline following a market top. Unlike a sharp crash, the bleed phase can last months as sentiment gradually deteriorates and latecomers sell into strength. This phase tests long-term holders and sets the stage for the next accumulation cycle.",
  },
  {
    term: "Network Value to Transactions (NVT)",
    definition:
      "An on-chain valuation metric that compares Bitcoin's market cap to the dollar volume of transactions settling on the network. Similar to the price-to-earnings ratio in equities, a high NVT suggests the network may be overvalued relative to its transaction utility. A sharp rise in NVT with stagnant on-chain volume can signal a speculative bubble.",
  },
];

/* Group terms alphabetically */
function groupByLetter(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  const groups: Record<string, GlossaryTerm[]> = {};
  for (const t of terms) {
    const letter = t.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(t);
  }
  return groups;
}

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cycle.vibed-lab.com" },
    { "@type": "ListItem", position: 2, name: "Glossary", item: "https://cycle.vibed-lab.com/glossary" },
  ],
};

export default function GlossaryPage() {
  const grouped = groupByLetter(glossaryTerms);
  const letters = Object.keys(grouped).sort();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Bitcoin Cycle Glossary",
    description:
      "Plain-English definitions of Bitcoin market cycle terms for retail investors.",
    url: "https://cycle.vibed-lab.com/glossary",
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Bitcoin Cycle Glossary
      </h1>
      <p className="mb-8 leading-relaxed" style={{ color: "var(--ink-muted)" }}>
        Plain-English definitions of 30 key terms used in Bitcoin market cycle
        analysis. Written for everyday investors, not quants.
      </p>

      {/* Jump-to-letter navigation */}
      <nav
        className="mb-10 p-4 rounded-lg border flex flex-wrap gap-2"
        style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
        aria-label="Jump to letter"
      >
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-8 h-8 flex items-center justify-center rounded text-sm font-mono font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--cycle-accent)" }}
          >
            {letter}
          </a>
        ))}
      </nav>

      {/* Glossary entries grouped by letter */}
      {letters.map((letter) => (
        <section key={letter} id={`letter-${letter}`} className="mb-10">
          <h2
            className="text-2xl mb-4 pb-2 border-b scroll-mt-20"
            style={{
              fontFamily: "var(--font-serif)",
              borderColor: "var(--border)",
            }}
          >
            {letter}
          </h2>
          <dl className="space-y-6">
            {grouped[letter].map((entry) => (
              <div
                key={entry.term}
                className="p-4 rounded-lg border"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-elevated)",
                }}
              >
                <dt
                  className="text-base font-medium mb-1"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {entry.term}
                </dt>
                <dd
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {entry.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      {/* Back to top */}
      <div className="text-center mt-12 mb-8">
        <a
          href="#"
          className="text-sm font-mono transition-colors hover:opacity-80"
          style={{ color: "var(--cycle-accent)" }}
        >
          Back to top
        </a>
      </div>

      {/* Disclaimer */}
      <p
        className="leading-relaxed text-sm"
        style={{ color: "var(--ink-muted)" }}
      >
        <em>
          This glossary is for educational and informational purposes only. It
          does not constitute financial or investment advice. Always do your own
          research before making any investment decision.
        </em>
      </p>
    </article>
  );
}
