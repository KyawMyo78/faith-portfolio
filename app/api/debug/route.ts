import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    adminEmailExists: !!process.env.ADMIN_EMAIL,
    adminPasswordHashExists: !!process.env.ADMIN_PASSWORD_HASH,
    nextAuthSecretExists: !!process.env.NEXTAUTH_SECRET,
    adminEmail: process.env.ADMIN_EMAIL, // Safe to show for debugging
    // DO NOT log the actual hash in production
    hashLength: process.env.ADMIN_PASSWORD_HASH?.length || 0,
  });
}
