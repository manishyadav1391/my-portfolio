'use server'

import { Resend } from 'resend'

// Resend client is created here on the server.
// process.env.RESEND_API_KEY is only available server-side.
// If you accidentally used this in a Client Component, it would be undefined.
const resend = new Resend(process.env.RESEND_API_KEY)

export type ActionResult = {
  success: boolean
  message: string
}

export async function sendMessage(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {

  const name    = formData.get('name')    as string
  const email   = formData.get('email')   as string
  const message = formData.get('message') as string

  // ── Validation (same as before) ─────────────────────────────
  if (!name || !email || !message) {
    return { success: false, message: 'All fields are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  // ── Send email via Resend ────────────────────────────────────
  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      // ↑ Use this exact from address on free plan.
      // After you verify your own domain on Resend, you can change
      // this to something like: contact@yourdomain.com

      to: process.env.CONTACT_EMAIL!,
      // ↑ The ! tells TypeScript "trust me, this won't be undefined"
      // It's safe here because we control the .env file

      subject: `New message from ${name}`,

      // html prop = the email body as HTML
      // Keep it simple — most email clients have limited CSS support
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">New contact form submission</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 80px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #0070f3;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 8px 0;">${message}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    })

    return {
      success: true,
      message: `Thanks ${name}! Your message has been sent. I'll get back to you soon.`,
    }

  } catch (error) {
    // Always catch email sending errors — don't crash the page
    // Log the actual error on the server for debugging
    console.error('Failed to send email:', error)

    return {
      success: false,
      message: 'Something went wrong sending your message. Please try again.',
    }
  }
}
