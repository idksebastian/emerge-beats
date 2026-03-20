import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "@/context/PlayerContext";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendations from "./pages/Recommendations";
import ArtistProfile from "./pages/ArtistProfile";
import UploadSong from "./pages/UploadSong";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
            <Route path="/artist/:id" element={<ArtistProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MusicPlayer />
        </BrowserRouter>
      </PlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
