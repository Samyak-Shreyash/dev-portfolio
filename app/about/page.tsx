import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExperienceTab, SkillTab, TimeLineTab } from "@/components/about-tabs";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEV_IMAGE } from "@/lib/constants";
import { Card } from "@/components/ui/card";

export default function About() {

  return (
    <div className="bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/50">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-block" variant="outline">
                  About Me
                </Badge>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I specialize in creating user-centric applications that solve real-world problems. My journey in
                  software development began with a fascination for how technology can simplify complex tasks and make
                  life easier for people.
                </p>
                <p>
                  Throughout my career, I&apos;ve worked with startups, agencies, and enterprise companies, helping them
                  build scalable and maintainable software solutions. I&apos;m passionate about clean code, performance
                  optimization, and creating intuitive user experiences.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or sharing my knowledge through blog posts and community events.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button asChild>
                  <Link href="/contact">
                    Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-xl border shadow-xl">
                <Image
                  src={DEV_IMAGE}
                  alt="Samyak Shreyash"
                  width={400}
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-[hsl(var(--muted))]/50">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <div className="space-y-2">
                <Badge variant="outline">Interests & Hobbies</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Beyond Coding</h2>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  When I&apos;m not in front of a computer, here&apos;s what I enjoy doing.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Reading", icon: "📚" },
                  { name: "Hiking", icon: "🥾" },
                  { name: "Photography", icon: "📷" },
                  { name: "Chess", icon: "♟️" },
                  { name: "Cooking", icon: "🍳" },
                  { name: "Traveling", icon: "✈️" },
                  { name: "Music", icon: "🎵" },
                  { name: "Gardening", icon: "🌱" },
                ].map((hobby, index) => (
                  <Card key={index} className="flex flex-col items-center justify-center p-4 h-32">
                    <div className="text-4xl mb-2">{hobby.icon}</div>
                    <div className="font-medium">{hobby.name}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      <section className="container max-w-4xl mx-auto px-4 py-12">
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
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
      </section>
    </div>
  );
}