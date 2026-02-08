const API_BASE_URL = "http://127.0.0.1:6745";
const WS_BASE_URL = "ws://127.0.0.1:6745";

export const API = {
  login: `${API_BASE_URL}/login`,
  signup: `${API_BASE_URL}/signup`,
  getStories: `${API_BASE_URL}/getStories`,
  getConversations: `${API_BASE_URL}/getConversations`,
  getMessages: `${API_BASE_URL}/getMessages`,
  ws: (userId: string) => `${WS_BASE_URL}/ws?userid=${userId}`,
};

export function getAuthHeaders(): Record<string, string> {
  const userId = localStorage.getItem("userid");
  return userId ? { userid: userId, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

export function getUserId(): string | null {
  return localStorage.getItem("userid");
}
