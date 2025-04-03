import type { Metadata } from "next";
import "./globals.css";
import { DEV_NAME } from "@/lib/constants";
import { Inter } from "next/font/google";
import { ThemesProvider } from "@/components/theme-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${DEV_NAME}`,
  description: "My Developer Portfolio",
};

export default function RootLayout({children} : { children: React.ReactNode}) {
    return(
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning>
                <ThemesProvider attribute="class" defaultTheme="system" enableSystem>
                    <div className="flex flex-col min-h-screen">
                        <SiteHeader />
                        {children}
                        <SiteFooter />
                    </div>
                </ThemesProvider>
            </body>
        </html>
    )
}