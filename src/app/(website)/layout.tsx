import { Metadata } from "next";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ModernNavbar } from "@/components/modern-navbar";
import Footer from "@/components/footer";
import Script from "next/script";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { OrganizationSchema, WebsiteSchema } from "@/components/ui/schema-org";

export const metadata: Metadata = {
  title: "Tân Tiến Vinh - Máy Gia Công Nội Thất Chất Lượng Cao",
  description:
    "Cung cấp máy gia công nội thất chất lượng cao, máy gỗ, máy dán cạnh, máy khoan ngang, máy cưa bàn trượt",
  keywords:
    "máy cnc, máy gỗ, máy dán cạnh, máy khoan ngang, máy cưa bàn trượt, máy gia công nội thất, cnc việt nam",
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <ModernNavbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <PageViewTracker />
      <OrganizationSchema />
      <WebsiteSchema />

      {/* Analytics script - load after page content */}
      <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'MEASUREMENT_ID');
        `}
      </Script>
    </div>
  );
}
