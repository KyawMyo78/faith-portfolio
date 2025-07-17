import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('=== AUTH DEBUG ===');
    console.log('Login attempt with:', { email, passwordLength: password?.length });

    // Get credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    
    console.log('Using environment credentials');
    console.log('Admin email from env:', adminEmail);
    console.log('Password hash exists:', !!adminPasswordHash);
    console.log('Password hash length:', adminPasswordHash?.length);
    console.log('Password hash preview:', adminPasswordHash?.substring(0, 20) + '...');

    if (!adminEmail || !adminPasswordHash) {
      console.log('❌ Missing environment variables');
      console.log('Environment check:', {
        hasAdminEmail: !!process.env.ADMIN_EMAIL,
        hasPasswordHash: !!process.env.ADMIN_PASSWORD_HASH,
        allEnvKeys: Object.keys(process.env).filter(key => key.includes('ADMIN'))
      });
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Check email
    console.log('Email comparison:', { provided: email, expected: adminEmail, match: email === adminEmail });
    if (email !== adminEmail) {
      console.log('❌ Email mismatch');
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password using bcrypt
    console.log('Comparing password with hash...');
    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Password mismatch');
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('✅ Authentication successful');
    console.log('=== END AUTH DEBUG ===');

    // Generate JWT token
    const secret = process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development';
    const token = jwt.sign(
      { email, role: 'admin' },
      secret,
      { expiresIn: '24h' }
    );

    console.log('Generated token:', token.substring(0, 20) + '...');

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { email, role: 'admin' }
    });

    // Set HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: false, // Set to false for localhost development
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      maxAge: 86400, // 24 hours
      path: '/'
    });

    console.log('Set cookie: admin-token');

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    });

    // Clear the admin token cookie
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0)
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
