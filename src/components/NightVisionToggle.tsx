import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const NightVisionToggle = () => {
  const [nightVision, setNightVision] = useState(false);

  useEffect(() => {
    if (nightVision) {
      document.documentElement.classList.add("night-vision");
    } else {
      document.documentElement.classList.remove("night-vision");
    }
  }, [nightVision]);

  return (
    <button
      onClick={() => setNightVision(!nightVision)}
      className="fixed top-6 right-6 z-50 border-2 border-primary bg-background/80 backdrop-blur-sm p-3 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 box-glow"
      aria-label="Toggle Night Vision"
    >
      {nightVision ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  );
};

export default NightVisionToggle;
