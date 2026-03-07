import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jay, the creator of BitcoinCycle Clock, for feedback, bug reports, or partnership inquiries.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact BitcoinCycle Clock",
  url: "https://cycle.vibed-lab.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "BitcoinCycle Clock",
    url: "https://cycle.vibed-lab.com",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@vibed-lab.com",
      contactType: "customer support",
      availableLanguage: "English",
    },
  },
};

export default function ContactPage() {
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
        className="text-3xl mb-4"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Contact
      </h1>
      <p
        className="mb-10 leading-relaxed"
        style={{ color: "var(--ink-muted)" }}
      >
        This is a personal project by Jay. Response times may vary, but I
        read everything and appreciate every message.
      </p>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Get in Touch
        </h2>
        <p className="mb-4 leading-relaxed">
          For feedback, bug reports, or partnership inquiries, the best way
          to reach me is by email:
        </p>
        <a
          href="mailto:contact@vibed-lab.com"
          className="inline-block font-mono text-base px-4 py-3 rounded-lg border transition-colors"
          style={{
            color: "var(--cycle-accent)",
            borderColor: "var(--border)",
            background: "var(--bg-elevated)",
          }}
        >
          contact@vibed-lab.com
        </a>

        <div className="mt-4 flex gap-4">
          <a href="https://x.com/vibed_lab" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cycle-accent)", fontSize: "0.9rem" }}>X @vibed_lab</a>
          <a href="https://www.linkedin.com/in/jae-young-lee-8516303b5/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cycle-accent)", fontSize: "0.9rem" }}>LinkedIn</a>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm" style={{ color: "var(--ink-muted)" }}>
            What I would love to hear about:
          </p>
          <ul
            className="list-disc pl-6 space-y-1 text-sm leading-relaxed"
            style={{ color: "var(--ink-muted)" }}
          >
            <li>Incorrect or stale indicator data</li>
            <li>UI issues or broken features</li>
            <li>Suggestions for new on-chain indicators</li>
            <li>Partnership or collaboration proposals</li>
            <li>General feedback on the site experience</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          GitHub
        </h2>
        <p className="mb-4 leading-relaxed">
          BitcoinCycle Clock is an open project. If you find a bug or want to
          contribute, feel free to open an issue or pull request on GitHub:
        </p>
        <a
          href="https://github.com/leejaeyoung2026-bot/bitcoincycle-clock"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-sm px-4 py-3 rounded-lg border transition-colors"
          style={{
            color: "var(--ink-muted)",
            borderColor: "var(--border)",
            background: "var(--bg-elevated)",
          }}
        >
          github.com/leejaeyoung2026-bot/bitcoincycle-clock
        </a>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Related Tool
        </h2>
        <div
          className="p-4 rounded-lg border"
          style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
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
      </section>

    </article>
  );
}
