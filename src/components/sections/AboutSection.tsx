import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "../SectionWrapper";

const stats = [
  { label: "PROJECTS DEPLOYED", value: "6+" },
  { label: "YEARS ACTIVE", value: "3+" },
  { label: "ENTERPRISE CLIENTS", value: "J&J, Stryker" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <SectionWrapper id="about" title="The Batcave" subtitle="// about.exe">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            "I don't have superpowers. I have{" "}
            <span className="text-primary text-glow">logic</span>, 10,000 hours of debugging,
            and <span className="text-accent">better tools</span> than you."
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Full-stack developer with 2+ years of experience building enterprise-grade
            applications at TCS for Fortune 500 clients. B.Tech in Computer Science from
            GEC Thrissur. I architect systems that don't fail when the city is on the line.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            From healthcare platforms serving Johnson & Johnson and Stryker, to crypto trading
            simulators and AI-powered task managers — I operate where precision meets ambition.
          </p>
        </div>

        <div className="space-y-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="border-2 border-border p-4 bg-card/50 backdrop-blur-sm"
            >
              <p className="text-xs text-muted-foreground tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-primary text-glow mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
