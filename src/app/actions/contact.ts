'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendEmail(formData: { name: string, email: string, message: string }) {
  const { name, email, message } = formData

  if (!name || !email || !message) {
    return { error: 'All fields are required.' }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email address.' }
  }

  const escapedName = escapeHtml(name)
  const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>')

  try {
    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend default for testing
      to: ['wenceslausdsilva@gmail.com'], // Sending to your email
      subject: `New Contact from ${escapedName}`,
      replyTo: email,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage}</p>
      `
    })

    if (result.error) {
      console.error('Resend Error:', result.error)
      return { error: 'Failed to send message. Please try again later.' }
    }

    return { success: true }
  } catch (err) {
    console.error('Server Error:', err)
    return { error: 'An unexpected error occurred.' }
  }
}
