import Loader from "@/components/loader/Loader";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import PositionTeaser from "@/components/positions/PositionTeaser";
import EducationSection from "@/components/education/EducationSection";
import CertTeaser from "@/components/certificates/CertTeaser";
import ContactSection from "@/components/contact/ContactSection";
import ParticleCanvas from "@/components/background/ParticleCanvas";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      <Loader />
      <ParticleCanvas />
      <Navbar />
      
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <PositionTeaser />
      <EducationSection />
      <CertTeaser />
      <ContactSection />
    </main>
  );
}
