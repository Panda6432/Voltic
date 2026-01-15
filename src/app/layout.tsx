import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import LayoutWrapper from './components/LayoutWrapper';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltic-energy.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Voltic Energy | Pure Adrenaline & Clean Energy Drink",
    template: "%s | Voltic Energy"
  },

  description:
    "Fuel Your Ambition with Voltic Energy - Premium energy drink with bold flavors, clean ingredients, and zero sugar. Experience pure adrenaline and own the moment.",

  keywords: [
    'energy drink',
    'voltic energy',
    'zero sugar energy drink',
    'clean energy drink',
    'performance drink',
    'adrenaline drink',
    'caffeinated beverage',
    'sports drink',
    'fuel your ambition',
    'premium energy drink'
  ],

  authors: [{ name: 'Voltic Energy' }],
  creator: 'Voltic Energy',
  publisher: 'Voltic Energy',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Voltic Energy',
    title: 'Voltic Energy | Pure Adrenaline & Clean Energy Drink',
    description: 'Fuel Your Ambition with premium energy drink. Bold flavors, clean ingredients, zero sugar. Own the moment.',
    images: [
      {
        url: '/poster.webp',
        width: 1200,
        height: 630,
        alt: 'Voltic Energy Drink - Pure Adrenaline',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Voltic Energy | Pure Adrenaline & Clean Energy',
    description: 'Fuel Your Ambition with premium energy drink. Bold flavors and clean ingredients.',
    images: ['/redvoltic.webp'],
    creator: '@volticenergy',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  verification: {
    google: 'FK-P4ChYukghArc221F34PFfVBjOGdv0nwKQlw_TTKE',
  },

  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Voltic Energy",
              "url": siteUrl,
              "logo": `${siteUrl}/web-app-manifest-512x512.png`,
            }),
          }}
        />
      </head>

      <body className={`${orbitron.className} antialiased bg-black`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
