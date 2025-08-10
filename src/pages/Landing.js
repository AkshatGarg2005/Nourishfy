import React, { useState } from "react";
import { Link } from "react-router-dom";

// Single-file, responsive landing page for Nourishfy
// TailwindCSS only, no external UI deps. Dark/light theme toggle included.
// Works nicely on mobile and desktop.

export default function NourishfyLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-emerald-200/70 dark:bg-neutral-950 dark:text-neutral-100">
        {/* Decorative background glows */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/15" />
          <div className="absolute left-[10%] bottom-[-10%] h-[24rem] w-[24rem] rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/10" />
          <div className="absolute right-[-10%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-lime-400/20 blur-3xl dark:bg-lime-400/10" />
        </div>

        {/* NAVBAR */}
        <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-neutral-950/60 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-3">
              <a href="#home" className="flex items-center gap-2 font-semibold">
                <LeafIcon className="h-6 w-6 text-emerald-600" />
                <span className="tracking-tight">Nourishfy</span>
              </a>

              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a className="hover:text-emerald-600 transition" href="#features">Features</a>
                <a className="hover:text-emerald-600 transition" href="#how">How it works</a>
                <a className="hover:text-emerald-600 transition" href="#privacy">Privacy</a>
                <a className="hover:text-emerald-600 transition" href="#faq">FAQ</a>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDark((d) => !d)}
                  className="relative inline-flex h-9 items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 text-xs shadow-sm hover:shadow transition"
                  aria-label="Toggle theme"
                >
                  <span className="mr-2 hidden sm:inline">{dark ? "Dark" : "Light"} mode</span>
                  {dark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
                </button>

                <Link
                  to="/signin"
                  className="hidden sm:inline-flex h-9 items-center rounded-full px-4 text-sm font-medium border border-neutral-300/70 dark:border-neutral-700/70 hover:bg-neutral-100 dark:hover:bg-neutral-900/70"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold bg-emerald-600 text-white shadow hover:bg-emerald-500 active:bg-emerald-700"
                >
                  Get started
                </Link>

                {/* Mobile menu button */}
                <button
                  className="md:hidden ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300/70 dark:border-neutral-700/70"
                  aria-label="Open menu"
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div className="md:hidden pb-4 animate-in fade-in slide-in-from-top-2">
                <div className="mt-2 grid gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 p-3">
                  <a className="rounded-xl px-3 py-2 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70" href="#features">Features</a>
                  <a className="rounded-xl px-3 py-2 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70" href="#how">How it works</a>
                  <a className="rounded-xl px-3 py-2 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70" href="#privacy">Privacy</a>
                  <a className="rounded-xl px-3 py-2 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70" href="#faq">FAQ</a>
                  <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1" />
                  <Link className="rounded-xl px-3 py-2 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70" to="/signin">Sign in</Link>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* HERO */}
        <section id="home" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center py-16 sm:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <SparklesIcon className="h-4 w-4" /> AI-powered nutrition & groceries
              </p>

              <h1 className="mt-5 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Eat smart, feel better.
                <br />
                <span className="bg-gradient-to-r from-emerald-500 via-lime-400 to-teal-500 bg-clip-text text-transparent">Nourishfy</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                Tell us your deficiencies and symptoms. We’ll build a personalized weekly food plan, show images of what to eat, and auto-create a grocery list you can track as you shop.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <Link to="/signup" className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-6 text-white font-semibold shadow hover:bg-emerald-500 active:bg-emerald-700 w-full sm:w-auto">Create free account</Link>
                <Link to="/signin" className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 px-6 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 w-full sm:w-auto">I already have an account</Link>
              </div>

              <div className="mt-6 flex items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="inline-flex items-center gap-2"><FirebaseIcon className="h-4 w-4" /> Works with Firebase Auth & Firestore</div>
                <div className="inline-flex items-center gap-2"><GeminiIcon className="h-4 w-4" /> Gemini 2.5-flash recommendations</div>
                <div className="hidden md:inline-flex items-center gap-2"><MoonIcon className="h-4 w-4" /> Dark mode</div>
              </div>
            </div>

            {/* Mockup panel */}
            <div className="relative">
              <div className="relative mx-auto w-full max-w-lg">
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-emerald-400/40 to-teal-400/40 blur-2xl" aria-hidden />
                <div className="relative rounded-[2rem] border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/60 p-4 shadow-2xl backdrop-blur">
                  {/* Desktop mock */}
                  <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="h-2 w-2 rounded-full bg-lime-400" />
                        <span className="h-2 w-2 rounded-full bg-teal-500" />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="col-span-3 h-28 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xs text-neutral-500 dark:text-neutral-400">AI Meal Plan</div>
                      <div className="h-24 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xs">Grocery list</div>
                      <div className="h-24 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xs">Food images</div>
                      <div className="h-24 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xs">Purchases</div>
                    </div>
                  </div>

                  {/* Phone mock overlay */}
                  <div className="absolute -right-6 bottom-6 hidden md:block">
                    <div className="w-44 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 shadow-xl">
                      <div className="h-7 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500" />
                      <div className="mt-3 space-y-2">
                        <div className="h-3 rounded bg-neutral-200 dark:bg-neutral-800 w-9/12" />
                        <div className="h-3 rounded bg-neutral-200 dark:bg-neutral-800 w-7/12" />
                        <div className="h-3 rounded bg-neutral-200 dark:bg-neutral-800 w-10/12" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<WandIcon className="h-6 w-6" />}
              title="AI Nutrition Plan"
              desc="A simple weekly plan tailored to you with Gemini 2.5-flash."
            />
            <FeatureCard
              icon={<CartIcon className="h-6 w-6" />}
              title="Smart Groceries"
              desc="Auto-build a list, tick off purchases, and stay on budget."
            />
            <FeatureCard
              icon={<ImageIcon className="h-6 w-6" />}
              title="See What to Eat"
              desc="Clear food photos fetched from the web for quick recall."
            />
            <FeatureCard
              icon={<ShieldIcon className="h-6 w-6" />}
              title="Private & Secure"
              desc="Google login and your data in your own Firebase project."
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">Three quick steps to start eating smarter.</p>
          </div>

          <ol className="mx-auto mt-10 grid gap-6 sm:grid-cols-3 max-w-5xl">
            <StepCard index={1} title="Tell us about you" desc="Deficiencies, symptoms, preferences, and goals." />
            <StepCard index={2} title="Get your plan" desc="A weekly schedule plus a grocery list and images." />
            <StepCard index={3} title="Shop & track" desc="Mark purchases as you go—everything stays in sync." />
          </ol>
        </section>

        {/* PRIVACY */}
        <section id="privacy" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Your data stays yours</h3>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300 max-w-xl">We use Google authentication and store your information in your own Firebase project. You can export or delete your data at any time.</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 h-5 w-5 text-emerald-600" /><span>OAuth login via Google—no passwords to remember.</span></li>
                <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 h-5 w-5 text-emerald-600" /><span>Fine-grained control with Firestore security rules.</span></li>
                <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 h-5 w-5 text-emerald-600" /><span>One-click account deletion and data export.</span></li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-400/30 to-teal-400/30 blur-2xl" aria-hidden />
                <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 p-6 shadow-xl backdrop-blur">
                  <div className="grid gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Authentication</span>
                      <span className="rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-2 py-0.5">Google</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Database</span>
                      <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">Firestore</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">AI Provider</span>
                      <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">Gemini 2.5-flash</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Export</span>
                      <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">JSON / CSV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Frequently asked</h3>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">Quick answers before you try it.</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl gap-3">
            <Accordion q="Is it free?" a="You can start for free. We plan to add optional premium features later for power users." />
            <Accordion q="Can I change my plan?" a="Yes—update your info anytime and we’ll regenerate your next week’s plan." />
            <Accordion q="Do you support allergies?" a="Absolutely. Tell us about allergies or foods to avoid and we’ll build around them." />
            <Accordion q="What countries are supported?" a="Anywhere that has access to Firebase Auth & Firestore and the Gemini API." />
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-tr from-emerald-600 to-teal-600 p-8 sm:p-12 text-white shadow-2xl">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight">Start your smarter week today</h4>
                <p className="mt-2 text-emerald-50/90">Personalized meals, auto grocery list, and privacy by design—free to try.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Link to="/signup" className="inline-flex h-11 items-center justify-center rounded-full bg-white/95 px-6 text-emerald-800 font-semibold shadow hover:bg-white">Create free account</Link>
                <a href="#features" className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-900/30 px-6 font-semibold backdrop-blur border border-white/40">See features</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-neutral-200/70 dark:border-neutral-800/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <LeafIcon className="h-5 w-5 text-emerald-600" /> Nourishfy
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1"><FirebaseIcon className="h-4 w-4" /> Firebase</span>
                <span className="inline-flex items-center gap-1"><GeminiIcon className="h-4 w-4" /> Gemini</span>
                <span>© {new Date().getFullYear()} Nourishfy</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/60 p-5 shadow-sm hover:shadow-md transition">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
        {icon}
      </div>
      <h4 className="mt-4 font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{desc}</p>
    </div>
  );
}

