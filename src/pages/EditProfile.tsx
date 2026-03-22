import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2, Save, Instagram, Globe, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const EditProfile = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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
      setAvatarPreview(profile.avatar_url);
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
      }).eq("id", user.id);

      if (error) throw error;

      await refreshProfile();
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

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-xl">
        <h1 className="font-display text-3xl font-bold mb-8">Editar perfil</h1>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border cursor-pointer group"
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
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            <p className="text-xs text-muted-foreground mt-2">Click para cambiar foto</p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Tu nombre o nombre artístico" maxLength={50} />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label>Biografía</Label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Cuéntanos sobre ti..." maxLength={300} rows={4} />
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <Label className="text-base">Redes sociales</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-muted-foreground" />
                <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@tu_usuario" />
              </div>
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-muted-foreground" />
                <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="@tu_usuario" />
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://tu-sitio.com" />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={saving} className="w-full h-12">
            {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</> : <><Save className="w-5 h-5" /> Guardar perfil</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
