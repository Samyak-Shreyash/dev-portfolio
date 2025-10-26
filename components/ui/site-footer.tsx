"use client"

import { DEV_NAME } from "@/lib/constants"
import ContactIcons from "./contact-icons"

export default function SiteFooter() {
    return (
        <footer className="w-full border-t py-6 md:py-0">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
                <p className="text-sm text-muter-foreground">
                    &copy; {new Date().getFullYear()} {DEV_NAME}. All rights reserved.
                </p>
                <ContactIcons />
            </div>
        </footer>
    )
}