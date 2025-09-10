'use client';

import Navigation from '@/components/Navigation'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import { useScrollTracking } from '@/hooks/useAnalytics'

export default function ExperiencePage() {
  useScrollTracking();

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Experience />
      </div>
      <Footer />
    </main>
  )
}
