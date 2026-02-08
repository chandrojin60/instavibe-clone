

# Instagram Clone — Full Implementation Plan

This is a comprehensive plan to build the entire Instagram clone from scratch, with the messaging system being the most feature-rich section using your live APIs.

---

## Phase 1: Foundation & Layout

### App Shell & Routing
- Set up routes: `/`, `/search`, `/reels`, `/messages`, `/messages/:chatId`, `/profile`, `/notifications`, `/create`, `/login`, `/signup`
- Create responsive layout component:
  - **Mobile**: Bottom tab bar (Home, Search, Reels, Create, Profile) + top header with logo, heart icon, and messages icon
  - **Desktop**: Left sidebar navigation with icons + labels, main content area centered with max-width

### Theme System
- Implement dark/light mode toggle using `next-themes` (already installed)
- Instagram-accurate color tokens for both themes (white/black backgrounds, proper grays, blue accent)

### Auth Context & API Layer
- Create `src/lib/api.ts` with base URL config (single place to change `http://127.0.0.1:6745`)
- Create `src/contexts/AuthContext.tsx` managing login state from localStorage `userid`
- Protected route wrapper that redirects to `/login` if not authenticated

---

## Phase 2: Authentication Pages

### Login Page
- Instagram-style centered card with phone mockup on desktop
- Username & password fields, login button
- "Don't have an account? Sign up" link
- Calls `POST /login`, stores token as `userid` in localStorage
- Error handling for invalid credentials

### Signup Page
- Fields: email, display name, username, password
- Calls `POST /signup`, auto-login on success
- "Already have an account? Log in" link

---

## Phase 3: Home Feed (Mock Data)

### Stories Bar
- Horizontal scrollable row of story circles with gradient ring
- "Your Story" as first item with + icon
- Calls `POST /getStories` API with mock fallback
- Tappable circles (viewer placeholder for now)

### Post Feed
- Mock post cards (8-10 posts) with:
  - User avatar + username + "..." menu
  - Post image (placeholder images from picsum.photos)
  - Action row: Heart, Comment, Share, Bookmark
  - Like count, caption with "more" truncation, "View all comments" link
  - Relative timestamp ("2h", "1d")
- Skeleton loading states

---

## Phase 4: Search / Explore (Mock Data)

- Search input at top
- Instagram-style grid: mix of 1x1 and 2x2 tiles
- Mock images from placeholder services
- Category chips (Travel, Food, Art, etc.)

---

## Phase 5: Reels (Mock Data)

- Full-screen vertical snap-scroll layout
- Mock reel cards with gradient overlay at bottom
- User info, caption, music info, like/comment/share buttons on right side
- Play/pause icon overlay

---

## Phase 6: Messages / Direct (Live API + WebSocket) ⭐

This is the core feature with full API integration.

### Services & Hooks
- `src/services/messageService.ts` — API calls for conversations and messages
- `src/hooks/useWebSocket.ts` — WebSocket connection manager with:
  - Auto-reconnection with exponential backoff (1s, 2s, 4s, 8s, 16s — max 5 attempts)
  - Connection status tracking (connecting, connected, disconnected, reconnecting)
  - Message send queue for offline messages (queued messages sent on reconnect)
  - Event-based message routing
- `src/hooks/useConversations.ts` — Fetch and manage conversation list
- `src/hooks/useMessages.ts` — Fetch and manage messages for a chat

### Conversations List Page (`/messages`)
- Header with "Messages" title and compose icon
- Search bar to filter conversations client-side
- Conversation cards showing:
  - Avatar (profile_url or generated), name, last message preview (truncated)
  - Relative timestamp, unread badge indicator, group icon for group chats
- Empty state illustration when no conversations
- Error state with retry button
- Pull-to-refresh
- Tapping a conversation navigates to `/messages/:chatId`

### Chat View Page (`/messages/:chatId`)
- Header: back arrow, avatar, name, video/phone call icons (placeholder)
- Connection status indicator (green dot = connected, yellow = reconnecting, red = disconnected)
- Message history loaded from `POST /getMessages`
- Message bubbles:
  - **Sent** (current user): right-aligned, blue/purple background
  - **Received**: left-aligned, gray background
  - Timestamp below each message or grouped
  - Group chats show sender name above received messages
- Optimistic UI: sent messages appear instantly with a "sending" indicator, confirmed when server echoes back
- Auto-scroll to newest message on load and on new incoming message
- Pull up to load older messages
- Typing indicator placeholder (animated dots)
- Message input bar at bottom with text input + send button

### WebSocket Integration
- Connect on app load when authenticated: `ws://127.0.0.1:6745/ws?userid={userId}`
- Send format: `{ action: 'sendMessagePrivate', token: { accesstoken }, payload: { receiver_id, chat_id, content_type: 'text', description } }`
- Receive handler for `action: 'newMessage'` — update chat in real-time and bump conversation in list
- Queue messages when disconnected, flush on reconnect

---

## Phase 7: Profile Page (Mock Data)

- Profile header: large avatar, username, bio text
- Stats row: posts count, followers, following (tappable)
- Edit Profile / Settings buttons
- Tab bar: Posts grid, Reels grid, Tagged grid
- Mock post grid (3-column)

---

## Phase 8: Supporting Pages (Mock Data)

### Notifications Page
- Activity list grouped by time period
- Follow requests section at top
- Like, comment, follow, mention notification types with avatars

### Create Post Page
- Image upload area placeholder
- Caption textarea, location input, tag people
- Share button (non-functional)

---

## Shared Components

- `InstagramLayout` — responsive shell with nav
- `BottomTabBar` — mobile navigation
- `SideNav` — desktop navigation
- `StoryCircle` — avatar with gradient ring
- `PostCard` — full post component
- `MessageBubble` — chat message
- `ConversationItem` — conversation list row
- `ThemeToggle` — dark/light mode switch
- `ProtectedRoute` — auth guard wrapper
- Skeleton loaders for all content types

---

## File Structure

```
src/
├── contexts/AuthContext.tsx
├── services/api.ts, messageService.ts
├── hooks/useWebSocket.ts, useConversations.ts, useMessages.ts
├── components/
│   ├── layout/ (InstagramLayout, BottomTabBar, SideNav, TopHeader)
│   ├── feed/ (PostCard, StoryBar, StoryCircle)
│   ├── messages/ (ConversationItem, MessageBubble, ChatInput, ConnectionStatus)
│   ├── profile/ (ProfileHeader, PostGrid)
│   ├── common/ (ThemeToggle, ProtectedRoute, EmptyState, ErrorState)
│   └── ui/ (existing shadcn components)
├── data/mockData.ts (all mock data in one place)
├── pages/ (Login, Signup, Home, Search, Reels, Messages, Chat, Profile, Notifications, Create)
```

