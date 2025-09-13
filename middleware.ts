import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

import {getSession} from '@/lib/auth';

const privatePaths = [
  '/',
  '/directory',
  '/news',
  '/events',
  '/mentorship',
  '/jobs',
  '/messages',
  '/profile',
];
const authPaths = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const session = await getSession();

  // If the user is logged in and tries to access an auth page, redirect to home
  if (session && authPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not logged in and tries to access a private page, redirect to login
  if (!session && privatePaths.some((p) => pathname === p)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
