import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Footer from '@/components/Footer'
import { getProfile } from '@/lib/get-profile'

export default async function AboutPage() {
  // Read profile directly on the server to avoid internal HTTP fetches
  // that can fail during SSR. The shared helper merges defaults and caches.
  let profile = null;
  try {
    profile = await getProfile();
  } catch (e) {
    console.error('Failed to load profile for About page:', e);
  }

  return (
    <main className="min-h-screen">
      <Navigation siteSettings={null} />
      <div className="pt-20">
        <About profile={profile} />
      </div>
      <Footer profile={profile} />
    </main>
  )
}
