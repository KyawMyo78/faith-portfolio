import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kyaw Myo Khant (Phillip) - Portfolio',
  description: 'Portfolio website of Kyaw Myo Khant (Phillip), a 23-year-old Myanmar student studying IT in Thailand. Specializing in programming, embedded systems, and mobile development.',
  keywords: ['portfolio', 'developer', 'programming', 'embedded systems', 'mobile development', 'web development', 'Myanmar', 'Thailand', 'IT student'],
  authors: [{ name: 'Kyaw Myo Khant (Phillip)' }],
  openGraph: {
    title: 'Kyaw Myo Khant (Phillip) - Portfolio',
    description: 'Portfolio website showcasing projects and skills in programming, embedded systems, and mobile development.',
    url: process.env.SITE_URL || 'http://localhost:3000',
    siteName: 'Phillip Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyaw Myo Khant (Phillip) - Portfolio',
    description: 'Portfolio website showcasing projects and skills in programming, embedded systems, and mobile development.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
            },
            success: {
              style: {
                background: '#059669',
              },
            },
            error: {
              style: {
                background: '#dc2626',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
