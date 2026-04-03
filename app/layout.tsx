import type { Metadata, Viewport } from "next";

// Mobile status bar aur theme color ke liye
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Terminal feel ke liye zoom disable rakhein
};

export const metadata: Metadata = {
  title: "Arshux Terminal",
  description: "Standalone Linux Environment",
  manifest: "/manifest.json", // Ye line sab se zaroori hai!
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Arshux",
  },
  icons: {
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Apple devices ke liye extra safety */}
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}

