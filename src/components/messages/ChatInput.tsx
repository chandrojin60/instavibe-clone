import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <div className="flex items-center gap-2 border-t px-3 py-2 bg-background">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        placeholder="Message..."
        disabled={disabled}
        className="flex-1 rounded-full border bg-secondary px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        className="text-primary font-semibold text-sm disabled:opacity-50"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
}
