import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Video } from "lucide-react";
import MessageBubble from "@/components/messages/MessageBubble";
import ChatInput from "@/components/messages/ChatInput";
import ConnectionStatus from "@/components/messages/ConnectionStatus";
import { fetchMessages, type Message, type Conversation } from "@/services/messageService";
import { useWebSocket } from "@/hooks/useWebSocket";
import { getUserId } from "@/lib/api";

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const conversation = (location.state as any)?.conversation as Conversation | undefined;
  const chatIdNum = Number(chatId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const userId = getUserId();

  const handleWsMessage = useCallback((data: any) => {
    if (data.action === "newMessage" && data.payload.chat_id === chatIdNum) {
      setMessages((prev) => {
        // Remove optimistic message if server confirms
        const filtered = prev.filter((m) => !m._optimistic || m.description !== data.payload.description);
        return [...filtered, data.payload];
      });
    }
  }, [chatIdNum]);

  const { status, sendMessage } = useWebSocket({ onMessage: handleWsMessage });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const msgs = await fetchMessages(chatIdNum, conversation?.is_group ?? false);
        setMessages(msgs.reverse());
      } catch {}
      setLoading(false);
    })();
  }, [chatIdNum, conversation?.is_group]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!userId) return;
    // Optimistic message
    const optimistic: Message = {
      message_id: Date.now(),
      sender_id: Number(userId),
      content_type: "text",
      description: text,
      messaged_at: new Date().toISOString(),
      is_edited: false,
      reaction_emoji: null,
      _optimistic: true,
      _sending: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    sendMessage(0, chatIdNum, text); // receiver_id=0 placeholder for group; server uses chat_id
  };

  const avatar = conversation?.profile_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation?.name || "Chat"}`;
  const name = conversation?.name || "Chat";

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-screen">
      <ConnectionStatus status={status} />

      {/* Header */}
      <div className="flex items-center gap-3 border-b px-3 py-2">
        <button onClick={() => navigate("/messages")}><ArrowLeft className="h-6 w-6" /></button>
        <img src={avatar} alt={name} className="h-9 w-9 rounded-full" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{name}</p>
          {status === "connected" && <p className="text-xs text-muted-foreground">Active now</p>}
        </div>
        <div className="flex items-center gap-4">
          <button><Phone className="h-5 w-5" /></button>
          <button><Video className="h-5 w-5" /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="h-6 w-6 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img src={avatar} alt={name} className="h-20 w-20 rounded-full mb-3" />
            <p className="font-semibold text-lg">{name}</p>
            <p className="text-sm text-muted-foreground">Start a conversation</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.message_id}
              description={msg.description}
              messagedAt={msg.messaged_at}
              isSent={msg.sender_id === Number(userId)}
              isOptimistic={msg._optimistic}
              isSending={msg._sending}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}
