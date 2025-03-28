import type { Metadata } from "next";
import "./globals.css";
import { DEV_NAME } from "@/utils/constants";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/components/theme-provider";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${DEV_NAME}`,
  description: "My Devekloper Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          </ThemeProvider>
      </body>
    </html>
  );
}
