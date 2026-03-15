// No 'use client' — this is a Server Component by default.
// All the data lives here. The server renders this, then passes
// the data down to HeroContent which animates it in the browser.

import HeroContent from './HeroContent'

export default function HeroSection() {

  // In a real app this data could come from a CMS, database, or .env file.
  // For now it's hardcoded — that's fine. Point is: data stays server-side.
  const heroData = {
    name: 'Yadav Ji',
    title: 'Full-Stack Developer',
    description:
      'I build fast, clean web applications using Python, Next.js, and everything in between. Currently open to full-time and freelance opportunities.',
  }

  return (
    // min-h-screen = takes up full viewport height
    // flex + items-center = vertically center the content
    <section className="min-h-screen flex items-center justify-center px-6 bg-white">
      {/* Pass data as props to the client component */}
      <HeroContent
        name={heroData.name}
        title={heroData.title}
        description={heroData.description}
      />
    </section>
  )
}