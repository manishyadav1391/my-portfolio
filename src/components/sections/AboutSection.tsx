'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const aboutData = {
  bio: [
    "I'm Manish Yadav, a developer who loves turning automation ideas into polished web products.",
    "I design intelligent workflows with Python, then build modern frontends with React and Next.js.",
    "My focus is on fast performance, clean UI, and delivering solutions that feel professional and reliable."
  ],
  stats: [
    { label: 'Automation tools built', value: '10+' },
    { label: 'Technologies explored', value: '15+' },
    { label: 'Projects shipped', value: '8+' },
  ],
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects
  const yImage = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-background overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb glow-purple w-[500px] h-[500px] -right-40 top-0 opacity-20" />
      <div className="glow-orb glow-cyan w-[600px] h-[600px] -left-60 bottom-0 opacity-20" />
      
      <div className="ambient-grid opacity-50" />

      <motion.div style={{ opacity: opacityText }} className="relative max-w-6xl mx-auto">
        <div className="mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            Discover
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            About me
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Image with Parallax */}
          <motion.div
            style={{ y: yImage }}
            className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden group"
          >
            {/* Inner glowing border */}
            <div className="absolute inset-0 border border-white/10 rounded-[2rem] z-20 pointer-events-none transition-colors group-hover:border-primary/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            
            <Image
              src="/profile.jpg"
              alt="Manish Yadav"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </motion.div>

          {/* Right Column: Bio and Stats */}
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              {aboutData.bio.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="text-lg md:text-xl text-slate-300 leading-relaxed font-light"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {aboutData.stats.map((stat, i) => (
                <div key={stat.label} className="glass-panel p-6 rounded-2xl relative group overflow-hidden border border-white/5 hover:border-primary/30 transition-all">
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative block text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </span>
                  <span className="relative block text-xs uppercase tracking-widest text-slate-400 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}