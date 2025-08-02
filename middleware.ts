import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if it's an admin route (except login, forgot-password, and reset-password)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login') &&
      !request.nextUrl.pathname.startsWith('/admin/forgot-password') &&
      !request.nextUrl.pathname.startsWith('/admin/reset-password')) {
    
    // Check for auth token in cookies
    const token = request.cookies.get('admin-token');
    
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // In a real application, you would verify the JWT token here
    // For now, we'll just check if it exists
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
