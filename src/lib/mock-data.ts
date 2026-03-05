export interface Artist {
  id: string;
  name: string;
  genre: string;
  bio: string;
  avatar: string;
  followers: number;
  plays: number;
  isVerified?: boolean;
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  cover: string;
  duration: string;
  plays: number;
  likes: number;
  genre: string;
  mood: string;
}

export const artists: Artist[] = [
  { id: "1", name: "Luna Veil", genre: "Synthwave", bio: "Creating ethereal soundscapes from the depths of the underground electronic scene.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop", followers: 12400, plays: 89000, isVerified: true },
  { id: "2", name: "Nox Aurelia", genre: "Dark Ambient", bio: "Blending classical training with dark electronic textures.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop", followers: 8900, plays: 54000 },
  { id: "3", name: "KVLT", genre: "Industrial", bio: "Raw, unfiltered industrial noise from Berlin's underground.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop", followers: 23000, plays: 120000, isVerified: true },
  { id: "4", name: "Aether Child", genre: "Lo-fi", bio: "Dreamy lo-fi beats for late night contemplation.", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop", followers: 45000, plays: 340000 },
  { id: "5", name: "Cipher Ghost", genre: "Experimental", bio: "Pushing the boundaries of sound design and composition.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop", followers: 6700, plays: 31000 },
  { id: "6", name: "Velvet Static", genre: "Dream Pop", bio: "Shoegaze-inspired dream pop with a modern edge.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop", followers: 15800, plays: 98000 },
];

export const songs: Song[] = [
  { id: "1", title: "Midnight Protocol", artist: artists[0], cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop", duration: "3:42", plays: 24500, likes: 1890, genre: "Synthwave", mood: "Energetic" },
  { id: "2", title: "Shadows in Chrome", artist: artists[2], cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop", duration: "4:18", plays: 18200, likes: 1420, genre: "Industrial", mood: "Dark" },
  { id: "3", title: "Floating Gardens", artist: artists[3], cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop", duration: "2:55", plays: 67800, likes: 5200, genre: "Lo-fi", mood: "Chill" },
  { id: "4", title: "Neon Cathedral", artist: artists[0], cover: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=300&fit=crop", duration: "5:01", plays: 31200, likes: 2800, genre: "Synthwave", mood: "Energetic" },
  { id: "5", title: "Dissolve", artist: artists[1], cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", duration: "6:33", plays: 9800, likes: 890, genre: "Dark Ambient", mood: "Melancholic" },
  { id: "6", title: "Ghost Frequency", artist: artists[4], cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", duration: "4:47", plays: 12300, likes: 1100, genre: "Experimental", mood: "Dark" },
  { id: "7", title: "Lavender Haze", artist: artists[5], cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", duration: "3:28", plays: 45600, likes: 3900, genre: "Dream Pop", mood: "Dreamy" },
  { id: "8", title: "Binary Sunset", artist: artists[3], cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", duration: "3:15", plays: 52100, likes: 4100, genre: "Lo-fi", mood: "Chill" },
];

export const genres = ["All", "Synthwave", "Lo-fi", "Industrial", "Dark Ambient", "Experimental", "Dream Pop", "Electronic", "Hip-Hop"];
export const moods = ["All", "Energetic", "Chill", "Dark", "Melancholic", "Dreamy", "Uplifting"];
