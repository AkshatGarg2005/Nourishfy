import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { Leaf, Lock, Mail, User as UserIcon } from 'lucide-react';
import ThemeToggle from 'components/ThemeToggle';

export default function SignUp() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');
  const [err,setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    if (password !== confirm) {
      setErr('Passwords do not match.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      nav('/');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-[100dvh] grid md:grid-cols-2 bg-white dark:bg-neutral-900">
      {/* Left brand panel */}
      <div className="hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-emerald-500 to-lime-500 text-white">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center"><Leaf className="h-5 w-5"/></div>
          <div className="font-semibold tracking-tight">Nourishfy</div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold leading-tight">Create your account</h1>
          <p className="mt-3 text-white/90 max-w-sm">
            Get personalized food recommendations and a smart grocery list in seconds.
          </p>
        </div>
        <div className="text-sm text-white/80">Secure with Firebase Authentication</div>
      </div>

      {/* Right auth card */}
      <div className="flex items-center justify-center p-6">
        <div className="absolute top-4 right-4"><ThemeToggle/></div>
        <Card className="w-full max-w-md bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
          <CardContent className="p-6">
            <div className="mb-5">
              <div className="text-2xl font-semibold">Create account</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Start your personalized nutrition journey</div>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><UserIcon className="h-4 w-4"/></span>
                <Input className="pl-10" placeholder="Your name (optional)" />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><Mail className="h-4 w-4"/></span>
                <Input className="pl-10" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><Lock className="h-4 w-4"/></span>
                <Input className="pl-10" placeholder="Password (min 6 chars)" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><Lock className="h-4 w-4"/></span>
                <Input className="pl-10" placeholder="Confirm password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} type="password" required />
              </div>
              {err && <div className="text-sm text-red-600">{err}</div>}
              <Button type="submit" className="w-full">Sign up</Button>
            </form>

            <div className="text-sm mt-4 text-center">
              Already have an account? <Link to="/signin" className="text-emerald-700 dark:text-emerald-400 underline">Sign in</Link>
            </div>

            <div className="mt-6 text-[11px] text-neutral-500 dark:text-neutral-400 text-center">
              By creating an account you agree to the Terms and Privacy Policy.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
