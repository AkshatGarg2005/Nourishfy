import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Link } from 'react-router-dom';

export default function NavBar({ user }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'12px 16px', borderBottom:'1px solid #eee'
    }}>
      <Link to="/" style={{ textDecoration:'none', color:'#111', fontWeight:700 }}>Nourishfy</Link>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12, fontSize: 14, color:'#444' }}>
              {user.email}
            </span>
            <button onClick={() => signOut(auth)}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin" style={{ marginRight: 12 }}>Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
