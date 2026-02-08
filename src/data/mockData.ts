export const mockStories = [
  { user_id: "self", name: "Your Story", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=You", isSelf: true },
  { user_id: "1", name: "alex_travel", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { user_id: "2", name: "foodie_maya", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya" },
  { user_id: "3", name: "john_dev", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { user_id: "4", name: "sarah_art", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { user_id: "5", name: "mike_fit", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { user_id: "6", name: "luna_cat", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna" },
  { user_id: "7", name: "chris_music", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris" },
  { user_id: "8", name: "emma_photo", profile_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
];

export const mockPosts = [
  {
    id: "p1", userId: "1", username: "alex_travel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    image: "https://picsum.photos/seed/travel1/600/600", caption: "Exploring the beautiful streets of Tokyo 🇯🇵✨ #travel #tokyo #wanderlust",
    likes: 1243, comments: 89, time: "2h",
  },
  {
    id: "p2", userId: "2", username: "foodie_maya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    image: "https://picsum.photos/seed/food1/600/600", caption: "Homemade pasta from scratch 🍝 Recipe in bio!",
    likes: 892, comments: 56, time: "4h",
  },
  {
    id: "p3", userId: "3", username: "john_dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    image: "https://picsum.photos/seed/code1/600/600", caption: "Late night coding sessions hit different 💻🌙",
    likes: 567, comments: 34, time: "6h",
  },
  {
    id: "p4", userId: "4", username: "sarah_art", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    image: "https://picsum.photos/seed/art1/600/600", caption: "New digital painting! What do you think? 🎨",
    likes: 2341, comments: 156, time: "8h",
  },
  {
    id: "p5", userId: "5", username: "mike_fit", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    image: "https://picsum.photos/seed/fitness1/600/600", caption: "Leg day never skipped 💪🏋️ #fitness #gym",
    likes: 445, comments: 23, time: "12h",
  },
  {
    id: "p6", userId: "6", username: "luna_cat", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    image: "https://picsum.photos/seed/cat1/600/600", caption: "Someone is being extra cute today 🐱❤️",
    likes: 3456, comments: 201, time: "1d",
  },
  {
    id: "p7", userId: "7", username: "chris_music", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
    image: "https://picsum.photos/seed/music1/600/600", caption: "New track dropping Friday 🎵🔥 Stay tuned!",
    likes: 1890, comments: 112, time: "1d",
  },
  {
    id: "p8", userId: "8", username: "emma_photo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    image: "https://picsum.photos/seed/sunset1/600/600", caption: "Golden hour magic ✨📸 #photography #sunset",
    likes: 2100, comments: 78, time: "2d",
  },
];

export const mockExploreImages = [
  { id: "e1", src: "https://picsum.photos/seed/explore1/400/400", span: "col-span-1" },
  { id: "e2", src: "https://picsum.photos/seed/explore2/400/400", span: "col-span-1" },
  { id: "e3", src: "https://picsum.photos/seed/explore3/400/800", span: "col-span-1 row-span-2" },
  { id: "e4", src: "https://picsum.photos/seed/explore4/400/400", span: "col-span-1" },
  { id: "e5", src: "https://picsum.photos/seed/explore5/400/400", span: "col-span-1" },
  { id: "e6", src: "https://picsum.photos/seed/explore6/400/400", span: "col-span-1" },
  { id: "e7", src: "https://picsum.photos/seed/explore7/400/800", span: "col-span-1 row-span-2" },
  { id: "e8", src: "https://picsum.photos/seed/explore8/400/400", span: "col-span-1" },
  { id: "e9", src: "https://picsum.photos/seed/explore9/400/400", span: "col-span-1" },
  { id: "e10", src: "https://picsum.photos/seed/explore10/400/400", span: "col-span-1" },
  { id: "e11", src: "https://picsum.photos/seed/explore11/400/400", span: "col-span-1" },
  { id: "e12", src: "https://picsum.photos/seed/explore12/400/400", span: "col-span-1" },
];

export const exploreCategories = ["For You", "Travel", "Architecture", "Food", "Art", "Music", "Nature", "Fitness", "Fashion"];

export const mockReels = [
  { id: "r1", username: "dance_queen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dance", caption: "New choreography 💃🔥 #dance #viral", music: "Original Audio - dance_queen", likes: "45.2K", comments: "1.2K", thumbnail: "https://picsum.photos/seed/reel1/400/700" },
  { id: "r2", username: "comedy_king", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Comedy", caption: "POV: When your code finally works 😂", music: "Funny Sound - Trending", likes: "120K", comments: "5.6K", thumbnail: "https://picsum.photos/seed/reel2/400/700" },
  { id: "r3", username: "cooking_daily", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cook", caption: "60 second recipe: Garlic Butter Shrimp 🍤", music: "Cooking Vibes - cooking_daily", likes: "89.1K", comments: "3.4K", thumbnail: "https://picsum.photos/seed/reel3/400/700" },
  { id: "r4", username: "nature_clips", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nature", caption: "The most beautiful waterfall I've ever seen 🌊", music: "Nature Sounds - Ambient", likes: "200K", comments: "8.9K", thumbnail: "https://picsum.photos/seed/reel4/400/700" },
  { id: "r5", username: "tech_tips", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech", caption: "iPhone trick you didn't know about 📱", music: "Tech Beat - trending", likes: "67.3K", comments: "2.1K", thumbnail: "https://picsum.photos/seed/reel5/400/700" },
];

export const mockNotifications = [
  { id: "n1", type: "like" as const, username: "alex_travel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", text: "liked your photo.", time: "2m", postThumb: "https://picsum.photos/seed/noti1/40/40" },
  { id: "n2", type: "follow" as const, username: "sarah_art", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", text: "started following you.", time: "15m", isFollowing: false },
  { id: "n3", type: "comment" as const, username: "john_dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John", text: 'commented: "This is amazing! 🔥"', time: "1h", postThumb: "https://picsum.photos/seed/noti3/40/40" },
  { id: "n4", type: "like" as const, username: "maya_food", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya", text: "liked your photo.", time: "3h", postThumb: "https://picsum.photos/seed/noti4/40/40" },
  { id: "n5", type: "follow" as const, username: "chris_music", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris", text: "started following you.", time: "5h", isFollowing: true },
  { id: "n6", type: "mention" as const, username: "emma_photo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", text: "mentioned you in a comment.", time: "1d", postThumb: "https://picsum.photos/seed/noti6/40/40" },
  { id: "n7", type: "like" as const, username: "mike_fit", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", text: "liked your reel.", time: "2d", postThumb: "https://picsum.photos/seed/noti7/40/40" },
];

export const mockProfilePosts = Array.from({ length: 12 }, (_, i) => ({
  id: `pp${i}`,
  src: `https://picsum.photos/seed/profile${i}/400/400`,
  likes: Math.floor(Math.random() * 5000),
  comments: Math.floor(Math.random() * 200),
}));

export const mockProfile = {
  username: "your_username",
  displayName: "Your Name",
  bio: "📸 Photography | 🌍 Travel | 💻 Code\nLiving life one pixel at a time ✨",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
  posts: 142,
  followers: 12500,
  following: 890,
};
