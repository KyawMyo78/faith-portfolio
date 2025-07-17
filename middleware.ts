import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware: Checking path:', request.nextUrl.pathname);
  
  // Check if it's an admin route (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check for auth token in cookies
    const token = request.cookies.get('admin-token');
    console.log('Middleware: Token check:', { 
      path: request.nextUrl.pathname, 
      hasToken: !!token,
      tokenValue: token?.value ? token.value.substring(0, 20) + '...' : 'none'
    });
    
    if (!token) {
      console.log('Middleware: No token found, redirecting to login');
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    console.log('Middleware: Token found, allowing access');
    // In a real application, you would verify the JWT token here
    // For now, we'll just check if it exists
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
