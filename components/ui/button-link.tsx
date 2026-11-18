"use client"
import Link from "next/link"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

// A link styled as a button. Use this from Server Components instead of <Button asChild><Link>:
// Slot receives the server-passed <Link> as a lazy element and renders it differently on the
// server and client, which causes a hydration mismatch.
type ButtonLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
