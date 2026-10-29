import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";

import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { photos } from "@/lib/photos";
import { JsonLd, localBusinessJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Equinox Tinting | Window Tint & Ceramic Coating in Port St. Lucie, FL",
    template: "%s | Equinox Tinting — Port St. Lucie, FL",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "window tint Port St. Lucie",
    "car window tinting PSL",
    "ceramic window tint",
    "ceramic coating Port St. Lucie",
    "auto tint Port St. Lucie FL",
    "residential window film",
    "commercial window film",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: "Equinox Tinting | Window Tint & Ceramic Coating in Port St. Lucie",
    description: site.description,
    images: [
      {
        url: photos.corvetteC7Black.src.src,
        width: photos.corvetteC7Black.src.width,
        height: photos.corvetteC7Black.src.height,
        alt: photos.corvetteC7Black.alt,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#060708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-teal px-4 py-3 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <JsonLd data={localBusinessJsonLd()} />
        <Providers>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileCtaBar />
        </Providers>
      </body>
    </html>
  );
}
