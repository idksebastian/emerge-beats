
-- Create songs table
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT NOT NULL,
  cover_url TEXT,
  audio_url TEXT NOT NULL,
  plays INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Anyone can view songs
CREATE POLICY "Songs are viewable by everyone" ON public.songs FOR SELECT USING (true);

-- Users can insert their own songs
CREATE POLICY "Users can upload songs" ON public.songs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own songs
CREATE POLICY "Users can update their own songs" ON public.songs FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own songs
CREATE POLICY "Users can delete their own songs" ON public.songs FOR DELETE USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_songs_updated_at
  BEFORE UPDATE ON public.songs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('song-covers', 'song-covers', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('song-audio', 'song-audio', true);

-- Storage policies for covers
CREATE POLICY "Cover images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'song-covers');
CREATE POLICY "Users can upload covers" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'song-covers' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their covers" ON storage.objects FOR UPDATE USING (bucket_id = 'song-covers' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their covers" ON storage.objects FOR DELETE USING (bucket_id = 'song-covers' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for audio
CREATE POLICY "Audio files are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'song-audio');
CREATE POLICY "Users can upload audio" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'song-audio' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their audio" ON storage.objects FOR UPDATE USING (bucket_id = 'song-audio' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their audio" ON storage.objects FOR DELETE USING (bucket_id = 'song-audio' AND auth.uid()::text = (storage.foldername(name))[1]);
