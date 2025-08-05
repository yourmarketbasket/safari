import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const { pathname } = request.nextUrl;

  const publicPaths = ['/', '/login', '/signup'];

  // If the user is authenticated
  if (token) {
    // And tries to access a public path, redirect to dashboard
    if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // If the user is not authenticated
  if (!token) {
    // And tries to access a protected path, redirect to login
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
