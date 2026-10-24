import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond as cormorantGaramond,
  Great_Vibes as greatVibes,
  Jost as jost
} from 'next/font/google';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import './globals.css';

const displayFont = cormorantGaramond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const scriptFont = greatVibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
});

const bodyFont = jost({
  variable: '--font-jost',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.language}
      className={cn(
        displayFont.variable,
        scriptFont.variable,
        bodyFont.variable
      )}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
