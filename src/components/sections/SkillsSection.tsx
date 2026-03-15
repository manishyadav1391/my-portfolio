'use client'
// ↑ Needs 'use client' because:
// 1. useState for active category tab
// 2. Framer Motion whileHover (browser interaction)
// 3. AnimatePresence for exit animations

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, categories, type Category } from '@/data/skills'

export default function SkillsSection() {

  // activeCategory tracks which filter tab is selected.
  // When it changes, the displayed skills re-render automatically.
  // This is why we need 'use client' — useState only works in browser.
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  // Derived value — recalculates every time activeCategory changes.
  // No useEffect needed for simple filtering like this.
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory)

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Skills
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Technologies I work with
        </p>

        {/* ── Category filter tabs ── */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium capitalize transition-all
                ${activeCategory === category
                  ? 'bg-gray-900 text-white'        // active tab style
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'  // inactive tab style
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/*
          AnimatePresence lets Framer Motion animate elements
          as they ENTER and EXIT the DOM.
          Without it, removed elements just disappear instantly.
          mode="wait" = wait for exit animation before entering new items.
        */}
        <AnimatePresence mode="wait">

          {/*
            The key prop on this div is critical.
            When key changes, React unmounts the old div and mounts a new one.
            Framer Motion sees a new mount → plays the initial→animate animation again.
            This is how we re-trigger the animation when the filter changes.
          */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}   // exit = state when leaving the DOM
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill, index) => (

              /*
                whileHover = animation that plays on mouse hover.
                scale: 1.05 = grows to 105% of its size on hover.
                No useState needed — Framer Motion handles it internally.
              */
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                // stiffness: 300 = how bouncy the spring is (higher = snappier)
                className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-colors"
              >
                {/* Skill name */}
                <span className="text-sm font-semibold text-gray-800">
                  {skill.name}
                </span>

                {/* Level indicator — 5 dots, filled based on skill.level */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(dot => (
                    <span
                      key={dot}
                      className={`
                        w-2 h-2 rounded-full
                        ${dot <= skill.level
                          ? 'bg-gray-800'   // filled dot
                          : 'bg-gray-200'   // empty dot
                        }
                      `}
                    />
                  ))}
                </div>

                {/* Category badge */}
                <span className="text-xs text-gray-400 capitalize">
                  {skill.category}
                </span>

              </motion.div>
            ))}
          </motion.div>

        </AnimatePresence>

      </div>
    </section>
  )
}