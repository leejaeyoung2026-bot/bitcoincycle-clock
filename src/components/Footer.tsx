import Link from "next/link";
import VibedLabLogo from "./VibedLabLogo";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "32px 24px 28px",
        marginTop: "0",
      }}
    >
      <div
        style={{
          maxWidth: "896px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Top row */}
        <div
          className="flex flex-col items-center text-center gap-4 sm:flex-row sm:justify-between sm:text-left"
        >
          {/* Brand */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              BitcoinCycle Clock
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.72rem",
                color: "var(--ink-muted)",
                marginTop: "2px",
                letterSpacing: "0.02em",
              }}
            >
              cycle.vibed-lab.com
            </span>
          </div>

          {/* Nav links */}
          <nav
            className="flex flex-wrap justify-center gap-5"
          >
            {[
              { href: "/about", label: "About" },
              { href: "/faq", label: "FAQ" },
              { href: "/privacy", label: "Privacy" },
              { href: "/contact", label: "Contact" },
              { href: "/learn", label: "Learn" },
              { href: "/glossary", label: "Glossary" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="opacity-50 hover:opacity-100 transition-opacity"
                style={{
                  fontSize: "0.78rem",
                  color: "var(--ink-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border-subtle)" }} />

        {/* Bottom row */}
        <div
          className="flex flex-col items-center text-center gap-3 sm:flex-row sm:justify-between"
        >
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--ink-disabled)",
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            &copy; 2026 BitcoinCycle Clock &mdash; Built by Jay, Bitcoin investor since 2017.
            Not financial advice.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.coingecko.com/en/api"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-40 hover:opacity-80 transition-opacity"
              style={{
                fontSize: "0.72rem",
                color: "var(--ink-disabled)",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              Powered by CoinGecko API
            </a>

            <a
              href="https://vibed-lab.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vibed Lab"
              className="opacity-35 hover:opacity-70 transition-opacity"
            >
              <VibedLabLogo height={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
