import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/admin-buttons"

export function AdminNav() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button asChild size="sm" variant="ghost"><Link href="/admin/blogs">Blogs</Link></Button>
      <Button asChild size="sm" variant="ghost"><Link href="/admin/messages">Messages</Link></Button>
      <LogoutButton />
    </div>
  )
}
