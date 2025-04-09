type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type ContactMessagesProps = {
  messages: ContactMessage[];
};

export default function ContactMessages({ messages }: ContactMessagesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-[hsl(var(--background))]  shadow rounded-2xl p-5 border border[hsl(var(--muted))]"
        >
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
      ))}
    </div>
  );
}
