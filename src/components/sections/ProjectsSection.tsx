import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "../SectionWrapper";
import { Lock, ExternalLink } from "lucide-react";
import { triggerBatSwarm } from "@/lib/batSwarmEvent";

const projects = [
  {
    name: "CRYPTMASTER",
    status: "LIVE",
    stack: ["React", "Node.js", "MongoDB", "CoinGecko API"],
    evidence: "Built real-time crypto trading simulator with portfolio tracking, watchlists, and live market data integration.",
    url: "https://cryptmaster-web.vercel.app/",
  },
  {
    name: "FOCUSPILOT",
    status: "LIVE",
    stack: ["React", "FastAPI", "MongoDB", "OpenAI"],
    evidence: "AI-driven task manager that auto-generates subtasks and tracks productivity metrics with intelligent prioritization.",
    url: "https://focuspilot.example.com",
  },
  {
    name: "OFFCET / EDGES+",
    status: "DEPLOYED",
    stack: ["React", "Next.js", "Tailwind"],
    evidence: "Carbon offsetting platform for MetaShot — client-facing dashboards tracking environmental impact metrics.",
    url: "https://offcet.example.com",
  },
  {
    name: "IPfy",
    status: "PROTOTYPE",
    stack: ["Blockchain", "React", "Node.js"],
    evidence: "Decentralized intellectual property registration system using blockchain for immutable proof of ownership.",
    url: "https://ipfy.example.com",
  },
  {
    name: "RUNNER",
    status: "LIVE",
    stack: ["React", "Node.js", "Docker"],
    evidence: "Online coding platform with multi-language support, real-time code execution, and sandboxed environments.",
    url: "https://runner.example.com",
  },
  {
    name: "SAVIOUR",
    status: "LIVE",
    stack: ["React", "Node.js", "Encryption"],
    evidence: "Military-grade encrypted file and password storage with zero-knowledge architecture.",
    url: "https://saviour.example.com",
  },
];

const statusColor: Record<string, string> = {
  LIVE: "text-accent border-accent",
  DEPLOYED: "text-primary border-primary",
  PROTOTYPE: "text-muted-foreground border-muted-foreground",
};

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" title="Case Files" subtitle="// classified_dossiers.db">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleOpen = () => {
    triggerBatSwarm();
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative border-2 border-border bg-card/60 backdrop-blur-sm p-6 group hover:border-primary/50 transition-colors duration-300 overflow-hidden"
    >
      {/* Scan effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute left-0 top-0 w-full h-0.5 bg-primary/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-muted-foreground" />
            <h3 className="text-sm font-bold tracking-widest text-foreground">{project.name}</h3>
          </div>
          <span className={`text-[10px] tracking-wider border px-2 py-0.5 ${statusColor[project.status] || statusColor.PROTOTYPE}`}>
            {project.status}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{project.evidence}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="text-[10px] text-accent/80 border border-accent/20 px-2 py-0.5 tracking-wide">
                {tech}
              </span>
            ))}
          </div>
          {project.url && (
            <button
              onClick={handleOpen}
              className="flex items-center gap-1 text-[10px] tracking-wider text-primary border border-primary/40 px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <ExternalLink className="w-3 h-3" />
              OPEN
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectsSection;
