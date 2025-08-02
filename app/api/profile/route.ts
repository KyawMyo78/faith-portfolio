import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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
  name: 'Kyaw Myo Khant',
  nickname: 'Phillip',
  title: 'IT Student & Developer',
  specialization: 'Specializing in Embedded Systems & Mobile Development',
  description: 'A passionate 23-year-old Myanmar student studying IT in Thailand. I love creating innovative solutions through programming, embedded systems, and mobile development while mentoring others in their coding journey.',
  location: 'Thailand • Myanmar Native',
  email: 'kyawmyokhant78@gmail.com',
  github: 'https://github.com/KyawMyo78',
  linkedin: 'https://linkedin.com',
  profileImage: '/profile.jpg',
  cvUrl: '',
  socialLinks: []
};

async function getProfile() {
  try {
    const docRef = db.collection('profile').doc('main');
    const doc = await docRef.get();
    
    if (doc.exists) {
      return doc.data();
    } else {
      // Create the default profile if it doesn't exist
      await docRef.set(defaultProfile);
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
    await docRef.set(profileData, { merge: true });
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
