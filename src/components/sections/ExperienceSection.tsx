import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "../SectionWrapper";

const experiences = [
  {
    role: "System Engineer",
    org: "Tata Consultancy Services",
    period: "July 2024 — Present",
    details: [
      "Enterprise healthcare applications for Johnson & Johnson and Stryker",
      "Full-stack development on production-critical medical systems",
      "Cross-functional collaboration with global distributed teams",
    ],
  },
  {
    role: "Frontend Developer Intern",
    org: "MetaShot Technologies",
    period: "Jul 2023 — Oct 2023",
    details: [
      "Built Offcet & Edges+ carbon offsetting platforms",
      "React + Next.js frontends with responsive design",
      "Client-facing dashboards tracking environmental metrics",
    ],
  },
  {
    role: "Full Stack Developer",
    org: "Mezmo Solutions",
    period: "Mar 2022 — Dec 2023",
    details: [
      "End-to-end web application development for clients",
      "Node.js + React full-stack architecture",
      "Database design, API development, and deployment",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <SectionWrapper id="experience" title="Mission Log" subtitle="// ops_timeline.log">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.org} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

function ExperienceCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="pl-6 md:pl-20 relative"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-8 top-1 w-2 h-2 bg-primary -translate-x-[3.5px] box-glow" />

      <div className="border-2 border-border bg-card/40 backdrop-blur-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
          <div>
            <h3 className="text-sm font-bold tracking-wider text-foreground">{experience.role}</h3>
            <p className="text-xs text-primary tracking-wider">{experience.org}</p>
          </div>
          <span className="text-[10px] text-muted-foreground border border-border px-3 py-1 tracking-wider whitespace-nowrap">
            {experience.period}
          </span>
        </div>
        <ul className="space-y-1.5">
          {experience.details.map((detail) => (
            <li key={detail} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">▸</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default ExperienceSection;
