# PlacePro — India Placement Prep Kit

Company-specific placement prep kits for Indian engineering freshers. Free Accenture roadmap as lead magnet, three paid tiers via Razorpay.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, pricing, testimonials, FAQ |
| `/accenture-roadmap` | Free Accenture roadmap (public) |
| `/unlock?pack=starter` | Unlock page — TCS, Infosys, Wipro |
| `/unlock?pack=full` | Unlock page — 5 companies |
| `/unlock?pack=premium` | Unlock page — all 7 companies |

## Running Locally

```bash
cd placepro
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Swapping Razorpay Links

1. Create payment links at [Razorpay Dashboard](https://dashboard.razorpay.com/app/payment-links)
2. Copy `.env.example` to `.env`
3. Replace placeholder URLs:

```env
VITE_RAZORPAY_STARTER_URL=https://rzp.io/l/YOUR-STARTER-LINK
VITE_RAZORPAY_FULL_URL=https://rzp.io/l/YOUR-FULL-LINK
VITE_RAZORPAY_PREMIUM_URL=https://rzp.io/l/YOUR-PREMIUM-LINK
```

4. Restart the dev server.

## Deploying to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Set root directory to `placepro/`
4. Add environment variables in Vercel dashboard (the 3 Razorpay URLs)
5. Deploy — `vercel.json` handles SPA routing so all routes work correctly.

## Content Structure

All content lives in `src/data/content.js`. Each company has a `full` object:

```js
{
  processOverview: { rounds, duration, eligibility, salary },
  roundBreakdown: [{ round, duration, tests, tips }],
  top30Questions: { aptitude, technical, hr },
  sevenDayPlan: [{ day, focus, topics, resources }],
}
```

## Pack → Company Access

| Pack | Companies | Price |
|------|-----------|-------|
| Starter | TCS, Infosys, Wipro | ₹199 |
| Full | + Accenture, Cognizant | ₹299 |
| Premium | + Zoho, Freshworks | ₹499 |

## Tech Stack

- **Vite + React** — fast bundling, HMR in dev
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite`
- **React Router v6** — client-side routing
- **Fontsource** — Plus Jakarta Sans + Inter (self-hosted, no CDN)
- **Vercel** — zero-config deployment with SPA rewrite rules
