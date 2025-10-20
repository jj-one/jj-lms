import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/current-user';
import LoginForm from '../_components/login-form';

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect('/');
  }

  return <LoginForm />;
}