import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Explore - Discover Hidden Gems',
  description: 'Track your time exploring niche spots and discover hidden gems across cities.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
