import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutMeTab, ExperienceTab, SkillTab, TimeLineTab } from "@/components/about-tabs";
import AboutImageSection from "@/components/about-image";

export default function About() {

  return (
    <div className="min-h-screen bg-linear-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/50">
      <AboutImageSection />
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