import { useState } from "react";
import { Grid3X3, Film, Bookmark, Settings } from "lucide-react";
import { mockProfile, mockProfilePosts } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "reels" | "tagged">("posts");
  const { logout } = useAuth();

  const tabs = [
    { id: "posts" as const, icon: Grid3X3 },
    { id: "reels" as const, icon: Film },
    { id: "tagged" as const, icon: Bookmark },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 md:hidden">
        <span className="text-lg font-semibold">{mockProfile.username}</span>
        <button onClick={logout}><Settings className="h-6 w-6" /></button>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-6 mb-4">
          <img src={mockProfile.avatar} alt="" className="h-20 w-20 rounded-full md:h-[150px] md:w-[150px]" />
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3 flex-wrap">
              <span className="text-xl font-normal">{mockProfile.username}</span>
              <button className="bg-secondary px-4 py-1.5 rounded-lg text-sm font-semibold">Edit profile</button>
            </div>
            <div className="flex gap-6 text-sm">
              <span><strong>{mockProfile.posts}</strong> posts</span>
              <span><strong>{mockProfile.followers.toLocaleString()}</strong> followers</span>
              <span><strong>{mockProfile.following}</strong> following</span>
            </div>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">{mockProfile.displayName}</p>
          <p className="whitespace-pre-line text-sm">{mockProfile.bio}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex justify-center py-3 border-b-[1px] transition-colors ${
              activeTab === id ? "border-foreground" : "border-transparent text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {mockProfilePosts.map((post) => (
          <div key={post.id} className="aspect-square relative group cursor-pointer">
            <img src={post.src} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
              <span className="text-white text-sm font-semibold">❤️ {post.likes}</span>
              <span className="text-white text-sm font-semibold">💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
