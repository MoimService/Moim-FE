'use server';

import { cookies } from 'next/headers';

export async function getAccessToken() {
  const cookieStore = cookies();
  return cookieStore.get('accessToken')?.value || null;
}

export async function removeAccessToken() {
  const cookieStore = cookies();
  cookieStore.delete('accessToken');
}

export async function setAccessToken(token: string) {
  const cookieStore = cookies();
  cookieStore.set('accessToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
}
