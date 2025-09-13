import {cookies} from 'next/headers';
import type {User} from 'firebase/auth';
import {auth} from '@/lib/firebase/admin';

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(session, true);
    return decodedClaims;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(session, true);
    const user = await auth.getUser(decodedClaims.uid);
    return user as unknown as User;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createSession(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn});
  cookies().set('session', sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });
}

export async function deleteSession() {
  cookies().delete('session');
}
