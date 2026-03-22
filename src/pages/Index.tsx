import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Music, Radio, TrendingUp, Sparkles, Headphones } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SongRow {
  id: string;
  title: string;
  genre: string;
  cover_url: string | null;
  plays: number;
  likes: number;
  user_id: string;
  created_at: string;
  profiles?: { display_name: string | null; avatar_url: string | null } | null;
}

const Index = () => {
  const [recentSongs, setRecentSongs] = useState<SongRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await supabase
        .from("songs")
        .select("*, profiles:user_id(display_name, avatar_url)")
        .order("created_at", { ascending: false })
        .limit(8);
      setRecentSongs((data as SongRow[]) || []);
      setLoading(false);
    };
    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen pb-24 pt-20">
      {/* Welcome banner */}
      <section className="container mx-auto px-6 py-12">
        <div className="rounded-2xl bg-card border border-border p-8 md:p-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            Plataforma de descubrimiento musical
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a <span className="text-primary">SoundSeekers</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Descubre música de artistas emergentes. Sube tus canciones, conecta con nuevos oyentes y explora sonidos únicos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity glow-green">
              <Headphones className="w-5 h-5" /> Explorar música
            </Link>
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-display font-semibold hover:bg-secondary transition-colors">
              Registrarse <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent songs from DB */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="font-display text-2xl font-bold">Canciones recientes</h2>
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
        ) : recentSongs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentSongs.map((song) => (
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
                <p className="text-xs text-muted-foreground truncate">
                  {(song.profiles as any)?.display_name || "Artista"}
                </p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{song.genre}</span>
                  <span>{song.plays} plays</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-card border border-border">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold mb-2">Aún no hay canciones</h3>
            <p className="text-muted-foreground text-sm mb-6">Sé el primero en compartir tu música</p>
            <Link to="/upload" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm">
              Subir canción <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-center mb-12">Cómo funciona</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Headphones, title: "Descubre", desc: "Explora canciones de artistas emergentes de todo el mundo." },
            { icon: Radio, title: "Conecta", desc: "Sigue artistas, guarda canciones y crea tu colección." },
            { icon: TrendingUp, title: "Apoya", desc: "Ayuda a artistas emergentes escuchando y compartiendo." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
