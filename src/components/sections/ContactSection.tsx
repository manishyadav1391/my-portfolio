'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { sendMessage } from '@/actions/sendMessage'
import { Send, Mail, MapPin } from 'lucide-react'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full relative group overflow-hidden rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      <span className="relative flex items-center justify-center gap-2">
        {pending ? 'Sending...' : (
          <>Send Message <Send className="w-4 h-4" /></>
        )}
      </span>
    </button>
  )
}

function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  textarea = false,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
  textarea?: boolean
}) {
  const sharedClassName = `
    w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white
    placeholder:text-slate-500 focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all resize-none backdrop-blur-md
  `

  return (
    <div className="flex flex-col gap-2 group">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors ml-1">{label}</label>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={5} className={sharedClassName} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} className={sharedClassName} />
      )}
    </div>
  )
}

export default function ContactSection() {
  const [state, action] = useActionState(sendMessage, null)

  return (
    <section className="relative py-32 px-6 bg-background overflow-hidden">
      <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="ambient-grid opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Get in touch
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">extraordinary</span> together.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              Have an idea, a project, or just want to say hi? I'm always open to discussing new opportunities and challenges.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-white/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Email</p>
                  <p className="text-white font-medium">manishyadav940833@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-white/10 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Location</p>
                  <p className="text-white font-medium">Remote / India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-primary/30 to-cyan-400/30 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />
              
              <div className="relative rounded-[2rem] glass-panel border border-white/10 p-8 sm:p-10 shadow-2xl">
                <form action={action} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField label="Name" name="name" placeholder="John Doe" />
                    <InputField label="Email" name="email" type="email" placeholder="john@example.com" />
                  </div>
                  <InputField label="Message" name="message" placeholder="Tell me about your project..." textarea />

                  {state && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-2xl px-5 py-4 text-sm font-bold border backdrop-blur-md ${state.success ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}
                    >
                      {state.message}
                    </motion.div>
                  )}

                  <div className="pt-4">
                    <SubmitButton />
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}