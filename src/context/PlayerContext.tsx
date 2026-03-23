import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

export interface PlayerSong {
  id: string;
  title: string;
  artistName: string;
  cover: string | null;
  audioUrl: string;
  duration?: string;
}

interface PlayerState {
  currentSong: PlayerSong | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  volume: number;
  playSong: (song: PlayerSong) => void;
  togglePlay: () => void;
  seek: (pct: number) => void;
  setVolume: (v: number) => void;
  queue: PlayerSong[];
  setQueue: (songs: PlayerSong[]) => void;
  playNext: () => void;
  playPrev: () => void;
}

const PlayerContext = createContext<PlayerState | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.75);
  const [queue, setQueue] = useState<PlayerSong[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    });
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      // auto next
      playNextInternal();
    });

    return () => { audio.pause(); audio.src = ""; };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playNextInternal = () => {
    if (queue.length === 0) return;
    const idx = queue.findIndex(s => s.id === currentSong?.id);
    if (idx >= 0 && idx < queue.length - 1) {
      playSongInternal(queue[idx + 1]);
    }
  };

  const playSongInternal = (song: PlayerSong) => {
    if (!audioRef.current) return;
    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const playSong = (song: PlayerSong) => {
    playSongInternal(song);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const seek = (pct: number) => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = (pct / 100) * duration;
  };

  const setVolume = (v: number) => setVolumeState(v);

  const playNext = () => {
    if (queue.length === 0) return;
    const idx = queue.findIndex(s => s.id === currentSong?.id);
    if (idx >= 0 && idx < queue.length - 1) playSongInternal(queue[idx + 1]);
  };

  const playPrev = () => {
    if (queue.length === 0) return;
    const idx = queue.findIndex(s => s.id === currentSong?.id);
    if (idx > 0) playSongInternal(queue[idx - 1]);
  };

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, progress, duration, currentTime, volume, playSong, togglePlay, seek, setVolume, queue, setQueue, playNext, playPrev }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};
