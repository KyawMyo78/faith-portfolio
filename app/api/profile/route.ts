import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getProfile as getProfileHelper, saveProfile as saveProfileHelper } from '@/lib/get-profile';
async function getProfile() {
  return await getProfileHelper();
}

async function saveProfile(profileData: any) {
  const success = await saveProfileHelper(profileData);
  if (success) {
    try {
      revalidatePath('/');
      revalidatePath('/about');
      try { revalidateTag('profile'); } catch (e) { /* ignore outside Next runtime */ }
    } catch (e) {
      console.warn('revalidatePath failed (this may happen outside Next runtime):', e);
    }
  }
  return success;
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