function StepCard({ index, title, desc }) {
  return (
    <li className="relative rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/60 p-6 shadow-sm">
      <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-semibold shadow">{index}</div>
      <h5 className="mt-2 font-semibold">{title}</h5>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{desc}</p>
    </li>
  );
}

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <span className="shrink-0">{open ? <CloseIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-neutral-600 dark:text-neutral-300">{a}</div>}
    </div>
  );
}

/* --- Icons (inline, no external deps) --- */
function LeafIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21 3C12 3 6 7 3 13c3 2 6 3 9 3 6 0 10-6 9-13Z" />
      <path d="M12 16c-1.5 0-3-.5-4.5-1.5C9 10 13 7 19 5c-1 6-5 10-7 11Z" className="opacity-70" />
    </svg>
  );
}
function MoonIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
function SunIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
      <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.66 6.66-1.42-1.42M7.76 7.76 6.34 6.34m12.02 0-1.42 1.42M7.76 16.24 6.34 17.66" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function SparklesIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5 3l1.5 3L10 7.5 6.5 9 5 12l-1.5-3L0 7.5 3.5 6 5 3Zm12 1l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Zm-5 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />
    </svg>
  );
}
function MenuIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function WandIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 20l8-8m2-6l4 4M2 22l4-4m8-10l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function CartIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2 12h10l2-8H6" />
    </svg>
  );
}
function ImageIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 13l2-2 4 4M7 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    </svg>
  );
}
function ShieldIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function CheckIcon({ className = "h-5 w-5 text-emerald-600" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function PlusIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function GeminiIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="8" cy="12" r="4" className="opacity-80" />
      <circle cx="16" cy="12" r="4" className="opacity-50" />
    </svg>
  );
}
function FirebaseIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 17l3-11 3 5 3-7 5 13-7 4-7-4z" />
    </svg>
  );
}
