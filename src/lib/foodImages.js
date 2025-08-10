import { db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

async function tryWikipedia(term) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    term
  )}&prop=pageimages&piprop=thumbnail&pithumbsize=600&format=json&origin=*`;
  const res = await fetch(endpoint);
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  for (const p of pages) {
    if (p?.thumbnail?.source) return p.thumbnail.source;
  }
  return null;
}

export async function resolveFoodImage(userId, foodName) {
  const key = (foodName || '').toLowerCase().trim();
  if (!key) return '';
  const ref = doc(db, 'users', userId, 'foodImages', key);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data()?.url || '';

  const tries = [key, `${key} food`, `${key} (food)`, `${key} vegetable`, `${key} fruit`];
  let url = '';
  for (const q of tries) {
    try {
      const found = await tryWikipedia(q);
      if (found) { url = found; break; }
    } catch {}
  }

  await setDoc(ref, {
    name: key,
    url,
    source: url ? 'wikipedia' : 'none',
    fetchedAt: serverTimestamp(),
  }, { merge: true });

  return url;
}
