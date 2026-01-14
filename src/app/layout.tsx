import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import LayoutWrapper from './components/LayoutWrapper'; // Import the new wrapper
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voltic Energy",
  description: "Fuel Your Ambition",
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