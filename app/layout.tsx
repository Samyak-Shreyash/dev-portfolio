import type { Metadata } from "next";
import "./globals.css";
import { siteMetaData } from "@/lib/constants";
import { Inter } from "next/font/google";
import { ThemesProvider } from "@/components/theme-provider"
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
        noimageindex: true,
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

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
              <HeaderWrapper />
              {children}
              <SiteFooter />
            </div>
          </ThemesProvider>
          <SpeedInsights />
        </body>
      </html>
    )
  }
