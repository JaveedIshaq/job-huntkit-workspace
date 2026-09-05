# Create a Similar Monorepo (Simple Guide)

A **monorepo** is one Git repo that holds several related apps and shared code.

This guide mirrors **job-huntkit-workspace**:

| Piece | Role |
|-------|------|
| `apps/api` | NestJS backend |
| `apps/web` | Next.js frontend |
| `apps/mobile` | Flutter app (optional later) |
| `packages/shared` | Types/helpers used by api + web |
| `supabase/` | Database migrations |
| **pnpm** | Installs packages for the whole workspace |
| **Turborepo** | Runs `dev` / `build` across apps with one command |

**Stack this guide builds toward:** Next.js + NestJS + Supabase (Postgres) + shared TypeScript. Same shape as a portfolio full-stack / AI product repo.

---

## Before you start

Install these on your machine:

1. [Node.js](https://nodejs.org/) **20+**
2. [pnpm](https://pnpm.io/) **9+** — `npm install -g pnpm@9`
3. [Git](https://git-scm.com/)
4. (Later) Nest CLI: `pnpm add -g @nestjs/cli`
5. (Later) Flutter, if you want mobile

Check:

```bash
node -v
pnpm -v
git --version
```

---

## Step 0 — Big picture (read once)

**What:** One folder. Many packages. Shared code lives in `packages/`. Runnable apps live in `apps/`.

**Why:** Without a monorepo, api and web each copy the same types. They drift apart. Bugs show up in production.

**How (mental model):**

```
my-product/
├── apps/
│   ├── api/          ← NestJS
│   ├── web/          ← Next.js
│   └── mobile/       ← Flutter (optional empty folder for now)
├── packages/
│   └── shared/       ← types + helpers both apps import
├── supabase/         ← SQL migrations
├── package.json      ← root scripts (dev, build)
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

**Career note:** This is how many product teams ship web + API + shared contracts. Learning it is system-design practice, not busywork.

---

## Step 1 — Create the root folder

```bash
mkdir my-product
cd my-product
git init
```

Create a root `package.json`:

```bash
pnpm init
```

Edit `package.json` so it looks like this (change the name if you want):

```json
{
  "name": "my-product",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "test": "turbo run test",
    "dev:api": "turbo run dev --filter=@myproduct/api",
    "dev:web": "turbo run dev --filter=@myproduct/web"
  },
  "devDependencies": {
    "prettier": "^3.4.2",
    "turbo": "^2.10.4",
    "typescript": "^5.7.3"
  },
  "packageManager": "pnpm@9.15.0"
}
```

Install root tools:

```bash
pnpm install
```

---

## Step 2 — Tell pnpm this is a workspace

**What:** `pnpm-workspace.yaml` lists which folders are packages.

**Why:** So `pnpm install` at the root installs deps for every app, and apps can depend on each other with `workspace:*`.

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

Create the folders:

```bash
mkdir -p apps packages
```

---

## Step 3 — Shared TypeScript base config

**What:** One base `tsconfig` that every package extends.

**Why:** Same strict rules everywhere. Less “works in api, breaks in web.”

Create `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "target": "ES2023",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "sourceMap": true
  }
}
```

Optional Prettier (root `.prettierrc`):

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

---

## Step 4 — Turborepo (one command to run everything)

**What:** Turbo reads each package’s scripts (`dev`, `build`, …) and runs them in the right order.

**Why:** Without it you open three terminals. With it: `pnpm dev` starts shared + api + web together. Builds of shared happen before apps that depend on them (`dependsOn: ["^build"]`).

Create `turbo.json`:

```json
{
  "$schema": "https://turbo.build/json-schema.json",
  "globalDependencies": ["**/.env.local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"],
      "cache": true
    },
    "lint": {
      "outputs": [],
      "cache": true
    },
    "type-check": {
      "outputs": [],
      "cache": true
    },
    "test": {
      "outputs": ["coverage/**"],
      "cache": false
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## Step 5 — Create `packages/shared`

**What:** A small TypeScript library both apps import (DTOs, enums, constants).

**Why:** One source of truth for shapes like `JobStatus`. Avoids “api says `status`, web expects `state`.”

```bash
mkdir -p packages/shared/src
```

`packages/shared/package.json`:

```json
{
  "name": "@myproduct/shared",
  "version": "0.0.1",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsc -p tsconfig.json --watch",
    "lint": "tsc --noEmit",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}
```

`packages/shared/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

`packages/shared/src/index.ts` (tiny starter):

```ts
export type HealthResponse = {
  ok: boolean;
  service: string;
};

export const APP_NAME = 'my-product';
```

Build it once:

```bash
pnpm install
pnpm --filter @myproduct/shared build
```

---

## Step 6 — Create `apps/api` (NestJS)

**What:** NestJS is a Node framework with modules, controllers, and dependency injection — good for APIs.

**Why:** Clear place for auth, DB, and AI calls. Web stays thin (UI only).

From the **repo root**:

```bash
cd apps
npx @nestjs/cli@11 new api --package-manager pnpm --skip-git
cd ..
```

Edit `apps/api/package.json`:

1. Set `"name": "@myproduct/api"`.
2. Add a `dev` script if missing: `"dev": "nest start --watch"`.
3. Add the shared package:

```json
"dependencies": {
  "@myproduct/shared": "workspace:*"
}
```

Make sure `apps/api/tsconfig.json` extends the base (adjust if Nest generated a full file):

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "node16",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "incremental": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

In any Nest file you can import shared code:

```ts
import { APP_NAME } from '@myproduct/shared';
```

Reinstall from root:

```bash
pnpm install
```

---

## Step 7 — Create `apps/web` (Next.js)

**What:** Next.js is the React web app (pages/UI).

**Why:** Users hit the web app; the web app calls your Nest API over HTTPS. Keep secrets (DB URL, OpenAI key) on the API only.

From the **repo root**:

```bash
cd apps
pnpm create next-app@latest web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
cd ..
```

Edit `apps/web/package.json`:

1. Set `"name": "@myproduct/web"`.
2. Ensure `"dev": "next dev --port 3000"`.
3. Add shared:

```json
"dependencies": {
  "@myproduct/shared": "workspace:*"
}
```

Point `apps/web/tsconfig.json` at the base with `"extends": "../../tsconfig.base.json"` (keep Next’s own options like `jsx`, `plugins`, `paths`).

Reinstall:

```bash
pnpm install
```

---

## Step 8 — Optional empty mobile slot

```bash
mkdir -p apps/mobile
```

Later you can `flutter create .` inside `apps/mobile`. Root can add:

```json
"dev:mobile": "cd apps/mobile && flutter run"
```

Flutter is **not** managed by pnpm — keep that script simple.

---

## Step 9 — Git ignore + env files

**What:** `.gitignore` keeps secrets and junk out of Git.

**Why:** One leaked `.env` can expose your database.

Root `.gitignore`:

```gitignore
node_modules/
.turbo/
dist/
.next/

.env
.env.local
.env.*.local
apps/api/.env
apps/web/.env.local
```

Create env examples (no real secrets):

`apps/api/.env.example`:

```env
PORT=3001
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/postgres
JWT_SECRET=change-me
```

`apps/web/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Copy when developing:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

---

## Step 10 — Wire database (Supabase + Prisma) — same pattern as HuntKit

**What:**

- **Supabase** = hosted Postgres (and later pgvector for AI search).
- **Prisma** = typed DB client in Nest (`apps/api`).

**Why:** Web never talks to the DB. Only the API does. Safer and cleaner for system design.

Rough flow:

1. Create a Supabase project → copy `DATABASE_URL` into `apps/api/.env`.
2. Put SQL migrations under `supabase/migrations/`.
3. In `apps/api`, add Prisma:

```bash
pnpm --filter @myproduct/api add @prisma/client
pnpm --filter @myproduct/api add -D prisma
cd apps/api && pnpm exec prisma init
```

4. Point Prisma at Supabase, generate client, run migrate.

**Auth pattern used here:** NestJWT on the API. Supabase = Postgres host — not Supabase Auth in Next.js (unless you deliberately choose otherwise).

---

## Step 11 — Daily commands

From the **repo root**:

| Goal | Command |
|------|---------|
| Install everything | `pnpm install` |
| Run api + web (+ shared watch) | `pnpm dev` |
| Only API | `pnpm dev:api` |
| Only web | `pnpm dev:web` |
| Build all | `pnpm build` |
| Build one package | `pnpm --filter @myproduct/shared build` |

**Filter tip:** The name after `--filter` is the `"name"` field in that package’s `package.json` (e.g. `@myproduct/api`).

---

## Step 12 — First commit

```bash
git add .
git status
git commit -m "chore: scaffold pnpm + turbo monorepo with api, web, shared"
```

---

## Checklist — “done when”

- [ ] Root has `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`
- [ ] `packages/shared` builds to `dist/`
- [ ] `apps/api` and `apps/web` both depend on `@myproduct/shared` via `workspace:*`
- [ ] `pnpm install` at root works with no errors
- [ ] `pnpm dev` starts API and web (or use `dev:api` / `dev:web` alone)
- [ ] `.env` files are gitignored; only `.env.example` is committed

---

## Common mistakes (and fixes)

| Problem | Fix |
|---------|-----|
| `Cannot find module '@myproduct/shared'` | Build shared first; use `workspace:*`; run `pnpm install` from root |
| `pnpm` only installs one app | You ran install inside `apps/web` — always install from root |
| Turbo skips a package | That package needs a matching script name (`dev`, `build`) in its `package.json` |
| Nest decorators fail | Ensure `experimentalDecorators` + `emitDecoratorMetadata` in api `tsconfig` |
| Secrets in Git | Never commit `.env`; use `.env.example` only |

---

## Deploy shape (same as HuntKit)

| App | Typical host |
|-----|----------------|
| `apps/api` | Render (or similar Node host) |
| `apps/web` | Netlify (set `base` to `apps/web` in monorepo) |
| DB | Supabase Postgres |

Web env in production: only something like `NEXT_PUBLIC_API_URL=https://your-api.onrender.com`.

---

## What to build next (after the scaffold)

1. Health route on Nest (`GET /health`)
2. Auth (JWT register/login)
3. First real feature + Prisma models
4. Next.js pages that call the API with the JWT
5. (Optional) embeddings / RAG once Postgres + pgvector are ready

For HuntKit’s feature-by-feature learning path, see `devdocs/huntkit-learn-and-build.md`.

---

## Tiny glossary

| Term | Plain English |
|------|----------------|
| Monorepo | One repo, many apps/packages |
| Workspace | pnpm’s list of packages that share one lockfile |
| `workspace:*` | “Use the local package in this repo, not npm” |
| Turborepo | Task runner + cache for monorepo scripts |
| Shared package | Code both apps import so types stay in sync |
| NestJS | Backend framework for your API |
| Next.js | React framework for your website |
| Prisma | Tool that talks to Postgres with TypeScript types |
| Supabase | Hosted Postgres (and more) in the cloud |
