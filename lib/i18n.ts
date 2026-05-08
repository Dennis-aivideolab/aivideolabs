export type Lang = 'de' | 'ch' | 'en';

const de = {
  nav: {
    home: 'Home', services: 'Services', portfolio: 'Portfolio', contact: 'Kontakt', cta: 'Anfragen →',
    lang: { de: 'Deutsch', ch: 'Schweizerdeutsch', en: 'English' },
  },
  hero: {
    badge: 'Powered by Modern AI Technology',
    h1: 'Kreative', h2: 'AI-gestützte', h3: 'Videoinhalte',
    sub: 'Wir transformieren deine Vision in professionelle, virale Videoinhalte –',
    subAccent: 'powered by moderne KI-Technologie',
    subEnd: 'und dramatischen Effekten.',
    btn1: 'Jetzt anfragen ✦', btn2: 'Portfolio ansehen →',
    stats: [{ num: '50+', label: 'Projekte' }, { num: '98%', label: 'Zufriedenheit' }, { num: '5x', label: 'Schneller' }],
  },
  services: {
    badge: 'Was wir bieten', title: 'Unsere', titleGrad: 'Services',
    items: [
      { icon: '🎬', title: 'Video Production', desc: 'Professionelle Werbevideos und Social Media Content – optimiert für maximale Reichweite.', tags: ['TikTok', 'Instagram', 'YouTube'] },
      { icon: '🤖', title: 'AI Design & Automation', desc: 'Innovative Design-Konzepte mit neuronalen Netzwerken. Asset-Generierung in Rekordzeit.', tags: ['Midjourney', 'Stable Diffusion', 'DALL·E'] },
      { icon: '📸', title: 'Advertising Content', desc: 'Premium Fotografie und Product Shots – professionell inszeniert für höchste Wirkung.', tags: ['Product Shots', 'Branding', 'Ads'] },
      { icon: '🌐', title: 'Digital Solutions', desc: 'Moderne Websites mit React & Next.js. High-Performance für Agencies und Startups.', tags: ['Next.js', 'React', 'TypeScript'] },
    ],
  },
  portfolio: {
    badge: 'Unsere Arbeit', title: 'Portfolio',
    items: [
      { tag: 'Video', title: 'TikTok Viral Series', desc: '10M+ Views | KI-generierte Content-Serie', color: '#7c3aed' },
      { tag: 'Design', title: 'AI Asset Pipeline', desc: '500+ Designs in 2 Wochen', color: '#06b6d4' },
      { tag: 'Website', title: 'High-Performance Web', desc: '95+ Lighthouse Score', color: '#a855f7' },
    ],
  },
  stats: [
    { value: 50, suffix: '+', label: 'Projekte', sublabel: 'erfolgreich abgeschlossen', color: '#a855f7', icon: '🚀' },
    { value: 98, suffix: '%', label: 'Zufriedenheit', sublabel: 'unserer Kunden', color: '#7c3aed', icon: '⭐' },
    { value: 5, suffix: 'x', label: 'Schneller', sublabel: 'als klassische Produktion', color: '#22d3ee', icon: '⚡' },
    { value: 24, suffix: '/7', label: 'Support', sublabel: 'immer erreichbar', color: '#ff6b6b', icon: '🛡️' },
  ],
  cta: {
    badge: "✦ Let's create",
    title: 'Bereit für dein', titleGrad: 'nächstes Projekt?',
    sub: 'Lass uns gemeinsam etwas', subAccent: 'Großartiges schaffen.', subEnd: 'Wir sind bereit für deine Vision.',
    btn1: 'Kontakt aufnehmen ✦', btn2: 'Services ansehen',
    trust: ['✓ Schnelle Lieferung', '✓ Professionelle Qualität', '✓ 24/7 Support'],
  },
  contact: {
    badge: 'Get in Touch', title: 'Lass uns', titleGrad: 'reden',
    subtitle: 'Beschreib dein Projekt – wir melden uns innerhalb von 24 Stunden.',
    infoTitle: 'Kontaktinfo',
    info: [
      { icon: '📧', label: 'E-Mail', value: 'aivideolabs.ch@gmail.com', color: '#a855f7' },
      { icon: '🌐', label: 'Website', value: 'aivideolabs.ch', color: '#22d3ee' },
      { icon: '📍', label: 'Standort', value: 'Schweiz 🇨🇭', color: '#7c3aed' },
      { icon: '⏱️', label: 'Response', value: 'Innerhalb 24h', color: '#ff6b6b' },
    ],
    available: 'Verfügbar für neue Projekte', slots: 'Aktuell 2 Slots offen',
    name: 'Name', namePH: 'Max Mustermann',
    email: 'E-Mail', emailPH: 'max@example.ch',
    phone: 'Telefon (optional)', phonePH: '+41 79 123 45 67',
    service: 'Service', servicePH: 'Service auswählen…',
    message: 'Nachricht', messagePH: 'Beschreib dein Projekt, Budget und Zeitrahmen…',
    services: ['Video Production', 'AI Design', 'Advertising Content', 'Digital Solutions', 'Anderes'],
    submit: 'Anfrage senden ✦', privacy: 'Keine Spam. Deine Daten sind sicher.',
    successTitle: 'Nachricht gesendet!', successMsg: 'Wir melden uns innerhalb von 24 Stunden.',
    errorMsg: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
  },
  footer: {
    tagline: 'Kreative AI-gestützte Videoinhalte',
    impressum: 'Impressum', datenschutz: 'Datenschutz', agb: 'AGB', cookies: 'Cookies',
    impressumHref: '/impressum', datenschutzHref: '/datenschutz', agbHref: '/agb', cookiesHref: '/cookie-policy',
    copyright: '© 2026 AI Video Labs. Alle Rechte vorbehalten.',
  },
  cookie: {
    title: 'Wir verwenden Cookies 🍪',
    desc: 'Wir nutzen Cookies, um die Website zu verbessern und Ihr Erlebnis zu personalisieren.',
    acceptAll: 'Alle akzeptieren', essentialOnly: 'Nur Essentiell', settings: 'Einstellungen',
    settingsTitle: 'Cookie-Einstellungen',
    essential: 'Essentielle Cookies', essentialDesc: 'Für Grundfunktionen der Website. Immer aktiv.',
    analytics: 'Analytics Cookies', analyticsDesc: 'Helfen uns, die Nutzung der Website zu verstehen (Google Analytics).',
    marketing: 'Marketing Cookies', marketingDesc: 'Personalisierte Werbung und Cross-Site Tracking.',
    save: 'Einstellungen speichern', alwaysActive: 'Immer aktiv',
    privacyLink: 'Datenschutzerklärung',
  },
  meta: { title: 'AI Video Labs – Kreative AI-gestützte Videoinhalte', description: 'Professionelle Video Production, AI Design & Digital Solutions aus der Schweiz.' },
};

