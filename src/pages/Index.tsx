import GothamBackground from "@/components/GothamBackground";
import Navigation from "@/components/Navigation";
import NightVisionToggle from "@/components/NightVisionToggle";
import CursorTrail from "@/components/CursorTrail";
import BatSwarm from "@/components/BatSwarm";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden animate-flicker">
      <GothamBackground />
      <CursorTrail />
      <BatSwarm />
      <Navigation />
      <NightVisionToggle />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
