import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">SS</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">SoundSeekers</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Explore</Link>
          <Link to="/recommendations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Para Ti</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/explore" className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link to="/login" className="px-5 py-2 rounded-full border border-border text-foreground font-display font-semibold text-sm hover:bg-secondary transition-colors">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow-green">
            Registrarse
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <Link to="/" className="text-sm py-2 text-muted-foreground">Home</Link>
          <Link to="/explore" className="text-sm py-2 text-muted-foreground">Explore</Link>
          <Link to="/recommendations" className="text-sm py-2 text-muted-foreground">Para Ti</Link>
          <Link to="/login" className="text-sm py-2 text-muted-foreground">Iniciar Sesión</Link>
          <Link to="/register" className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm text-center">
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
