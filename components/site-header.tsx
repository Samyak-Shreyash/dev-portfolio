"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

export const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];
  
  export const adminPages = [
    { name: "Dashboard", href: "/admin" },
    { name: "About", href: "/admin/me" },
    { name: "Projects", href: "/admin/projects" },
    { name: "Blogs", href: "/admin/blogs" },
    { name: "Contact", href: "/admin/contact" }
  ];
  

export default function SiteHeader() {
    return(
        <header className="sticky top-0 z-50 w-full px-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="font-bold text-xl">
                    Samyak <span className="text-primary">Shreyash</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    {pages.map((item) => (
                        <Link key={item.name}
                        href={item.href}
                        className="text-lg font-semibold transition-colors hover:text-primary"
                        >
                            {item.name}
                            </Link>
                    ))}
                </nav>
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
                    <nav className="flex flex-col gap-4 mt-8">
                        {pages.map((item) =>(
                            <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg font-semibold transition-colors hover:text-primary"
                          >
                            {item.name}
                          </Link>
                        ))}
                    </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}


export function AdminHeader() {
    return(
        <header className="sticky top-0 z-50 w-full px-8 border-b bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="font-bold text-xl">
                    Samyak <span className="text-primary">Shreyash</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    {adminPages.map((item) => (
                        <Link key={item.name}
                        href={item.href}
                        className="text-lg font-semibold transition-colors hover:text-primary"
                        >
                            {item.name}
                            </Link>
                    ))}
                </nav>
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
                    <nav className="flex flex-col gap-4 mt-8">
                        {adminPages.map((item) =>(
                            <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg font-semibold transition-colors hover:text-primary"
                          >
                            {item.name}
                          </Link>
                        ))}
                    </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}