import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// Browser UI aur Mobile Status Bar ka color set karne ke liye
export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Arshux - Standalone Terminal',
  description: 'The Standalone Linux Environment for Developers. A lightweight retro CLI terminal emulator.',
  generator: 'v0.app',
  manifest: '/manifest.json', // PWA Manifest link
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Arshux',
  },
  icons: {
    icon: [
      {
        url: '/icon.png', // Aapka naya Golden Icon
        type: 'image/png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.png', // Apple devices ke liye icon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest Manual Link */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="font-sans antialiased bg-black text-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

