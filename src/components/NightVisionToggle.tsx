import { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NightVisionToggle = () => {
  const [nightVision, setNightVision] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [scanPhase, setScanPhase] = useState<"idle" | "scanning" | "locked">("idle");

  const toggle = useCallback(() => {
    const next = !nightVision;
    setNightVision(next);
    setShowOverlay(true);
    setScanPhase("scanning");

    // Phase 1: scanning (horizontal sweep)
    setTimeout(() => setScanPhase("locked"), 800);
    // Phase 2: locked (flash + status text)
    setTimeout(() => {
      if (next) {
        document.documentElement.classList.add("night-vision");
      } else {
        document.documentElement.classList.remove("night-vision");
      }
    }, 1000);
    // Phase 3: dismiss
    setTimeout(() => {
      setScanPhase("idle");
      setShowOverlay(false);
    }, 1800);
  }, [nightVision]);

  return (
    <>
      {/* Fullscreen HUD overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          >
            {/* Dark backdrop */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Scan line sweep */}
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.8, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] z-10"
              style={{
                background: nightVision
                  ? "linear-gradient(90deg, transparent, #00FF41, transparent)"
                  : "linear-gradient(90deg, transparent, hsl(48, 96%, 53%), transparent)",
                boxShadow: nightVision
                  ? "0 0 20px #00FF41, 0 0 60px #00FF4180"
                  : "0 0 20px hsl(48, 96%, 53%), 0 0 60px hsla(48, 96%, 53%, 0.5)",
              }}
            />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-10 z-[1]"
              style={{
                backgroundImage: `linear-gradient(${nightVision ? "#00FF41" : "hsl(48, 96%, 53%)"} 1px, transparent 1px), linear-gradient(90deg, ${nightVision ? "#00FF41" : "hsl(48, 96%, 53%)"} 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Corner brackets */}
            {["top-6 left-6", "top-6 right-6 rotate-90", "bottom-6 left-6 -rotate-90", "bottom-6 right-6 rotate-180"].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.3 }}
                className={`absolute ${pos} w-8 h-8 z-10`}
                style={{
                  borderLeft: `2px solid ${nightVision ? "#00FF41" : "hsl(48, 96%, 53%)"}`,
                  borderTop: `2px solid ${nightVision ? "#00FF41" : "hsl(48, 96%, 53%)"}`,
                }}
              />
            ))}

            {/* Center HUD status */}
            <div className="relative z-10 text-center">
              <AnimatePresence mode="wait">
                {scanPhase === "scanning" && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.p
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="text-xs tracking-[0.5em] font-bold"
                      style={{ color: nightVision ? "#00FF41" : "hsl(48, 96%, 53%)" }}
                    >
                      ▸ SCANNING OPTICS ▸
                    </motion.p>
                  </motion.div>
                )}
                {scanPhase === "locked" && (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Flash ring */}
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full border-2"
                      style={{ borderColor: nightVision ? "#00FF41" : "hsl(48, 96%, 53%)" }}
                    />
                    <p
                      className="text-2xl font-extrabold tracking-[0.3em]"
                      style={{
                        color: nightVision ? "#00FF41" : "hsl(48, 96%, 53%)",
                        textShadow: `0 0 20px ${nightVision ? "#00FF41" : "hsl(48, 96%, 53%)"},
                                      0 0 60px ${nightVision ? "#00FF4180" : "hsla(48, 96%, 53%, 0.5)"}`,
                      }}
                    >
                      {nightVision ? "NIGHT VISION: ENGAGED" : "STANDARD OPTICS: RESTORED"}
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="mt-3 h-[1px] origin-center"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${nightVision ? "#00FF41" : "hsl(48, 96%, 53%)"}, transparent)`,
                      }}
                    />
                    <p
                      className="mt-2 text-[10px] tracking-[0.4em]"
                      style={{ color: nightVision ? "#00FF4180" : "hsla(48, 96%, 53%, 0.5)" }}
                    >
                      BATCOMPUTER v3.0 // OPTICS CALIBRATED
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <div className="fixed top-20 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggle}
          disabled={showOverlay}
          className="border-2 border-primary bg-background/80 backdrop-blur-sm p-3 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 box-glow disabled:opacity-50"
          aria-label="Toggle Night Vision"
        >
          {nightVision ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </>
  );
};

export default NightVisionToggle;
