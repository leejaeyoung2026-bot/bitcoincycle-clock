import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Educational articles about Bitcoin halving cycles, on-chain indicators, and market analysis.",
};

const articles = [
  {
    slug: "understanding-bitcoin-cycle",
    title: "Understanding Bitcoin's 4-Year Cycle",
    description:
      "How Bitcoin halvings create predictable market cycles and what indicators reveal about each phase.",
    readTime: "5 min read",
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Learn
      </h1>
      <p className="mb-8" style={{ color: "var(--ink-muted)" }}>
        Educational articles about Bitcoin market cycles and on-chain analysis.
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
    </div>
  );
}
