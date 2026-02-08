import { useEffect, useRef, useState, useCallback } from "react";
import { API, getUserId } from "@/lib/api";

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "reconnecting";

interface QueuedMessage {
  receiver_id: number;
  chat_id: number;
  content_type: string;
  description: string;
}

interface UseWebSocketOptions {
  onMessage?: (data: any) => void;
}

export function useWebSocket({ onMessage }: UseWebSocketOptions = {}) {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const queueRef = useRef<QueuedMessage[]>([]);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    const userId = getUserId();
    if (!userId) return;

    setStatus("connecting");
    const ws = new WebSocket(API.ws(userId));

    ws.onopen = () => {
      setStatus("connected");
      reconnectAttempts.current = 0;
      // Flush queued messages
      while (queueRef.current.length > 0) {
        const msg = queueRef.current.shift()!;
        ws.send(JSON.stringify({
          action: "sendMessagePrivate",
          token: { accesstoken: userId },
          payload: msg,
        }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageRef.current?.(data);
      } catch {}
    };

    ws.onclose = () => {
      setStatus("disconnected");
      wsRef.current = null;
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 16000);
        reconnectAttempts.current++;
        setStatus("reconnecting");
        setTimeout(connect, delay);
      }
    };

    ws.onerror = () => ws.close();
    wsRef.current = ws;
  }, []);

  const sendMessage = useCallback((receiverId: number, chatId: number, description: string) => {
    const userId = getUserId();
    const msg: QueuedMessage = { receiver_id: receiverId, chat_id: chatId, content_type: "text", description };

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        action: "sendMessagePrivate",
        token: { accesstoken: userId },
        payload: msg,
      }));
    } else {
      queueRef.current.push(msg);
    }
  }, []);

  const disconnect = useCallback(() => {
    reconnectAttempts.current = maxReconnectAttempts; // prevent reconnect
    wsRef.current?.close();
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { status, sendMessage, disconnect, reconnect: connect };
}
