import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = 'aivideolabs.ch@gmail.com';
const OWNER_NAME = 'Dennis Wahle';
const SITE_URL = 'https://aivideolabs.ch';
const PHONE = '+49 151 / 54847542';

function getAutoReplyBody(name: string, lang: string): string {
  if (lang === 'ch') {
    return `Hallo ${name},

Merci für dini Anfrag bi VideoLabs AI!

Mir händ dini Nachricht erhalte und melde üs i Kürze persönlich bi dir.

Bästi Grüess
${OWNER_NAME}
VideoLabs AI

Telefon: ${PHONE}
Email: ${OWNER_EMAIL}
Website: ${SITE_URL}`;
  }
  if (lang === 'en') {
    return `Hello ${name},

Thank you for your inquiry at VideoLabs AI!

We have received your message and will contact you personally shortly.

Best regards
${OWNER_NAME}
VideoLabs AI

Phone: ${PHONE}
Email: ${OWNER_EMAIL}
Website: ${SITE_URL}`;
  }
  return `Hallo ${name},

vielen Dank für deine Anfrage an VideoLabs AI!

Wir haben deine Nachricht erhalten und werden uns in Kürze persönlich bei dir melden.

Beste Grüße
${OWNER_NAME}
VideoLabs AI

Telefon: ${PHONE}
Email: ${OWNER_EMAIL}
Website: ${SITE_URL}`;
}

function getAutoReplySubject(lang: string): string {
  if (lang === 'en') return 'Thank you for your inquiry | VideoLabs AI';
  if (lang === 'ch') return 'Merci für dini Anfrag | VideoLabs AI';
  return 'Danke für deine Anfrage | VideoLabs AI';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, lang = 'de' } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const ownerBody = `Neue Anfrage über VideoLabs AI Website

Name: ${name}
Email: ${email}
Telefon: ${phone || '–'}
Service: ${service || '–'}
Sprache: ${lang.toUpperCase()}

Nachricht:
${message}

---
Gesendet: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}`;

    await resend.emails.send({
      from: 'VideoLabs AI <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      subject: `Neue Anfrage von ${name}`,
      text: ownerBody,
    });

    await resend.emails.send({
      from: 'VideoLabs AI <onboarding@resend.dev>',
      to: email,
      subject: getAutoReplySubject(lang),
      text: getAutoReplyBody(name, lang),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
