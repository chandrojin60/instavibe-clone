import { Plus } from "lucide-react";

interface StoryCircleProps {
  name: string;
  profileUrl: string;
  isSelf?: boolean;
  hasStory?: boolean;
}

export default function StoryCircle({ name, profileUrl, isSelf, hasStory = true }: StoryCircleProps) {
  return (
    <button className="flex flex-col items-center gap-1 min-w-[66px]">
      <div className={`relative rounded-full p-[2px] ${hasStory && !isSelf ? "ig-gradient-ring" : "bg-transparent"}`}>
        <div className="rounded-full border-2 border-background">
          <img src={profileUrl} alt={name} className="h-14 w-14 rounded-full object-cover" />
        </div>
        {isSelf && (
          <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background">
            <Plus className="h-3 w-3" />
          </div>
        )}
      </div>
      <span className="w-[66px] truncate text-center text-xs">{isSelf ? "Your story" : name}</span>
    </button>
  );
}
