import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "../SectionWrapper";
import { Shield, Swords, Search } from "lucide-react";

const categories = [
  {
    title: "Shadow Ops",
    subtitle: "Backend & Infrastructure",
    icon: Shield,
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
      <div className="grid lg:grid-cols-3 gap-8">
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="border-2 border-border bg-card/40 backdrop-blur-sm p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-5 h-5 text-primary" />
        <div>
          <h3 className="text-sm font-bold tracking-widest text-primary">{category.title}</h3>
          <p className="text-[10px] text-muted-foreground tracking-wider">{category.subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        {category.skills.map((skill, si) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.15 + si * 0.08 }}
          >
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-foreground/80">{skill.name}</span>
              <span className="text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-secondary overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, delay: index * 0.15 + si * 0.08, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillsSection;
