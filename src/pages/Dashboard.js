import React, { useEffect, useMemo, useState } from 'react';
import { db, watchAuth } from 'lib/firebase';
import {
  doc, setDoc, getDoc, collection, addDoc, serverTimestamp,
  getDocs, query, orderBy, onSnapshot
} from 'firebase/firestore';
import { generatePlan } from 'lib/gemini';
import { resolveFoodImage } from 'lib/foodImages';
import Layout from 'components/Layout';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import ChipInput from 'components/ChipInput';
import GroceryList from 'components/GroceryList';
import FoodCard from 'components/FoodCard';
import SectionTitle from 'components/SectionTitle';
import { Sparkles, CalendarDays, Activity, ShoppingCart, ChefHat } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const today = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(new Date());

// Fallback preview only when no plan exists yet
function getPreview(defVals) {
  const d = defVals.map(s => s.toLowerCase());
  if (d.some(x => x.includes('vitamin d'))) {
    return [
      { name: 'fortified milk', why: 'excellent source of vitamin D', emoji: '🥛' },
      { name: 'mushrooms', why: 'contain vitamin D2, esp. when sun-exposed', emoji: '🍄' },
    ];
  }
  return [];
}

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // Persisted builder values
  const [defVals, setDefVals] = useState([]);
  const [symVals, setSymVals] = useState([]);
  const [excVals, setExcVals] = useState([]);

  const [loading, setLoading] = useState(false);
  const [lastPlan, setLastPlan] = useState(null);
  const [foodImages, setFoodImages] = useState({});
  const [profile, setProfile] = useState(null); // 🔹 live profile from users/{uid}
  const nav = useNavigate();

  // Auth + initial fetches (plans, images, builder prefs)
  useEffect(() => {
    return watchAuth(async (u) => {
      setUser(u);
      if (!u) return;

      // Last plan
      const plansRef = collection(db, 'users', u.uid, 'plans');
      const qs = await getDocs(query(plansRef, orderBy('createdAt', 'desc')));
      const items = [];
      qs.forEach(d => items.push({ id: d.id, ...d.data() }));
      setLastPlan(items[0] || null);

      // Live image cache
      const fiRef = collection(db, 'users', u.uid, 'foodImages');
      onSnapshot(fiRef, (snap) => {
        const map = {};
        snap.forEach(d => { const v = d.data(); if (v?.name) map[v.name] = v.url || ''; });
        setFoodImages(map);
      });

      // Builder persisted state
      const builderRef = doc(db, 'users', u.uid, 'prefs', 'builder');
      const builderSnap = await getDoc(builderRef);
      if (builderSnap.exists()) {
        const b = builderSnap.data() || {};
        if (Array.isArray(b.defVals)) setDefVals(b.defVals);
        if (Array.isArray(b.symVals)) setSymVals(b.symVals);
        if (Array.isArray(b.excVals)) setExcVals(b.excVals);
      }
    });
  }, []);

  // Subscribe to users/{uid} for profile (even segments ✅)
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    const unsub = onSnapshot(ref, (snap) => setProfile(snap.data() || null));
    return () => unsub();
  }, [user]);

  // Persist builder state (debounced)
  useEffect(() => {
    if (!user) return;
    const t = setTimeout(async () => {
      const builderRef = doc(db, 'users', user.uid, 'prefs', 'builder');
      await setDoc(builderRef, {
        defVals, symVals, excVals, updatedAt: serverTimestamp()
      }, { merge: true });
    }, 400);
    return () => clearTimeout(t);
  }, [user, defVals, symVals, excVals]);

  // Ensure images are cached for foods in the latest plan
  useEffect(() => {
    const run = async () => {
      if (!user || !lastPlan?.output?.foods?.length) return;
      const names = lastPlan.output.foods.map(f => (f.name || '').toLowerCase());
      for (const n of names) {
        if (!n) continue;
        if (!foodImages[n]) await resolveFoodImage(user.uid, n);
      }
    };
    run();
    // eslint-disable-next-line
  }, [user, lastPlan]);

  const imagesForFoods = useMemo(() => {
    const out = {};
    (lastPlan?.output?.foods || []).forEach(f => {
      const key = (f.name || '').toLowerCase();
      if (key && foodImages[key]) out[key] = foodImages[key];
    });
    return out;
  }, [lastPlan, foodImages]);

  const analyze = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const deficiencies = defVals.join(", ");
      const symptoms = symVals.join(", ");
      const exclusions = excVals.join(", ");
      const out = await generatePlan({ deficiencies, symptoms, exclusions });

      const plansRef = collection(db, 'users', user.uid, 'plans');
      const docRef = await addDoc(plansRef, {
        inputs: { deficiencies, symptoms, exclusions },
        output: { foods: out.foods, groceries: out.groceries, raw: out.raw },
        createdAt: serverTimestamp(),
      });
      const newPlan = {
        id: docRef.id,
        inputs: { deficiencies, symptoms, exclusions },
        output: { foods: out.foods, groceries: out.groceries, raw: out.raw },
      };
      setLastPlan(newPlan);

      await setDoc(doc(db, 'users', user.uid), { email: user.email, updatedAt: serverTimestamp() }, { merge: true });

      nav('/plan');
    } catch (e) {
      alert('Generation failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-6">Loading…</div>;

  const planSuggestions = (lastPlan?.output?.foods || []).slice(0, 2);
  const preview = planSuggestions.length ? planSuggestions : getPreview(defVals);

  const addPlanGroceriesToList = () => {
    const items = lastPlan?.output?.groceries || [];
    if (!items.length) return alert('No groceries in the current plan.');
    if (typeof window !== 'undefined' && window.__addGroceriesFromPlan) {
      window.__addGroceriesFromPlan(items);
      alert('Added groceries from the plan to your list.');
    }
  };

  return (
    <Layout user={user}>
      {/* Header */}
      <div className="py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Welcome back, {user.email?.split('@')[0]}! <span className="text-emerald-600">👋</span>
            </h1>
            <p className="text-neutral-600">{today}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/history"><Button variant="secondary"><CalendarDays className="h-4 w-4 mr-2"/>History</Button></Link>
            <Button onClick={analyze}><Sparkles className="h-4 w-4 mr-2"/>{loading ? "Analyzing…" : "New Plan"}</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <SectionTitle icon={Sparkles} title="Plan Builder" desc="Tell us about you. We’ll tailor foods and a grocery list."/>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <ChipInput label="Nutrient Deficiencies" placeholder="e.g., Vitamin D" values={defVals} setValues={setDefVals} />
                <ChipInput label="Current Symptoms" placeholder="e.g., fatigue, pale skin" values={symVals} setValues={setSymVals} />
                <ChipInput label="Dietary Exclusions" placeholder="e.g., non veg, pork" values={excVals} setValues={setExcVals} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={analyze}>Generate nutrition plan</Button>
                <Badge variant="outline" className="rounded-full">Takes ~3s</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle icon={ChefHat} title="Quick Suggestions" desc="Based on your latest plan (or inputs preview)"/>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {preview.map((item, idx) => {
                  const key = (item.name || '').toLowerCase();
                  const url = imagesForFoods[key];
                  return (
                    <FoodCard
                      key={idx}
                      food={{ name: item.name, why: item.why }}
                      imageUrl={url}
                      emoji={item.emoji}
                      onAdd={() => window.__addGroceriesFromPlan?.([{ name: item.name, qty: 1, unit: 'pcs' }])}
                    />
                  );
                })}
              </div>
              {preview.length > 0 && (
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => window.__addGroceriesFromPlan?.(preview.map(p => ({ name: p.name, qty: 1, unit: 'pcs' })))}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add {preview.length} items to grocery
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <aside className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <SectionTitle icon={Activity} title="Health Profile"/>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Age</span>
                <span>{profile?.age != null ? `${profile.age}` : '–'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Activity</span>
                <span>{profile?.activity || '–'}</span>
              </div>
              <Button variant="outline" className="w-full mt-2">Edit</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle icon={CalendarDays} title="Recent Plans"/>
            </CardHeader>
            <CardContent className="space-y-4">
              {lastPlan ? (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{lastPlan.inputs?.deficiencies || 'Plan'}</div>
                    <div className="text-xs text-neutral-500">
                      {(lastPlan.output?.foods?.length||0)} foods · {(lastPlan.output?.groceries?.length||0)} items
                    </div>
                  </div>
                  <Link to="/plan"><Button size="icon" variant="ghost">›</Button></Link>
                </div>
              ) : (
                <div className="text-neutral-500 text-sm">No plans yet</div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Grocery on Dashboard */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <SectionTitle icon={ShoppingCart} title="My Grocery List" desc="Add items manually or from your plan"/>
          </CardHeader>
        </Card>
        <Card>
          <CardContent>
            <GroceryList user={user} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
