import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// GET all skills
export async function GET() {
  try {
    console.log('=== SKILLS API DEBUG ===');
    console.log('Environment check:', {
      hasFirebaseProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasFirebaseClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasFirebasePrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      nodeEnv: process.env.NODE_ENV
    });

    console.log('Attempting to connect to Firestore...');
    const snapshot = await adminDb
      .collection('skills')
      .orderBy('order', 'asc')
      .get();

    console.log('Firestore query successful, docs found:', snapshot.docs.length);

    const skills = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Skills data processed successfully');
    console.log('=== END SKILLS API DEBUG ===');

    return NextResponse.json({
      success: true,
      data: skills
    });

  } catch (error: any) {
    console.error('=== SKILLS API ERROR ===');
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      stack: error?.stack,
      name: error?.name
    });
    console.error('Full error object:', error);
    console.error('=== END SKILLS API ERROR ===');
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch skills',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST new skill
export async function POST(request: NextRequest) {
  try {
    const skillData = await request.json();

    // Add metadata
    const newSkill = {
      ...skillData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await adminDb.collection('skills').add(newSkill);

    return NextResponse.json({
      success: true,
      message: 'Skill created successfully',
      id: docRef.id
    });

  } catch (error) {
    console.error('Skill creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
