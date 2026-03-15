'use client'
// ↑ Must be here — Framer Motion uses browser APIs

import { motion } from 'framer-motion'

// This component receives all its data as props from the server component.
// It knows nothing about where the data came from — just animates it.
type HeroContentProps = {
  name: string
  title: string
  description: string
}

export default function HeroContent({ name, title, description }: HeroContentProps) {

  // motion.div is just a regular <div> that can be animated.
  // initial  = starting state (before animation plays)
  // animate  = ending state  (where animation goes TO)
  // transition = how to get there (duration, delay, easing)

  return (
    <div className="flex flex-col items-center text-center gap-6">

      {/* Greeting tag — fades in first */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}   // starts invisible, 20px below
        animate={{ opacity: 1, y: 0 }}    // becomes visible, moves up to position
        transition={{ duration: 0.5 }}    // takes 0.5 seconds
      >
        <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-gray-100 text-gray-600">
          👋 Available for work
        </span>
      </motion.div>

      {/* Name — fades in second, slight delay */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}  // delay: 0.1 = starts 0.1s after mount
      >
        {name}
      </motion.h1>

      {/* Title — fades in third */}
      <motion.p
        className="text-xl md:text-2xl text-gray-500 font-medium"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.p>

      {/* Description — fades in fourth */}
      <motion.p
        className="max-w-xl text-gray-500 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {description}
      </motion.p>

      {/* CTA Buttons — fade in last */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Get in touch
        </a>
      </motion.div>

    </div>
  )
}