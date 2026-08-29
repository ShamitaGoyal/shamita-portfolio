import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { HashScrollOnLoad } from "@/components/layout/hash-scroll-on-load";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';


const ppMondwest = localFont({
  src: "./fonts/PPMondwest.woff2",
  variable: "--font-mondwest",
  weight: "400",
  display: "swap",
});

const jelek = localFont({
  src: "./fonts/Jelek.woff2",
  variable: "--font-jelek",
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shamita's Portfolio",
  description: "Software engineer and designer exploring the intersection of technology, design, and human-computer interaction.",
  icons: {
    icon: "/sg-logo.png", 
    shortcut: "/sg-logo.png",
    apple: "/sg-logo.png",
  },
  authors: [{ name: "Shamita Goyal" }],
};



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ppMondwest.variable} ${jelek.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <SiteHeader />
          <HashScrollOnLoad />
          {children}
          <Analytics />
      </body>
    </html>
  );
}
