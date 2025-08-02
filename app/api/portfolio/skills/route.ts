import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// GET all skills
export async function GET() {
  try {
    const snapshot = await adminDb
      .collection('skills')
      .orderBy('order', 'asc')
      .get();

    const skills = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      data: skills
    });

  } catch (error: any) {
    console.error('Error fetching skills:', error);
    
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
