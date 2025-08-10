import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { db, watchAuth } from "lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Button } from "components/ui/button";
import FoodCard from "components/FoodCard";
import { ShoppingCart } from "lucide-react";
import { resolveFoodImage } from "lib/foodImages";

export default function Plan() {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [foodImages, setFoodImages] = useState({});

  useEffect(()=> watchAuth(setUser), []);
  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const plansRef = collection(db, 'users', user.uid, 'plans');
      const qs = await getDocs(query(plansRef, orderBy('createdAt', 'desc')));
      const items = []; qs.forEach(d => items.push({ id: d.id, ...d.data() }));
      setPlan(items[0] || null);
    };
    load();
  }, [user]);

  useEffect(() => {
    const run = async () => {
      if (!user || !plan?.output?.foods?.length) return;
      const imgs = {};
      for (const f of plan.output.foods) {
        const key = (f.name || '').toLowerCase();
        imgs[key] = await resolveFoodImage(user.uid, key);
      }
      setFoodImages(imgs);
    };
    run();
  }, [user, plan]);

  const addAllToGrocery = () => {
    if (!plan?.output?.groceries?.length) return;
    window.__addGroceriesFromPlan?.(plan.output.groceries);
    alert('Added all items to your grocery list.');
  };

  if (!user) return <div className="p-6">Loading…</div>;

  return (
    <Layout user={user}>
      <div className="py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Your Personalized Foods</h2>
          <Button variant="secondary" onClick={addAllToGrocery}><ShoppingCart className="h-4 w-4 mr-2"/>Add {(plan?.output?.foods||[]).length} to Grocery</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(plan?.output?.foods || []).map((f, i) => (
            <FoodCard
              key={i}
              food={f}
              imageUrl={foodImages[(f.name||'').toLowerCase()]}
              onAdd={()=> window.__addGroceriesFromPlan?.([{ name: f.name, qty: 1, unit:'pcs' }])}
            />
          ))}
        </div>

        {!plan && (
          <Card>
            <CardHeader>
              <div className="text-neutral-600">No plan yet. Go back to Dashboard → Generate nutrition plan.</div>
            </CardHeader>
            <CardContent />
          </Card>
        )}
      </div>
    </Layout>
  );
}
