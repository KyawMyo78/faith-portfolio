import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://kyawmyokhant.com'),
  title: 'Kyaw Myo Khant (Phillip) - Portfolio',
  description: 'Portfolio website of Kyaw Myo Khant (Phillip), a 23-year-old Myanmar student studying IT in Thailand. Specializing in programming, embedded systems, and mobile development.',
  keywords: ['portfolio', 'developer', 'programming', 'embedded systems', 'mobile development', 'web development', 'Myanmar', 'Thailand', 'IT student'],
  authors: [{ name: 'Kyaw Myo Khant (Phillip)' }],
  openGraph: {
    title: 'Kyaw Myo Khant (Phillip) - Portfolio',
    description: 'Portfolio website showcasing projects and skills in programming, embedded systems, and mobile development.',
    url: '/',
    siteName: 'Phillip Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'Kyaw Myo Khant (Phillip) - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyaw Myo Khant (Phillip) - Portfolio',
    description: 'Portfolio website showcasing projects and skills in programming, embedded systems, and mobile development.',
    images: ['/og-image.jpg'],
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
