'use client';

import { redirect } from 'next/navigation';

export default function NeedLoginModal({
  params,
}: {
  params: { category: string; id: string; status: string };
}) {
  const category = params.category;
  const meetingId = Number(params.id);

  redirect(`/meeting/${category}/${meetingId}`);
}
