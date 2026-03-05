import { Link } from "react-router-dom";
import { Artist } from "@/lib/mock-data";
import { BadgeCheck } from "lucide-react";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link to={`/artist/${artist.id}`} className="group text-center">
      <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all duration-300">
        <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="font-display font-semibold text-sm flex items-center justify-center gap-1">
        {artist.name}
        {artist.isVerified && <BadgeCheck className="w-4 h-4 text-primary" />}
      </h3>
      <p className="text-xs text-muted-foreground">{artist.genre}</p>
    </Link>
  );
};

export default ArtistCard;
