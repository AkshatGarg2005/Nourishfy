import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { auth, watchAuth, db } from "lib/firebase";
import { signOut } from "firebase/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "components/ui/card";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import SectionTitle from "components/SectionTitle";
import Stat from "components/Stat";
import { HeartPulse, NotebookPen } from "lucide-react";
import { DrawerContent, DrawerHeader, DrawerTitle } from "components/ui/drawer";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";

const ACTIVITY_LEVELS = [
  "Sedentary (little to no exercise)",
  "Light (1–3 days/week)",
  "Moderate (3–5 days/week)",
  "Active (6–7 days/week)",
  "Athlete (2x daily)",
];

export default function Profile() {
  const [user, setUser] = useState(null);

  // Drawer
  const [open, setOpen] = useState(false);

  // Profile data (live)
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState(ACTIVITY_LEVELS[2]);
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [goals, setGoals] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => watchAuth(setUser), []);

  // Subscribe to users/{uid} document (even segments ✅)
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      const d = snap.data() || {};
      setAge(d.age ?? "");
      setActivity(d.activity || ACTIVITY_LEVELS[2]);
      setHeightCm(d.heightCm ?? "");
      setWeightKg(d.weightKg ?? "");
      setGoals(d.goals || "");
      setAllergies(d.allergies || "");
      setConditions(d.conditions || "");
      setLoaded(true);
    });
    return () => unsub();
  }, [user]);

  if (!user) return <div className="p-6">Loading…</div>;
  const nameGuess = user.email?.split("@")[0] || "User";

  // Derived BMI
  const bmi =
    Number(heightCm) > 0 && Number(weightKg) > 0
      ? (Number(weightKg) / Math.pow(Number(heightCm) / 100, 2)).toFixed(1)
      : "–";

  const saveProfile = async () => {
    if (!user) return;
    const ref = doc(db, "users", user.uid); // <-- fixed path
    const payload = {
      age: age === "" ? null : Number(age),
      activity,
      heightCm: heightCm === "" ? null : Number(heightCm),
      weightKg: weightKg === "" ? null : Number(weightKg),
      goals,
      allergies,
      conditions,
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, payload, { merge: true });
    setOpen(false);
  };

  return (
    <Layout user={user}>
      <div className="py-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-600 to-lime-600 grid place-items-center text-white text-lg font-semibold">
              {(nameGuess[0] || "U").toUpperCase()}
            </div>
            <div>
              <CardTitle>{nameGuess}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Age" value={loaded && age !== "" ? String(age) : "–"} />
            <Stat label="Weight (kg)" value={loaded && weightKg !== "" ? String(weightKg) : "–"} />
            <Stat label="Height (cm)" value={loaded && heightCm !== "" ? String(heightCm) : "–"} />
            <Stat label="BMI" value={bmi} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionTitle icon={NotebookPen} title="Account Settings" />
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input defaultValue={nameGuess} aria-label="Display Name" />
            <Input defaultValue={user.email} aria-label="Email" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm new password" />
            <Button onClick={() => signOut(auth)} className="md:col-span-2">
              Sign out
            </Button>
          </CardContent>
        </Card>

        <div>
          <Button className="w-full md:w-auto" onClick={() => setOpen(true)}>
            <HeartPulse className="h-4 w-4 mr-2" />
            Edit Health Profile
          </Button>

          {/* Drawer — persistent and dark-mode friendly */}
          <DrawerContent open={open} setOpen={setOpen} className="max-h-[90dvh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle>Health Profile</DrawerTitle>
            </DrawerHeader>

            <div className="px-2 sm:px-4 pb-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))}
                  placeholder="Age"
                  aria-label="Age"
                />

                <select
                  aria-label="Activity level"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className={[
                    "h-10 rounded-xl border px-3 text-sm outline-none",
                    "bg-white text-neutral-900 border-neutral-300",
                    "focus:ring-2 focus:ring-emerald-300",
                    "dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700",
                  ].join(" ")}
                >
                  {ACTIVITY_LEVELS.map((a) => (
                    <option
                      key={a}
                      value={a}
                      className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                    >
                      {a}
                    </option>
                  ))}
                </select>

                <Input
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value.replace(/[^\d.]/g, ""))}
                  placeholder="Your height in cm"
                  aria-label="Height"
                />
                <Input
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value.replace(/[^\d.]/g, ""))}
                  placeholder="Your weight in kg"
                  aria-label="Weight"
                />
              </div>

              <Input
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Health goals (e.g. build muscle, energy levels)"
              />
              <Input
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="Allergies"
              />
              <Input
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                placeholder="Medical conditions"
              />

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveProfile}>Save changes</Button>
              </div>
            </div>
          </DrawerContent>
        </div>
      </div>
    </Layout>
  );
}
