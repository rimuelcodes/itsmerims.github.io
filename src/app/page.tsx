import HeroSection from "components/HeroSection"
import AboutSection from "components/AboutSection"
import ExperienceTimeline from "components/ExperienceTimeline"
import SkillsGrid from "components/SkillsGrid"
import ProjectSection from "components/ProjectSection"
import ContactSection from "components/ContactSection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <SkillsGrid />
      <ProjectSection />
      <ContactSection />
    </>
  )
}
