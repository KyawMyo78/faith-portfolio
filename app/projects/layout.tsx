import { Metadata } from 'next';
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await db.collection('siteSettings').doc('main').get();
    const siteSettings = doc.exists ? doc.data() : {};
    
    const siteName = siteSettings?.general?.siteTitle || siteSettings?.navigation?.siteName || 'Portfolio';
    const title = `Projects | ${siteName}`;
    const description = `Explore the portfolio projects by ${siteName}`;

    return {
      title,
      description,
    };
  } catch (error) {
    return {
      title: 'Projects | Portfolio',
      description: 'Explore my portfolio projects',
    };
  }
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
