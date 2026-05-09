import { MetadataRoute } from 'next';

const BASE = 'https://aivideolabs.ch';

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ['de', 'ch', 'en'];
  const now = new Date();

  const mainPages = langs.flatMap(lang => [
    { url: `${BASE}/${lang}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
  ]);

  const deChPages = ['de', 'ch'].flatMap(lang => [
    { url: `${BASE}/${lang}/impressum`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE}/${lang}/datenschutz`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE}/${lang}/agb`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE}/${lang}/cookie-policy`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
  ]);

  const enPages = [
    { url: `${BASE}/en/legal-notice`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE}/en/privacy-policy`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE}/en/terms-of-service`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE}/en/cookie-policy`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  return [...mainPages, ...deChPages, ...enPages];
}
