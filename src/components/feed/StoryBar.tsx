import { mockStories } from "@/data/mockData";
import StoryCircle from "./StoryCircle";

export default function StoryBar() {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide border-b px-4 py-3">
      {mockStories.map((s) => (
        <StoryCircle key={s.user_id} name={s.name} profileUrl={s.profile_url} isSelf={s.isSelf} />
      ))}
    </div>
  );
}
