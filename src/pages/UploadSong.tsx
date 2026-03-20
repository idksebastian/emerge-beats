import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Music, Image, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GENRES = ["Synthwave", "Lo-fi", "Industrial", "Dark Ambient", "Experimental", "Dream Pop", "Electronic", "Hip-Hop", "Rock", "Jazz", "R&B", "Classical"];

const UploadSong = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAudioFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !genre || !audioFile) {
      toast({ title: "Campos requeridos", description: "Título, género y archivo de audio son obligatorios.", variant: "destructive" });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Sesión requerida", description: "Debes iniciar sesión para subir canciones.", variant: "destructive" });
        setUploading(false);
        return;
      }

      const userId = user.id;
      const timestamp = Date.now();

      // Upload audio
      const audioPath = `${userId}/${timestamp}-${audioFile.name}`;
      const { error: audioError } = await supabase.storage.from("song-audio").upload(audioPath, audioFile);
      if (audioError) throw audioError;

      const { data: audioUrlData } = supabase.storage.from("song-audio").getPublicUrl(audioPath);

      // Upload cover if provided
      let coverUrl: string | null = null;
      if (coverFile) {
        const coverPath = `${userId}/${timestamp}-${coverFile.name}`;
        const { error: coverError } = await supabase.storage.from("song-covers").upload(coverPath, coverFile);
        if (coverError) throw coverError;
        const { data: coverUrlData } = supabase.storage.from("song-covers").getPublicUrl(coverPath);
        coverUrl = coverUrlData.publicUrl;
      }

      // Insert song record
      const { error: insertError } = await supabase.from("songs").insert({
        user_id: userId,
        title: title.trim(),
        description: description.trim() || null,
        genre,
        audio_url: audioUrlData.publicUrl,
        cover_url: coverUrl,
      });

      if (insertError) throw insertError;

      toast({ title: "¡Canción subida!", description: "Tu canción se ha publicado correctamente." });
      navigate("/explore");
    } catch (err: any) {
      toast({ title: "Error al subir", description: err.message || "Ocurrió un error inesperado.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold leading-[1.1] mb-2">Subir canción</h1>
          <p className="text-muted-foreground">Comparte tu música con el mundo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cover upload */}
          <div className="space-y-2">
            <Label>Portada</Label>
            <div
              onClick={() => coverInputRef.current?.click()}
              className="relative group cursor-pointer rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-colors overflow-hidden aspect-square max-w-[240px]"
            >
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                  <Image className="w-10 h-10" />
                  <span className="text-sm font-medium">Agregar portada</span>
                </div>
              )}
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input id="title" placeholder="Nombre de tu canción" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" placeholder="Cuéntanos sobre esta canción..." value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} rows={3} />
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <Label>Género *</Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un género" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Audio upload */}
          <div className="space-y-2">
            <Label>Archivo de audio *</Label>
            <div
              onClick={() => audioInputRef.current?.click()}
              className="cursor-pointer rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors p-6"
            >
              {audioFile ? (
                <div className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium truncate">{audioFile.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{(audioFile.size / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Music className="w-8 h-8" />
                  <span className="text-sm font-medium">Seleccionar archivo de audio</span>
                  <span className="text-xs">MP3, WAV, FLAC · máx. 50MB</span>
                </div>
              )}
              <input ref={audioInputRef} type="file" accept="audio/*" className="hidden" onChange={handleAudioChange} />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={uploading} className="w-full h-12 text-base font-semibold">
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Publicar canción
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadSong;
