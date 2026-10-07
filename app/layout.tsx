import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CreatorPilot - Verified Creator Rate Card & Analytics',
  description: 'Deterministic reach-based pricing, statistical post autopsies, and grounded outreach pitches for social media creators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-900 text-slate-100 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
