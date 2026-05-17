'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, categories, type Category } from '@/data/skills'

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory)

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="ambient-grid opacity-30" />
      <div className="glow-orb glow-indigo w-[600px] h-[600px] -left-32 top-1/4 opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            Core capabilities
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Expertise
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg sm:text-xl font-light"
          >
            I bring automation, frontend development, and clean architecture together in every project.
          </motion.p>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all duration-300 ${activeCategory === category ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'glass-panel text-slate-300 hover:text-white hover:bg-white/10'}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
            transition={{ duration: 0.4, staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill, i) => {
              // Create a bento box effect by making some items span more columns
              const isLarge = i === 0 || i === 5;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`glass-panel p-6 rounded-3xl flex flex-col justify-between group overflow-hidden relative ${isLarge ? 'md:col-span-2' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className={`font-bold text-white ${isLarge ? 'text-3xl' : 'text-xl'}`}>{skill.name}</span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">{skill.category}</span>
                    </div>
                    
                    <div className="mt-12">
                       <div className="flex items-center gap-2 mb-2">
                         <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Proficiency</span>
                         <span className="text-xs text-white font-bold ml-auto">{skill.level * 20}%</span>
                       </div>
                       <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${skill.level * 20}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                           className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(79,70,229,0.5)]" 
                         />
                       </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}