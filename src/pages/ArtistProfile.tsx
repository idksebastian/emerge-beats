import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePlayer, PlayerSong } from "@/context/PlayerContext";
import { Play, Music, Instagram, Twitter, Globe, Loader2 } from "lucide-react";

interface ProfileData {
  id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
}

interface SongRow {
  id: string;
  title: string;
  genre: string;
  cover_url: string | null;
  audio_url: string;
  plays: number;
}

const ArtistProfile = () => {
  const { id } = useParams();
  const { playSong, setQueue, currentSong, isPlaying } = usePlayer();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [songs, setSongs] = useState<SongRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const [{ data: p }, { data: s }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", id).single(),
        supabase.from("songs").select("*").eq("user_id", id).order("created_at", { ascending: false }),
      ]);
      setProfile(p as ProfileData | null);
      setSongs(s || []);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-24 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (!profile) return <div className="min-h-screen pt-24 flex items-center justify-center"><p className="text-muted-foreground">Artista no encontrado.</p></div>;

  const handlePlay = (song: SongRow) => {
    const ps: PlayerSong = { id: song.id, title: song.title, artistName: profile.display_name || "Artista", cover: song.cover_url, audioUrl: song.audio_url };
    setQueue(songs.map(s => ({ id: s.id, title: s.title, artistName: profile.display_name || "Artista", cover: s.cover_url, audioUrl: s.audio_url })));
    playSong(ps);
  };

  return (
    <div className="min-h-screen pt-24 pb-28">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border mb-4">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center"><Music className="w-8 h-8 text-muted-foreground" /></div>
            )}
          </div>
          <h1 className="font-display text-2xl font-bold">{profile.display_name || "Artista"}</h1>
          {profile.bio && <p className="text-muted-foreground text-sm text-center mt-2 max-w-md">{profile.bio}</p>}
          <div className="flex gap-4 mt-3">
            {profile.instagram && <a href={`https://instagram.com/${profile.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground"><Instagram className="w-5 h-5" /></a>}
            {profile.twitter && <a href={`https://twitter.com/${profile.twitter.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground"><Twitter className="w-5 h-5" /></a>}
            {profile.website && <a href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground"><Globe className="w-5 h-5" /></a>}
          </div>
        </div>

        <h2 className="font-display text-lg font-bold mb-4">Canciones</h2>
        {songs.length > 0 ? (
          <div className="space-y-2">
            {songs.map((song, idx) => {
              const isActive = currentSong?.id === song.id;
              return (
                <div key={song.id} onClick={() => handlePlay(song)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isActive ? "bg-primary/10" : "hover:bg-card"}`}>
                  <span className="text-sm text-muted-foreground w-6 text-right font-display">
                    {isActive && isPlaying ? <span className="text-primary">▶</span> : idx + 1}
                  </span>
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-muted shrink-0">
                    {song.cover_url ? <img src={song.cover_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Music className="w-4 h-4 text-muted-foreground" /></div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold truncate ${isActive ? "text-primary" : ""}`}>{song.title}</p>
                    <p className="text-xs text-muted-foreground">{song.genre}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{song.plays} plays</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">Aún no hay canciones.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;
