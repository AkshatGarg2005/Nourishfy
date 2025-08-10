import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const cfg = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

['REACT_APP_FIREBASE_API_KEY','REACT_APP_FIREBASE_AUTH_DOMAIN','REACT_APP_FIREBASE_PROJECT_ID',
 'REACT_APP_FIREBASE_STORAGE_BUCKET','REACT_APP_FIREBASE_MESSAGING_SENDER_ID','REACT_APP_FIREBASE_APP_ID'
].forEach((k) => {
  if (!process.env[k]) console.warn(`[env warning] ${k} is empty`);
});

const app = initializeApp(cfg);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const watchAuth = (cb) => onAuthStateChanged(auth, cb);
