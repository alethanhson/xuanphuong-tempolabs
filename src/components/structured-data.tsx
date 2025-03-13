import { Product, WithContext } from "schema-dts";

interface ProductStructuredDataProps {
  product: {
    name: string;
    description: string;
    image: string[];
    price?: number | null;
    category?: string;
    sku?: string;
    brand?: string;
    url: string;
  };
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const structuredData: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    ...(product.sku && { sku: product.sku }),
    ...(product.brand && {
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
    }),
    ...(product.price && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "VND",
        availability: "https://schema.org/InStock",
        url: product.url,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BlogPostStructuredDataProps {
  post: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    authorName: string;
    url: string;
  };
}

export function BlogPostStructuredData({ post }: BlogPostStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Tân Tiến Vinh",
      logo: {
        "@type": "ImageObject",
        url: "https://tantienvinh.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tân Tiến Vinh",
    url: "https://tantienvinh.com",
    logo: "https://tantienvinh.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "035.519.7235",
      contactType: "customer service",
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
    sameAs: [
      "https://facebook.com/tantienvinh",
      "https://youtube.com/tantienvinh",
      "https://linkedin.com/company/tantienvinh",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
