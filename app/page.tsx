import { DEV_GITHUB, DEV_LINKEDIN, DEV_NAME, DEV_TWITTER, TECH_STACK } from "@/utils/constants";
import Link from "next/link";
import { Button } from "./components/ui/button";
import { ArrowRightIcon, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hi, I&apos;m <span className="text-primary">{DEV_NAME}</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Senior Software Developer specializing in building exceptional digital experiences that make
                    people&#39;s lives simpler.
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
                <div className="flex items-center gap-4 mt-4">
                  <Link href={DEV_GITHUB} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href={DEV_LINKEDIN} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href={DEV_TWITTER} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                  </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative aspect-square overflow-hidden rounded-full border-8 border-muted">
                      <Image 
                      src="/profile_img.jpg" 
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
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">My Tech Stack</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I work with a variety of technologies to create robust and scalable applications.
                </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-8 mt-8">
                    {TECH_STACK.map((tech) => {
                      return (
                        <div key={tech.tech} className="flex flex-col items-center gap-2">
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background">
                            <img src={`https://icon.icepanel.io/Technology/svg/${tech.icon}.svg`}
                              alt={tech.tech}
                              width={40}
                              height={40} />
                          </div>
                          <p className="font-medium">{tech.tech}</p>
                        </div>
                      );
                    })}

                  </div>
                  </div>
                  </div>
          </section>
          </main>
      </div>
  );
}
