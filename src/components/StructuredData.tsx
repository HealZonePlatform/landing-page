export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Horizon Skincare AI",
    url: "https://horizonskincare.online/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://horizonskincare.online/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Horizon Skincare",
    url: "https://horizonskincare.online/",
    logo: "https://horizonskincare.online/android-chrome-192x192.png",
    sameAs: []
  };

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}