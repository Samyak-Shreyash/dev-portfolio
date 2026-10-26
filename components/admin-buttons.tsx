"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactApiService } from "@/lib/api-services"

export function DeleteMessageButton({ msgId }: { msgId: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Delete this message? This cannot be undone.")) return
    try {
      setIsDeleting(true)
      await ContactApiService.deleteMessage(msgId)
      router.refresh()
    } catch (error) {
      console.error("Error deleting message:", error)
      alert(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={handleDelete} disabled={isDeleting}>
      <Trash2 className="h-4 w-4 mr-1" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  )
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
