import type { Metadata, Viewport } from "next";
import { Public_Sans, Schibsted_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { SITE } from "@/content/site";
import { SITE_URL } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const display = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-title", display: "swap" });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-text", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { siteName: SITE.name, locale: SITE.locale, type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c161b" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7f6" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.lang} className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-[100dvh] flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
