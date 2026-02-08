import { useState } from "react";
import { Heart, MessageCircle, Send, Music, Play } from "lucide-react";
import { mockReels } from "@/data/mockData";

export default function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="h-[calc(100vh-100px)] md:h-screen overflow-y-auto snap-y-mandatory scrollbar-hide">
      {mockReels.map((reel) => (
        <div key={reel.id} className="relative h-[calc(100vh-100px)] md:h-screen snap-start">
          {/* Background image */}
          <img src={reel.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Play icon center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-16 w-16 text-white/30" fill="white" fillOpacity={0.3} />
          </div>

          {/* Right side actions */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
            <button className="flex flex-col items-center gap-1">
              <Heart className="h-7 w-7 text-white" />
              <span className="text-xs text-white font-semibold">{reel.likes}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <MessageCircle className="h-7 w-7 text-white" />
              <span className="text-xs text-white font-semibold">{reel.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Send className="h-7 w-7 text-white" />
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-4 left-3 right-16">
            <div className="flex items-center gap-2 mb-2">
              <img src={reel.avatar} alt={reel.username} className="h-8 w-8 rounded-full" />
              <span className="text-white text-sm font-semibold">{reel.username}</span>
              <button className="border border-white rounded px-2 py-0.5 text-xs text-white font-semibold">Follow</button>
            </div>
            <p className="text-white text-sm mb-2">{reel.caption}</p>
            <div className="flex items-center gap-2">
              <Music className="h-3 w-3 text-white" />
              <span className="text-white text-xs">{reel.music}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
