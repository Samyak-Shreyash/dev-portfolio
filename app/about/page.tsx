"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BG_IMAGE_LIGHT,
  BG_IMAGE_DARK,
  DEV_IMAGE,
  DEV_NAME,
  DEV_TITLE
} from "@/lib/constants";
import { Download, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AboutMeTab, ExperienceTab, SkillTab, TimeLineTab } from "@/components/about-tabs";

export default function About() {
  const { resolvedTheme } = useTheme();
  const [backgroundImage, setBackgroundImage] = useState(BG_IMAGE_LIGHT);

  useEffect(() => {
    setBackgroundImage(
      resolvedTheme === "dark" ? BG_IMAGE_DARK : BG_IMAGE_LIGHT
    );
  }, [resolvedTheme]);

  return (
    <div className="min-h-screen bg-linear-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/50">
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
            <h1 className="text-xl md:text-2xl text-muted-foreground mb-6">
              {DEV_TITLE}
            </h1>
            <div className="flex ">
              <Button asChild className="inline-flex items-center gap-2">
                <a href="/Samyak-Shreyash-6yrs-Java.pdf" download>
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
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="about" className="interactive">
              About
            </TabsTrigger>
            <TabsTrigger value="experience" className="interactive">
              Experience
            </TabsTrigger>
            <TabsTrigger value="skills" className="interactive">
              Skills
            </TabsTrigger>
            <TabsTrigger value="timeline" className="interactive">
              Timeline
            </TabsTrigger>
          </TabsList>
        
            {/* About Tab */}
            <TabsContent value="about" className="space-y-8">
              <AboutMeTab />
            </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-8">
            <ExperienceTab />
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-8">
            <SkillTab />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-8">
            <TimeLineTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}