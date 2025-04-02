"use client"

import { PAGES } from "@/utils/constants";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full px-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
      <Link href="/" className="font-bold text-xl">
                  Samyak <span className="text-primary">Shreyash</span>
                </Link>
        <nav className="hidden md:flex gap-6">
        {PAGES.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
            </nav>
        <Sheet>
        <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <nav className="flex flex-col gap-4 mt-8">
                    {PAGES.map((item) => (
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
  );
}