const ch: typeof de = {
  ...de,
  nav: { ...de.nav, contact: 'Kontakt', cta: 'Anfrage →' },
  hero: {
    ...de.hero,
    h1: 'Kreative', h2: 'KI-gestützte', h3: 'Videoinhalte',
    sub: 'Mir transformiered dini Vision i professionelli, virale Videoinhalte –',
    subAccent: 'powered by moderni KI-Technologie',
    subEnd: 'und dramatischi Effekte.',
    btn1: 'Jetzt anfragen ✦', btn2: 'Portfolio aluege →',
    stats: [{ num: '50+', label: 'Projekte' }, { num: '98%', label: 'Zfriede' }, { num: '5x', label: 'Schnäller' }],
  },
  services: {
    ...de.services,
    badge: 'Was mir biete', title: 'Üseri', titleGrad: 'Services',
    items: [
      { icon: '🎬', title: 'Video Production', desc: 'Professionelli Werbevideos und Social Media Content – optimiert für maximali Reichwiti.', tags: ['TikTok', 'Instagram', 'YouTube'] },
      { icon: '🤖', title: 'AI Design & Automation', desc: 'Innovative Design-Konzept mit neurali Netzwärk. Asset-Generierig in Rekordzeit.', tags: ['Midjourney', 'Stable Diffusion', 'DALL·E'] },
      { icon: '📸', title: 'Advertising Content', desc: 'Premium Fotografie und Produkt Shots – professionell igsetzt für höchsti Wirkig.', tags: ['Product Shots', 'Branding', 'Ads'] },
      { icon: '🌐', title: 'Digital Solutions', desc: 'Moderni Websits mit React & Next.js. High-Performance für Agencies und Startups.', tags: ['Next.js', 'React', 'TypeScript'] },
    ],
  },
  portfolio: {
    ...de.portfolio,
    badge: 'Üseri Arbet', title: 'Portfolio',
    items: [
      { tag: 'Video', title: 'TikTok Viral Series', desc: '10M+ Views | KI-generierti Content-Serie', color: '#7c3aed' },
      { tag: 'Design', title: 'AI Asset Pipeline', desc: '500+ Designs in 2 Wuche', color: '#06b6d4' },
      { tag: 'Website', title: 'High-Performance Web', desc: '95+ Lighthouse Score', color: '#a855f7' },
    ],
  },
  stats: [
    { value: 50, suffix: '+', label: 'Projekte', sublabel: 'erfolgriich abgschlosse', color: '#a855f7', icon: '🚀' },
    { value: 98, suffix: '%', label: 'Zfriede', sublabel: 'vo üsere Kunde', color: '#7c3aed', icon: '⭐' },
    { value: 5, suffix: 'x', label: 'Schnäller', sublabel: 'as klassischi Produktion', color: '#22d3ee', icon: '⚡' },
    { value: 24, suffix: '/7', label: 'Support', sublabel: 'immer erreichbar', color: '#ff6b6b', icon: '🛡️' },
  ],
  cta: {
    ...de.cta,
    title: 'Bisch bereit für dis', titleGrad: 'nächstes Projekt?',
    sub: 'Mir schaffe zäme öppis', subAccent: 'Großartigs.', subEnd: 'Mir sind bereit für dini Vision.',
    btn1: 'Kontakt ufnäh ✦', btn2: 'Services aaluege',
    trust: ['✓ Schnelli Lieferig', '✓ Professionelli Qualität', '✓ 24/7 Support'],
  },
  contact: {
    ...de.contact,
    badge: 'Get in Touch', title: 'Mir rede', titleGrad: 'mitänand',
    subtitle: 'Beschrib dis Projekt – mir melde üs innerhalb vo 24 Stunde.',
    infoTitle: 'Kontaktinfo',
    info: [
      { icon: '📧', label: 'E-Mail', value: 'aivideolabs.ch@gmail.com', color: '#a855f7' },
      { icon: '🌐', label: 'Website', value: 'aivideolabs.ch', color: '#22d3ee' },
      { icon: '📍', label: 'Standort', value: 'Schwiiz 🇨🇭', color: '#7c3aed' },
      { icon: '⏱️', label: 'Response', value: 'Innerhalb 24h', color: '#ff6b6b' },
    ],
    available: 'Verfüegbar für neui Projekte', slots: 'Aktuell 2 Slots offe',
    namePH: 'Hans Muster', emailPH: 'hans@example.ch',
    servicePH: 'Service uswähle…',
    messagePH: 'Beschrib dis Projekt, Budget und Zitrahme…',
    services: ['Video Production', 'AI Design', 'Advertising Content', 'Digital Solutions', 'Anderes'],
    submit: 'Anfrag schicke ✦', privacy: 'Ke Spam. Dini Date sind sicher.',
    successTitle: 'Nachricht gschickt!', successMsg: 'Mir melde üs innerhalb vo 24 Stunde.',
    errorMsg: 'Öppis isch schiefgloffe. Bitte probier es nomol.',
  },
  footer: {
    ...de.footer,
    tagline: 'Kreative KI-gestützte Videoinhalte',
    copyright: '© 2026 AI Video Labs. Alli Rächt vorbehalte.',
  },
  cookie: {
    ...de.cookie,
    title: 'Mir verwende Cookies 🍪',
    desc: 'Mir nutze Cookies, um d Website z verbessere und dis Erläbnis z personalisiere.',
    acceptAll: 'Alli akzeptiere', essentialOnly: 'Nur Essentiell', settings: 'Iistellige',
    settingsTitle: 'Cookie-Iistellige',
    essentialDesc: 'Für Grundfunktione vo de Website. Immer aktiv.',
    analyticsDesc: 'Hälfe üs, d Nutzung vo de Website z verstah (Google Analytics).',
    marketingDesc: 'Personalisierti Werbig und Cross-Site Tracking.',
    save: 'Iistellige speichere',
  },
  meta: { title: 'AI Video Labs – Kreative KI-gestützte Videoinhalte', description: 'Professionelli Video Production, AI Design & Digital Solutions us de Schwiiz.' },
};

