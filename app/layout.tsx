import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Video Labs – Kreative AI-gestützte Videoinhalte',
  description: 'Professionelle Video Production, AI Design & Digital Solutions aus der Schweiz.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
