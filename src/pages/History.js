import React, { useEffect, useState } from 'react';
import { db, watchAuth } from 'lib/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Layout from 'components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'components/ui/tabs';

export default function History() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [groceryHistory, setGroceryHistory] = useState([]);

  useEffect(() => watchAuth(setUser), []);
  useEffect(() => {
    if (!user) return;
    const plansRef = collection(db, 'users', user.uid, 'plans');
    const q1 = query(plansRef, orderBy('createdAt', 'desc'));
    const unsub1 = onSnapshot(q1, (snap) => {
      const arr = []; snap.forEach(d => arr.push({ id: d.id, ...d.data() })); setPlans(arr);
    });
    const ghRef = collection(db, 'users', user.uid, 'groceryHistory');
    const q2 = query(ghRef, orderBy('archivedAt', 'desc'));
    const unsub2 = onSnapshot(q2, (snap) => {
      const arr = []; snap.forEach(d => arr.push({ id: d.id, ...d.data() })); setGroceryHistory(arr);
    });
    return () => { unsub1(); unsub2(); };
  }, [user]);

  if (!user) return <div className="p-6">Loading…</div>;

  return (
    <Layout user={user}>
      <div className="py-6">
        <h2 className="text-xl font-semibold tracking-tight">History</h2>
      </div>

      <Tabs defaultValue="plans">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="plans">Nutrition Plans</TabsTrigger>
          <TabsTrigger value="lists">Archived Lists</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {!plans.length && <div className="text-neutral-500">No plans yet.</div>}
          {plans.map((p) => (
            <Card key={p.id} className="hover:shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-500">Nutrition Plan</div>
                  <div className="text-xs text-neutral-500">{p.createdAt?.toDate?.().toLocaleDateString?.() || ""}</div>
                </div>
                <CardTitle className="text-base">{p.inputs?.deficiencies || '—'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-1">Health Profile</div>
                  <div className="flex flex-wrap gap-2">
                    {(p.inputs?.deficiencies?.split(',') || []).map((c,i) => <Badge key={i} variant="secondary" className="rounded-full">{c.trim()}</Badge>)}
                    {p.inputs?.exclusions && <Badge variant="outline" className="rounded-full">exclusions: {p.inputs.exclusions}</Badge>}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Recommended Foods</div>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    {(p.output?.foods || []).slice(0,3).map((f, idx)=>(
                      <li key={idx}><span className="font-medium capitalize">{f.name}</span> — {f.why}</li>
                    ))}
                    {(p.output?.foods || []).length>3 && <li className="text-neutral-500">+{(p.output.foods.length-3)} more items</li>}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{p.output?.foods?.length || 0} foods</Badge>
                  <Badge variant="outline">{p.output?.groceries?.length || 0} groceries</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="lists" className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {!groceryHistory.length && <div className="text-neutral-500">No archived lists yet.</div>}
          {groceryHistory.map(h => (
            <Card key={h.id}>
              <CardHeader>
                <CardTitle className="text-base">Archived Grocery List</CardTitle>
                <CardDescription>Items: {(h.items || []).length}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  {(h.items || []).slice(0,8).map(it => (
                    <li key={it.id} className="capitalize">
                      {it.name} — {it.qty} {it.unit} {it.purchased ? '(purchased)' : ''}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