const en: typeof de = {
  nav: { home: 'Home', services: 'Services', portfolio: 'Portfolio', contact: 'Contact', cta: 'Get in Touch →', lang: de.nav.lang },
  hero: {
    badge: 'Powered by Modern AI Technology',
    h1: 'Creative', h2: 'AI-Powered', h3: 'Video Content',
    sub: 'We transform your vision into professional, viral video content –',
    subAccent: 'powered by modern AI technology',
    subEnd: 'and dramatic effects.',
    btn1: 'Get in Touch ✦', btn2: 'View Portfolio →',
    stats: [{ num: '50+', label: 'Projects' }, { num: '98%', label: 'Satisfaction' }, { num: '5x', label: 'Faster' }],
  },
  services: {
    badge: 'What we offer', title: 'Our', titleGrad: 'Services',
    items: [
      { icon: '🎬', title: 'Video Production', desc: 'Professional promotional videos and social media content – optimized for maximum reach.', tags: ['TikTok', 'Instagram', 'YouTube'] },
      { icon: '🤖', title: 'AI Design & Automation', desc: 'Innovative design concepts with neural networks. Asset generation in record time.', tags: ['Midjourney', 'Stable Diffusion', 'DALL·E'] },
      { icon: '📸', title: 'Advertising Content', desc: 'Premium photography and product shots – professionally staged for maximum impact.', tags: ['Product Shots', 'Branding', 'Ads'] },
      { icon: '🌐', title: 'Digital Solutions', desc: 'Modern websites with React & Next.js. High-performance for agencies and startups.', tags: ['Next.js', 'React', 'TypeScript'] },
    ],
  },
  portfolio: {
    badge: 'Our Work', title: 'Portfolio',
    items: [
      { tag: 'Video', title: 'TikTok Viral Series', desc: '10M+ Views | AI-generated content series', color: '#7c3aed' },
      { tag: 'Design', title: 'AI Asset Pipeline', desc: '500+ Designs in 2 weeks', color: '#06b6d4' },
      { tag: 'Website', title: 'High-Performance Web', desc: '95+ Lighthouse Score', color: '#a855f7' },
    ],
  },
  stats: [
    { value: 50, suffix: '+', label: 'Projects', sublabel: 'successfully completed', color: '#a855f7', icon: '🚀' },
    { value: 98, suffix: '%', label: 'Satisfaction', sublabel: 'of our clients', color: '#7c3aed', icon: '⭐' },
    { value: 5, suffix: 'x', label: 'Faster', sublabel: 'than traditional production', color: '#22d3ee', icon: '⚡' },
    { value: 24, suffix: '/7', label: 'Support', sublabel: 'always available', color: '#ff6b6b', icon: '🛡️' },
  ],
  cta: {
    badge: "✦ Let's create",
    title: 'Ready for your', titleGrad: 'next project?',
    sub: "Let's create something", subAccent: 'amazing together.', subEnd: "We're ready for your vision.",
    btn1: 'Contact Us ✦', btn2: 'View Services',
    trust: ['✓ Fast Delivery', '✓ Professional Quality', '✓ 24/7 Support'],
  },
  contact: {
    badge: 'Get in Touch', title: "Let's", titleGrad: 'talk',
    subtitle: "Describe your project – we'll get back to you within 24 hours.",
    infoTitle: 'Contact Info',
    info: [
      { icon: '📧', label: 'Email', value: 'aivideolabs.ch@gmail.com', color: '#a855f7' },
      { icon: '🌐', label: 'Website', value: 'aivideolabs.ch', color: '#22d3ee' },
      { icon: '📍', label: 'Location', value: 'Switzerland 🇨🇭', color: '#7c3aed' },
      { icon: '⏱️', label: 'Response', value: 'Within 24h', color: '#ff6b6b' },
    ],
    available: 'Available for new projects', slots: '2 slots currently open',
    name: 'Name', namePH: 'John Doe',
    email: 'Email', emailPH: 'john@example.com',
    phone: 'Phone (optional)', phonePH: '+1 234 567 8900',
    service: 'Service', servicePH: 'Select a service…',
    message: 'Message', messagePH: 'Describe your project, budget and timeline…',
    services: ['Video Production', 'AI Design', 'Advertising Content', 'Digital Solutions', 'Other'],
    submit: 'Send Request ✦', privacy: 'No spam. Your data is safe.',
    successTitle: 'Message sent!', successMsg: "We'll get back to you within 24 hours.",
    errorMsg: 'Something went wrong. Please try again.',
  },
  footer: {
    tagline: 'Creative AI-Powered Video Content',
    impressum: 'Legal Notice', datenschutz: 'Privacy Policy', agb: 'Terms of Service', cookies: 'Cookie Policy',
    impressumHref: '/legal-notice', datenschutzHref: '/privacy-policy', agbHref: '/terms-of-service', cookiesHref: '/cookie-policy',
    copyright: '© 2026 AI Video Labs. All rights reserved.',
  },
  cookie: {
    title: 'We use cookies 🍪',
    desc: 'We use cookies to improve our website and personalize your experience.',
    acceptAll: 'Accept All', essentialOnly: 'Essential Only', settings: 'Settings',
    settingsTitle: 'Cookie Settings',
    essential: 'Essential Cookies', essentialDesc: 'Required for basic website functionality. Always active.',
    analytics: 'Analytics Cookies', analyticsDesc: 'Help us understand how visitors use the website (Google Analytics).',
    marketing: 'Marketing Cookies', marketingDesc: 'Personalized advertising and cross-site tracking.',
    save: 'Save Settings', alwaysActive: 'Always Active',
    privacyLink: 'Privacy Policy',
  },
  meta: { title: 'AI Video Labs – Creative AI-Powered Video Content', description: 'Professional Video Production, AI Design & Digital Solutions from Switzerland.' },
};

export const translations = { de, ch, en };
export type T = typeof de;

export function getT(lang: string): T {
  if (lang === 'ch') return ch;
  if (lang === 'en') return en;
  return de;
}
