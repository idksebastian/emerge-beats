import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

const formatTime = (s: number) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay, progress, currentTime, duration, seek, volume, setVolume, playNext, playPrev } = usePlayer();

  if (!currentSong) return null;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seek(Math.max(0, Math.min(100, pct)));
  };

  const handleVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const v = (e.clientX - rect.left) / rect.width;
    setVolume(Math.max(0, Math.min(1, v)));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
      {/* Progress bar */}
      <div className="h-1 bg-secondary cursor-pointer" onClick={handleSeek}>
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Song info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0">
            {currentSong.cover ? (
              <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">♪</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{currentSong.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artistName}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button onClick={playPrev} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button onClick={playNext} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume & time */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
          <button onClick={() => setVolume(volume > 0 ? 0 : 0.75)} className="ml-3 text-muted-foreground hover:text-foreground">
            {volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <div className="w-20 h-1 bg-secondary rounded-full cursor-pointer" onClick={handleVolume}>
            <div className="h-full bg-muted-foreground rounded-full" style={{ width: `${volume * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
