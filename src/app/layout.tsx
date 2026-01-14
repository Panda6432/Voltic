import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import LayoutWrapper from './components/LayoutWrapper'; // Import the new wrapper
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
});

// Get site URL from environment variable
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltic-energy.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Voltic Energy | Pure Adrenaline & Clean Energy Drink",
    template: "%s | Voltic Energy"
  },
  description: "Fuel Your Ambition with Voltic Energy - Premium energy drink with bold flavors, clean ingredients, and zero sugar. Experience pure adrenaline and own the moment.",
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
    siteName: 'Voltic Energy Drink',
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
    creator: '@volticenergy', // Update with your actual Twitter handle
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'your-google-verification-code-here', // Add after setting up Google Search Console
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
      <body className={`${orbitron.className} antialiased bg-black`}>
        {/* We pass the content to the Wrapper, which handles the Footer logic */}
        <LayoutWrapper>
           {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}