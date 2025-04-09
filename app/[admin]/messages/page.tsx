
import { DeleteMessageButton } from "@/components/delete-post-button";
import { ContactApiService } from "@/lib/api-services";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BlogsDashBoard() 
{
  const currentUser = await getCurrentUser();
      
    if (!currentUser) {
        redirect('/login');
    }
      
    const messages = await ContactApiService.getAllMessages()
    return (
        <div className="container mx-auto px-6 md:px-12 sm:px-8 py-12 ">
            <div className="flex justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight" >Message Dashboard</h1>
            </div>
            {messages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No Messages Online yet. Check back later!
          </p>
        </div>
      )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className="bg-[hsl(var(--background))] flex flex-row justify-between shadow rounded-2xl p-5 border border[hsl(var(--muted))]"
        >
            <div>
          <div className="mb-2">
            <h2 className="text-lg font-semibold">
              {msg.name}
            </h2>
            <p className="text-sm text-muted-foreground">{msg.email}</p>
          </div>

          <p className="text-muted-foreground whitespace-pre-line">
            {msg.message}
          </p>

          <div className="text-xs text-muted-foreground/60">{msg.createdAt}</div>
          </div>
          <DeleteMessageButton msgId={msg._id} />
        </div>
      ))}
    </div>
        </div>
    )
}