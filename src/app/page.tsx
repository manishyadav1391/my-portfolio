// No 'use client' here — this is a Server Component.
// Server components render on the server = faster page load.
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection  from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection  from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      {/* Each section has an id for the Navbar links to scroll to */}
      <section id="hero">  
         <HeroSection />
      </section>  {/* Phase 3 → HeroSection component */}   
      <section id="about">
        <AboutSection />   {/* ← add this */}
      </section>
       <section id="skills">  <SkillsSection /> </section>
       <section id="projects"> <ProjectsSection /> </section>
        <section id="contact">  <ContactSection />  </section>
       
    </>
  )
}