'use client';

import Navigation from '@/components/Navigation'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import { useScrollTracking } from '@/hooks/useAnalytics'

export default function ProjectsPage() {
  useScrollTracking();

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
    </main>
  )
}
