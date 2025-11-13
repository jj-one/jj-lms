import { dbConn } from '@/lib/db';
import { signJwt } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const existing = await dbConn.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await dbConn.user.create({
    data: { name, email, password: hashed },
  });

  const token = await signJwt({ id: user.id, email: user.email, name: user.name, role: user.role });

  const res = NextResponse.json({ success: true });
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 1,
    path: '/',
  });

  return res;
}
