import { useState } from "react";
import { Search } from "lucide-react";
import { songs, genres, moods } from "@/lib/mock-data";
import SongCard from "@/components/SongCard";

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = songs.filter((song) => {
    const matchGenre = selectedGenre === "All" || song.genre === selectedGenre;
    const matchMood = selectedMood === "All" || song.mood === selectedMood;
    const matchSearch = search === "" || song.title.toLowerCase().includes(search.toLowerCase()) || song.artist.name.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchMood && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-28">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl font-bold mb-2">Explore Music</h1>
        <p className="text-muted-foreground mb-8">Find your next favorite underground track</p>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2 font-display">Genre</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-4 py-2 rounded-full text-sm font-display transition-all ${
                  selectedGenre === g
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-2 font-display">Mood</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMood(m)}
                className={`px-4 py-2 rounded-full text-sm font-display transition-all ${
                  selectedMood === m
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No tracks found matching your filters.</p>
            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
