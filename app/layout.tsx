import type { Metadata } from "next";
import './globals.css';
import { siteMetaData } from "@/lib/constants";
import { Inter } from "next/font/google";
import { ThemesProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import SiteFooter from "@/components/ui/site-footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import HeaderWrapper from "@/components/header-wrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata= {
    metadataBase: new URL(siteMetaData.siteUrl),
    title: {
      template: `%s | ${siteMetaData.title}`,
      default: siteMetaData.title, // a default is required when creating a template
    },
    description: siteMetaData.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: siteMetaData.title,
      description: siteMetaData.description,
      url: siteMetaData.siteUrl,
      siteName: siteMetaData.title,
      images: [siteMetaData.socialBanner],
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: siteMetaData.title,
      images: [siteMetaData.socialBanner],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteMetaData.title,
    "url": siteMetaData.siteUrl,
    "description": siteMetaData.description,
    "inLanguage": siteMetaData.language,
    "author": { "@type": "Person", "name": siteMetaData.author },
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Tech stack SVGs load straight from this origin (next/image doesn't proxy SVGs) */}
          <link rel="preconnect" href="https://icon.icepanel.io" />
        </head>
        <body className={inter.className}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <ThemesProvider attribute="class" enableSystem disableTransitionOnChange>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-md focus:outline-2 focus:outline-primary"
            >
              Skip to main content
            </a>
            <div className="relative flex min-h-screen flex-col">
              <HeaderWrapper />
              {/* The single <main> landmark for every page; pages render plain containers inside it */}
              <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
                {children}
              </main>
              <SiteFooter />
            </div>
            <Toaster />
          </ThemesProvider>
          <SpeedInsights />
        </body>
      </html>
    )
  }
