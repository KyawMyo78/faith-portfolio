'use client';

import Navigation from '@/components/Navigation'
import Skills from '@/components/Skills'
import Footer from '@/components/Footer'
import { useScrollTracking } from '@/hooks/useAnalytics'

export default function SkillsPage() {
  useScrollTracking();

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Skills />
      </div>
      <Footer />
    </main>
  )
}
