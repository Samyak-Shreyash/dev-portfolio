  "use client"
  import Link from "next/link"
  import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet"
  import { Menu } from "lucide-react"
  import { usePathname } from "next/navigation";
  import { ThemeToggle } from "./theme-toggle"
  import { DEV_RESUME } from "@/lib/constants"
  import { Button } from "./ui/button";


  type NavLink = {
  name: string;
  href: string;
};

 
// Define the component's expected props
interface SiteHeaderProps {
  navLink: NavLink[]; // <-- New prop for the navigation links
}

  export function SiteHeader({ navLink }: SiteHeaderProps) {
    const pathname = usePathname()
      return(
          <header className="sticky top-0 z-50 w-full px-8 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                  <span className="text-xl">Samyak <span className="text-primary">Shreyash</span></span>
                  </Link>
                  <nav className="hidden md:flex gap-6 items-center">
                      {navLink.map((item) => (
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
            <Button variant="link" size="sm" asChild>
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
                      <SheetContent side="right" className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                      <div className="flex justify-between pt-3 pr-5">
                  <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href={DEV_RESUME} download target="_blank">
                Resume
              </Link>
            </Button>
            </div>
                      <nav className="flex flex-col gap-4 mt-8">
                          {navLink.map((item) =>(
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

