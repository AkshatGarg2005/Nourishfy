import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function SignUp() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      nav('/');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-[100dvh] grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Start your personalized nutrition journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
            <Input placeholder="Password (min 6 chars)" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
            <Button type="submit" className="w-full">Sign up</Button>
            {err && <div className="text-sm text-red-600">{err}</div>}
          </form>
          <div className="text-sm mt-3">
            Already have an account? <Link to="/signin" className="text-emerald-700 underline">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
