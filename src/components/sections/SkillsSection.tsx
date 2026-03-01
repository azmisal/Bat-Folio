import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionWrapper from "../SectionWrapper";
import { Shield, Swords, Search } from "lucide-react";

const categories = [
  {
    title: "Shadow Ops",
    subtitle: "Backend & Infrastructure",
    icon: Shield,
    color: "primary",
    skills: [
      { name: "Node.js / Express.js", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL / MySQL", level: 80 },
      { name: "RESTful APIs", level: 92 },
      { name: "Java", level: 75 },
      { name: "FastAPI / Python", level: 70 },
    ],
  },
  {
    title: "Combat Tactics",
    subtitle: "Frontend & Visual",
    icon: Swords,
    color: "accent",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 80 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "Three.js / R3F", level: 65 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Figma", level: 70 },
    ],
  },
  {
    title: "Detective Work",
    subtitle: "Problem Solving",
    icon: Search,
    color: "primary",
    skills: [
      { name: "Debugging Legacy Code", level: 90 },
      { name: "Production Support", level: 85 },
      { name: "Cross-functional Collab", level: 88 },
      { name: "System Design", level: 78 },
      { name: "Performance Optimization", level: 82 },
      { name: "Git / CI/CD", level: 85 },
    ],
  },
];

const SkillsSection = () => {
  return (
    <SectionWrapper id="skills" title="The Utility Belt" subtitle="// arsenal.config">
      <div className="grid lg:grid-cols-3 gap-6">
        {categories.map((cat, ci) => (
          <SkillCategory key={cat.title} category={cat} index={ci} />
        ))}
      </div>
    </SectionWrapper>
  );
};

function SkillCategory({ category, index }: { category: typeof categories[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = category.icon;
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const isAccent = category.color === "accent";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative group border border-border bg-card/30 backdrop-blur-sm overflow-hidden ${
        isAccent ? "box-glow-accent" : "box-glow"
      }`}
    >
      {/* Top accent line */}
      <motion.div
        className={`h-[2px] ${isAccent ? "bg-accent" : "bg-primary"}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      />

      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 border ${isAccent ? "border-accent" : "border-primary"} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${isAccent ? "text-accent" : "text-primary"}`} />
          </div>
          <div>
            <h3 className={`text-xs font-bold tracking-[0.3em] uppercase ${isAccent ? "text-accent text-glow-accent" : "text-primary text-glow"}`}>
              {category.title}
            </h3>
            <p className="text-[10px] text-muted-foreground tracking-wider mt-0.5">
              {category.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-border" />

      {/* Skills */}
      <div className="p-5 pt-4 space-y-1">
        {category.skills.map((skill, si) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.2 + si * 0.1 }}
            className="relative cursor-default"
            onMouseEnter={() => setHoveredSkill(si)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className={`flex items-center gap-3 py-2 px-3 transition-all duration-300 -mx-3 ${
              hoveredSkill === si
                ? isAccent
                  ? "bg-accent/10"
                  : "bg-primary/10"
                : "bg-transparent"
            }`}>
              {/* Level indicator dots */}
              <div className="flex gap-[3px] shrink-0">
                {Array.from({ length: 5 }).map((_, di) => {
                  const filled = skill.level >= (di + 1) * 20;
                  const partial = !filled && skill.level > di * 20;
                  return (
                    <motion.div
                      key={di}
                      className={`w-2 h-2 border ${
                        isAccent ? "border-accent/50" : "border-primary/50"
                      } ${
                        filled
                          ? isAccent
                            ? "bg-accent"
                            : "bg-primary"
                          : partial
                          ? isAccent
                            ? "bg-accent/40"
                            : "bg-primary/40"
                          : "bg-transparent"
                      }`}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.2 + si * 0.1 + di * 0.05,
                      }}
                    />
                  );
                })}
              </div>

              {/* Skill name */}
              <span className="text-[11px] text-foreground/80 tracking-wide flex-1">
                {skill.name}
              </span>

              {/* Percentage - shows on hover */}
              <motion.span
                className={`text-[10px] font-bold ${isAccent ? "text-accent" : "text-primary"}`}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: hoveredSkill === si ? 1 : 0.4 }}
              >
                {skill.level}%
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Corner decorations */}
      <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${isAccent ? "border-accent/30" : "border-primary/30"}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${isAccent ? "border-accent/30" : "border-primary/30"}`} />
    </motion.div>
  );
}

export default SkillsSection;
