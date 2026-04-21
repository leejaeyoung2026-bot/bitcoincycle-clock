"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/glossary", label: "Glossary" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close drawer on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header className="nav-header px-4" style={{ minHeight: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {/* Logo — whitespace-nowrap keeps it on a single line at all widths */}
      <Link
        href="/"
        className="nav-logo"
        style={{ textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
      >
        BitcoinCycle Clock
      </Link>

      {/* Desktop nav — hidden below md */}
      <nav
        className="hidden md:flex items-center gap-5 text-sm"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {NAV_LINKS.map(({ href, label }) => (
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
            width: "44px",
            height: "44px",
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

      {/* Mobile controls — visible below md */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={toggle}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          title={theme === "light" ? "Dark mode" : "Light mode"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "var(--bg-inset)",
            color: "var(--ink-muted)",
            cursor: "pointer",
            fontSize: "0.8rem",
            flexShrink: 0,
          }}
        >
          {theme === "light" ? "\u25D1" : "\u25CF"}
        </button>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            width: "44px",
            height: "44px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: "var(--bg-inset)",
            color: "var(--ink-muted)",
            cursor: "pointer",
            padding: "0",
            flexShrink: 0,
          }}
        >
          {menuOpen ? (
            /* X icon when open */
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: 0,
            right: 0,
            background: "var(--bg-elevated)",
            borderBottom: "1px solid var(--border-subtle)",
            zIndex: 99,
            padding: "8px 16px 16px",
          }}
          className="flex flex-col md:hidden"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              style={{
                display: "block",
                padding: "12px 4px",
                fontSize: "0.95rem",
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border-subtle)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
