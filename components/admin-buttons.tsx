"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { BlogApiService, ContactApiService } from "@/lib/api-services"

// A Dialog instead of window.confirm/alert: those block the main thread until dismissed,
// which showed up as a ~1s INP on the delete buttons.
function DeleteButton({ label, onDelete }: { label: string; onDelete: () => Promise<unknown> }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete()
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error(`Error deleting ${label}:`, error)
      toast({
        title: `Could not delete ${label}`,
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !isDeleting && setOpen(next)}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" disabled={isDeleting}>
          <Trash2 className="h-4 w-4 mr-1" />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this {label}?</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteMessageButton({ msgId }: { msgId: string }) {
  return <DeleteButton label="message" onDelete={() => ContactApiService.deleteMessage(msgId)} />
}

export function DeletePostButton({ postId }: { postId: string }) {
  return <DeleteButton label="post" onDelete={() => BlogApiService.deleteBlog(postId)} />
}

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/login", { method: "DELETE" })
    router.push("/login")
    router.refresh()
  }

  return (
    <Button size="sm" variant="outline" onClick={handleLogout}>
      <LogOut className="h-4 w-4 mr-1" /> Log out
    </Button>
  )
}
