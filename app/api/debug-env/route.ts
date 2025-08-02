import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    env: {
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'not set',
      FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'not set',
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? 'set' : 'not set',
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? 'set' : 'not set',
    }
  });
}
