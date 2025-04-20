"use client"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle"
import { DEV_RESUME } from "@/lib/constants"

const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

export function SiteHeader() {
  const pathname = usePathname()
    return(
        <header className="sticky top-0 z-50 w-full px-8 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="text-xl">Samyak <span className="text-primary">Shreyash</span></span>
                </Link>
                <nav className="hidden md:flex gap-6 items-center">
                    {pages.map((item) => (
                        <Link key={item.name}
                        href={item.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                            {item.name}
                            </Link>
                    ))}
                </nav>
                <div className="hidden md:flex gap-3">
                <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href={DEV_RESUME} download target="_blank">
              Resume
            </Link>
          </Button>
          </div>

                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
                    <div className="flex justify-between pt-3 pr-5">
                <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href={DEV_RESUME} download target="_blank">
              Resume
            </Link>
          </Button>
          </div>
                    <nav className="flex flex-col gap-4 mt-8">
                        {pages.map((item) =>(
                            <Link
                            key={item.name}
                            href={item.href}
                            className={`text-lg font-medium transition-colors hover:text-primary ${
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                              }`}
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

