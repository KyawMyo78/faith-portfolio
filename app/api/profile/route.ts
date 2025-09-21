import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getCached, setCached, clearCached } from '@/lib/server-cache';
import { revalidatePath, revalidateTag } from 'next/cache';

// Initialize Firebase Admin SDK
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

// Default profile data
const defaultProfile = {
  name: 'Your Name',
  nickname: 'Your Nickname',
  title: 'Developer',
  specialization: 'Your Specialization',
  description: 'A short bio about you. Replace this in the admin panel or via Firestore.',
  // Detailed About page description (long form)
  aboutDescription: 'A longer About description. Update this via the admin dashboard or Firestore to describe your background, projects, and motivations.',
  location: 'Your Location',
  email: 'your-email@example.com',
  github: '',
  linkedin: '',
  profileImage: '/profile.jpg',
  cvUrl: '',
  socialLinks: [],
  // New editable fields for home page
  greetingText: 'Hello, I\'m',
  contactButtonText: 'Get In Touch',
  cvButtonText: 'Download CV',
  cvNotAvailableText: 'CV Not Available'
  ,
  // About section editable content
  aboutHighlights: [
    {
      id: 'h1',
      iconKey: 'graduation',
      title: 'Academic Excellence',
      description: 'Brief note about academic achievements.'
    },
  ],
  // aboutStats removed - use aboutHighlights only
};

async function getProfile() {
  try {
    const cacheKey = 'profile:main';
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const docRef = db.collection('profile').doc('main');
    const doc = await docRef.get();
    if (doc.exists) {
      let data = doc.data();
      // Sanitize profileImage if it contains stray control characters
      if (data && data.profileImage && typeof data.profileImage === 'string') {
        data.profileImage = data.profileImage.replace(/[\t\n\r]/g, '').trim();
      }
      setCached(cacheKey, data, 10 * 1000);
      return data;
    } else {
      // Create the default profile if it doesn't exist
      await docRef.set(defaultProfile);
      setCached(cacheKey, defaultProfile, 10 * 1000);
      return defaultProfile;
    }
  } catch (error) {
    console.error('Error reading profile from Firestore:', error);
    return defaultProfile;
  }
}

async function saveProfile(profileData: any) {
  try {
    const docRef = db.collection('profile').doc('main');
    // Sanitize incoming profileImage URL to remove stray control characters
    if (profileData && profileData.profileImage && typeof profileData.profileImage === 'string') {
      profileData.profileImage = profileData.profileImage.replace(/[\t\n\r]/g, '').trim();
    }
    await docRef.set(profileData, { merge: true });
  // Clear cache so subsequent GET returns fresh data
  clearCached('profile:main');
    // Trigger Next.js to revalidate the main public pages that use this profile
    try {
      revalidatePath('/');
      revalidatePath('/about');
      // Also revalidate tag-based cache consumers if any pages use tags
      try { revalidateTag('profile'); } catch (e) { /* ignore outside Next runtime */ }
    } catch (e) {
      console.warn('revalidatePath failed (this may happen outside Next runtime):', e);
    }
    return true;
  } catch (error) {
    console.error('Error saving profile to Firestore:', error);
    return false;
  }
}

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json({ 
      success: true, 
      data: profile 
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch profile' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const profileData = await request.json();
    
    const success = await saveProfile(profileData);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Profile updated successfully',
        data: profileData 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to save profile' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update profile' 
    }, { status: 500 });
  }
}
