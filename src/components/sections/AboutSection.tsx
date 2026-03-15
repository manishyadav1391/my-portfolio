// Server Component — no 'use client' needed.
// No interactivity here, just content + image.
// Renders fully on the server = fast + SEO friendly.

import Image from 'next/image'  // ← always import from 'next/image', never use <img>

// Your personal data — later you could move this to a separate
// data file like src/data/about.ts and import it
const aboutData = {
  bio: [
    "I'm Manish Yadav, a software developer focused on building automation systems and modern web applications.",

    "My main expertise is Python automation — I build bots and tools using Selenium, OCR, OpenCV, and email automation to solve real-world workflow problems.",

    "Recently I've been expanding into modern frontend development with React and Next.js, building fast, scalable applications and learning full-stack architecture."
  ],
  stats: [
    { label: "Automation tools built", value: "10+" },
    { label: "Technologies used", value: "15+" },
    { label: "Lines of Python written", value: "100k+" },
  ],
}

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">

      {/* max-w-5xl + mx-auto = centered container with max width */}
      <div className="max-w-5xl mx-auto">

        {/* Section heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
          About me
        </h2>

        {/* Two column layout — stacks on mobile, side by side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT — Profile image */}
          <div className="flex justify-center">
            {/*
              next/image REQUIRES width and height props.
              These tell the browser how much space to reserve
              BEFORE the image loads → prevents layout shift.

              width/height are the rendered size in px, not the
              original file size. Next.js handles the resizing.
            */}
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/profile.jpg"      // path relative to public/
                alt="Yadav Ji"          // always write a meaningful alt text
                fill                    // fill = stretches to parent container size
                className="object-cover" // object-cover = crop to fit without distortion
                priority                // priority = load this image eagerly (above the fold)
              />
            </div>
          </div>

          {/* RIGHT — Bio text + stats */}
          <div className="flex flex-col gap-6">

            {/* Bio paragraphs — map over array instead of repeating <p> tags */}
            {aboutData.bio.map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {aboutData.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100"
                >
                  <span className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500 text-center mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}