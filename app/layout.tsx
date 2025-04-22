// --- START OF FILE app/layout.tsx ---

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "$ROACH - The Antifragile Token on Solana", // Specific Title
    description: "Engineered to thrive on volatility. $ROACH converts market stress into holder rewards and ecosystem strength on the Solana blockchain.", // Specific Description
    // Add OpenGraph and Twitter card metadata for better sharing
     openGraph: {
        title: '$ROACH - The Antifragile Token on Solana',
        description: 'Engineered to thrive on volatility. Discover the token that gets stronger when attacked.',
        url: 'https://roachtoken.com', // Replace with your actual domain
        siteName: '$ROACH Token',
        images: [
          {
             url: 'https://roachtoken.com/og-image.png', // Replace with your actual OG image URL
            width: 1200,
            height: 630,
             alt: '$ROACH Token Logo and Concept Art',
          },
        ],
        locale: 'en_US',
         type: 'website',
      },
     twitter: {
         card: 'summary_large_image',
         title: '$ROACH - The Antifragile Token on Solana',
         description: 'Engineered to thrive on volatility on the Solana blockchain.',
         // creator: '@paradoxonsol', // Replace with your actual Twitter handle
         images: ['https://roachtoken.com/twitter-image.png'], // Replace with your actual Twitter image URL
      },
      // Optional: Add favicon links
      // icons: {
      //   icon: '/favicon.ico',
      //   shortcut: '/favicon-16x16.png',
      //   apple: '/apple-touch-icon.png',
      // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     // Apply font variables directly to html for better inheritance
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
       <body>
        {/* Wrap children with ThemeProvider */}
        <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Default to dark mode
             enableSystem
            disableTransitionOnChange
          >
          {children}
          <Toaster richColors position="bottom-right" theme="dark" /> {/* Apply dark theme directly for consistency if default is dark */}
         </ThemeProvider>
      </body>
    </html>
  );
}
// --- END OF FILE app/layout.tsx ---