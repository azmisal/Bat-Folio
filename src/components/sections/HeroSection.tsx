import { motion } from "framer-motion";
import BatSymbol3D from "../BatSymbol3D";
import { triggerBatSwarm } from "@/lib/batSwarmEvent";

const HeroSection = () => {
  const scrollToContact = () => {
    triggerBatSwarm();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center max-w-4xl"
      >
        <p className="text-xs md:text-sm text-accent tracking-[0.3em] uppercase mb-6">
          System Online — Batcomputer v3.0
        </p>

        <BatSymbol3D />

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-6 mb-4 leading-tight">
          I don't wear a cape.
          <br />
          <span className="text-primary text-glow">
            I have production access.
          </span>
          <br />
          <span className="text-muted-foreground text-2xl md:text-3xl">
            — same thing.
          </span>
        </h1>

        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mt-6 tracking-wide leading-relaxed">
          Master of Backend Shadows. Precision Frontend Architect.
          <br />
          I solve the problems others are too afraid to touch.
        </p>

        <motion.button
          onClick={scrollToContact}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 border-2 border-primary bg-primary/10 text-primary px-8 py-3 text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 box-glow"
        >
          Illuminate the Signal
        </motion.button>

        <p className="text-xs text-muted-foreground mt-4 tracking-wider">
          AZMI SALEEM // FULL-STACK ENGINEER
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
