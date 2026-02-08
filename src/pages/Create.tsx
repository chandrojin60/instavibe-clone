import { ImagePlus, MapPin, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreatePage() {
  return (
    <div className="px-4 py-4">
      <h1 className="text-lg font-semibold mb-4">New Post</h1>

      <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-64 mb-4 bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
        <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Tap to upload a photo</p>
      </div>

      <Textarea placeholder="Write a caption..." className="mb-3 resize-none bg-secondary" rows={3} />

      <div className="flex flex-col gap-3 border-t pt-3">
        <button className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm">Add location</span>
          </div>
        </button>
        <button className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5" />
            <span className="text-sm">Tag people</span>
          </div>
        </button>
      </div>

      <Button className="w-full mt-4 font-semibold">Share</Button>
    </div>
  );
}
