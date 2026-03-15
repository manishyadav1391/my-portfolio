// Separating data from components is good practice.
// Later you could fetch this from an API or CMS.
// TypeScript 'type' defines the shape of your data —
// it catches mistakes at compile time, not runtime.

export type Skill = {
  name: string
  category: 'frontend' | 'backend' | 'tools'  // only these 3 values allowed
  level: number   // 1–5, used to render the indicator dots
}

export const skills: Skill[] = [
  // Frontend
  { name: 'Next.js',      category: 'frontend', level: 4 },
  { name: 'React',        category: 'frontend', level: 4 },
  { name: 'TypeScript',   category: 'frontend', level: 3 },
  { name: 'Tailwind CSS', category: 'frontend', level: 5 },

  // Backend
  { name: 'Python',       category: 'backend',  level: 5 },
  { name: 'FastAPI',      category: 'backend',  level: 4 },
  { name: 'SQLite',       category: 'backend',  level: 4 },
  { name: 'PostgreSQL',   category: 'backend',  level: 3 },

  // Tools
  { name: 'Git',          category: 'tools',    level: 4 },
  { name: 'Playwright',   category: 'tools',    level: 4 },
  { name: 'pytest',       category: 'tools',    level: 4 },
  { name: 'Docker',       category: 'tools',    level: 3 },
]

// All unique categories + 'all' for the "show everything" tab
export const categories = ['all', 'frontend', 'backend', 'tools'] as const

// 'as const' means TypeScript treats this as a fixed tuple,
// not a generic string[]. Gives you better type safety.
export type Category = typeof categories[number]