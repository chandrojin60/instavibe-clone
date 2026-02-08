import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import InstagramLayout from "@/components/layout/InstagramLayout";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import HomePage from "@/pages/Home";
import SearchPage from "@/pages/Search";
import ReelsPage from "@/pages/Reels";
import MessagesPage from "@/pages/Messages";
import ChatPage from "@/pages/Chat";
import ProfilePage from "@/pages/Profile";
import NotificationsPage from "@/pages/Notifications";
import CreatePage from "@/pages/Create";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route element={<ProtectedRoute><InstagramLayout /></ProtectedRoute>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/reels" element={<ReelsPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/messages/:chatId" element={<ChatPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/create" element={<CreatePage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
