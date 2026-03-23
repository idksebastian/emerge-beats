import { Play, Heart, Music } from "lucide-react";
import { usePlayer, PlayerSong } from "@/context/PlayerContext";

interface SongCardProps {
  song: PlayerSong;
}

const SongCard = ({ song }: SongCardProps) => {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isActive = currentSong?.id === song.id;

  return (
    <div className="group rounded-xl bg-card p-3 hover:bg-muted/50 transition-all duration-300 cursor-pointer" onClick={() => playSong(song)}>
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
        {song.cover ? (
          <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-10 h-10 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-primary text-primary-foreground`}>
            <Play className="w-5 h-5 ml-0.5" />
          </div>
        </div>
        {isActive && isPlaying && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <span className="w-1 h-3 bg-primary rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-1 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
      </div>
      <h3 className="font-display font-semibold text-sm truncate">{song.title}</h3>
      <p className="text-xs text-muted-foreground truncate">{song.artistName}</p>
    </div>
  );
};

export default SongCard;
