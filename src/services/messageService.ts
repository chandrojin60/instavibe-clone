import { API, getAuthHeaders } from "@/lib/api";

export interface Conversation {
  chat_id: number;
  name: string;
  last_message: string;
  last_message_time: string;
  is_group: boolean;
  profile_url: string | null;
}

export interface Message {
  message_id: number;
  sender_id: number;
  content_type: string;
  description: string;
  messaged_at: string;
  is_edited: boolean;
  reaction_emoji: string | null;
  // Client-side fields
  _optimistic?: boolean;
  _sending?: boolean;
}

export async function fetchConversations(): Promise<Conversation[]> {
  const res = await fetch(API.getConversations, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ request_time: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error("Failed to fetch conversations");
  return res.json();
}

export async function fetchMessages(chatId: number, isGroup: boolean, lastMsgTime?: string): Promise<Message[]> {
  const res = await fetch(API.getMessages, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      other_id: isGroup ? null : chatId,
      group_id: isGroup ? chatId : null,
      last_msg_time: lastMsgTime || new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}
