import { BG_IMAGE_DARK, DEV_IMAGE, DEV_NAME, DEV_TITLE } from '@/utils/constants';
import Image from 'next/image';
import ContactIcons from '../components/contactIcons';
import { Button } from '../components/ui/button';
import { Download, Mail } from 'lucide-react';
import Link from 'next/link';

export default function about() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background-to-muted/50">
          <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20-to-primary/5 z-10">
            <Image src={BG_IMAGE_DARK} alt='Background' fill className='object-cover' priority />
            <div className='absolute inset-0 flex flex-col justify-center items-center text-center z-20 p-4'>
              <div>
                <Image src={DEV_IMAGE} alt={DEV_NAME} width={150} height={150} className='rounded-full border-4 border-background mb-6' priority />
              </div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4'>{DEV_NAME}</h1>
              <h2 className='text-xl md:text-2xl text-muted-foreground mb-6'>{DEV_TITLE}</h2>
              <div className="flex ">
                <Button asChild className="inline-flex items-center gap-2">
                  <a href="/resume.pdf" download>
                    <Download className="h-4 w-4" /> Download Resume
                  </a>
                </Button>
                <Button variant="outline" asChild className="inline-flex items-center gap-2">
                  <Link href="/contact">
                    <Mail className="h-4 w-4" /> Contact Me
                  </Link>
                </Button>
              </div>
              <div className='flex-space-x-4'>
                <ContactIcons />
              </div>
            </div>
            </div>
            </section>

        </div>
    )
}