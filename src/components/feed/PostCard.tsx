import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

interface PostCardProps {
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  time: string;
}

export default function PostCard({ username, avatar, image, caption, likes, comments, time }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <article className="border-b">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <img src={avatar} alt={username} className="h-8 w-8 rounded-full object-cover" />
          <span className="text-sm font-semibold">{username}</span>
        </div>
        <button><MoreHorizontal className="h-5 w-5" /></button>
      </div>

      {/* Image */}
      <img
        src={image}
        alt="Post"
        className="w-full aspect-square object-cover"
        onDoubleClick={handleLike}
        loading="lazy"
      />

      {/* Actions */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-4">
          <button onClick={handleLike}>
            <Heart className={`h-6 w-6 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button><MessageCircle className="h-6 w-6" /></button>
          <button><Send className="h-6 w-6" /></button>
        </div>
        <button onClick={() => setSaved(!saved)}>
          <Bookmark className={`h-6 w-6 ${saved ? "fill-foreground" : ""}`} />
        </button>
      </div>

      {/* Likes */}
      <div className="px-3 text-sm font-semibold">{likeCount.toLocaleString()} likes</div>

      {/* Caption */}
      <div className="px-3 py-1 text-sm">
        <span className="font-semibold mr-1">{username}</span>
        {expanded ? caption : caption.length > 80 ? caption.slice(0, 80) + "..." : caption}
        {!expanded && caption.length > 80 && (
          <button onClick={() => setExpanded(true)} className="text-muted-foreground ml-1">more</button>
        )}
      </div>

      {/* Comments */}
      <button className="px-3 py-1 text-sm text-muted-foreground">
        View all {comments} comments
      </button>

      {/* Time */}
      <div className="px-3 pb-3 text-[10px] uppercase text-muted-foreground">{time}</div>
    </article>
  );
}
