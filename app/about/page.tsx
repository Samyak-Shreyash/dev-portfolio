"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { BG_IMAGE_LIGHT, BG_IMAGE_DARK, DEV_IMAGE, DEV_NAME, DEV_TITLE, ABOUT_ME, ACCOMPLISHMENTS, TECH_STACK, WORK_EXP } from "@/lib/constants"
import { Download, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function About() {
    const { resolvedTheme } = useTheme()
    const [backgroundImage, setBackgroundImage] = useState(BG_IMAGE_LIGHT)

  
  useEffect(() => {
    setBackgroundImage(resolvedTheme === "dark" ? BG_IMAGE_DARK : BG_IMAGE_LIGHT)
  }, [resolvedTheme])

  return (
    <div className="min-h-screen bg-linear-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/50">
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 z-10">
             <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={BG_IMAGE_DARK} />
            <source media="(prefers-color-scheme: light)" srcSet={BG_IMAGE_LIGHT} />
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
                    <Image src={DEV_IMAGE} alt={DEV_NAME} width={150} height={150} className="rounded-full border-4 border-background mb-6" priority/>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">{DEV_NAME}</h1>
                <h1 className="text-xl md:text-2xl text-muted-foreground mb-6">{DEV_TITLE}</h1>
                <div className="flex ">
                <Button asChild className="inline-flex items-center gap-2">
                  <a href="/Samyak-Shreyash-6yrs-Java.pdf" download>
                    <Download className="h-4 w-4" /> Download Resume
                  </a>
                </Button>
                <Button variant="outline" asChild className="inline-flex items-center gap-2">
                  <Link href="/contact">
                    <Mail className="h-4 w-4" /> Contact Me
                  </Link>
                </Button>
              </div>
            </div>
            </div>
            </section>
            <main className='container max-w-5xl mx-auto px-4 py-12'>
            <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
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

          <TabsContent value="about" className="space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className='text-3xl font-bold mb-6'>About Me</h2>
              {ABOUT_ME.map((para, key) => {return ( <p key={key}>{para}</p>);})}
            </div>
          </TabsContent>

          <TabsContent value='experience' className='space-y-8'>
            <div>
              <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
              <div className="space-y-8">
                {WORK_EXP.map((job, index) => (
                  <Card key={index} className='overflow-hidden'>
                    <CardContent className="p-6">
                      <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
                        <div>
                          <h3 className='text-xl font-bold'>{job.role}</h3>
                          <p className='text-muted-foreground'>{job.company}</p>
                        </div>
                        <br/>
                        <Badge variant="outline" className='mt-2 md:mt-0 w-fit'>{job.period}</Badge>
                      </div>
                      <ul>
                      {job.description.split('\n').map((work, index) => (
                              <li key={index}>{`${work}`}</li>
                            ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} 
                          className="bg-hsl(var(--primary-foreground)) border-outline text-hsl(var(--secondary-foreground)) hover:bg-hsl(var(--secondary))/80"
                          >
                            {tech}
                          </Badge>
                        ))}
                        </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {TECH_STACK.map((tech, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative p-4 rounded-lg border bg-[hsl(var(--card))] text-card-foreground shadow transition-all duration-300 hover:shadow-md interactive",
                      tech.skill >= 4 ? "border-[hsl(var(--primary))]/50" : "",
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--primary))]/10 text-primary font-bold">
                        <Image src={`https://icon.icepanel.io/Technology/svg/${tech.icon}.svg`}
                        alt={tech.tech}
                        width={40}
                        height={40} />
                      </div>
                      <div>
                        <h3 className="font-medium">{tech.tech}</h3>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={cn("w-6 h-2 rounded-full mr-1", i < tech.skill ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--muted))]")}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-8">
            <div >
              <div className="relative border-l-2 border-primary/30 pl-8 ml-4 space-y-10">
                {ACCOMPLISHMENTS.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[48px] flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary border-2 border-background ring-2 ring-primary/30">
                      <span>{item.icon}</span>
                    </div>

                    {/* Date badge */}
                    <div className="absolute -top-2 -left-[7.5rem] w-16 text-center">
                      <Badge variant="outline" className="text-sm font-semibold">
                        {item.date}
                      </Badge>
                    </div>

                    {/* Content */}
                    <Card className="overflow-hidden interactive">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          </Tabs>
              </main>
        </div>
    )
}
