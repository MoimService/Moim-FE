'use client';

import { redirect } from 'next/navigation';

export default function NeedLoginModal({
  searchParams,
  params,
}: {
  searchParams: { category: string; meetingId?: number };
  params: { category: string };
}) {
  const category = params.category;
  const meetingId = searchParams.meetingId || 0;

  if (meetingId === 0) {
    redirect(`/meeting/${category}`);
  } else {
    redirect(`/meeting/${category}/${meetingId}`);
  }
}
