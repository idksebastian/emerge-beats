import { useState } from "react";
import { Cloud, Sun, CloudRain, Snowflake, Wind, Smile, Frown, Zap, Heart, Moon, Coffee, ExternalLink } from "lucide-react";

interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  spotifyUrl: string;
  previewUrl?: string;
}

const moodOptions = [
  { id: "happy", label: "Feliz", icon: Smile, color: "text-yellow-400" },
  { id: "sad", label: "Triste", icon: Frown, color: "text-blue-400" },
  { id: "energetic", label: "Energético", icon: Zap, color: "text-primary" },
  { id: "romantic", label: "Romántico", icon: Heart, color: "text-pink-400" },
  { id: "relaxed", label: "Relajado", icon: Coffee, color: "text-amber-400" },
  { id: "nocturnal", label: "Nocturno", icon: Moon, color: "text-accent" },
];

const weatherOptions = [
  { id: "sunny", label: "Soleado", icon: Sun, color: "text-yellow-400" },
  { id: "cloudy", label: "Nublado", icon: Cloud, color: "text-muted-foreground" },
  { id: "rainy", label: "Lluvioso", icon: CloudRain, color: "text-blue-400" },
  { id: "snowy", label: "Nevando", icon: Snowflake, color: "text-sky-300" },
  { id: "windy", label: "Ventoso", icon: Wind, color: "text-teal-400" },
];

