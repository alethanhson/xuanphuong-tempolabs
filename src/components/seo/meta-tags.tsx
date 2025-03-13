import Head from "next/head";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export function MetaTags({
  title,
  description,
  keywords,
  ogImage = "https://tantienvinh.com/og-image.jpg",
  ogType = "website",
  canonicalUrl,
}: MetaTagsProps) {
  const fullTitle = `${title} | Tân Tiến Vinh`;
  const fullCanonicalUrl = canonicalUrl
    ? `https://tantienvinh.com${canonicalUrl}`
    : undefined;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical Link */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta
        property="og:url"
        content={fullCanonicalUrl || "https://tantienvinh.com"}
      />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={fullCanonicalUrl || "https://tantienvinh.com"}
      />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  );
}
