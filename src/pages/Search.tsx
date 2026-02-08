import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockExploreImages, exploreCategories } from "@/data/mockData";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("For You");

  return (
    <div>
      <div className="sticky top-0 z-10 bg-background p-3 md:pt-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-9 bg-secondary rounded-lg text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-3">
          {exploreCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeCategory === cat ? "bg-foreground text-background" : "bg-secondary text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {mockExploreImages.map((img) => (
          <div key={img.id} className={img.span}>
            <img src={img.src} alt="" className="w-full h-full object-cover aspect-square" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
