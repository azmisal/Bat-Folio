import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = ({ id, title, subtitle, children, className = "" }: SectionWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className={`relative py-20 px-6 ${className}`}>
      {/* Scan line overlay */}
      <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-glow tracking-wider uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-2 tracking-wide">{subtitle}</p>
          )}
          <div className="w-24 h-0.5 bg-primary mt-4" />
        </div>
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
