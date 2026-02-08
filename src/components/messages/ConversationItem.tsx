import { formatDistanceToNow } from "date-fns";
import { Users } from "lucide-react";

interface ConversationItemProps {
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  isGroup: boolean;
  profileUrl: string | null;
  onClick: () => void;
}

export default function ConversationItem({ name, lastMessage, lastMessageTime, isGroup, profileUrl, onClick }: ConversationItemProps) {
  const avatar = profileUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(lastMessageTime), { addSuffix: false });
    } catch { return ""; }
  })();

  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-2 hover:bg-accent transition-colors text-left">
      <div className="relative">
        <img src={avatar} alt={name} className="h-14 w-14 rounded-full object-cover" />
        {isGroup && (
          <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background">
            <Users className="h-3 w-3" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold truncate">{name}</span>
          <span className="text-xs text-muted-foreground shrink-0 ml-2">{timeAgo}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>
    </button>
  );
}
