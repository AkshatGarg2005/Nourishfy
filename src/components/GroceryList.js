import React, { useEffect, useState } from 'react';
import {
  collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, serverTimestamp, getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { ShoppingCart } from 'lucide-react';

export default function GroceryList({ user }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  const groceriesRef = collection(db, 'users', user.uid, 'groceries');

  useEffect(() => {
    const q = query(groceriesRef, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setItems(arr);
    });
    return () => unsub();
  }, [user.uid]); // eslint-disable-line

  const addSingle = async (name, qty = 1, unit = 'pcs') => {
    if (!name) return;
    await addDoc(groceriesRef, {
      name: name.toLowerCase(),
      qty,
      unit,
      purchased: false,
      createdAt: serverTimestamp(),
    });
  };

  const addFromPlan = async (groceries) => {
    for (const g of groceries) await addSingle(g.name, g.qty, g.unit);
  };

  const onToggle = async (id, purchased) => {
    await updateDoc(doc(db, 'users', user.uid, 'groceries', id), { purchased: !purchased });
  };
  const onDelete = async (id) => {
    await deleteDoc(doc(db, 'users', user.uid, 'groceries', id));
  };
  const onClearPurchased = async () => {
    const snap = await getDocs(groceriesRef);
    const batch = [];
    snap.forEach(d => { if (d.data().purchased) batch.push(d.id); });
    for (const id of batch) await deleteDoc(doc(db, 'users', user.uid, 'groceries', id));
  };
  const onArchiveList = async () => {
    const snap = await getDocs(groceriesRef);
    const arr = [];
    snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
    if (!arr.length) return;
    await addDoc(collection(db, 'users', user.uid, 'groceryHistory'), {
      items: arr,
      archivedAt: serverTimestamp(),
    });
    for (const it of arr) await deleteDoc(doc(db, 'users', user.uid, 'groceries', it.id));
  };
  const submitManual = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    await addSingle(newItem.trim());
    setNewItem('');
  };

  // Expose to window so Dashboard can import plan items
  if (typeof window !== 'undefined') window.__addGroceriesFromPlan = addFromPlan;

  return (
    <div className="mt-6">
      <form onSubmit={submitManual} className="flex flex-col sm:flex-row gap-2">
        <Input value={newItem} onChange={(e)=>setNewItem(e.target.value)} placeholder="Add item (e.g., spinach)" />
        <Button type="submit"><ShoppingCart className="h-4 w-4 mr-2"/>Add Item</Button>
        <Button type="button" variant="secondary" onClick={()=>setHideCompleted(x=>!x)}>
          {hideCompleted ? "Show" : "Hide"} completed
        </Button>
      </form>

      <div className="mt-6 divide-y rounded-2xl border bg-white">
        {items.filter(i=>!hideCompleted || !i.purchased).length === 0 && (
          <div className="text-center py-14 text-neutral-500">
            <ShoppingCart className="mx-auto mb-3"/>
            Your grocery list is empty
          </div>
        )}
        {items.filter(i=>!hideCompleted || !i.purchased).map((it)=>(
          <div key={it.id} className="flex items-center justify-between p-4">
            <label className="flex items-center gap-3">
              <Checkbox checked={!!it.purchased} onCheckedChange={()=>onToggle(it.id, it.purchased)} />
              <div>
                <div className={it.purchased ? "line-through text-neutral-400 capitalize" : "capitalize"}>{it.name}</div>
                <div className="text-xs text-neutral-500">{it.qty} {it.unit}</div>
              </div>
            </label>
            <Button variant="ghost" onClick={()=>onDelete(it.id)} className="text-red-600">Delete</Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <Button variant="secondary" onClick={onClearPurchased}>Clear purchased</Button>
        <Button onClick={onArchiveList}>Archive current list</Button>
      </div>
    </div>
  );
}
