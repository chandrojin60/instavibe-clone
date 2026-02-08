import { format } from "date-fns";
import { Check } from "lucide-react";

interface MessageBubbleProps {
  description: string;
  messagedAt: string;
  isSent: boolean;
  senderName?: string;
  isOptimistic?: boolean;
  isSending?: boolean;
}

export default function MessageBubble({ description, messagedAt, isSent, senderName, isOptimistic, isSending }: MessageBubbleProps) {
  const time = (() => {
    try { return format(new Date(messagedAt), "HH:mm"); } catch { return ""; }
  })();

  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} px-3 mb-1`}>
      <div
        className={`max-w-[75%] rounded-2xl px-3 py-2 ${
          isSent
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-secondary text-secondary-foreground rounded-bl-md"
        } ${isOptimistic ? "opacity-70" : ""}`}
      >
        {senderName && !isSent && (
          <p className="text-xs font-semibold text-primary mb-0.5">{senderName}</p>
        )}
        <p className="text-sm break-words">{description}</p>
        <div className={`flex items-center gap-1 justify-end mt-0.5 ${isSent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          <span className="text-[10px]">{time}</span>
          {isSent && (
            <div className="flex -space-x-1">
              <Check className={`h-3 w-3 ${isSending ? "opacity-50" : ""}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
