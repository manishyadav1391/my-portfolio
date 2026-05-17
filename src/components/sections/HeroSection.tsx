// No 'use client' — this is a Server Component by default.

import HeroContent from './HeroContent'

export default function HeroSection() {
  const heroData = {
    name: 'Manish Yadav',
    title: 'Full-Stack Developer',
    description:
      'I build fast, clean web applications using Python, Next.js, and everything in between. Currently open to full-time and freelance opportunities.',
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Premium animated background elements */}
      <div className="ambient-grid" />
      <div className="noise" />

      {/* Glowing orbs for depth */}
      <div className="glow-orb glow-indigo w-[600px] h-[600px] -top-32 -left-32" />
      <div className="glow-orb glow-cyan w-[500px] h-[500px] top-1/2 -right-40" />
      <div className="glow-orb glow-purple w-[400px] h-[400px] -bottom-32 left-1/4" />

      {/* Subtle overlay to blend everything together */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <HeroContent
          name={heroData.name}
          title={heroData.title}
          description={heroData.description}
        />
      </div>
    </section>
  )
}