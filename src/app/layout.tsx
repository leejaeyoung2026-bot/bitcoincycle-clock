import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F1EB" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1815" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cycle.vibed-lab.com"),
  title: {
    default: "BitcoinCycle Clock — Where Are We in the Bitcoin Cycle?",
    template: "%s | BitcoinCycle Clock",
  },
  description:
    "Real-time Bitcoin market cycle dashboard. See where BTC sits in the 4-year halving cycle with MVRV, Pi Cycle, Puell Multiple, and S2F indicators.",
  keywords: [
    "bitcoin cycle",
    "bitcoin halving",
    "btc cycle clock",
    "mvrv z-score",
    "pi cycle top",
    "bitcoin indicator",
    "crypto cycle",
  ],
  authors: [{ name: "Jay", url: "https://cycle.vibed-lab.com/about" }],
  creator: "Jay",
  publisher: "BitcoinCycle Clock",
  openGraph: {
    title: "BitcoinCycle Clock — Where Are We in the Bitcoin Cycle?",
    description:
      "Real-time Bitcoin market cycle dashboard with MVRV, Pi Cycle, Puell Multiple, and S2F indicators.",
    type: "website",
    siteName: "BitcoinCycle Clock",
    locale: "en_US",
    url: "https://cycle.vibed-lab.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitcoinCycle Clock — Where Are We in the Bitcoin Cycle?",
    description:
      "Real-time Bitcoin market cycle dashboard with MVRV, Pi Cycle, Puell Multiple, and S2F indicators.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6WTB59J1FT" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6WTB59J1FT');
            `,
          }}
        />
        {/* AdSense */}
        <meta name="google-adsense-account" content="ca-pub-6874320463657568" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6874320463657568"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
