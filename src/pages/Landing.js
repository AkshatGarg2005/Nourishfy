import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Sparkles, ShoppingCart, Image as ImageIcon, ShieldCheck } from "lucide-react";
import ThemeToggle from "components/ThemeToggle";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-emerald-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 grid place-items-center text-white">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="font-semibold tracking-tight">Nourishfy</div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/signin"><Button variant="ghost">Sign in</Button></Link>
            <Link to="/signup"><Button>Get started</Button></Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-12 md:py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Eat smart, feel better. <span className="text-emerald-600">Nourishfy</span>
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300">
              Tell us your deficiencies and symptoms. We’ll build a personalized food plan,
              show images of what to eat, and auto-create a grocery list you can track.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/signup"><Button>Create account</Button></Link>
              <Link to="/signin"><Button variant="secondary">I already have an account</Button></Link>
            </div>
            <div className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">
              Works with Firebase Auth & Firestore • Gemini 2.5-flash recommendations • Dark mode
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-emerald-100/60 dark:bg-emerald-400/10 blur-2xl pointer-events-none" />
            <div className="relative grid gap-4">
              <Card><CardContent className="p-4 flex items-center gap-3"><Sparkles className="h-5 w-5 text-emerald-600"/><div><div className="font-medium">AI Nutrition Plan</div><div className="text-sm text-neutral-600 dark:text-neutral-400">Gemini 2.5-flash crafts a simple weekly plan for you.</div></div></CardContent></Card>
              <Card><CardContent className="p-4 flex items-center gap-3"><ShoppingCart className="h-5 w-5 text-emerald-600"/><div><div className="font-medium">Smart Groceries</div><div className="text-sm text-neutral-600 dark:text-neutral-400">Auto-build a list and mark purchases as you shop.</div></div></CardContent></Card>
              <Card><CardContent className="p-4 flex items-center gap-3"><ImageIcon className="h-5 w-5 text-emerald-600"/><div><div className="font-medium">See What to Eat</div><div className="text-sm text-neutral-600 dark:text-neutral-400">Food images fetched from the web for quick recall.</div></div></CardContent></Card>
              <Card><CardContent className="p-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-emerald-600"/><div><div className="font-medium">Private & Secure</div><div className="text-sm text-neutral-600 dark:text-neutral-400">Google login and your data in your own Firebase project.</div></div></CardContent></Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
          <span>© {new Date().getFullYear()} Nourishfy</span>
          <div className="flex gap-4">
            <a href="https://firebase.google.com/" target="_blank" rel="noreferrer" className="hover:underline">Firebase</a>
            <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="hover:underline">Gemini</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
