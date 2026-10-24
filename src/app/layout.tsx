import type { Metadata, Viewport } from 'next';
import {
  Lora as lora,
  Pinyon_Script as pinyonScript,
  Viaoda_Libre as viaodaLibre
} from 'next/font/google';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import './globals.css';

const displayFont = viaodaLibre({
  variable: '--font-viaoda',
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
});

const scriptFont = pinyonScript({
  variable: '--font-pinyon',
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
});

const bodyFont = lora({
  variable: '--font-lora',
  subsets: ['latin'],
  style: ['normal', 'italic'],
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
