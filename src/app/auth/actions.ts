'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {z} from 'zod';
import {auth} from '@/lib/firebase/admin';
import {createSession, deleteSession} from '@/lib/auth';

const loginSchema = z.object({
  idToken: z.string(),
});

export async function login(data: FormData) {
  const parsedData = loginSchema.safeParse({idToken: data.get('idToken')});
  if (!parsedData.success) {
    return {error: 'Invalid ID token'};
  }
  await createSession(parsedData.data.idToken);
  revalidatePath('/');
  redirect('/');
}

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(1),
});

export async function signup(data: FormData) {
  const parsedData = signupSchema.safeParse({
    email: data.get('email'),
    password: data.get('password'),
    displayName: data.get('displayName'),
  });

  if (!parsedData.success) {
    return {error: 'Invalid form data.'};
  }

  const {email, password, displayName} = parsedData.data;

  try {
    await auth.createUser({
      email,
      password,
      displayName,
    });
    return {success: true};
  } catch (error: any) {
    return {error: error.message};
  }
}

export async function logout() {
  await deleteSession();
  revalidatePath('/');
}
