import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default async function AboutPage() {
  // Fetch profile via internal API using a cache tag so that
  // `revalidateTag('profile')` will update pages that used this tag.
  let profile = null;
  try {
    const res = await fetch('/api/profile', { next: { tags: ['profile'] } });
    const json = await res.json();
    if (json && json.success) profile = json.data;
  } catch (e) {
    console.error('Failed to fetch profile via API:', e);
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
