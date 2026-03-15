'use client'
// Needs 'use client' because:
// 1. useActionState — tracks form submission state
// 2. useFormStatus — tracks if form is pending/submitting
// 3. User interactions (typing, submitting)

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { sendMessage, type ActionResult } from '@/actions/sendMessage'

// ── Submit button — separate component ──────────────────────────
// Must be its own component to use useFormStatus.
// useFormStatus only works inside a <form> — and it reads
// the status of the CLOSEST parent form automatically.

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Sending...' : 'Send message'}
    </button>
  )
}

// ── Reusable input field ────────────────────────────────────────
// Extracting this avoids repeating the same className 3 times.
// Small components like this are worth extracting.

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
    w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
    text-sm text-gray-900 placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
    transition-all resize-none
  `

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={5}
          className={sharedClassName}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={sharedClassName}
        />
      )}
    </div>
  )
}

// ── Main Contact section ────────────────────────────────────────

export default function ContactSection() {

  // useActionState is the hook that connects a Server Action to a form.
  // It gives you:
  //   state  = the last returned value from your Server Action (ActionResult | null)
  //   action = a wrapped version of sendMessage to pass to the form
  //
  // null = the initial state before first submission
  const [state, action] = useActionState(sendMessage, null)

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Get in touch
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >

          {/*
            action={action} connects the form to your Server Action.
            When submitted, Next.js automatically:
            1. Collects all input values as FormData
            2. Sends it to the server
            3. Runs sendMessage()
            4. Updates 'state' with the return value
            No fetch(), no JSON.stringify(), no event.preventDefault() needed.
          */}
          <form action={action} className="flex flex-col gap-5">

            <InputField
              label="Name"
              name="name"          // must match formData.get('name') in the action
              placeholder="Your name"
            />

            <InputField
              label="Email"
              name="email"         // must match formData.get('email') in the action
              type="email"
              placeholder="your@email.com"
            />

            <InputField
              label="Message"
              name="message"       // must match formData.get('message') in the action
              placeholder="Tell me about your project..."
              textarea
            />

            {/*
              state is null before first submit.
              After submit, it has { success, message } from the Server Action.
              We conditionally render feedback based on state.
            */}
            {state && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  px-4 py-3 rounded-xl text-sm font-medium
                  ${state.success
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-red-50 text-red-700 border border-red-100'
                  }
                `}
              >
                {state.message}
              </motion.div>
            )}

            <SubmitButton />

          </form>
        </motion.div>

      </div>
    </section>
  )
}