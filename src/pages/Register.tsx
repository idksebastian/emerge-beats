import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Music, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"listener" | "artist">("listener");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo Mode",
      description: "El registro requiere habilitar Lovable Cloud. Por ahora es solo UI.",
    });
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

        {/* Role selector */}
        <div className="flex gap-3 mb-8">
          {([
            { value: "listener" as const, label: "Soy Oyente", desc: "Descubrir música" },
            { value: "artist" as const, label: "Soy Artista", desc: "Compartir mi música" },
          ]).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRole(option.value)}
              className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                role === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <span className={`block text-sm font-display font-semibold ${role === option.value ? "text-primary" : "text-foreground"}`}>
                {option.label}
              </span>
              <span className="block text-xs text-muted-foreground mt-1">{option.desc}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-display font-medium text-foreground mb-2">
              {role === "artist" ? "Nombre artístico" : "Nombre completo"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === "artist" ? "Tu nombre de artista" : "Tu nombre"}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-display font-medium text-foreground mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-display font-medium text-foreground mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
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

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity glow-green"
          >
            Crear Cuenta
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Al registrarte aceptas los{" "}
            <button type="button" className="text-primary hover:underline">Términos de Servicio</button>
            {" "}y la{" "}
            <button type="button" className="text-primary hover:underline">Política de Privacidad</button>
          </p>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary hover:underline font-display font-medium">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
