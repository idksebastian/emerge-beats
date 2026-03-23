import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "@/context/PlayerContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";
import UploadSong from "./pages/UploadSong";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PlayerProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<Profile />} />
              <Route path="/upload" element={<UploadSong />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MusicPlayer />
          </BrowserRouter>
        </PlayerProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
