import ContactForm from "@/components/contact-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DEV_EMAIL, DEV_GITHUB, DEV_LINKEDIN, DEV_LOCATION, FAQS } from "@/lib/constants"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
  
export default function ContactPage() {
    return (
        <main className='min-h-screen bg-gradient-to-b from-[hsl(var(--background))]-500 to-[hsl(var(--secondary))]/10'>
            <div className='absolute inset-0 [mask-image: radial-gradient(circle, white, transparent 85%)] pointer-events-none'></div>

            <section className='container relative mx-auto py-16 px-4'>
                <div className='max-w-5xl mx-auto'>
                    <div className='mb-12 text-center'>
                        <h1 className='text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))/60]'>
                        Let&apos;s Connect
                        </h1>
                        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                        Have a project in mind or just want to chat? I&apos;m always open to new opportunities and collaborations.
                        </p>
                    </div>

                    <div className='grid gap-10 md:grid-cols-2'>
                        <div className='space-y-8'>
                            <div className='relative group'>
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <Card className="relative bg-[hsl(var(--background))] backdrop-blur-sm border-0">
                                    <CardContent className="p-6">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[hsl(var(--foreground))]/10 flex items-center justify-center">
                                                    <Mail className="text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium">Mail me </h3>
                                                    <a
                                                    href={`mailto:${DEV_EMAIL}`}
                                                    className="text-primary hover:underline transition-colors"
                                                    >
                                                        {DEV_EMAIL}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[hsl(var(--foreground))]/10 flex items-center justify-center">
                                                    <Linkedin  className="text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium">Check out my LinkedIn</h3>
                                                    <a
                                                    href={`https://${DEV_LINKEDIN}`}
                                                    className="text-primary hover:underline transition-colors"
                                                    >
                                                        {DEV_LINKEDIN}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[hsl(var(--foreground))]/10 flex items-center justify-center">
                                                    <Github  className="text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium">Check my work</h3>
                                                    <a
                                                    href={`https://${DEV_GITHUB}`}
                                                    className="text-primary hover:underline transition-colors"
                                                    >
                                                        {DEV_GITHUB}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[hsl(var(--foreground))]/10 flex items-center justify-center">
                                                    <MapPin 
                                                        className="text-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium">Based Out of</h3>
                                                    <a
                                                    href={DEV_LOCATION}
                                                    className="text-primary hover:underline transition-colors"
                                                    >
                                                        Bengaluru, India
                                                    </a>                                                        
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="relative p-6 rounded-lg bg-gradient-to-r from-[hsl(var(--primary))]/5 to-[hsl(var(--secondary))]/5 border border-[hsl(var(--primary))]/10">
                                <h3 className="text-xl font-semibold mb-2">Current Status</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-green-500 font-medium">Working on New Projects</span>
                                </div>
                                    <p className="text-muted-foreground">
                                        I&apos;m currently taking on select freelance projects and open to discussing full-time opportunities.
                                    </p>
                            </div>
                        </div>

                        <div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
            {/* FAQ Section */}
            <section className="container relative mx-auto py-16 px-4">
                <div className="container">
                    <div className="mx-auto max-w-3xl space-y-8 text-center">
                    <div className="space-y-2">
                        <Badge variant="outline">FAQ</Badge>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))/90]">Frequently Asked Questions</h2>
                        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Here are some common questions about my services and work process.
                        </p>
                    </div>
                    <div className="grid gap-4 md:gap-8">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--secondary))]/60 to-[hsl(var(--secondary))] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                        {FAQS.map((faq, index) => (
                         <div className='relative group' key={index} >
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                         
                        <Card 
                        className="relative bg-[hsl(var(--background))] backdrop-blur-sm border-0">
                            <CardContent className="p-6">
                            <h3 className="font-bold text-xl mb-2 text-primary">{faq.question}</h3>
                            <p className="text-muted-foreground">{faq.answer}</p>
                            </CardContent>
                        </Card>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </section>
        </main>
    )
}