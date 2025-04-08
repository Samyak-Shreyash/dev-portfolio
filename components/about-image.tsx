"use client";

import { Button } from "@/components/ui/button";
import {
  BG_IMAGE_LIGHT,
  BG_IMAGE_DARK,
  DEV_IMAGE,
  DEV_NAME,
  DEV_TITLE,
  DEV_RESUME
} from "@/lib/constants";
import { Download, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutImageSection() {
    const { resolvedTheme } = useTheme();
    const [backgroundImage, setBackgroundImage] = useState(BG_IMAGE_LIGHT);
  
    useEffect(() => {
      setBackgroundImage(
        resolvedTheme === "dark" ? BG_IMAGE_DARK : BG_IMAGE_LIGHT
      );
    }, [resolvedTheme]);
  
    return(
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 z-10">
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet={BG_IMAGE_DARK}
            />
            <source
              media="(prefers-color-scheme: light)"
              srcSet={BG_IMAGE_LIGHT}
            />
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </picture>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 p-4">
            <div>
              <Image
                src={DEV_IMAGE}
                alt={DEV_NAME}
                width={150}
                height={150}
                className="rounded-full border-4 border-background mb-6"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">
              {DEV_NAME}
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              {DEV_TITLE}
            </h2>
            <div className="flex ">
              <Button asChild className="inline-flex items-center gap-2">
                <a href={DEV_RESUME} download>
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="inline-flex items-center gap-2"
              >
                <Link href="/contact">
                  <Mail className="h-4 w-4" /> Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
}