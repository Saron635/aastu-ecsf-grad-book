 

import type { Metadata } from "next";
import "./globals.css";

import {
  Cinzel_Decorative,
  Josefin_Sans,
  Lora,
  Noto_Kufi_Arabic,
} from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-josefin-sans",
  display: "swap",
});



export const metadata: Metadata = {
  title: "Graduation Book",
  description: "Digital Graduation Book",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={josefinSans.className}
    >
      <body className={josefinSans.className}>{children}</body>
    </html>
  );
}
