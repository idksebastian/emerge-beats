
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public read song-audio" ON storage.objects;
  DROP POLICY IF EXISTS "Public read song-covers" ON storage.objects;
  DROP POLICY IF EXISTS "Auth upload song-audio" ON storage.objects;
  DROP POLICY IF EXISTS "Auth upload song-covers" ON storage.objects;
  DROP POLICY IF EXISTS "Public read avatars" ON storage.objects;
  DROP POLICY IF EXISTS "Auth upload avatars" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can read song audio" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can read song covers" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload song audio" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload song covers" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can read avatars" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
END $$;

CREATE POLICY "read_song_audio" ON storage.objects FOR SELECT USING (bucket_id = 'song-audio');
CREATE POLICY "read_song_covers" ON storage.objects FOR SELECT USING (bucket_id = 'song-covers');
CREATE POLICY "read_avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "upload_song_audio" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'song-audio');
CREATE POLICY "upload_song_covers" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'song-covers');
CREATE POLICY "upload_avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "update_song_audio" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'song-audio');
CREATE POLICY "update_song_covers" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'song-covers');
CREATE POLICY "update_avatars" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars');

CREATE POLICY "delete_song_audio" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'song-audio');
CREATE POLICY "delete_song_covers" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'song-covers');
CREATE POLICY "delete_avatars" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'avatars');