// Mock Spotify-style recommendations mapped to mood+weather combos
const mockRecommendations: Record<string, SpotifyTrack[]> = {
  default: [
    { id: "1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b" },
    { id: "2", title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIIb" },
    { id: "3", title: "Redbone", artist: "Childish Gambino", album: "Awaken, My Love!", cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/0wXuerDYiBnERgIpbb3TBp" },
    { id: "4", title: "Electric Feel", artist: "MGMT", album: "Oracular Spectacular", cover: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/3FtYbEfBqAlGO46NUDQSAt" },
    { id: "5", title: "Tadow", artist: "Masego & FKJ", album: "Tadow", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/4vUmTMuQqjdnXIYMdOYLbi" },
    { id: "6", title: "Nights", artist: "Frank Ocean", album: "Blonde", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/7eqoqGkKe8EEtyejnGMEBa" },
  ],
  "happy-sunny": [
    { id: "h1", title: "Walking on Sunshine", artist: "Katrina & The Waves", album: "Walking on Sunshine", cover: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/05wIrZSwuaVWhcv5FfqeH0" },
    { id: "h2", title: "Happy", artist: "Pharrell Williams", album: "G I R L", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH" },
    { id: "h3", title: "Good as Hell", artist: "Lizzo", album: "Cuz I Love You", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/6KgBpzTuTRPebChN0VTyzV" },
    { id: "h4", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/39LLxExYz6ewLAo9BRTGX1" },
    { id: "h5", title: "Sunflower", artist: "Post Malone, Swae Lee", album: "Spider-Man: Into the Spider-Verse", cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P" },
    { id: "h6", title: "On Top of the World", artist: "Imagine Dragons", album: "Night Visions", cover: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/0lHAMNU8RGiIObScrsRgmP" },
  ],
  "sad-rainy": [
    { id: "s1", title: "Someone Like You", artist: "Adele", album: "21", cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV" },
    { id: "s2", title: "Skinny Love", artist: "Bon Iver", album: "For Emma, Forever Ago", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/7sAUHsJFBV1xgvraNRgR6E" },
    { id: "s3", title: "The Night We Met", artist: "Lord Huron", album: "Strange Trails", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/0QZ5yyl6B6utIWkxeBDxQN" },
    { id: "s4", title: "Mad World", artist: "Gary Jules", album: "Trading Snakeoil for Wolftickets", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/3JOVTQ5h8HGFnDdp4VT3MP" },
    { id: "s5", title: "Liability", artist: "Lorde", album: "Melodrama", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/5P4JGmcMlya6M0nOsGbVP9" },
    { id: "s6", title: "Motion Sickness", artist: "Phoebe Bridgers", album: "Stranger in the Alps", cover: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/32J0G2MFWI0UiGLQS3GRkl" },
  ],
  "energetic-sunny": [
    { id: "e1", title: "Lose Yourself to Dance", artist: "Daft Punk", album: "Random Access Memories", cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/5CMjjywI0eZMixPeqNd75R" },
    { id: "e2", title: "Titanium", artist: "David Guetta ft. Sia", album: "Nothing but the Beat", cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/0lHAMNU8RGiIObScrsRgmP" },
    { id: "e3", title: "Stronger", artist: "Kanye West", album: "Graduation", cover: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/4fzsfWzRhPawzqhX8Qt9F3" },
    { id: "e4", title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", album: "The Heist", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/3bidbhpOYeV4knp8AIu8Xn" },
    { id: "e5", title: "Thunder", artist: "Imagine Dragons", album: "Evolve", cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/57bgtoPSgt236HzfBOd8kj" },
    { id: "e6", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", album: "Uptown Special", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS" },
  ],
  "relaxed-cloudy": [
    { id: "r1", title: "Weightless", artist: "Marconi Union", album: "Weightless", cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/1lCRw5FEZ1gPDNPzy1K4zW" },
    { id: "r2", title: "Breathe Me", artist: "Sia", album: "Colour the Small One", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/3CPjLOWVIJriBwAOELeVOA" },
    { id: "r3", title: "Sunset Lover", artist: "Petit Biscuit", album: "Presence", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/2UlN7JtFtjuAIXiSADPYZb" },
    { id: "r4", title: "Re: Stacks", artist: "Bon Iver", album: "For Emma, Forever Ago", cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/2bRcvMiD1erJnOMdIShTYK" },
    { id: "r5", title: "To Build a Home", artist: "The Cinematic Orchestra", album: "Ma Fleur", cover: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/6FXJIPkuhJrjJkp5BuLRd7" },
    { id: "r6", title: "Intro", artist: "The xx", album: "xx", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", spotifyUrl: "https://open.spotify.com/track/2usYwOwVRaOIdVCIbmI4UQ" },
  ],
};

const getRecommendations = (mood: string | null, weather: string | null): SpotifyTrack[] => {
  if (mood && weather) {
    const key = `${mood}-${weather}`;
    if (mockRecommendations[key]) return mockRecommendations[key];
  }
  if (mood === "happy") return mockRecommendations["happy-sunny"];
  if (mood === "sad") return mockRecommendations["sad-rainy"];
  if (mood === "energetic") return mockRecommendations["energetic-sunny"];
  if (mood === "relaxed") return mockRecommendations["relaxed-cloudy"];
  return mockRecommendations["default"];
};

const Recommendations = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);

  const tracks = getRecommendations(selectedMood, selectedWeather);
  const hasSelection = selectedMood || selectedWeather;

  return (
    <div className="min-h-screen pt-24 pb-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Música para tu <span className="text-primary glow-text">momento</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Selecciona tu estado de ánimo y el clima para obtener recomendaciones personalizadas en Spotify
          </p>
        </div>

        {/* Mood selector */}
        <div className="max-w-3xl mx-auto mb-8">
          <h2 className="font-display text-sm text-muted-foreground uppercase tracking-wider mb-4">¿Cómo te sientes?</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(isSelected ? null : mood.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 scale-105"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : mood.color}`} />
                  <span className={`text-xs font-display ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Weather selector */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-sm text-muted-foreground uppercase tracking-wider mb-4">¿Qué clima hace?</h2>
          <div className="grid grid-cols-5 gap-3">
            {weatherOptions.map((weather) => {
              const Icon = weather.icon;
              const isSelected = selectedWeather === weather.id;
              return (
                <button
                  key={weather.id}
                  onClick={() => setSelectedWeather(isSelected ? null : weather.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 scale-105"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : weather.color}`} />
                  <span className={`text-xs font-display ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {weather.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info banner */}
        <div className="max-w-3xl mx-auto mb-8 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-sm text-muted-foreground">
            🎵 Las canciones se abren directamente en <span className="text-primary font-display font-medium">Spotify</span>.
            {!hasSelection && " Selecciona tu mood y clima para ver recomendaciones personalizadas."}
          </p>
        </div>

        {/* Results */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl font-bold mb-6">
            {hasSelection ? "Recomendaciones para ti" : "Populares ahora"}
          </h2>
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <a
                key={track.id}
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-surface-hover transition-all group"
              >
                <span className="text-sm text-muted-foreground font-display w-6 text-center">{index + 1}</span>
                <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm truncate group-hover:text-primary transition-colors">
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist} • {track.album}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
