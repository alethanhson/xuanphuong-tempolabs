import { Organization, WebSite, WithContext, BreadcrumbList } from "schema-dts";

export function OrganizationSchema() {
  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tân Tiến Vinh",
    url: "https://tantienvinh.com",
    logo: "https://tantienvinh.com/logo.png",
    sameAs: [
      "https://facebook.com/tantienvinh",
      "https://youtube.com/tantienvinh",
      "https://linkedin.com/company/tantienvinh",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84355197235",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Đường Công Nghiệp",
      addressLocality: "Quận 9",
      addressRegion: "TP. Hồ Chí Minh",
      postalCode: "700000",
      addressCountry: "VN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tân Tiến Vinh",
    url: "https://tantienvinh.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tantienvinh.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: {
    name: string;
    item: string;
  }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
