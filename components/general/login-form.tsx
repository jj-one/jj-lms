// app/(auth)/login/LoginForm.tsx (Client Component)
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function LoginForm() {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [ loading, setLoading ] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      toast.success('Logged in successfully! Redirecting now...');
      await refreshUser(); // ✅ Refresh user context after successful login
      router.push('/'); // ⛳ Redirect to dashboard
    } else {
      toast.error('Login failed. Please check your credentials.');
      setError('Login failed');
    }
    setLoading(false);
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>JJ Custom Login Form</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
                {error && <p className="text-red-500">{error}</p>}
                <Input name="email" type="email" placeholder="Email" required />
                <Input name="password" type="password" placeholder="Password" required />
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
            </form>
        </CardContent>
    </Card>
  );
}
