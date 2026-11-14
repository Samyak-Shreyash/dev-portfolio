"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CURR_IMG_DARK, CURR_IMG_LIGHT, DEV_NAME, DEV_RESUME } from "@/lib/constants";
import { ArrowRightIcon, Download } from "lucide-react";
import ContactIcons from "./ui/contact-icons";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// next-themes' disableTransitionOnChange blocks CSS transitions, so the fade is driven by framer-motion.
// Until mounted the theme is unknown, so the dark: classes pick the right image without animating.
function ThemeImage({ src, visible, className, mounted }: { src: string; visible: boolean; className: string; mounted?: boolean }) {
    return (
        <motion.div
            className={`absolute inset-0 ${mounted ? "" : className}`}
            initial={false}
            animate={mounted ? { opacity: visible ? 1 : 0 } : undefined}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <Image
                fetchPriority="high"
                src={src}
                alt={`Portrait of ${DEV_NAME}, Senior Software Developer`}
                fill
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 400px, 100vw"
                className="object-cover"
                priority
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
                    <Link href="/projects">
                    <Button className="inline-flex items-center gap-2">
                        View My Work <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                    </Link>
                    <Link href="/contact">
                    <Button variant="outline">Get In Touch</Button>
                    </Link>
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
                    <ThemeImage src={CURR_IMG_LIGHT} visible={!isDark} className="opacity-100 dark:opacity-0" mounted={mounted} />
                    <ThemeImage src={CURR_IMG_DARK} visible={isDark} className="opacity-0 dark:opacity-100" mounted={mounted} />
                </div>
                </div>
            </div>
        </div>
      </section>
    )
}