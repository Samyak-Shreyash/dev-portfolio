"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CURR_IMG_DARK, CURR_IMG_LIGHT, DEV_NAME } from "@/lib/constants";
import { ArrowRightIcon } from "lucide-react";
import ContactIcons from "./contact-icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function HeroSection() {
    const { resolvedTheme } = useTheme();
    const [backgroundImage, setBackgroundImage] = useState(CURR_IMG_LIGHT);
  
    useEffect(() => {
      setBackgroundImage(
        resolvedTheme === "dark" ? CURR_IMG_DARK : CURR_IMG_LIGHT
      );
    }, [resolvedTheme]);
    return(
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Hi, I&apos;m <span className="text-primary">{DEV_NAME}</span>
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
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
                </div>
                <ContactIcons />
                </div>
                <div className="flex items-center justify-center">
                <div className="relative aspect-square overflow-hidden rounded-full border-8 border-muted">
                    <Image
                    src={backgroundImage}
                    alt={DEV_NAME}
                    width={600}
                    height={600}
                    className="object-cover"
                    priority
                    />
                </div>
                </div>
            </div>
        </div>
      </section>
    )
}