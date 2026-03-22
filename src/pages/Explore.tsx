import { useState, useEffect } from "react";
import { Search, Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const genres = ["Todos", "Synthwave", "Lo-fi", "Industrial", "Dark Ambient", "Experimental", "Dream Pop", "Electronic", "Hip-Hop", "Rock", "Jazz", "R&B", "Classical"];

interface SongRow {
  id: string;
  title: string;
  genre: string;
  cover_url: string | null;
  plays: number;
  likes: number;
  audio_url: string;
  user_id: string;
}

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState<SongRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      let query = supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedGenre !== "Todos") {
        query = query.eq("genre", selectedGenre);
      }
      if (search.trim()) {
        query = query.ilike("title", `%${search.trim()}%`);
      }

      const { data } = await query.limit(20);
      setSongs(data || []);
      setLoading(false);
    };

    setLoading(true);
    fetchSongs();
  }, [selectedGenre, search]);

  return (
    <div className="min-h-screen pt-24 pb-28">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl font-bold mb-2">Explorar música</h1>
        <p className="text-muted-foreground mb-8">Descubre canciones de artistas emergentes</p>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input type="text" placeholder="Buscar canciones..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>

        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3 font-display">Género</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button key={g} onClick={() => setSelectedGenre(g)}
                className={`px-4 py-2 rounded-full text-sm font-display transition-all ${selectedGenre === g ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl bg-card border border-border p-3 animate-pulse">
                <div className="aspect-square rounded-lg bg-muted mb-3" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : songs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {songs.map((song) => (
              <div key={song.id} className="rounded-xl bg-card border border-border p-3 hover:border-primary/30 transition-colors">
                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
                  {song.cover_url ? (
                    <img src={song.cover_url} alt={song.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="font-display font-semibold text-sm truncate">{song.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{song.genre}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{song.genre}</span>
                  <span>{song.plays} plays</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-display">No se encontraron canciones</p>
            <p className="text-sm mt-1">Intenta con otros filtros o sé el primero en subir.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
