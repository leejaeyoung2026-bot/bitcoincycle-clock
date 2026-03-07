import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cycle.vibed-lab.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/learn/understanding-bitcoin-cycle`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/mvrv-z-score-explained`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/pi-cycle-top-indicator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/bitcoin-halving-history`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/puell-multiple-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/stock-to-flow-model`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/dollar-cost-averaging-bitcoin`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/bitcoin-fear-greed-index`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/bitcoin-rainbow-chart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/on-chain-vs-technical-analysis`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
