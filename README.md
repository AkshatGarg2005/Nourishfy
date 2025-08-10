# Nourishfy — AI Nutrition & Smart Groceries

Nourishfy turns your nutrient **deficiencies + symptoms** into a **personalized weekly food plan**, shows **food images**, and builds a **grocery list** you can track.
Built with **React (CRA + Tailwind)**, **Firebase (Auth + Firestore)**, and **Gemini 2.5-flash**.

> Mobile-first, dark/light theme, and a clean landing page when logged out.

---

## ✨ Features

* **AI plan builder** (Gemini 2.5-flash) from your deficiencies, symptoms, exclusions
* **Quick Suggestions** auto-reflect the **latest plan** (with images)
* **Smart grocery list** (add from plan, mark purchased, archive lists)
* **History** with tabs: **Nutrition Plans** & **Archived Lists**
* **Profile → Edit Health Profile** (age, activity, height, weight, goals, allergies, conditions)
* **Dark / Light** theme toggle (persisted)
* **Landing page** for logged-out users with CTA to Sign In / Sign Up

---

## 🧱 Tech Stack

* **React** (Create React App, Yarn)
* **Tailwind CSS** (class-based dark mode)
* **Firebase**: Authentication (Email/Password), Firestore
* **Gemini**: `gemini-2.5-flash` for recommendations
* **Food images**: fetched from the web and cached per user in Firestore

---

## 🚀 Quick Start

```bash
# 1) Install deps
yarn

# 2) Create your env file
cp .env.example .env

# 3) Fill .env (see "Environment Variables" below)

# 4) Run locally
yarn start

# Build for production
yarn build
```

---

## 🔐 Environment Variables

Create `.env` in the project root:

```dotenv
# Firebase (from Firebase console → Project Settings → General → Your apps → SDK config)
REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
# optional
REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID

# Gemini
REACT_APP_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> **Never commit** your real `.env`. Commit a `.env.example` if you like.

---

## 🔧 Firebase Setup (Console)

1. **Create a project** at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
3. In **Firestore Database**, click **Create database** → start in **Production** (or test) → choose a region.
4. In **Project Settings → General → Your apps**, add a **Web app** and copy the SDK config into your `.env`.
5. (Optional but recommended) **Rules** — a minimal starting point:

```bash
# Firestore rules (simplified example — tighten for production)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      match /{sub=**} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }
  }
}
```

> Collections used:
>
> * `users/{uid}` (profile fields live directly on this doc)
> * `users/{uid}/plans` (generated plans)
> * `users/{uid}/groceries` (active list)
> * `users/{uid}/groceryHistory` (archived lists)
> * `users/{uid}/prefs/builder` (saved builder chips)
> * `users/{uid}/foodImages` (cached image URLs by food name)

---

## 🧠 Gemini Setup

* Get an API key from the Google AI Studio / Gemini dashboard.
* Put it in `.env` as `REACT_APP_GEMINI_API_KEY`.
* The app calls **`gemini-2.5-flash`** to generate:

  * Recommended **foods** (name + brief “why”)
  * A **grocery list** (items with qty/unit)

---

## 🖼️ Food Images

* The app fetches images **from the web** for recommended foods and **caches** their URLs in `users/{uid}/foodImages`.
* If a new plan includes foods without cached images, the app resolves them in the background and shows placeholders until ready.

---

## 🧭 App Flow

1. **Landing** (logged-out): CTA to **Sign In / Sign Up**.
2. **Dashboard** (logged-in):

   * **Plan Builder** chips (deficiencies, symptoms, exclusions) → **Generate** with Gemini.
   * **Quick Suggestions** updates from the **latest plan**.
   * **My Grocery List** to add, toggle purchased, and archive.
   * Sidebar shows **Health Profile** (live from Firestore).
3. **Plan** page: inspect latest plan (foods & groceries), add items to list.
4. **History**: tabs for **Nutrition Plans** and **Archived Lists**.
5. **Profile**: **Edit Health Profile** opens a drawer and **saves** to `users/{uid}` (doc).

---

## 🗂️ Project Structure (key paths)

```
src/
  lib/
    firebase.js           # Firebase init, auth helpers
    gemini.js             # Gemini 2.5-flash API calls
    foodImages.js         # Resolve & cache food image URLs
  pages/
    Landing.js            # Logged-out landing page
    Dashboard.js          # Builder + suggestions + list
    Plan.js               # View latest plan
    History.js            # Plans & archived lists tabs
    Profile.js            # Account + Health Profile drawer
    SignIn.js / SignUp.js # Auth screens
  components/
    Layout.jsx            # Shell (top bar, bottom tabs), theme toggle
    GroceryList.js        # Live list bound to Firestore
    FoodCard.jsx          # Food + image + add to list
    ChipInput.jsx         # Tags/chips input
    ProtectedRoute.jsx    # Route guard
    SectionTitle.jsx, Stat.jsx, etc.
    ui/*                  # Small headless UI pieces (button, card, tabs, input, drawer, checkbox, badge, avatar)
  index.css               # Tailwind base/utilities + dark styles
  App.js                  # Routes (Landing if logged out, app if logged in)
  jsconfig.json           # baseUrl=src for absolute imports ("lib/...", "components/...")
  tailwind.config.js      # darkMode: 'class'
  postcss.config.js       # uses @tailwindcss/postcss
```

---

## 🎨 Tailwind & Dark Mode

* `tailwind.config.js` uses `darkMode: 'class'`.
* The theme toggle stores preference and toggles `document.documentElement.classList`.

If you hit the **PostCSS plugin moved** error:

```bash
# fix
yarn add -D @tailwindcss/postcss postcss autoprefixer
```

**postcss.config.js**

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

---

## 🧪 Common Issues & Fixes

* **Invalid document reference (odd segments)**
  Use `doc(db, 'users', uid)` for the user profile (even segments).
  In this project, health profile fields are stored **on** `users/{uid}`.

* **Module aliasing/absolute imports**
  We use `import { db } from 'lib/firebase'` etc. Ensure `jsconfig.json` exists:

  ```json
  {
    "compilerOptions": { "baseUrl": "src" },
    "include": ["src"]
  }
  ```

* **Auth not working**
  Ensure Email/Password is enabled in Firebase Auth, and your `.env` values are correct.

---

## 🧭 Scripts

```bash
yarn start     # dev server
yarn build     # prod build
yarn test      # (optional)
yarn eject     # (CRA eject — avoid unless necessary)
```

---

## 🔒 Security

* Don’t commit real secrets (`.env`).
* Consider tightening Firestore rules before going to production.
* Rotate your Gemini key if it ever leaks.

---

## 📦 Deploy

Any static host works (Vercel, Netlify, Firebase Hosting):

```bash
yarn build
# deploy the 'build' folder
```

---

## 📄 License

MIT — do whatever you’d like, at your own risk.

---

## 🙌 Credits

* Google **Gemini 2.5-flash** for nutrition planning
* **Firebase** for auth & data
* **Tailwind CSS** for styling

---

**Happy building & happy cooking! 🥗**
