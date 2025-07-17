import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token');
  
  return NextResponse.json({
    hasCookie: !!token,
    cookieValue: token?.value ? token.value.substring(0, 20) + '...' : 'none',
    allCookies: Object.fromEntries(
      request.cookies.getAll().map(cookie => [cookie.name, cookie.value.substring(0, 20) + '...'])
    )
  });
}
