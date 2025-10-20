import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/current-user';
import SignupForm from '../_components/signup-form';

export default async function SingupPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect('/');
  }

  return <SignupForm />;
}