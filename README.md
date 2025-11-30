# MAJD PARTS – React + Firebase Store

A bilingual auto parts store built with React, TailwindCSS, Firebase (Firestore + Auth), and React Router v6. Includes an Admin Dashboard (protected with email/password), product analytics (views and add-to-cart), a WhatsApp-based checkout flow, and a polished UI.

## Features
- Admin Dashboard (Firebase Auth protected)
- Products CRUD in Firestore
- Analytics counters (views, add-to-cart) + visual charts in Admin
- React Router v6 pages: Home, Products, Cart, Admin
- Cart checkout via WhatsApp with product list, quantities, totals
- “Order Now” in Hero opens the same Products modal
- Car-themed loader on Products page
- Edit product form is prefilled with existing data
- Bilingual UI (Arabic/English)

## Tech Stack
- React + TypeScript + Vite
- TailwindCSS
- React Router v6
- Firebase: Firestore + Auth
- Icons: lucide-react

## Getting Started
1) Prerequisites
- Node.js 18+
- A Firebase project (Web app) with Firestore and Email/Password Auth enabled

2) Install
```
npm install
```

3) Configure Firebase
- Open `src/lib/firebase.ts` and paste your Firebase Web App config (apiKey, authDomain, projectId, etc.).
- Make sure Firestore and Auth are enabled in Firebase Console.

4) Development
```
npm run dev
```
Vite will print a local URL. Open it in the browser.

5) Production build
```
npm run build
npm run preview
```

## Routing
This app uses React Router v6.
- `/` Home (Hero, Categories, Products, About, Contact, OrderForm, CarAnimation)
- `/products` Products listing (Firestore) + loader
- `/cart` Cart and WhatsApp order sending
- `/admin` Admin Dashboard (requires Firebase Auth)

Header navigation and programmatic navigation use `Link`/`useNavigate`. The project is already wrapped with `BrowserRouter` in `src/main.tsx`.

## Firebase
### Auth
- Email/Password login is used to protect `/admin`.
- Update the allowed users in Firebase Authentication.

### Firestore
Collections used:
- `products`: { name_ar, name_en, description_ar, description_en, origin, price, stock, image_url, views_count, add_to_cart_count }

Security rules (start permissive during development):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // DEV ONLY
    }
  }
}
```
Tighten rules for production (e.g., write only for authenticated admins).

### Analytics counters
- Views and add-to-cart counts are incremented with Firestore atomic increments from `src/lib/firebase.ts` helpers and called in `ProductsPage.tsx`.

## Admin Dashboard
- File: `src/pages/AdminDashboard.tsx`
- Features:
  - Login/Logout via Firebase Auth
  - Products table
  - Add/Edit/Delete products
  - Edit form is prefilled with existing data
  - Analytics summary cards and bar charts (views/add-to-cart) + origin distribution

## Cart and WhatsApp Order
- File: `src/pages/CartPage.tsx`
- Form requires only name and address.
- WhatsApp message includes all products with quantities and totals.
- Opens WhatsApp immediately on click to avoid popup blockers.

To change the WhatsApp phone number:
- Footer: `src/components/Footer.tsx`
- Hero (manual quick order): `src/components/Hero.tsx`
- Products modal order sending: `src/components/Products.tsx`

## Internationalization (AR/EN)
- `src/context/LanguageContext.tsx` provides language state.
- `src/lib/translations.ts` contains all strings.
- The header includes a language toggle.

## UI/UX
- TailwindCSS-based design
- Car-themed loader on Products fetch
- Mobile-responsive header/menu and sections

## Troubleshooting
- If you see TypeScript errors like “Routes not exported” or `BrowserRouter` not a JSX component:
  - Ensure React Router v6 is installed:
    ```
    npm i react-router-dom@6
    ```
  - Restart the dev server.
- Firestore “Missing or insufficient permissions” during development:
  - Use permissive rules above, then secure later.
- WhatsApp not opening: ensure the button opens the URL immediately (already implemented). Check popup blocker settings.

## Deploy
- Any static host (Vercel/Netlify) works.
- Build with `npm run build` and deploy `dist/`.
- For client-side routing, configure a SPA fallback (e.g., Netlify `_redirects` with `/* /index.html 200`).

## Project Structure (key files)
- `src/App.tsx` Router routes
- `src/main.tsx` Providers + BrowserRouter
- `src/lib/firebase.ts` Firebase init + helpers
- `src/components/Header.tsx` Navigation (Links/useNavigate)
- `src/components/Products.tsx` "منتجاتنا" grid + modal + WhatsApp
- `src/pages/ProductsPage.tsx` Firestore products + loader + analytics increments
- `src/pages/CartPage.tsx` Cart + WhatsApp order
- `src/pages/AdminDashboard.tsx` Admin CRUD + analytics
- `src/components/Hero.tsx` Hero + Order Now opens Products modal

---

