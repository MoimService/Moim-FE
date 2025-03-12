import { redirect } from 'next/navigation';

export default function DefaultModal() {
  redirect('/my-meeting/my?type=created');
}
