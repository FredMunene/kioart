import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

const bodySans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const titleSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-title-serif",
});

export const metadata: Metadata = {
  title: "kyo-art",
  description: "Luxury, minimalist art marketplace",
};

/**
 * Root layout for the Next.js app
 *
 * @param props - { object } - The props for the RootLayout component
 * @param props.children - { React.ReactNode } - The children to wrap
 * @returns The wrapped children
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodySans.className} ${titleSerif.variable}`}>
      <body className="body-bg">
        <div className="root">{children}</div>
      </body>
    </html>
  );
}
