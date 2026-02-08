import StoryBar from "@/components/feed/StoryBar";
import PostCard from "@/components/feed/PostCard";
import { mockPosts } from "@/data/mockData";

export default function HomePage() {
  return (
    <div>
      <StoryBar />
      <div>
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            username={post.username}
            avatar={post.avatar}
            image={post.image}
            caption={post.caption}
            likes={post.likes}
            comments={post.comments}
            time={post.time}
          />
        ))}
      </div>
    </div>
  );
}
