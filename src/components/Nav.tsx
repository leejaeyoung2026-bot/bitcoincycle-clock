"use client";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Nav() {
  const { theme, toggle } = useTheme();
  return (
    <header className="nav-header px-4 py-3 flex items-center justify-between">
      <Link
        href="/"
        className="nav-logo"
        style={{ textDecoration: "none" }}
      >
        BitcoinCycle Clock
      </Link>
      <nav
        className="flex items-center gap-5 text-sm"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {[
          { href: "/learn", label: "Learn" },
          { href: "/faq", label: "FAQ" },
          { href: "/about", label: "About" },
          { href: "/glossary", label: "Glossary" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="opacity-50 hover:opacity-100 transition-opacity"
            style={{
              fontSize: "0.82rem",
              letterSpacing: "0.01em",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}

        <button
          onClick={toggle}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          title={theme === "light" ? "Dark mode" : "Light mode"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "var(--bg-inset)",
            color: "var(--ink-muted)",
            cursor: "pointer",
            fontSize: "0.8rem",
            flexShrink: 0,
          }}
          className="hover:border-[var(--border-strong)] hover:text-[var(--accent)] transition-colors"
        >
          {theme === "light" ? "\u25D1" : "\u25CF"}
        </button>
      </nav>
    </header>
  );
}
