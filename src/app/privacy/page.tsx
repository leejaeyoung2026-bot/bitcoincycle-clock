import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "BitcoinCycle Clock privacy policy — how we handle data, cookies, and analytics.",
};

export default function PrivacyPage() {
  return (
    <article
      className="max-w-2xl mx-auto px-4 py-12"
      style={{ color: "var(--ink)" }}
    >
      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Privacy Policy
      </h1>
      <p
        className="text-sm mb-10 font-mono"
        style={{ color: "var(--ink-muted)" }}
      >
        Last updated: March 2026
      </p>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          No Account Required
        </h2>
        <p className="leading-relaxed">
          BitcoinCycle Clock requires no account, registration, or login of
          any kind. You can use every feature on this site anonymously. We do
          not collect, store, or process any personally identifiable
          information on our servers.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Google Analytics (GA4)
        </h2>
        <p className="mb-4 leading-relaxed">
          We use Google Analytics 4 to understand aggregate, anonymous
          traffic patterns — for example, which pages are visited most often
          and how visitors generally navigate the site. Google Analytics does
          not reveal the identity of individual users.
        </p>
        <p className="leading-relaxed">
          Google Analytics sets its own cookies to track sessions and page
          views. This data is processed by Google under their{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cycle-accent)" }}
          >
            Privacy Policy
          </a>
          . You can opt out of Google Analytics tracking using the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cycle-accent)" }}
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Google AdSense
        </h2>
        <p className="mb-4 leading-relaxed">
          This site displays advertisements served by Google AdSense. Google
          AdSense may use cookies and web beacons to serve ads based on your
          prior visits to this and other websites. These cookies allow Google
          to compile information about where ads are shown and whether they
          are interacted with.
        </p>
        <p className="leading-relaxed">
          Google's use of advertising cookies is governed by their{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cycle-accent)" }}
          >
            Advertising Policies
          </a>
          . You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cycle-accent)" }}
          >
            Google's Ad Settings
          </a>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Local Storage
        </h2>
        <p className="mb-4 leading-relaxed">
          BitcoinCycle Clock uses your browser's <code>localStorage</code>{" "}
          for two purposes only, and both are entirely client-side:
        </p>
        <ul
          className="list-disc pl-6 space-y-2 leading-relaxed"
          style={{ color: "var(--ink)" }}
        >
          <li>
            <strong>Theme preference</strong> — whether you have selected
            light or dark mode. This setting is stored locally so the site
            remembers your preference between visits. It is never transmitted
            to any server.
          </li>
          <li>
            <strong>API response cache</strong> — on-chain indicator data
            fetched from external APIs is temporarily cached to reduce
            redundant network requests and improve load speed. This cache
            expires automatically after 5 minutes and is never shared with
            third parties.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed">
          You can clear this data at any time through your browser settings
          (Settings → Privacy → Clear browsing data → Cached images and files /
          Site data).
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Third-Party Data Sharing
        </h2>
        <p className="leading-relaxed">
          We do not sell, trade, or share any data with third parties beyond
          what is described above (Google Analytics and Google AdSense). No
          email lists, no marketing platforms, no data brokers.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Contact
        </h2>
        <p className="leading-relaxed">
          If you have any questions or concerns about this privacy policy,
          please reach out at{" "}
          <a
            href="mailto:jay@vibed-lab.com"
            style={{ color: "var(--cycle-accent)" }}
          >
            jay@vibed-lab.com
          </a>
          .
        </p>
      </section>
    </article>
  );
}
