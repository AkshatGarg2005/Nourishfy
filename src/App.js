import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { watchAuth } from 'lib/firebase';

import Dashboard from 'pages/Dashboard';
import History from 'pages/History';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Profile from 'pages/Profile';
import Grocery from 'pages/Grocery';
import Plan from 'pages/Plan';
import ProtectedRoute from 'components/ProtectedRoute';

export default function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return watchAuth(u => { setUser(u); setReady(true); });
  }, []);

  if (!ready) return <div className="p-6">Loading…</div>;

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute user={user}><Dashboard/></ProtectedRoute>} />
      <Route path="/plan" element={<ProtectedRoute user={user}><Plan/></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute user={user}><History/></ProtectedRoute>} />
      <Route path="/grocery" element={<ProtectedRoute user={user}><Grocery/></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute user={user}><Profile/></ProtectedRoute>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
