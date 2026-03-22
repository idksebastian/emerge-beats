import { useState } from "react";
import { Cloud, Sun, CloudRain, Snowflake, Wind, Smile, Frown, Zap, Heart, Moon, Coffee, ExternalLink, Disc, Music2, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  spotifyUrl: string;
}

const moodOptions = [
  { id: "happy", label: "Feliz", icon: Smile, color: "text-yellow-400" },
  { id: "sad", label: "Triste", icon: Frown, color: "text-blue-400" },
  { id: "energetic", label: "Energético", icon: Zap, color: "text-primary" },
  { id: "romantic", label: "Romántico", icon: Heart, color: "text-pink-400" },
  { id: "relaxed", label: "Relajado", icon: Coffee, color: "text-amber-400" },
  { id: "nocturnal", label: "Nocturno", icon: Moon, color: "text-accent-foreground" },
];

const weatherOptions = [
  { id: "sunny", label: "Soleado", icon: Sun, color: "text-yellow-400" },
  { id: "cloudy", label: "Nublado", icon: Cloud, color: "text-muted-foreground" },
  { id: "rainy", label: "Lluvioso", icon: CloudRain, color: "text-blue-400" },
  { id: "snowy", label: "Nevando", icon: Snowflake, color: "text-sky-300" },
  { id: "windy", label: "Ventoso", icon: Wind, color: "text-teal-400" },
];

const countries = [
  "Global", "España", "México", "Argentina", "Colombia", "Chile", "USA", "UK", "Francia", "Alemania", "Japón", "Corea del Sur", "Brasil"
];

const genreOptions = [
  "Pop", "Rock", "Hip-Hop", "R&B", "Electrónica", "Jazz", "Clásica", "Reggaeton", "Indie", "Lo-fi", "Metal", "Country", "Latina"
];

