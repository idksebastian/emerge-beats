import { Play, Heart } from "lucide-react";
import { Song } from "@/lib/mock-data";
import { usePlayer } from "@/context/PlayerContext";
import { Link } from "react-router-dom";

interface SongCardProps {
  song: Song;
}

const SongCard = ({ song }: SongCardProps) => {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isActive = currentSong?.id === song.id;

  return (
    <div className="group rounded-xl bg-card p-3 hover:bg-surface-hover transition-all duration-300 cursor-pointer">
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
        <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => playSong(song)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isActive ? "bg-primary text-primary-foreground glow-green" : "bg-primary text-primary-foreground hover:scale-110"
            }`}
          >
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        {isActive && isPlaying && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <span className="w-1 h-3 bg-primary rounded-full animate-pulse-glow" />
            <span className="w-1 h-4 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "0.2s" }} />
            <span className="w-1 h-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
      </div>
      <h3 className="font-display font-semibold text-sm truncate">{song.title}</h3>
      <Link to={`/artist/${song.artist.id}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">
        {song.artist.name}
      </Link>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">{(song.plays / 1000).toFixed(1)}K plays</span>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SongCard;
