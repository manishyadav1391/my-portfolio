'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        <a href="#" className="text-lg font-semibold tracking-tight">
          Yadav Ji
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-gray-800" />
            <span className="block w-6 h-0.5 bg-gray-800" />
            <span className="block w-6 h-0.5 bg-gray-800" />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <ul className="md:hidden px-6 pb-4 space-y-3 bg-white border-b border-gray-100">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-sm text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}