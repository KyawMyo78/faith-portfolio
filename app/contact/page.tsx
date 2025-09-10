'use client';

import Navigation from '@/components/Navigation'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { useScrollTracking } from '@/hooks/useAnalytics'

export default function ContactPage() {
  useScrollTracking();

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
