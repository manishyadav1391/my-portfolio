'use client'

import { motion, type Variants } from 'framer-motion'
import { projects, type Project } from '@/data/projects'
import { ArrowUpRight, Github } from 'lucide-react'
import Image from 'next/image'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-primary/30 to-cyan-400/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative h-full flex flex-col overflow-hidden rounded-[2rem] glass-panel transition-all duration-500 group-hover:-translate-y-2 border border-white/5 group-hover:border-white/10">
   {/* Project Image */}
<div className="relative h-72 w-full bg-slate-900 overflow-hidden">
  <Image
    src={project.image}
    alt={project.title}
    fill
    className="object-cover transition-transform duration-700 group-hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />

  {project.featured && (
    <div className="absolute top-6 left-6 z-20">
      <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-xs font-bold text-white uppercase tracking-widest shadow-lg">
        Featured
      </span>
    </div>
  )}
</div>

        <div className="flex flex-col flex-1 p-8 pt-4">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-slate-400 leading-relaxed mb-8 flex-1">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                Live Preview <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                Source Code <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="noise opacity-20" />
      <div className="glow-orb glow-cyan w-[800px] h-[800px] -right-40 top-1/2 opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Selected Work
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg sm:text-xl font-light"
          >
            Modern solutions shipped from concept to launch.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}