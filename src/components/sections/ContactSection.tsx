import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import { triggerBatSwarm } from "@/lib/batSwarmEvent";

const links = [
  { icon: Mail, label: "azmisaleem96@gmail.com", href: "mailto:azmisaleem96@gmail.com" },
  { icon: Phone, label: "+91 9072760818", href: "tel:+919072760818" },
  { icon: Github, label: "GitHub", href: "https://github.com/azmisaleem" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/azmisaleem" },
  { icon: Globe, label: "Portfolio", href: "https://azmisaleem.dev" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-glow tracking-wider uppercase mb-4">
          Illuminate the Signal
        </h2>
        <p className="text-sm text-muted-foreground mb-10 tracking-wide">
          Ready to deploy? Send the signal.
        </p>

        <motion.a
          href="mailto:azmisaleem96@gmail.com"
          onClick={() => triggerBatSwarm()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block border-2 border-primary bg-primary/10 text-primary px-10 py-4 text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 box-glow mb-12"
        >
          Contact Me
        </motion.a>

        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider"
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </a>
            );
          })}
        </div>

        <p className="text-[10px] text-muted-foreground/50 mt-16 tracking-widest">
          BAT://COMPUTER v3.0 — SYSTEM DESIGNED BY AZMI SALEEM — {new Date().getFullYear()}
        </p>
      </motion.div>
    </section>
  );
};

export default ContactSection;
