import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SalesPulse | Atomic Sales Analytics Platform (2022 - 2024)',
  description:
    'Interactive Next.js 15 Sales Analytics Platform built with Atomic Design principles, Recharts data visualization, custom threshold analysis, and Kaggle Superstore retail benchmark data.',
  keywords: [
    'Next.js 15',
    'Atomic Design',
    'Recharts',
    'Sales Analytics',
    'Kaggle Dataset',
    'TypeScript',
    'Tailwind CSS',
    'Dashboard',
  ],
  authors: [{ name: 'SalesPulse Intelligence Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
