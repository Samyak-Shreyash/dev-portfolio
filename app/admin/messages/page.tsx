import { redirect } from "next/navigation";
import { format } from "date-fns";
import { isAdmin } from "@/lib/auth";
import { MessageDBService } from "@/lib/mongodb";
import { DeleteMessageButton } from "@/components/admin-buttons";
import { AdminNav } from "@/components/admin-nav";

export const metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
}

export default async function MessageDashBoard()
{
  if (!(await isAdmin())) {
    redirect('/login');
  }

  // Read straight from the DB on the server: no public API exposes messages
  const messages = await MessageDBService.getAllMessages()
    return (
        <div className="container mx-auto px-6 md:px-12 sm:px-8 py-12 ">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight" >Message Dashboard</h1>
                <AdminNav />
            </div>
            {messages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No Messages yet. Check back later!
          </p>
        </div>
      )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {messages.map((msg) => (
        <div
          key={msg._id.toString()}
          className="bg-background flex flex-col justify-between gap-4 shadow rounded-2xl p-5 border border-muted"
        >
            <div className="space-y-2">
          <div>
            <h2 className="text-lg font-semibold">
              {msg.name}
            </h2>
            <a href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject ?? ""}`)}`} className="text-sm text-primary hover:underline">{msg.email}</a>
          </div>

          {msg.subject && <p className="font-medium">{msg.subject}</p>}
          <p className="text-muted-foreground whitespace-pre-line wrap-break-word">
            {msg.message}
          </p>

          <div className="text-xs text-muted-foreground/60">{msg.createdAt ? format(new Date(msg.createdAt), "MMM d, yyyy h:mm a") : ""}</div>
          </div>
          <div className="flex justify-end">
            <DeleteMessageButton msgId={msg._id.toString()} />
          </div>
        </div>
      ))}
    </div>
        </div>
    )
}
