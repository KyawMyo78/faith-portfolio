import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

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
  cvUrl: ''
};

const dataDir = path.join(process.cwd(), 'data');
const profileFile = path.join(dataDir, 'profile.json');

async function ensureDataDir() {
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

async function getProfile() {
  try {
    await ensureDataDir();
    if (existsSync(profileFile)) {
      const data = await readFile(profileFile, 'utf8');
      return JSON.parse(data);
    }
    return defaultProfile;
  } catch (error) {
    console.error('Error reading profile:', error);
    return defaultProfile;
  }
}

async function saveProfile(profileData: any) {
  try {
    await ensureDataDir();
    await writeFile(profileFile, JSON.stringify(profileData, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving profile:', error);
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
