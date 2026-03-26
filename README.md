# Shishu Microgreens Ecommerce Starter

This is a starter ecommerce website for a microgreens brand, built with `Next.js`, `TypeScript`, and `MongoDB`.

## Included

- Storefront home page
- Product listing page
- Product detail page
- Client-side cart
- Admin dashboard
- MongoDB models for products and orders
- API routes for listing products and orders and creating orders
- Seed data for a quick local start

## Tech Stack

- `Next.js` app router
- `TypeScript`
- `MongoDB` with `Mongoose`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example`.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

3. Update `MONGODB_URI` in `.env.local`.

4. Add admin credentials:

```env
ADMIN_EMAIL=admin@shishumicrogreens.com
ADMIN_PASSWORD=admin123
ADMIN_SESSION_SECRET=change_this_secret
```

5. Run the app:

```bash
npm run dev
```

6. Force seed MongoDB once if needed:

Open [http://localhost:3000/api/seed](http://localhost:3000/api/seed)

7. Add your real product images into:

```text
public/products/
```

Expected filenames:

- `sunflower.jpg`
- `yellow-mustard.jpg`
- `pink-radish.jpg`
- `white-radish.jpg`
- `amaranthus.jpg`
- `pea-shoots.jpg`

## Notes

- If `MONGODB_URI` is not set, the app still renders using local seed data for browsing.
- Checkout places orders directly and stores them for admin follow-up.
- Admin routes and admin APIs are protected by a simple login session.
- The next step would be adding authentication, checkout, and admin CRUD forms.
