import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { db, watchAuth } from '../lib/firebase';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';

export default function FoodImageAdmin() {
  const [user, setUser] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => watchAuth(setUser), []);

  useEffect(() => {
    if (!user) return;
    const ref = collection(db, 'users', user.uid, 'foodImages');
    const q = query(ref, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setImages(arr);
    });
    return () => unsub();
  }, [user]);

  const onUploaded = async (secureUrl, publicId) => {
    if (!user) return;
    if (!foodName.trim()) {
      alert('Enter a food name first (e.g., spinach)');
      return;
    }
    const nameLower = foodName.trim().toLowerCase();
    await setDoc(doc(db, 'users', user.uid, 'foodImages', nameLower), {
      name: nameLower,
      url: secureUrl,
      publicId: publicId || null,
      createdAt: new Date()
    });
    setFoodName('');
  };

  if (!user) return <div style={{ padding:16 }}>Loading…</div>;

  return (
    <div style={{ maxWidth: 760, margin:'20px auto', padding:'0 16px' }}>
      <h2>Food Image Admin (temporary)</h2>
      <p style={{ color:'#666' }}>
        Upload an image to Cloudinary and map it to a <strong>food name</strong> (e.g., spinach, almonds).
        Dashboard will use this to show images for recommended foods. You can remove this page for production later.
      </p>

      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12 }}>
        <input
          value={foodName}
          onChange={(e)=>setFoodName(e.target.value)}
          placeholder="Food name (e.g., spinach)"
          style={{ padding:8, flex: 1 }}
        />
        <ImageUploader onUploaded={onUploaded} />
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
        {images.map((it) => (
          <div key={it.id} style={{ width:160 }}>
            <img src={it.url} alt={it.name} style={{ width:'100%', height:120, objectFit:'cover', borderRadius:8, border:'1px solid #eee' }} />
            <div style={{ textAlign:'center', marginTop:6, textTransform:'capitalize' }}>{it.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
