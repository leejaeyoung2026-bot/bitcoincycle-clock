export default function JsonLd() {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BitcoinCycle Clock",
    description:
      "Real-time Bitcoin market cycle positioning tool with MVRV, Pi Cycle, Puell Multiple, and S2F indicators.",
    url: "https://cycle.vibed-lab.com",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Jay", url: "https://vibed-lab.com" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
    />
  );
}
