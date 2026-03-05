import { useParams } from "react-router-dom";
import { artists, songs } from "@/lib/mock-data";
import { BadgeCheck, Play, Heart, Users, Disc3 } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

const ArtistProfile = () => {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === id);
  const artistSongs = songs.filter((s) => s.artist.id === id);
  const { playSong, currentSong, isPlaying } = usePlayer();

  if (!artist) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-28">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
          <img src={artist.avatar} alt={artist.name} className="w-48 h-48 rounded-full object-cover ring-4 ring-primary/20" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-primary font-display uppercase tracking-wider">Artist</span>
              {artist.isVerified && <BadgeCheck className="w-4 h-4 text-primary" />}
            </div>
            <h1 className="font-display text-5xl font-bold mb-2">{artist.name}</h1>
            <p className="text-muted-foreground max-w-lg mb-4">{artist.bio}</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {(artist.followers / 1000).toFixed(1)}K followers</span>
              <span className="flex items-center gap-1"><Disc3 className="w-4 h-4" /> {artistSongs.length} tracks</span>
              <span>{(artist.plays / 1000).toFixed(0)}K total plays</span>
            </div>
          </div>
        </div>
      </div>

      {/* Songs */}
      <div className="container mx-auto px-6">
        <h2 className="font-display text-2xl font-bold mb-6">Tracks</h2>
        <div className="flex flex-col gap-2">
          {artistSongs.map((song, idx) => {
            const isActive = currentSong?.id === song.id;
            return (
              <div
                key={song.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors cursor-pointer ${
                  isActive ? "bg-primary/10" : "hover:bg-card"
                }`}
                onClick={() => playSong(song)}
              >
                <span className="text-sm text-muted-foreground w-6 text-right font-display">
                  {isActive && isPlaying ? (
                    <span className="text-primary">▶</span>
                  ) : (
                    idx + 1
                  )}
                </span>
                <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? "text-primary" : ""}`}>{song.title}</p>
                  <p className="text-xs text-muted-foreground">{song.genre} · {song.mood}</p>
                </div>
                <span className="text-xs text-muted-foreground hidden md:block">{(song.plays / 1000).toFixed(1)}K</span>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <span className="text-xs text-muted-foreground">{song.duration}</span>
              </div>
            );
          })}
        </div>

        {artistSongs.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No tracks yet.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;
