import type { Metadata } from "next";
import "./globals.css";
import { siteMetaData } from "@/lib/constants";
import { Inter } from "next/font/google";
import { ThemesProvider } from "@/components/theme-provider";
import { SiteHeader, AdminHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getCurrentUser } from "@/lib/auth";

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
export default async function RootLayout({children} : { children: React.ReactNode}) {
  const currentUser = await getCurrentUser();
    return(
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning>
                <ThemesProvider attribute="class" defaultTheme="system" enableSystem>
                    <div className="flex flex-col min-h-screen">
                            { (!currentUser) ? <SiteHeader /> :<AdminHeader /> }
                        {children}
                        <SiteFooter />
                    </div>
                </ThemesProvider>
                <SpeedInsights />
            </body>
        </html>
    )
}