export default function ArticleJsonLd({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  const base = "https://cycle.vibed-lab.com";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: "Jay",
      description: "Bitcoin investor since 2017, survived 2 complete market cycles",
      url: `${base}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "BitcoinCycle Clock",
      url: base,
    },
    url: `${base}/learn/${slug}`,
    datePublished: "2026-03-07",
    dateModified: "2026-03-07",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/learn/${slug}`,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "BitcoinCycle Clock",
      url: base,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: `${base}/learn`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${base}/learn/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
