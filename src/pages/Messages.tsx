import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import ConversationItem from "@/components/messages/ConversationItem";
import ConnectionStatus from "@/components/messages/ConnectionStatus";
import { fetchConversations, type Conversation } from "@/services/messageService";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleWsMessage = useCallback((data: any) => {
    if (data.action === "newMessage") {
      const { chat_id, description, messaged_at } = data.payload;
      setConversations((prev) =>
        prev.map((c) =>
          c.chat_id === chat_id
            ? { ...c, last_message: description, last_message_time: messaged_at }
            : c
        ).sort((a, b) => new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime())
      );
    }
  }, []);

  const { status } = useWebSocket({ onMessage: handleWsMessage });

  const loadConversations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchConversations();
      setConversations(data);
    } catch {
      setError("Couldn't load conversations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-screen">
      <ConnectionStatus status={status} />
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h1 className="text-lg font-semibold">Messages</h1>
        <button><SquarePen className="h-6 w-6" /></button>
      </div>

      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-secondary rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="flex flex-col gap-3 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="h-14 w-14 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-3 w-40 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>
            <button onClick={loadConversations} className="text-sm font-semibold text-primary">Retry</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center py-12 text-center">
            <p className="text-muted-foreground text-sm">No conversations yet</p>
          </div>
        )}

        {!loading && !error && filtered.map((c) => (
          <ConversationItem
            key={c.chat_id}
            name={c.name}
            lastMessage={c.last_message}
            lastMessageTime={c.last_message_time}
            isGroup={c.is_group}
            profileUrl={c.profile_url}
            onClick={() => navigate(`/messages/${c.chat_id}`, { state: { conversation: c } })}
          />
        ))}
      </div>
    </div>
  );
}
