'use client'

import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'


type HeroContentProps = {
  name: string
  title: string
  description: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } // Updated to use cubic-bezier array
  },
}

export default function HeroContent({ name, title, description }: HeroContentProps) {
  return (
    <motion.div
      className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center gap-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-primary-foreground/80 mb-4 shadow-[0_0_15px_rgba(79,70,229,0.15)]">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold">Available for work</span>
        </div>
        
        <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 pb-2">
          <Typewriter
            words={[name, 'A Creator.', 'A Problem Solver.']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-cyan-400">
          {title}
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-muted-foreground">
          {description}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mt-8 w-full sm:w-auto">
       <a href='#contact'>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] transition-all overflow-hidden"
        >
          <span className="relative z-10">Start a Project </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </motion.button>
        </a>
        
        {/* <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 glass-panel text-white font-semibold rounded-full hover:bg-white/10 transition-all"
        >
          View Portfolio
        </motion.button> */}
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-8 mt-12">
  {[
    {
      name: 'GitHub',
      url: 'https://github.com/manishyadav1391',
    },
    // {
    //   name: 'Twitter',
    //   url: 'https://twitter.com/your-username',
    // },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/manishyadav1391/',
    },
  ].map((social) => (
    <a
      key={social.name}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest relative group"
    >
      {social.name}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
    </a>
  ))}
</motion.div>
    </motion.div>
  )
}
