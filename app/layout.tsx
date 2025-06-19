import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Graduation Book',
  description: 'Digital Graduation Book',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
