import { ABOUT_ME, WORK_EXP, TECH_STACK, ACCOMPLISHMENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Badge } from "./ui/badge"; 
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import '@/app/globals.css';
import { MDXRemote } from "next-mdx-remote/rsc";

  export function ExperienceTab() {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
        <div className="space-y-8">
          {WORK_EXP.map((job, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <br />
                  <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                    {job.period}
                  </Badge>
                </div>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                          <MDXRemote source={job?.description} />
                    </div>
                {/* <ul>
                  {job.description.split("\n").map((work, index) => (
                    <li key={index}>{`${work}`}</li>
                  ))}
                </ul> */}
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
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
      </div>);
  }

  export function SkillTab() {
    return(
      <div>
        <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(TECH_STACK).map(([key, tech]) => (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "relative p-4 rounded-lg border bg-[hsl(var(--card))] text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.03] group cursor-pointer",
                      tech.skill >= 4
                        ? "border-[hsl(var(--primary))]/50"
                        : ""
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--primary))]/10 text-primary font-semibold border-2 border-[hsl(var(--primary))]/20 group-hover:ring-2 group-hover:ring-[hsl(var(--primary))]/40 transition-all duration-300">
                        <Image
                          src={`https://icon.icepanel.io/Technology/svg/${tech.icon}.svg`}
                          alt={tech.tech}
                          width={30}
                          height={30} />
                      </div>
                      <div>
                        <h3 className="font-medium">{tech.tech}</h3>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-5 h-1.5 rounded-full mr-1",
                                i < tech.skill
                                  ? "bg-[hsl(var(--primary))]"
                                  : "bg-[hsl(var(--muted))]"
                              )} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{tech.skill>4?"Advanced":tech.skill>2?"Intermediate":"Beginner"}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
   )
  }

    export function TimeLineTab() {
  return(
    <div>
      <div className="relative pl-8 ml-4 space-y-12 min-h-screen">
        {ACCOMPLISHMENTS.map((item, index) => (
          <div key={index} className="relative group">

            {/* Timeline dot */}
            <div className="absolute -left-[48px] top-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--primary))]/10 text-primary border-2 border-hsl(var(--primary)) ring-2 ring-hsl(var(--primary))/30 transition-all duration-300 group-hover:ring-2 group-hover:ring-hsl(var(--primary))/50 group-hover:scale-110">
              <span>{item.icon}</span>
            </div>

            {/* Bottom line segment */}
            {index !== ACCOMPLISHMENTS.length - 1 && (
              <div className="absolute left-[-2rem] top-4/5 h-[calc(100%+1rem)] w-1 bg-[hsl(var(--primary))] -z-[-1]" />
            )}

            <div className="hidden sm:block absolute top-11 -left-[7.5rem] w-16 text-center">
              <Badge
                variant="outline"
                className="text-sm font-semibold"
              >
                {item.date}
              </Badge>
            </div>

            {/* For small screens – stacked vertically */}
            <div className="block sm:hidden flex flex-col items-center min-w-[3rem] mb-2">
              <Badge
                variant="outline"
                className="text-xs font-semibold"
              >
                {item.date}
              </Badge>
            </div>

            {/* Content */}
            <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.01]">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                {/* {item.subtitle && (
    <p className="text-sm text-muted-foreground mb-1">{item.subtitle}</p>
  )} */}
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}