import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Disabled in production' }, { status: 403 })
  }

  const host = process.env.EMAIL_HOST || 'smtp.gmail.com'
  const port = Number(process.env.EMAIL_PORT || 587)
  const secure = (process.env.EMAIL_SECURE ?? 'false') === 'true'

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    const recipient = process.env.DEV_EMAIL || process.env.NEXT_PUBLIC_DEV_EMAIL
    if (!recipient) {
      return NextResponse.json({ ok: false, error: 'DEV_EMAIL not configured' }, { status: 400 })
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipient,
      subject: 'Portfolio — test email (dev)',
      text: `This is a test message from your local portfolio app. Recipient: ${recipient}`,
    })

    return NextResponse.json({ ok: true, recipient, info })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 })
  }
}
