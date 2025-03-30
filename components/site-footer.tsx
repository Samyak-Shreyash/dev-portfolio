import { DEV_NAME } from "@/utils/constants";
import ContactIcons from "./contactIcons";

export default function SiteFooter() {
    return (
        <footer className="w-full border-t py-6 md:py-0">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
                <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {DEV_NAME}. All rights reserved.
                </p>
                <ContactIcons />
        </div>
        </footer>
    );
}