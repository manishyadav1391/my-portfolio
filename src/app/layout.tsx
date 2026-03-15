// This file is a SERVER COMPONENT by default.
// It runs on the server, never in the browser.

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

// next/font downloads the font at BUILD TIME, not at runtime.
// No layout shift. No external request from browser. 
const inter = Inter({ subsets: ['latin'] })

// metadata is a special Next.js export.
// This sets the <title> and <meta description> in the <head> automatically.
// You never write <head> tags yourself in App Router.
export const metadata: Metadata = {
  title: 'Yadav Ji | Portfolio',
  description: 'Full-stack developer portfolio',
}

// RootLayout receives { children } — that's where your page.tsx plugs in.
// Think of it as: layout wraps children, always.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* inter.className applies the Google Font globally */}
      <body className={inter.className}>
        <Navbar />           {/* ← always on top */}
        <main className="pt-16">  {/* ← pt-16 = padding to clear the fixed navbar */}
        {children}
        </main>
      </body>
    </html>
  )
}