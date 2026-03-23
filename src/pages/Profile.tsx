import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2, Save, Instagram, Globe, Twitter, Edit3, X, Music, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

interface SongRow {
  id: string;
  title: string;
  genre: string;
  cover_url: string | null;
  audio_url: string;
  plays: number;
  likes: number;
  created_at: string;
}

const Profile = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [role, setRole] = useState("listener");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [mySongs, setMySongs] = useState<SongRow[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setBio(profile.bio || "");
      setInstagram(profile.instagram || "");
      setTwitter(profile.twitter || "");
      setWebsite(profile.website || "");
      setRole(profile.role || "listener");
      setAvatarPreview(profile.avatar_url);
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      const fetchSongs = async () => {
        const { data } = await supabase
          .from("songs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setMySongs(data || []);
        setLoadingSongs(false);
      };
      fetchSongs();
    }
  }, [user]);

  // Auto-open edit mode if profile is incomplete
  useEffect(() => {
    if (profile && !profile.display_name && !profile.bio) {
      setEditing(true);
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      let avatarUrl = profile?.avatar_url || null;

      if (avatarFile) {
        const path = `${user.id}/${Date.now()}-${avatarFile.name}`;
        const { error: uploadErr } = await supabase.storage.from("avatars").upload(path, avatarFile);
        if (uploadErr) throw uploadErr;
        const { data } = supabase.storage.from("avatars").getPublicUrl(path);
        avatarUrl = data.publicUrl;
      }

      const { error } = await supabase.from("profiles").update({
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl,
        instagram: instagram.trim() || null,
        twitter: twitter.trim() || null,
        website: website.trim() || null,
        role: role,
      }).eq("id", user.id);

      if (error) throw error;

      await refreshProfile();
      setEditing(false);
      setAvatarFile(null);
      toast({ title: "Perfil actualizado", description: "Tus cambios se han guardado." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-28 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Inicia sesión</h2>
          <p className="text-muted-foreground mb-6">Necesitas una cuenta para ver tu perfil.</p>
          <Link to="/login" className="inline-flex px-6 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold">Iniciar Sesión</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-border mb-4">
            {editing ? (
              <div
                onClick={() => fileRef.current?.click()}
                className="w-full h-full cursor-pointer group"
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-foreground" />
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
            ) : (
              avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
              )
            )}
          </div>

          {!editing && (
            <>
              <h1 className="font-display text-2xl font-bold">{profile?.display_name || "Sin nombre"}</h1>
              <span className="text-xs text-primary font-display font-semibold uppercase tracking-wider mt-1">
                {profile?.role === "artist" ? "Artista" : "Oyente"}
              </span>
              {profile?.bio && <p className="text-muted-foreground text-sm text-center mt-3 max-w-md">{profile.bio}</p>}

              {/* Social links */}
              <div className="flex gap-4 mt-4">
                {profile?.instagram && (
                  <a href={`https://instagram.com/${profile.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {profile?.twitter && (
                  <a href={`https://twitter.com/${profile.twitter.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {profile?.website && (
                  <a href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>

              <Button variant="outline" onClick={() => setEditing(true)} className="mt-6">
                <Edit3 className="w-4 h-4 mr-2" /> Editar perfil
              </Button>
            </>
          )}
        </div>

        {/* Edit Form */}
        {editing && (
          <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-card border border-border p-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Editar perfil</h2>
              <button type="button" onClick={() => setEditing(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Tu nombre o nombre artístico" maxLength={50} />
            </div>

            <div className="space-y-2">
              <Label>Tipo de cuenta</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="listener">Oyente</SelectItem>
                  <SelectItem value="artist">Artista</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Biografía</Label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Cuéntanos sobre ti..." maxLength={300} rows={4} />
            </div>

            <div className="space-y-4">
              <Label className="text-base">Redes sociales</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-muted-foreground shrink-0" />
                  <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@tu_usuario" />
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-muted-foreground shrink-0" />
                  <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="@tu_usuario" />
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground shrink-0" />
                  <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://tu-sitio.com" />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={saving} className="w-full h-12">
              {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</> : <><Save className="w-5 h-5" /> Guardar perfil</>}
            </Button>
          </form>
        )}

        {/* My Songs */}
        {!editing && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold">Mis canciones</h2>
              <Link to="/upload" className="text-sm text-primary font-display font-semibold hover:underline">+ Subir</Link>
            </div>

            {loadingSongs ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : mySongs.length > 0 ? (
              <div className="space-y-2">
                {mySongs.map((song) => (
                  <div key={song.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      {song.cover_url ? (
                        <img src={song.cover_url} alt={song.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-semibold text-sm truncate">{song.title}</p>
                      <p className="text-xs text-muted-foreground">{song.genre} · {song.plays} plays</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-xl bg-card border border-border">
                <Music className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Aún no has subido canciones</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
