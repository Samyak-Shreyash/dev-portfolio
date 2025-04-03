import { DEV_EMAIL, DEV_GITHUB, DEV_LINKEDIN, DEV_TWITTER } from "@/lib/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function ContactIcons() {
return(
    <div className="flex items-center gap-4 mt-4">
        <Link href={DEV_GITHUB} target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
            <span className="sr-only">Github</span>
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
        <Link href={DEV_EMAIL} target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Mail</span>
        </Button>
        </Link>
    </div>
)


}