import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "BATCAVE", href: "#about" },
  { label: "CASE FILES", href: "#projects" },
  { label: "UTILITY BELT", href: "#skills" },
  { label: "MISSION LOG", href: "#experience" },
  { label: "SIGNAL", href: "#contact" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-background/70 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-primary font-bold text-sm tracking-widest text-glow">
          AZMI SALEEM - BATFOLIO
        </span>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="block w-full text-left px-6 py-3 text-sm tracking-wider text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
