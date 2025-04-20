import { DEV_EMAIL, DEV_GITHUB, DEV_LINKEDIN } from "@/lib/constants";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function ContactIcons() {
return(
    <div className="flex items-center gap-4 mt-4">
        <a href={`https://${DEV_GITHUB}`} target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
            <span className="sr-only">Github</span>
        </Button>
        </a>
        <a href={`https://${DEV_LINKEDIN}`} target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
            <Linkedin className="h-5 w-5 hover:"  />
            <span className="sr-only">LinkedIn</span>
        </Button>
        </a>
        <a href={`mailto:${DEV_EMAIL}`} target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Mail</span>
        </Button>
        </a>
    </div>
)


}