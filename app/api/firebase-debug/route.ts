import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    console.log('=== FIREBASE DEBUG ===');
    
    // Check environment variables
    const envCheck = {
      hasFirebaseProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasFirebaseClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasFirebasePrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0
    };
    
    console.log('Environment check:', envCheck);
    
    // Test Firebase connection
    try {
      console.log('Testing Firebase connection...');
      const testDoc = await adminDb.collection('test').limit(1).get();
      console.log('Firebase connection successful, docs found:', testDoc.docs.length);
      
      return NextResponse.json({
        success: true,
        message: 'Firebase connection successful',
        envCheck,
        connectionTest: 'passed'
      });
    } catch (firebaseError: any) {
      console.error('Firebase connection error:', firebaseError);
      return NextResponse.json({
        success: false,
        error: 'Firebase connection failed',
        envCheck,
        firebaseError: firebaseError?.message || String(firebaseError),
        connectionTest: 'failed'
      }, { status: 500 });
    }
    
  } catch (error: any) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
      connectionTest: 'error'
    }, { status: 500 });
  }
}
