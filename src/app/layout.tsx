import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationStructuredData } from "@/components/structured-data";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Tân Tiến Vinh - Máy Gia Công Nội Thất Chất Lượng Cao",
  description:
    "Cung cấp máy gia công nội thất chất lượng cao, máy gỗ, máy dán cạnh, máy khoan ngang, máy cưa bàn trượt",
  keywords:
    "máy cnc, máy gỗ, máy dán cạnh, máy khoan ngang, máy cưa bàn trượt, máy gia công nội thất, cnc việt nam",
  authors: [{ name: "Tân Tiến Vinh" }],
  creator: "Tân Tiến Vinh",
  publisher: "Tân Tiến Vinh",
  metadataBase: new URL("https://tantienvinh.com"),
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://tantienvinh.com",
    title: "Tân Tiến Vinh - Máy Gia Công Nội Thất Chất Lượng Cao",
    description:
      "Cung cấp máy gia công nội thất chất lượng cao, máy gỗ, máy dán cạnh, máy khoan ngang, máy cưa bàn trượt",
    siteName: "Tân Tiến Vinh",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Tân Tiến Vinh - Máy Gia Công Nội Thất",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tân Tiến Vinh - Máy Gia Công Nội Thất Chất Lượng Cao",
    description:
      "Cung cấp máy gia công nội thất chất lượng cao, máy gỗ, máy dán cạnh, máy khoan ngang, máy cưa bàn trượt",
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <OrganizationStructuredData />
          {children}
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  );
}
