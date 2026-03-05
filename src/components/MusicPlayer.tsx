import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay, progress } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="h-1 bg-secondary">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img src={currentSong.cover} alt={currentSong.title} className="w-12 h-12 rounded-md object-cover" />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{currentSong.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artist.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <div className="w-24 h-1 bg-secondary rounded-full">
            <div className="w-3/4 h-full bg-muted-foreground rounded-full" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">{currentSong.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
