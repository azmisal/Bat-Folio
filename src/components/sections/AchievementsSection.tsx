import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "../SectionWrapper";
import { Award, Flag, Users } from "lucide-react";

const achievements = [
  { icon: Users, title: "Web Master — ISTE", desc: "Led web initiatives for the Indian Society for Technical Education chapter" },
  { icon: Flag, title: "Proxy22 — Event Coordinator", desc: "Organized and managed large-scale tech fest events" },
  { icon: Award, title: "NUEVA — Event Organizer", desc: "Coordinated interdepartmental technical competitions" },
  { icon: Flag, title: "Matrix — Event Coordinator", desc: "Managed competitive programming and hackathon events" },
  { icon: Award, title: "Summer Startup Festival", desc: "Organized entrepreneurship-focused festival for aspiring founders" },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <SectionWrapper id="achievements" title="Achievements & Operations" subtitle="// commendations.db">
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach, i) => {
          const Icon = ach.icon;
          return (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border-2 border-border bg-card/40 backdrop-blur-sm p-5 hover:border-accent/50 transition-colors"
            >
              <Icon className="w-5 h-5 text-accent mb-3" />
              <h3 className="text-xs font-bold tracking-wider text-foreground mb-1">{ach.title}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{ach.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default AchievementsSection;
