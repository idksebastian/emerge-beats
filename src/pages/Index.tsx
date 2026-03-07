import { Link } from "react-router-dom";
import { ArrowRight, Headphones, Radio, TrendingUp, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { artists, songs } from "@/lib/mock-data";
import SongCard from "@/components/SongCard";
import ArtistCard from "@/components/ArtistCard";

const Index = () => {
  const featuredArtists = artists.slice(0, 6);
  const trendingSongs = songs.slice(0, 4);
  const undergroundPicks = songs.slice(4, 8);

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            Discover underground talent
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Discover the next generation of{" "}
            <span className="text-primary glow-text">music</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            SoundSeekers connects you with emerging artists who are shaping the future of sound. No algorithms, no mainstream — just pure discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity glow-green"
            >
              <Headphones className="w-5 h-5" />
              Explore Music
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-display font-semibold hover:bg-secondary transition-colors"
            >
              Sign Up Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold">Featured Artists</h2>
            <p className="text-muted-foreground mt-1">Artists making waves in the underground</p>
          </div>
          <Link to="/explore" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="font-display text-3xl font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* Underground Radar */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Radio className="w-6 h-6 text-accent" />
          <h2 className="font-display text-3xl font-bold">Underground Radar</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {undergroundPicks.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="font-display text-3xl font-bold text-center mb-16">How SoundSeekers Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Headphones, title: "Discover", desc: "Browse curated collections of underground music across all genres and moods." },
            { icon: Radio, title: "Connect", desc: "Follow artists, save tracks, and build playlists that reflect your unique taste." },
            { icon: TrendingUp, title: "Support", desc: "Help emerging artists grow by listening, sharing, and engaging with their work." },
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

      {/* Artist of the Week */}
      <section className="container mx-auto px-6 py-10 mb-10">
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <img src={artists[3].avatar} alt={artists[3].name} className="w-full md:w-72 h-72 object-cover" />
            <div className="p-8 flex-1">
              <span className="inline-flex items-center gap-1 text-xs text-primary font-display font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3" /> Artist of the Week
              </span>
              <h2 className="font-display text-3xl font-bold mb-3">{artists[3].name}</h2>
              <p className="text-muted-foreground mb-4">{artists[3].bio}</p>
              <div className="flex gap-6 text-sm text-muted-foreground mb-6">
                <span>{(artists[3].followers / 1000).toFixed(1)}K followers</span>
                <span>{(artists[3].plays / 1000).toFixed(0)}K plays</span>
              </div>
              <Link
                to={`/artist/${artists[3].id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Listen Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
