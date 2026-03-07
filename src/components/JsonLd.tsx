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
    author: {
      "@type": "Person",
      name: "Jay",
      description: "Bitcoin investor since 2017",
      url: "https://cycle.vibed-lab.com/about",
    },
  };

  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BitcoinCycle Clock",
    url: "https://cycle.vibed-lab.com",
    description:
      "Visualize Bitcoin's 4-year halving cycle as an analog clock. Track MVRV Z-Score, Pi Cycle Top, Puell Multiple, and Stock-to-Flow deviation in real time.",
    browserRequirements: "Requires JavaScript",
    applicationCategory: "FinanceApplication",
    author: {
      "@type": "Person",
      name: "Jay",
      url: "https://cycle.vibed-lab.com/about",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vibed Lab",
    url: "https://vibed-lab.com",
    sameAs: [
      "https://clearrx.vibed-lab.com",
      "https://backtest.vibed-lab.com",
      "https://cycle.vibed-lab.com",
    ],
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Vibed Lab",
        item: "https://vibed-lab.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "BitcoinCycle Clock",
        item: "https://cycle.vibed-lab.com",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </>
  );
}
