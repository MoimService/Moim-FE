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
  const isProd = process.env.NODE_ENV === 'production';
  cookieStore.set('accessToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: isProd,
    domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
    maxAge: parseInt(process.env.NEXT_TOKEN_MAX_AGE as string) || 60 * 60,
  });
}