// Large pool of tracks to pick random from
const trackPool: Record<string, SpotifyTrack[]> = {
  "happy": [
    { id: "1", title: "Walking on Sunshine", artist: "Katrina & The Waves", album: "Walking on Sunshine", cover: "https://i.scdn.co/image/ab67616d0000b273b8abc78ab0fdf4fee383b3f0", spotifyUrl: "https://open.spotify.com/track/05wIrZSwuaVWhcv5FfqeH0" },
    { id: "2", title: "Happy", artist: "Pharrell Williams", album: "G I R L", cover: "https://i.scdn.co/image/ab67616d0000b2738ac5768205ad97df3c14a3d0", spotifyUrl: "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH" },
    { id: "3", title: "Good as Hell", artist: "Lizzo", album: "Cuz I Love You", cover: "https://i.scdn.co/image/ab67616d0000b273bff8a0dc2d64bf8047a3a298", spotifyUrl: "https://open.spotify.com/track/6KgBpzTuTRPebChN0VTyzV" },
    { id: "4", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", cover: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946", spotifyUrl: "https://open.spotify.com/track/39LLxExYz6ewLAo9BRTGX1" },
    { id: "5", title: "Sunflower", artist: "Post Malone", album: "Spider-Verse", cover: "https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f", spotifyUrl: "https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P" },
    { id: "6", title: "Dynamite", artist: "BTS", album: "Dynamite", cover: "https://i.scdn.co/image/ab67616d0000b2731f6a2a40bb692936879db730", spotifyUrl: "https://open.spotify.com/track/4saklk6nie3yOGg0GI5UKb" },
  ],
  "sad": [
    { id: "7", title: "Someone Like You", artist: "Adele", album: "21", cover: "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300", spotifyUrl: "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV" },
    { id: "8", title: "Skinny Love", artist: "Bon Iver", album: "For Emma, Forever Ago", cover: "https://i.scdn.co/image/ab67616d0000b273d5ef43e075eed48e28898935", spotifyUrl: "https://open.spotify.com/track/7sAUHsJFBV1xgvraNRgR6E" },
    { id: "9", title: "The Night We Met", artist: "Lord Huron", album: "Strange Trails", cover: "https://i.scdn.co/image/ab67616d0000b2735c1dba30e4e81d2f3d2e9e0b", spotifyUrl: "https://open.spotify.com/track/0QZ5yyl6B6utIWkxeBDxQN" },
    { id: "10", title: "Liability", artist: "Lorde", album: "Melodrama", cover: "https://i.scdn.co/image/ab67616d0000b273a5c96e7e9cf12da5703d9c27", spotifyUrl: "https://open.spotify.com/track/5P4JGmcMlya6M0nOsGbVP9" },
    { id: "11", title: "All I Want", artist: "Kodaline", album: "In a Perfect World", cover: "https://i.scdn.co/image/ab67616d0000b273d52fd56d3e6bd0f0a42f20fa", spotifyUrl: "https://open.spotify.com/track/7BKLCZ1jbUBVqRi2FVlTVw" },
  ],
  "energetic": [
    { id: "12", title: "Lose Yourself to Dance", artist: "Daft Punk", album: "Random Access Memories", cover: "https://i.scdn.co/image/ab67616d0000b2739b9b36b0e22870b9f542d937", spotifyUrl: "https://open.spotify.com/track/5CMjjywI0eZMixPeqNd75R" },
    { id: "13", title: "Stronger", artist: "Kanye West", album: "Graduation", cover: "https://i.scdn.co/image/ab67616d0000b2732dfe0a9c6491d3e6be5698c3", spotifyUrl: "https://open.spotify.com/track/4fzsfWzRhPawzqhX8Qt9F3" },
    { id: "14", title: "Titanium", artist: "David Guetta ft. Sia", album: "Nothing but the Beat", cover: "https://i.scdn.co/image/ab67616d0000b273a3a7f38ea2033aa8b4395ce0", spotifyUrl: "https://open.spotify.com/track/0lHAMNU8RGiIObScrsRgmP" },
    { id: "15", title: "Thunder", artist: "Imagine Dragons", album: "Evolve", cover: "https://i.scdn.co/image/ab67616d0000b273bca367a0e9e8b0a7c2ba7d92", spotifyUrl: "https://open.spotify.com/track/57bgtoPSgt236HzfBOd8kj" },
    { id: "16", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", album: "Uptown Special", cover: "https://i.scdn.co/image/ab67616d0000b2739e6b3cfdd57dae8a9b9278ce", spotifyUrl: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS" },
  ],
  "romantic": [
    { id: "17", title: "Perfect", artist: "Ed Sheeran", album: "÷", cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", spotifyUrl: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v" },
    { id: "18", title: "Thinking Out Loud", artist: "Ed Sheeran", album: "x", cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", spotifyUrl: "https://open.spotify.com/track/34gCuhDGsG4bRPIf9bb02f" },
    { id: "19", title: "All of Me", artist: "John Legend", album: "Love in the Future", cover: "https://i.scdn.co/image/ab67616d0000b2733f5b00da35f82e7c09b7ee77", spotifyUrl: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a" },
    { id: "20", title: "Tadow", artist: "Masego & FKJ", album: "Tadow", cover: "https://i.scdn.co/image/ab67616d0000b273c5bfb8fc5efb5b4e9f1e0fea", spotifyUrl: "https://open.spotify.com/track/4vUmTMuQqjdnXIYMdOYLbi" },
  ],
  "relaxed": [
    { id: "21", title: "Weightless", artist: "Marconi Union", album: "Weightless", cover: "https://i.scdn.co/image/ab67616d0000b2738bd1d5c0b5bb3c6d8f8bb0b7", spotifyUrl: "https://open.spotify.com/track/1lCRw5FEZ1gPDNPzy1K4zW" },
    { id: "22", title: "Sunset Lover", artist: "Petit Biscuit", album: "Presence", cover: "https://i.scdn.co/image/ab67616d0000b2732d2fa4a16e9f0dcb15bd2a4a", spotifyUrl: "https://open.spotify.com/track/2UlN7JtFtjuAIXiSADPYZb" },
    { id: "23", title: "Re: Stacks", artist: "Bon Iver", album: "For Emma, Forever Ago", cover: "https://i.scdn.co/image/ab67616d0000b273d5ef43e075eed48e28898935", spotifyUrl: "https://open.spotify.com/track/2bRcvMiD1erJnOMdIShTYK" },
    { id: "24", title: "Intro", artist: "The xx", album: "xx", cover: "https://i.scdn.co/image/ab67616d0000b2730c64e752dec4c08362cc4dda", spotifyUrl: "https://open.spotify.com/track/2usYwOwVRaOIdVCIbmI4UQ" },
    { id: "25", title: "Breathe Me", artist: "Sia", album: "Colour the Small One", cover: "https://i.scdn.co/image/ab67616d0000b273e78e37a93d62d1a26b2e2f50", spotifyUrl: "https://open.spotify.com/track/3CPjLOWVIJriBwAOELeVOA" },
  ],
  "nocturnal": [
    { id: "26", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b" },
    { id: "27", title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", cover: "https://i.scdn.co/image/ab67616d0000b2731dcf82c64e9a3ae5e4c3685d", spotifyUrl: "https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIIb" },
    { id: "28", title: "Redbone", artist: "Childish Gambino", album: "Awaken, My Love!", cover: "https://i.scdn.co/image/ab67616d0000b273e17c0aa1cbfc742c34c77332", spotifyUrl: "https://open.spotify.com/track/0wXuerDYiBnERgIpbb3TBp" },
    { id: "29", title: "Nights", artist: "Frank Ocean", album: "Blonde", cover: "https://i.scdn.co/image/ab67616d0000b27346b3ea7b0c28d63a1d21e2fb", spotifyUrl: "https://open.spotify.com/track/7eqoqGkKe8EEtyejnGMEBa" },
    { id: "30", title: "After Dark", artist: "Mr.Kitty", album: "Time", cover: "https://i.scdn.co/image/ab67616d0000b273e16dba3e04a12b4e7f5fe66b", spotifyUrl: "https://open.spotify.com/track/2LKOHdMsL0K9KgIlr1YYmK" },
  ],
};

const getRandomTrack = (mood: string | null): SpotifyTrack | null => {
  const pool = mood && trackPool[mood] ? trackPool[mood] : Object.values(trackPool).flat();
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
};

const Recommendations = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [resultType, setResultType] = useState<"track" | "album">("track");
  const [recommendation, setRecommendation] = useState<SpotifyTrack | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleDiscover = () => {
    const track = getRandomTrack(selectedMood);
    setRecommendation(track);
    setHasSearched(true);
  };

  const handleShuffle = () => {
    handleDiscover();
  };

  return (
    <div className="min-h-screen pt-24 pb-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Música para tu <span className="text-primary">momento</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Configura tus preferencias y descubre una canción aleatoria perfecta para ti
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Mood */}
          <div>
            <h2 className="font-display text-sm text-muted-foreground uppercase tracking-wider mb-4">¿Cómo te sientes?</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.id;
                return (
                  <button key={mood.id} onClick={() => setSelectedMood(isSelected ? null : mood.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${isSelected ? "border-primary bg-primary/10 scale-105" : "border-border bg-card hover:border-muted-foreground/30"}`}>
                    <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : mood.color}`} />
                    <span className={`text-xs font-display ${isSelected ? "text-primary" : "text-foreground"}`}>{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weather */}
          <div>
            <h2 className="font-display text-sm text-muted-foreground uppercase tracking-wider mb-4">¿Qué clima hace?</h2>
            <div className="grid grid-cols-5 gap-3">
              {weatherOptions.map((weather) => {
                const Icon = weather.icon;
                const isSelected = selectedWeather === weather.id;
                return (
                  <button key={weather.id} onClick={() => setSelectedWeather(isSelected ? null : weather.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${isSelected ? "border-primary bg-primary/10 scale-105" : "border-border bg-card hover:border-muted-foreground/30"}`}>
                    <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : weather.color}`} />
                    <span className={`text-xs font-display ${isSelected ? "text-primary" : "text-foreground"}`}>{weather.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Country */}
          <div>
            <h2 className="font-display text-sm text-muted-foreground uppercase tracking-wider mb-4">País</h2>
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <button key={c} onClick={() => setSelectedCountry(c)}
                  className={`px-4 py-2 rounded-full text-sm font-display transition-all ${selectedCountry === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Genre */}
          <div>
            <h2 className="font-display text-sm text-muted-foreground uppercase tracking-wider mb-4">Género musical</h2>
            <div className="flex flex-wrap gap-2">
              {genreOptions.map((g) => (
                <button key={g} onClick={() => setSelectedGenre(selectedGenre === g ? null : g)}
                  className={`px-4 py-2 rounded-full text-sm font-display transition-all ${selectedGenre === g ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <h2 className="font-display text-sm text-muted-foreground uppercase tracking-wider mb-4">¿Qué quieres descubrir?</h2>
            <div className="flex gap-3">
              <button onClick={() => setResultType("track")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${resultType === "track" ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                <Music2 className={`w-5 h-5 ${resultType === "track" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-display text-sm ${resultType === "track" ? "text-primary" : "text-foreground"}`}>Canción</span>
              </button>
              <button onClick={() => setResultType("album")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${resultType === "album" ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                <Disc className={`w-5 h-5 ${resultType === "album" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-display text-sm ${resultType === "album" ? "text-primary" : "text-foreground"}`}>Álbum</span>
              </button>
            </div>
          </div>

          {/* Discover button */}
          <Button onClick={handleDiscover} className="w-full h-14 text-lg font-display font-semibold glow-green">
            <Shuffle className="w-5 h-5 mr-2" />
            Descubrir {resultType === "track" ? "canción" : "álbum"}
          </Button>

          {/* Result - ONE track with large cover */}
          {hasSearched && recommendation && (
            <div className="mt-8 rounded-2xl bg-card border border-border overflow-hidden animate-slide-up">
              <div className="flex flex-col items-center p-8">
                <img src={recommendation.cover} alt={recommendation.title}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover shadow-xl mb-8" />
                <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-1">{recommendation.title}</h3>
                <p className="text-muted-foreground text-lg mb-1">{recommendation.artist}</p>
                <p className="text-sm text-muted-foreground mb-8">{recommendation.album}</p>

                <div className="flex gap-4">
                  <a href={recommendation.spotifyUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1DB954] text-white font-display font-semibold hover:opacity-90 transition-opacity">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Escuchar en Spotify
                  </a>
                  <Button variant="outline" onClick={handleShuffle} className="h-14 px-6">
                    <Shuffle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {hasSearched && !recommendation && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No se encontró una recomendación. Intenta cambiar tus filtros.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
