import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, lang } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Log to console for now — configure email service via env vars
    console.log('📬 New Contact Form Submission:', { name, email, phone, service, message, lang, timestamp: new Date().toISOString() });

    // If SMTP is configured, send email via nodemailer here.
    // To enable: npm install nodemailer, add SMTP_HOST/USER/PASS env vars.
    // Example:
    // const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, ... });
    // await transporter.sendMail({ from: process.env.SMTP_USER, to: 'aivideolabs.ch@gmail.com', subject: `New inquiry from ${name}`, text: message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
