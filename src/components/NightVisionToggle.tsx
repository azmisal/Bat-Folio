import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NightVisionToggle = () => {
  const [nightVision, setNightVision] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (nightVision) {
      document.documentElement.classList.add("night-vision");
    } else {
      document.documentElement.classList.remove("night-vision");
    }
    setShowLabel(true);
    const t = setTimeout(() => setShowLabel(false), 1500);
    return () => clearTimeout(t);
  }, [nightVision]);

  return (
    <div className="fixed top-20 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="text-[10px] tracking-widest text-primary font-bold whitespace-nowrap"
          >
            {nightVision ? "NIGHT VISION: ON" : "NIGHT VISION: OFF"}
          </motion.span>
        )}
      </AnimatePresence>
      <button
        onClick={() => setNightVision(!nightVision)}
        className="border-2 border-primary bg-background/80 backdrop-blur-sm p-3 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 box-glow"
        aria-label="Toggle Night Vision"
      >
        {nightVision ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default NightVisionToggle;
