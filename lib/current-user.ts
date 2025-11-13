import "server-only";

// lib/current-user.ts
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/auth';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return token ? await verifyJwt(token) : null;
}
