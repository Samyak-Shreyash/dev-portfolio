"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CURR_IMG_DARK, CURR_IMG_LIGHT, DEV_NAME, DEV_RESUME } from "@/lib/constants";
import { ArrowRightIcon, Download } from "lucide-react";
import ContactIcons from "./ui/contact-icons";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// next-themes' disableTransitionOnChange blocks CSS transitions, so the fade is driven by framer-motion.
// Until mounted the theme is unknown, so the dark: classes pick the right image without animating.
// Only the primary (light) image is prioritised: the server can't know the theme, and preloading both
// at high priority makes the hidden one compete with the visible LCP image. The duplicate is decorative.
function ThemeImage({ src, visible, className, mounted, primary }: { src: string; visible: boolean; className: string; mounted?: boolean; primary?: boolean }) {
    const reduceMotion = useReducedMotion()
    return (
        <motion.div
            className={`absolute inset-0 ${mounted ? "" : className}`}
            initial={false}
            animate={mounted ? { opacity: visible ? 1 : 0 } : undefined}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeInOut" }}
        >
            <Image
                src={src}
                alt={primary ? `Portrait of ${DEV_NAME}, Senior Software Developer` : ""}
                fill
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 400px, 100vw"
                className="object-cover"
                priority={primary}
                loading="eager"
            />
        </motion.div>
    )
}

export function HeroSection() {
    const { resolvedTheme } = useTheme()
    // false during SSR and hydration, true afterwards, without a setState-in-effect re-render
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)
    const isDark = resolvedTheme === "dark"
    return(
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Hi, I&apos;m <span className="text-primary">{DEV_NAME}</span>
                    </h1>
                    <p className="max-w-150 text-muted-foreground md:text-xl">
                    Senior Software Developer specializing in building exceptional
                    digital experiences that make people&#39;s lives simpler.
                    </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button className="inline-flex items-center gap-2" asChild>
                    <Link href="/projects">
                        View My Work <ArrowRightIcon aria-hidden="true" className="w-4 h-4" />
                    </Link>
                    </Button>
                    <Button variant="outline" asChild>
                    <Link href="/contact">Get In Touch</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                    <a href={DEV_RESUME} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" /> Resume
                    </a>
                    </Button>
                </div>
                <ContactIcons />
                </div>
                <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-150 overflow-hidden rounded-full border-8 border-muted">
                    {/* Day and night versions of the same illustration, crossfaded on theme change */}
                    <ThemeImage primary src={CURR_IMG_LIGHT} visible={!isDark} className="opacity-100 dark:opacity-0" mounted={mounted} />
                    <ThemeImage src={CURR_IMG_DARK} visible={isDark} className="opacity-0 dark:opacity-100" mounted={mounted} />
                </div>
                </div>
            </div>
        </div>
      </section>
    )
}