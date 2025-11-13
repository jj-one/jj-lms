// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';

const protectedRoutes = ['/admin'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isAuthenticated = token && verifyJwt(token);

  const isProtected = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
