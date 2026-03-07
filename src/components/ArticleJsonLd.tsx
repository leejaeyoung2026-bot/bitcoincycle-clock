export default function ArticleJsonLd({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: "Jay",
      description: "Bitcoin investor since 2017, survived 2 complete market cycles",
      url: "https://cycle.vibed-lab.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "BitcoinCycle Clock",
      url: "https://cycle.vibed-lab.com",
    },
    url: `https://cycle.vibed-lab.com/learn/${slug}`,
    datePublished: "2026-03-07",
    dateModified: "2026-03-07",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cycle.vibed-lab.com/learn/${slug}`,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "BitcoinCycle Clock",
      url: "https://cycle.vibed-lab.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
