import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { auth, watchAuth } from "lib/firebase";
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

export default function Profile() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => watchAuth(setUser), []);
  if (!user) return <div className="p-6">Loading…</div>;
  const nameGuess = user.email?.split("@")[0] || "User";

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
            <Stat label="Age" value="19" />
            <Stat label="Weight (kg)" value="–" />
            <Stat label="Height (cm)" value="–" />
            <Stat label="BMI" value="–" />
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

          {/* Dark-mode friendly drawer */}
          <DrawerContent open={open} setOpen={setOpen} className="max-h-[90dvh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle>Health Profile</DrawerTitle>
            </DrawerHeader>

            <div className="px-2 sm:px-4 pb-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input defaultValue="19" aria-label="Age" />

                {/* Styled select to match inputs in dark & light */}
                <select
                  aria-label="Activity level"
                  className={[
                    "h-10 rounded-xl border px-3 text-sm outline-none",
                    "bg-white text-neutral-900 border-neutral-300",
                    "focus:ring-2 focus:ring-emerald-300",
                    "dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700",
                  ].join(" ")}
                  defaultValue="Moderate (3–5 days/week)"
                >
                  {[
                    "Sedentary (little to no exercise)",
                    "Light (1–3 days/week)",
                    "Moderate (3–5 days/week)",
                    "Active (6–7 days/week)",
                    "Athlete (2x daily)",
                  ].map((a) => (
                    <option
                      key={a}
                      className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                    >
                      {a}
                    </option>
                  ))}
                </select>

                <Input placeholder="Your height in cm" aria-label="Height" />
                <Input placeholder="Your weight in kg" aria-label="Weight" />
              </div>

              <Input placeholder="Health goals (e.g. build muscle, energy levels)" />
              <Input placeholder="Allergies" />
              <Input placeholder="Medical conditions" />

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)}>Save changes</Button>
              </div>
            </div>
          </DrawerContent>
        </div>
      </div>
    </Layout>
  );
}
