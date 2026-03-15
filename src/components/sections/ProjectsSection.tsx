'use client'
// Needs 'use client' for:
// 1. Framer Motion animations (whileInView, stagger)
// 2. whileHover on cards

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { projects, type Project } from '@/data/projects'

// ── Animation variants ──────────────────────────────────────────
// Instead of writing initial/animate on every element,
// you define them once as a "variant" object and reuse by name.
// This is the cleaner way to handle Framer Motion at scale.

const containerVariants = {
  hidden: {},   // container itself doesn't animate — just orchestrates children
  visible: {
    transition: {
      staggerChildren: 0.15,  // each child starts animating 0.15s after the previous
    },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },   // start: invisible, shifted down
  visible: { opacity: 1, y: 0,      // end: visible, in position
    transition: { duration: 0.5, ease: 'easeOut' as const}
  },
}
// Now instead of <motion.div initial={{...}} animate={{...}}> on each card,
// you just write variants="cardVariants" — much cleaner.

// ── Small reusable card component ───────────────────────────────
// Breaking this out keeps ProjectsSection readable.
// Rule: if JSX is getting long, extract into a sub-component.

function ProjectCard({ project }: { project: Project }) {
  return (
    // motion.div with variants — inherits stagger timing from parent
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}           // card lifts up on hover
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300">

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {project.title}
            </CardTitle>

            {/* Featured star badge — only renders if project.featured is true */}
            {project.featured && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>

        {/* flex-1 pushes the footer to the bottom of the card */}
        <CardContent className="flex-1">
          <p className="text-sm text-gray-500 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs text-gray-600"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* Only render footer if there are links to show */}
        {(project.githubUrl || project.liveUrl) && (
          <CardFooter className="flex gap-3 pt-4">

            {/*
              project.githubUrl && <a>...</a>
              This is conditional rendering using &&.
              If githubUrl is undefined, nothing renders.
              If it exists, the <a> tag renders.
            */}
            {project.githubUrl && (
              
              <a
                href={project.githubUrl}
                target="_blank"              // opens in new tab
                rel="noopener noreferrer"    // security best practice for target="_blank"
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                GitHub →
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                Live site →
              </a>
            )}

          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

// ── Main section component ───────────────────────────────────────

export default function ProjectsSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Projects
        </h2>
        <p className="text-gray-500 text-center mb-16">
          Things I have built
        </p>

        {/*
          whileInView = animate when element scrolls into the viewport.
          Much better than animating on page load — user actually SEES it.

          viewport={{ once: true }} = only animate once, not every time
          you scroll past. Set to false if you want it to replay.
        */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"        // triggers when scrolled into view
          viewport={{ once: true, amount: 0.1 }}
          // amount: 0.1 = trigger when 10% of the container is visible
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map(project => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}