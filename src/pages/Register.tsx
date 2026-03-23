import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Music, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Contraseña débil", description: "La contraseña debe tener al menos 8 caracteres.", variant: "destructive" });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
      },
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "¡Cuenta creada!", description: "Bienvenido a SoundSeekers." });
    navigate("/profile");
  };

  const passwordChecks = [
    { label: "Al menos 8 caracteres", valid: password.length >= 8 },
    { label: "Una mayúscula", valid: /[A-Z]/.test(password) },
    { label: "Un número", valid: /[0-9]/.test(password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-28">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Music className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Únete a SoundSeekers</h1>
          <p className="text-muted-foreground text-sm">Descubre música que no encontrarás en otro lugar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-display font-medium text-foreground mb-2">Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
          </div>

          <div>
            <label className="block text-sm font-display font-medium text-foreground mb-2">Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
          </div>

          <div>
            <label className="block text-sm font-display font-medium text-foreground mb-2">Contraseña</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-12" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {password && (
              <div className="mt-3 space-y-1.5">
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2 text-xs">
                    <Check className={`w-3.5 h-3.5 ${check.valid ? "text-primary" : "text-muted-foreground/40"}`} />
                    <span className={check.valid ? "text-foreground" : "text-muted-foreground"}>{check.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity glow-green flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creando cuenta...</> : "Crear Cuenta"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary hover:underline font-display font-medium">Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
