# Ethiopian Federal Police — Criminal Recording System (Next.js)



## Getting started

```bash
npm install
cp .env.example .env.local   # set SESSION_SECRET
npm run dev
```

Then open http://localhost:3000

**Demo officer credentials** (for `/login`):
- `officer.doe` / `police123`
- `inv.tesfaye` / `investigate123`

## Scripts

| Command          | Purpose                              |
|-------------------|---------------------------------------|
| `npm run dev`     | Local dev server                     |
| `npm run build`   | Production build                     |
| `npm start`       | Run the production build             |
| `npm run lint`    | ESLint                               |
| `npm test`        | Jest unit/component tests            |

## What's in this version

### 1. TypeScript
Every page and component is `.tsx`/`.ts` with `strict` mode on. Shared
domain types live in `lib/types.ts`.

### 2. Validated forms (React Hook Form + Zod)
- `/report` — public crime report form
- `/register-crime` — officer-only intake form
- `/login` — officer sign-in

Schemas: `lib/validation/*.ts`. Reusable, accessible field components
(`TextInput`, `SelectField`, `TextareaField`, `CheckboxField`, `Button`,
`Alert`) live in `components/ui/`, each wired to `aria-invalid` /
`aria-describedby` and inline error text.

### 3. Mock API + data layer (instead of hardcoded content)
- `lib/data/reports.ts` — in-memory "database" (seeded with 2 sample cases)
  with list/filter/create functions. Swap this module for real DB calls
  (Postgres/Supabase/etc.) without touching the route handlers.
- `app/api/reports/route.ts` — `GET` (filtered list) / `POST` (create)
- `app/api/reports/[id]/route.ts` — single report lookup
- `app/api/dashboard-stats/route.ts` — dashboard numbers, computed live
- `app/api/auth/login` / `app/api/auth/logout` — session cookie issuance

The dashboard stats, the search-reports table, and the view-crime detail
page are now all driven by this layer instead of static JSX.

### 4. Authentication
- `lib/auth.ts` — demo officer directory + JWT session helpers (`jose`)
- `middleware.ts` — redirects unauthenticated visitors away from
  `/police-dashboard`, `/register-crime`, `/search-reports`, `/view-crime`
  to `/login?from=...`
- Session cookie is `httpOnly`, `sameSite: lax`, 8-hour expiry
- `app/(officer)/layout.tsx` wraps the four officer routes in a shared
  portal header (`PoliceHeader`) with session display + logout

> This is intentionally a lightweight demo auth system (hardcoded users,
> no password hashing) — swap `findUser()` in `lib/auth.ts` for a real
> user store + bcrypt/argon2 before using this for anything real.

### 5. Responsive, accessible navigation
- `components/layout/Header.tsx` / `PoliceHeader.tsx` collapse into a
  hamburger menu under 768px (`.nav-toggle` / `.site-nav` in `globals.css`)
- Skip-to-content link in the root layout, visible on keyboard focus
- `:focus-visible` outlines defined globally
- Form errors use `role="alert"`; status messages use `role="status"`

### 6. Design tokens
`app/globals.css` now starts with a `:root` block of CSS custom properties
(colors, spacing, radii) plus a small shared component library (`.btn`,
`.field`, `.alert`, `.badge`, `.spinner`) instead of one-off inline styles
per page.

### 7. SEO
- Per-page `metadata` (titles via a template, descriptions, Open Graph)
- `app/robots.ts`, `app/sitemap.ts` (dynamic, excludes officer-only routes)
- `app/not-found.tsx` custom 404
- SVG favicon

### 8. Tests + CI
- `__tests__/` — Jest + React Testing Library covering the Zod schema,
  the data layer (filtering/creation/stats), `Header`, and `StatusBadge`
- `.github/workflows/ci.yml` — lint → test → build on every push/PR

## Page → Route map

| Route               | Auth required | Notes |
|----------------------|:---:|-------|
| `/`                  |  | Home |
| `/about`             |  | About |
| `/report`            |  | Public crime report form |
| `/login`             |  | Officer sign-in |
| `/police-dashboard`  | ✅ | Live stats + recent reports |
| `/register-crime`    | ✅ | Officer intake form |
| `/search-reports`    | ✅ | Filterable report search |
| `/view-crime/[id]`   | ✅ | Report detail (404s on unknown id) |

## Known gaps / next steps

- The in-memory data store resets on server restart — swap
  `lib/data/reports.ts` for a real database for persistence.
- File upload inputs (evidence, suspect photo) validate and submit the rest
  of the form but don't yet upload to storage — wire to S3/Supabase Storage/etc.
- Demo auth uses plaintext password comparison against a hardcoded list —
  replace with a real user table + hashed passwords before production use.
- `npm audit` flags some transitive dev-dependency advisories (Jest/ESLint
  tooling) — review before deploying.
