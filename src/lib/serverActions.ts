'use server';

import { cookies } from 'next/headers';

export async function getAccessToken() {
  const cookieStore = cookies();
  return cookieStore.get('accessToken')?.value || null;
}

export async function getAllToken() {
  const cookieStore = cookies();
  return cookieStore.getAll();
}

export async function getRefreshToken() {
  const cookieStore = cookies();
  return cookieStore.get('refreshToken')?.value || null;
}

export async function removeAccessToken() {
  const cookieStore = cookies();
  cookieStore.delete('accessToken');
}

export async function removeRefreshToken() {
  const cookieStore = cookies();
  cookieStore.delete('refreshToken');
}

export async function setAccessToken(token: string) {
  const cookieStore = cookies();
  const isProd = process.env.NODE_ENV === 'production';
  cookieStore.set('accessToken', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
    maxAge: parseInt(process.env.NEXT_TOKEN_MAX_AGE as string) || 60 * 60,
  });
}

export async function setRefreshToken(token: string) {
  const cookieStore = cookies();
  const isProd = process.env.NODE_ENV === 'production';
  cookieStore.set('refreshToken', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
    maxAge: parseInt(process.env.NEXT_TOKEN_MAX_AGE as string) || 60 * 60,
  });
}
