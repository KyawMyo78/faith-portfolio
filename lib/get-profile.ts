import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getCached, setCached, clearCached } from './server-cache';

// Initialize Firebase Admin SDK if needed
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

export const defaultProfile = {
  name: 'Your Name',
  nickname: 'Your Nickname',
  title: 'Developer',
  specialization: 'Your Specialization',
  description: 'A short bio about you. Replace this in the admin panel or via Firestore.',
  aboutDescription:
    'A longer About description. Update this via the admin dashboard or Firestore to describe your background, projects, and motivations.',
  location: 'Your Location',
  email: 'your-email@example.com',
  github: '',
  linkedin: '',
  profileImage: '/profile-placeholder.svg',
  cvUrl: '',
  socialLinks: [],
  greetingText: "Hello, I'm",
  contactButtonText: 'Get In Touch',
  cvButtonText: 'Download CV',
  cvNotAvailableText: 'CV Not Available',
  aboutHighlights: [
    {
      id: 'h1',
      iconKey: 'graduation',
      title: 'Academic Excellence',
      description: 'Brief note about academic achievements.',
    },
  ],
};

export async function getProfile() {
  try {
    const cacheKey = 'profile:main';
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const docRef = db.collection('profile').doc('main');
    const doc = await docRef.get();
    if (doc.exists) {
      let data = doc.data();
      data = { ...defaultProfile, ...data };
      if (data && data.profileImage && typeof data.profileImage === 'string') {
        data.profileImage = data.profileImage.replace(/[\t\n\r]/g, '').trim();
      }
      setCached(cacheKey, data, 10 * 1000);
      return data;
    } else {
      await docRef.set(defaultProfile);
      setCached(cacheKey, defaultProfile, 10 * 1000);
      return defaultProfile;
    }
  } catch (error) {
    console.error('Error reading profile from Firestore (getProfile):', error);
    return defaultProfile;
  }
}

export async function saveProfile(profileData: any) {
  try {
    const docRef = db.collection('profile').doc('main');
    if (profileData && profileData.profileImage && typeof profileData.profileImage === 'string') {
      profileData.profileImage = profileData.profileImage.replace(/[\t\n\r]/g, '').trim();
    }
    await docRef.set(profileData, { merge: true });
    clearCached('profile:main');
    return true;
  } catch (error) {
    console.error('Error saving profile to Firestore (saveProfile):', error);
    return false;
  }
}
