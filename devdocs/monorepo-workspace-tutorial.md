# Monorepo Workspace Tutorial — From Zero

**Audience:** You want a repeatable playbook to bootstrap any full-stack monorepo with:

| App | Stack | Location |
|-----|-------|----------|
| **API** | NestJS + TypeScript | `apps/api` |
| **Web** | Next.js (App Router) | `apps/web` |
| **Mobile** | Flutter + Dart | `apps/mobile` |
| **Shared** | TypeScript types/enums | `packages/shared` |

**Tooling:** [pnpm workspaces](https://pnpm.io/workspaces) + [Turborepo](https://turbo.build)

**Principle:** Root = orchestration only. Apps = runnable products. Packages = shared contracts only.

**How to read each step:** Every step below includes a **What / Why / How** block explaining the purpose, the reason it exists, and how to implement it.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Final layout](#2-final-layout)
3. [Step 1 — Create the repo shell](#step-1--create-the-repo-shell)
4. [Step 2 — Configure pnpm workspaces](#step-2--configure-pnpm-workspaces)
5. [Step 3 — Configure Turborepo](#step-3--configure-turborepo)
6. [Step 4 — Shared TypeScript config](#step-4--shared-typescript-config)
7. [Step 5 — Scaffold NestJS API](#step-5--scaffold-nestjs-api)
8. [Step 6 — Scaffold Next.js web](#step-6--scaffold-nextjs-web)
9. [Step 7 — Scaffold Flutter mobile](#step-7--scaffold-flutter-mobile)
10. [Step 8 — Add shared package](#step-8--add-shared-package)
11. [Step 9 — Environment files](#step-9--environment-files)
12. [Step 10 — Git ignore and formatting](#step-10--git-ignore-and-formatting)
13. [Step 11 — Verify locally](#step-11--verify-locally)
14. [Step 12 — Deploy each app independently](#step-12--deploy-each-app-independently)
15. [Daily commands cheat sheet](#daily-commands-cheat-sheet)
16. [Adding a new app or package later](#adding-a-new-app-or-package-later)
17. [Common pitfalls](#common-pitfalls)
18. [HuntKit example (apply this tutorial)](#huntkit-example-apply-this-tutorial)
19. [Fresh-start checklist](#fresh-start-checklist)

---

## 1. Prerequisites

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | The tools and accounts you need installed before creating the monorepo. |
| **Why** | Missing Node, pnpm, or Flutter mid-setup causes confusing errors. Cloud accounts are needed later for DB, deploy, and auth — set them up once, reuse across projects. |
| **How** | Verify versions locally, then create free-tier accounts. You do not need every account on day 1 — but PostgreSQL hosting and deploy targets should exist before Step 12. |

Install before you start:

```bash
node -v    # 20 LTS or 22+
pnpm -v    # 9+ (11 recommended)
flutter -v # 3.x stable
dart -v
```

Create accounts you'll need later (free tiers are fine):

- [Supabase](https://supabase.com) or any PostgreSQL host — database + optional auth
- [Netlify](https://www.netlify.com) — Next.js hosting
- [Render](https://render.com) — NestJS API hosting

---

## 2. Final layout

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | The target folder structure for a NestJS + Next.js + Flutter monorepo. |
| **Why** | A fixed layout means every project looks the same — you always know where API code, web pages, mobile screens, and shared types live. Deploy platforms also need to know which subdirectory to build. |
| **How** | Use `apps/` for runnable products, `packages/` for shared JS/TS code, root for orchestration only. Flutter sits in `apps/mobile` for organization but is **not** a pnpm package. |

When finished, your repo should look like this:

```
my-project/
├── apps/
│   ├── api/                    # NestJS
│   │   ├── src/
│   │   ├── test/
│   │   ├── prisma/             # optional — add when you need a DB
│   │   ├── nest-cli.json
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── .env                # gitignored
│   ├── web/                    # Next.js 14+ App Router
│   │   ├── src/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.local          # gitignored
│   └── mobile/                 # Flutter
│       ├── lib/
│       ├── pubspec.yaml
│       └── .env                # gitignored (optional)
├── packages/
│   └── shared/                 # shared TS types/enums/constants
│       ├── src/index.ts
│       ├── package.json
│       └── tsconfig.json
├── supabase/                   # optional — SQL migrations
│   └── migrations/
├── seed/                       # optional — seed data (markdown, JSON)
├── devdocs/                    # specs, guides, architecture notes
├── package.json                # root scripts only — no app deps
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── .prettierrc
├── .gitignore
└── pnpm-lock.yaml
```

**What lives where:**

| Work | Location |
|------|----------|
| HTTP routes, business logic, DB | `apps/api/src/modules/` |
| Prisma schema | `apps/api/prisma/` |
| Web pages and UI | `apps/web/src/app/` |
| Mobile screens and state | `apps/mobile/lib/` |
| Shared enums/types (TS only) | `packages/shared/src/` |
| Raw SQL / pgvector migrations | `supabase/migrations/` |

**Important:** Flutter is **not** a pnpm package. It lives in `apps/mobile` for repo organization; the root `package.json` wraps Flutter commands. Turborepo orchestrates JS/TS apps; Flutter runs via shell scripts.

---

## Step 1 — Create the repo shell

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | An empty git repo with the folder skeleton — no code yet. |
| **Why** | Creating folders upfront prevents "where does this go?" decisions later. `devdocs/` and `seed/` from day 1 keeps specs and test data out of app source trees. |
| **How** | `mkdir -p` creates all directories in one command. `git init` starts version control before any code is written. |

Pick a project name and create the folder structure:

```bash
mkdir my-project && cd my-project
git init

mkdir -p apps/api apps/web apps/mobile packages/shared/src
mkdir -p supabase/migrations seed devdocs
```

---

## Step 2 — Configure pnpm workspaces

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | pnpm workspaces link multiple `package.json` files in one repo into a single install graph. |
| **Why** | Without workspaces, each app would have its own isolated `node_modules` and you'd run `npm install` three times. Workspaces give you one lockfile, shared hoisted deps, and the `workspace:*` protocol for internal packages. |
| **How** | `pnpm-workspace.yaml` declares which folders are packages. Root `package.json` holds scripts only — no NestJS or Next.js dependencies. Each app gets its own `package.json` in Step 5–6. |

Create `pnpm-workspace.yaml` at the repo root:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'

allowBuilds:
  unrs-resolver: true
```

> **Note:** `apps/mobile` has no `package.json` — pnpm ignores it. That is intentional.

### `pnpm-workspace.yaml` globs — what / why / how

| Entry | What | Why | How |
|-------|------|-----|-----|
| `'apps/*'` | Every folder in `apps/` with a `package.json` | Automatically picks up `api`, `web`, and any future apps you add | Add new app folder + `package.json` — no yaml edit needed |
| `'packages/*'` | Every folder in `packages/` with a `package.json` | Shared libs like `@myproject/shared` are linked into apps | Same auto-discovery pattern as apps |
| `allowBuilds` | pnpm security setting for native builds | Some deps need build scripts on install | Safe to enable for standard JS tooling |

Create root `package.json` (orchestrator only — no NestJS/Next deps here):

```json
{
  "name": "my-project",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "turbo run dev --parallel",
    "dev:api": "turbo run dev --filter=@myproject/api",
    "dev:web": "turbo run dev --filter=@myproject/web",
    "dev:mobile": "cd apps/mobile && flutter run",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "test": "turbo run test",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\""
  },
  "devDependencies": {
    "prettier": "^3.4.2",
    "turbo": "^2.10.4",
    "typescript": "^5.7.3"
  },
  "packageManager": "pnpm@9.15.0"
}
```

Replace `@myproject` with your scope (e.g. `@huntkit`, `@acme`).

### Root scripts — what / why / how

| Question | Answer |
|----------|--------|
| **What** | Root scripts like `dev:api` are shortcuts that tell Turborepo which app to run. |
| **Why** | You work from the repo root — you should not `cd apps/api` every time. One command starts the right app. |
| **How** | `turbo run dev --filter=@myproject/api` finds the package named `@myproject/api` in `apps/api/package.json` and runs its `"dev"` script. |

**Naming conventions:**

| Script | When to use |
|--------|-------------|
| `dev:api` | Local development with hot reload — **use this daily** |
| `start:api` | Production start after build — only for deploy |

> **Important:** The root `"name": "my-project"` is **not** what `--filter` targets. Turbo filters on each **app's** `"name"` (e.g. `@huntkit/api`), not the root workspace name.

Install root deps:

```bash
pnpm install
```

---

## Step 3 — Configure Turborepo

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | Turborepo is a task runner that knows build order, caching, and parallelism across workspace packages. |
| **Why** | Running `pnpm dev` in three folders manually is tedious. Turbo runs `dev` / `build` / `lint` across all apps with one command, builds `packages/shared` before apps that depend on it, and caches unchanged builds. |
| **How** | `turbo.json` defines tasks and their dependencies. Root scripts call `turbo run <task>`. Each app's `package.json` must define a script with the same name (e.g. `"dev"`). |

Create `turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
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

**Key concept:** `"dependsOn": ["^build"]` means Turborepo builds `packages/shared` before any app that depends on it.

### Turborepo `tasks` vs `pipeline` — what / why / how

| Question | Answer |
|----------|--------|
| **What** | Turborepo 2.x renamed the config field from `"pipeline"` to `"tasks"`. |
| **Why** | Older tutorials and Turborepo 1.x used `"pipeline"`. Turbo 2.0+ rejects it and shows: *"Rename `pipeline` field to `tasks`"*. |
| **How** | In `turbo.json`, change the top-level key only: `"pipeline": {` → `"tasks": {`. Keep all task definitions inside unchanged. |

```json
// ❌ Old (Turborepo 1.x) — fails on Turbo 2.x
"pipeline": { "dev": { ... } }

// ✅ New (Turborepo 2.x)
"tasks": { "dev": { ... } }
```

### Turbo task settings — what / why / how

| Setting | What | Why | How |
|---------|------|-----|-----|
| `"dependsOn": ["^build"]` | Build dependencies first | Apps importing `@myproject/shared` need shared compiled before they build | The `^` prefix means "dependencies in workspace" |
| `"outputs"` | Cached artifact paths | Turbo skips rebuilds when inputs unchanged — faster CI and local builds | List `dist/**`, `.next/**` per task |
| `"persistent": true` on `dev` | Long-running dev servers | Dev servers never "finish" — turbo must not wait for exit or cache them | Set on `dev` task only, not `build` |
| `"cache": false` on `dev` | Disable caching for dev | Dev output is not reproducible — caching would serve stale servers | Set `cache: false` on `dev` and `test` |

---

## Step 4 — Shared TypeScript config

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | A root `tsconfig.base.json` and `.prettierrc` that all JS/TS apps and packages extend. |
| **Why** | Without a base config, each app sets `strict`, `module`, and `target` independently — they drift apart and cause subtle type errors at integration boundaries. One base = one standard. |
| **How** | Apps use `"extends": "../../tsconfig.base.json"` and override only what they need (e.g. `jsx` for Next.js, `emitDecoratorMetadata` for NestJS). Prettier config ensures consistent formatting repo-wide. |

Create `tsconfig.base.json` at the repo root:

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

Create `.prettierrc`:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

---

## Step 5 — Scaffold NestJS API

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | A NestJS backend in `apps/api` — your REST/GraphQL API that web and mobile both call. |
| **Why** | The API owns business logic, database access, and auth. Keeping it separate from Next.js means you can deploy, scale, and version the API independently. Flutter and Next.js both consume the same endpoints. |
| **How** | Generate with NestJS CLI, rename the package, add a `"dev"` script for Turbo, extend the shared tsconfig, configure `main.ts`, and verify with `pnpm dev:api`. |

Generate NestJS directly into `apps/api`:

```bash
cd apps/api
pnpm dlx @nestjs/cli new . --package-manager pnpm --skip-git
```

When prompted, confirm the current directory.

Edit `apps/api/package.json` — set name and scripts:

```json
{
  "name": "@myproject/api",
  "private": true,
  "scripts": {
    "build": "nest build",
    "dev": "nest start --watch",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,test}/**/*.ts\"",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  }
}
```

### NestJS `"dev"` script — what / why / how

| Question | Answer |
|----------|--------|
| **What** | NestJS CLI generates `"start:dev"` by default — it does **not** create a `"dev"` script. |
| **Why** | Root runs `turbo run dev`, which looks for a script literally named `"dev"` in each app's `package.json`. Without it, Turbo finds the package but has nothing to execute. |
| **How** | Add `"dev": "nest start --watch"` manually after scaffolding. Keep `"start:dev"` too — both can point to the same command. |

```json
// NestJS CLI generates this:
"start:dev": "nest start --watch"

// You must add this for Turborepo:
"dev": "nest start --watch"
```

### App package `"name"` — what / why / how

| Question | Answer |
|----------|--------|
| **What** | Each app gets a scoped name like `"@myproject/api"`. |
| **Why** | Scoped names avoid npm registry conflicts and make `--filter=@myproject/api` unambiguous in a monorepo with many packages. |
| **How** | Change the NestJS CLI default `"name": "api"` to `"name": "@myproject/api"`. Then root `--filter=@myproject/api` matches exactly. |

Update `apps/api/tsconfig.json` to extend the base config:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "types": ["node"],
    "outDir": "./dist",
    "rootDir": "./src",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "isolatedModules": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

### API `tsconfig.json` settings — what / why / how

| Setting | What | Why | How |
|---------|------|-----|-----|
| `"types": ["node"]` | Loads Node.js type definitions | After extending a shared base config, TypeScript may not auto-load `@types/node` — you get *"Cannot find name 'process'"* | Add explicitly in `compilerOptions` |
| `"rootDir": "./src"` | Declares source root | TypeScript 6+ requires this when `include` is `src/**/*` and `outDir` is `./dist` | Add to `compilerOptions` |
| ~~`"baseUrl": "./"`~~ | Old path alias base | Deprecated in TypeScript 6 — will stop working in TS 7 | **Remove** unless you use path aliases like `@app/*` |

Ensure `@types/node` is in devDependencies (NestJS CLI adds it by default):

```bash
pnpm --filter @myproject/api add -D @types/node
```

Set API port in `apps/api/.env`:

```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

### API `.env` and `main.ts` settings — what / why / how

| Setting | What | Why | How |
|---------|------|-----|-----|
| `PORT=3001` | API listen port | Next.js defaults to 3000 — using 3001 avoids port conflicts when both run locally | Set in `apps/api/.env`; read in `main.ts` via `process.env.PORT` |
| `CORS_ORIGIN` | Allowed browser origin | Browsers block cross-origin requests by default — web on `:3000` calling API on `:3001` needs CORS enabled | Set to your Next.js URL; update to production Netlify URL on deploy |
| `app.setGlobalPrefix('api/v1')` | URL prefix for all routes | Versioned API path — e.g. `/api/v1/health` instead of `/health` | Set once in `main.ts`; all controllers inherit it |
| `ValidationPipe` | Request body validation | Rejects malformed input before it reaches your services — NestJS best practice | Enable globally in `main.ts` with `whitelist: true` |

Configure `src/main.ts` for production habits:

```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
```

### `bootstrap()` error handling — what / why / how

| Question | Answer |
|----------|--------|
| **What** | `bootstrap()` is async and returns a Promise. Calling it bare (`bootstrap()`) leaves that Promise unhandled. |
| **Why** | ESLint rule `@typescript-eslint/no-floating-promises` flags this. Unhandled rejections also hide startup failures (e.g. port already in use). |
| **How** | Chain `.catch()` to log the error and exit. Alternative: `void bootstrap()` silences lint but does not log failures — prefer `.catch()`. |

Back to repo root and install:

```bash
cd ../..
pnpm install
pnpm dev:api
```

API should boot at `http://localhost:3001`.

### How root → turbo → app scripts connect

When you run `pnpm dev:api`, this chain executes:

```
pnpm dev:api
  └─ root package.json: "turbo run dev --filter=@myproject/api"
       └─ turbo.json: finds "dev" task definition
            └─ apps/api/package.json: runs "dev" script → nest start --watch
                 └─ NestJS boots on PORT from .env (default 3001)
```

If any link in this chain is broken, the command fails. See [Common pitfalls](#common-pitfalls) for each failure mode.

---

## Step 6 — Scaffold Next.js web

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | A Next.js frontend in `apps/web` — landing pages, dashboards, and auth UI. |
| **Why** | Next.js App Router gives you SSR, routing, and React in one framework. Separating web from API means Netlify hosts the UI while Render hosts the API — each scales independently. |
| **How** | Generate with `create next-app`, rename to `@myproject/web`, extend shared tsconfig, set `NEXT_PUBLIC_API_URL` pointing at the NestJS API, verify with `pnpm dev:web`. |

From the repo root:

```bash
pnpm create next-app@latest apps/web \
  --typescript --tailwind --eslint --app --src-dir --use-pnpm
```

Edit `apps/web/package.json`:

```json
{
  "name": "@myproject/web",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

Update `apps/web/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "noEmit": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Next.js env and tsconfig — what / why / how

| Setting | What | Why | How |
|---------|------|-----|-----|
| `NEXT_PUBLIC_API_URL` | Public API base URL | Browser-side fetch calls need the API address. `NEXT_PUBLIC_` prefix exposes it to client components. | Set in `.env.local`; use in `lib/api.ts` as `${process.env.NEXT_PUBLIC_API_URL}/jobs` |
| `"dev": "next dev --port 3000"` | Dev server script | Turbo looks for `"dev"`. Pinning port 3000 avoids clashing with API on 3001. | Next.js CLI creates this by default — verify it exists |
| `extends tsconfig.base.json` | Shared TS strictness | Same strict rules as the API — fewer type mismatches at the API boundary | Extend base; add Next.js-specific overrides (`jsx`, `plugins`) |

Install and verify:

```bash
pnpm install
pnpm dev:web
```

Web should boot at `http://localhost:3000`.

### After `create-next-app` in a monorepo — what / why / how

| Question | Answer |
|----------|--------|
| **What** | Next.js CLI may create `apps/web/pnpm-workspace.yaml`, `pnpm-lock.yaml`, and a nested `.git` inside the app folder. |
| **Why** | Turbo runs `pnpm run dev` from `apps/web`. If pnpm finds a local workspace file **without** a `packages:` field, you get: *`ERROR packages field missing or empty`*. |
| **How** | **Delete** from `apps/web/`: `pnpm-workspace.yaml`, `pnpm-lock.yaml`. Remove nested `.git` if present. Run `pnpm install` from **repo root** only. Keep one lockfile at the monorepo root. |

```bash
# From repo root, after scaffolding web:
rm -f apps/web/pnpm-workspace.yaml apps/web/pnpm-lock.yaml
rm -rf apps/web/.git   # nested repo — use root git only
pnpm install
pnpm dev:web
```

---

## Step 7 — Scaffold Flutter mobile

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | A Flutter app in `apps/mobile` — iOS, Android, and optionally web/desktop from one codebase. |
| **Why** | Mobile shares the same NestJS API as the web app. Users get a native experience without duplicating backend logic. Flutter lives in the monorepo for repo organization, not because it participates in pnpm/turbo. |
| **How** | `flutter create` in `apps/mobile`, organize `lib/` by feature, point API client at the same base URL, run via root `pnpm dev:mobile` or `flutter run` directly. |

From the repo root:

```bash
cd apps/mobile
flutter create . --org com.myproject --project-name my_project_mobile
cd ../..
```

**Recommended folder structure inside `apps/mobile/lib/`:**

```
lib/
├── main.dart
├── app.dart
├── core/
│   ├── api/           # HTTP client → NestJS API
│   ├── config/        # env / constants
│   └── theme/
├── features/
│   └── jobs/          # one folder per feature
│       ├── data/
│       ├── domain/
│       └── presentation/
└── shared/
    └── widgets/
```

**API client pattern** — point at the same NestJS base URL:

```dart
// lib/core/config/env.dart
class Env {
  static const apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://localhost:3001/api/v1',
  );
}
```

Run on a device or simulator:

```bash
pnpm dev:mobile
# or
cd apps/mobile && flutter run --dart-define=API_BASE_URL=http://10.0.2.2:3001/api/v1
```

> **Android emulator:** use `10.0.2.2` instead of `localhost` to reach the host machine's API.

### Flutter in a JS monorepo — what / why / how

| Question | Answer |
|----------|--------|
| **What** | Flutter uses Dart and `pubspec.yaml` — it is outside the pnpm workspace graph. |
| **Why** | pnpm/turbo only orchestrate Node.js packages. Forcing Flutter into pnpm adds complexity with no benefit. Instead, root `package.json` wraps `flutter run` as a convenience script. |
| **How** | No `package.json` in `apps/mobile`. Share API contracts via OpenAPI/Swagger from NestJS, not `packages/shared`. Use `--dart-define=API_BASE_URL=...` for env-specific API URLs. |

**Flutter + monorepo notes:**

- Do not add `package.json` to `apps/mobile` — keep Flutter isolated.
- Share **API contracts** via OpenAPI/Swagger from NestJS, not via `packages/shared` (Dart cannot import TS).
- Optionally generate Dart models from OpenAPI with `openapi_generator` or `swagger_dart_code_generator`.

---

## Step 8 — Add shared package

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | A compiled TypeScript package (`packages/shared`) exporting enums, types, and constants used by both API and web. |
| **Why** | Without shared types, you duplicate `JobStatus`, API response shapes, etc. in two places — they drift and cause runtime bugs. One source of truth keeps API responses and UI in sync. |
| **How** | Create `packages/shared`, build with `tsc`, reference via `"@myproject/shared": "workspace:*"` in app `package.json` files. Turbo builds shared first thanks to `"dependsOn": ["^build"]`. |

Create `packages/shared/package.json`:

```json
{
  "name": "@myproject/shared",
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

Create `packages/shared/tsconfig.json`:

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

Create `packages/shared/src/index.ts`:

```typescript
export enum JobStatus {
  SAVED = 'saved',
  APPLIED = 'applied',
  SCREENING = 'screening',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export type ApiHealthResponse = {
  status: 'ok';
  db: 'ok' | 'error';
};
```

Wire into both JS apps — add to `apps/api/package.json` and `apps/web/package.json`:

```json
{
  "dependencies": {
    "@myproject/shared": "workspace:*"
  }
}
```

```bash
pnpm install
pnpm build
```

**Rule:** `packages/shared` = types, enums, constants only. No NestJS, React, Prisma, or OpenAI imports.

### `workspace:*` protocol — what / why / how

| Question | Answer |
|----------|--------|
| **What** | pnpm's syntax for linking an internal monorepo package as a dependency. |
| **Why** | Instead of publishing `@myproject/shared` to npm, `workspace:*` resolves it locally from `packages/shared`. Changes to shared types are immediately available after rebuild. |
| **How** | Add `"@myproject/shared": "workspace:*"` to `dependencies` in both `apps/api` and `apps/web`, then run `pnpm install`. |

---

## Step 9 — Environment files

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | Per-app `.env` files holding secrets and config (DB URLs, API keys, ports). |
| **Why** | Hardcoding secrets in source code leads to leaks via git. Each app and deploy environment needs different values — env files keep config out of code. |
| **How** | Create `.env.example` (safe to commit) with placeholders. Copy to `.env` / `.env.local` locally. Never commit real `.env` files — add them to `.gitignore`. |

Never commit secrets. Use per-app env files:

| File | Used by | Example variables |
|------|---------|-------------------|
| `apps/api/.env` | NestJS | `DATABASE_URL`, `OPENAI_API_KEY`, `JWT_SECRET`, `CORS_ORIGIN`, `PORT=3001` |
| `apps/web/.env.local` | Next.js | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `apps/mobile/.env` | Flutter (optional) | Loaded via `--dart-define` or `flutter_dotenv` |

Create `.env.example` files (safe to commit) with placeholder values:

```bash
# apps/api/.env.example
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
OPENAI_API_KEY=sk-...
JWT_SECRET=change-me
CORS_ORIGIN=http://localhost:3000
PORT=3001
```

```bash
# apps/web/.env.local.example
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

Copy to real env files locally:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local
```

---

## Step 10 — Git ignore and formatting

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | A root `.gitignore` that excludes build artifacts, dependencies, secrets, and IDE files from git. |
| **Why** | Without it, `node_modules/`, `.next/`, `dist/`, and `.env` get committed — bloating the repo and exposing secrets. Each app's build output is regenerable and should not be in version control. |
| **How** | One root `.gitignore` covers all apps using glob patterns (`apps/*/dist`, `apps/*/.next`). Flutter build dirs need separate entries since Flutter is outside pnpm. |

Create root `.gitignore`:

```gitignore
# dependencies
node_modules/

# monorepo build outputs
apps/*/dist
apps/*/.next
apps/*/coverage
packages/*/dist
.turbo

# env — never commit
.env
.env.local
.env.*.local
apps/api/.env
apps/web/.env.local

# Flutter
apps/mobile/.dart_tool/
apps/mobile/build/
apps/mobile/.flutter-plugins
apps/mobile/.flutter-plugins-dependencies

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db
```

---

## Step 11 — Verify locally

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | A smoke-test sequence confirming every app boots and the monorepo wiring works end-to-end. |
| **Why** | Scaffolding errors (missing `dev` script, wrong filter, broken tsconfig) only surface when you run commands. Verifying now saves hours of debugging later. |
| **How** | Run install → build → each app individually → all apps in parallel. Hit the API health endpoint with curl. Fix any failure using [Common pitfalls](#common-pitfalls). |

Run this verification sequence after scaffolding:

```bash
# 1. Install everything
pnpm install

# 2. Build shared → api → web (turbo order)
pnpm build

# 3. Start API (terminal 1)
pnpm dev:api
curl http://localhost:3001/api/v1/health   # add a health route first

# 4. Start web (terminal 2)
pnpm dev:web
# open http://localhost:3000

# 5. Start mobile (terminal 3)
pnpm dev:mobile

# 6. Start all JS apps in parallel
pnpm dev
```

**Port convention (avoid conflicts):**

| App | Port |
|-----|------|
| Next.js web | 3000 |
| NestJS API | 3001 |
| Flutter | device/simulator (no fixed port) |

---

## Step 12 — Deploy each app independently

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | Each app (`api`, `web`, `mobile`) deploys to its own platform with its own build command and env vars. |
| **Why** | Monorepo ≠ monolith deploy. The API and web have different runtime needs (Node server vs static/SSR). Deploying independently lets you update the API without redeploying the web, and vice versa. |
| **How** | Set the platform's root directory to `apps/api` or `apps/web`. Build command runs from repo root (`cd ../.. && pnpm install && turbo build --filter=...`) so shared packages compile first. Update CORS and API URL env vars for production. |

Each app deploys from its own subdirectory with its own env vars.

**Default hosts for this project:** API → **Render** · Web → **Netlify**

| App | Platform | Root directory | Build command | Start command |
|-----|----------|----------------|---------------|---------------|
| API | **Render** (Web Service) | `apps/api` | `cd ../.. && pnpm install && turbo build --filter=@myproject/api` | `pnpm --filter @myproject/api start:prod` |
| Web | **Netlify** | `apps/web` | `cd ../.. && pnpm install && turbo build --filter=@myproject/web` | Netlify Next.js runtime (via plugin) |
| Mobile | App Store / Play Store | `apps/mobile` | `flutter build apk` / `flutter build ios` | N/A |

### Deploy API on Render — what / why / how

| Question | Answer |
|----------|--------|
| **What** | A Render **Web Service** running your compiled NestJS app. |
| **Why** | Render free tier is enough for MVP; you get a public HTTPS URL for the API without managing servers. |
| **How** | Connect GitHub → New Web Service → root dir `apps/api` → Node → build/start commands above → add env vars (`DATABASE_URL`, `OPENAI_API_KEY`, `CORS_ORIGIN`, `PORT`). |

**Render settings (checklist):**

1. **Root Directory:** `apps/api`
2. **Build Command:** `cd ../.. && pnpm install && turbo build --filter=@myproject/api`
3. **Start Command:** `cd ../.. && pnpm --filter @myproject/api start:prod`
4. **Environment:** add all vars from `apps/api/.env` (use Render dashboard — never commit secrets)

### Deploy web on Netlify — what / why / how

| Question | Answer |
|----------|--------|
| **What** | Netlify builds and hosts your Next.js app with SSR support via the official Next.js plugin. |
| **Why** | Netlify handles Next.js App Router, preview deploys, and env vars — good fit for monorepo web apps. |
| **How** | Connect GitHub → set **Base directory** to `apps/web` → use build command below → enable `@netlify/plugin-nextjs`. |

**Netlify settings (checklist):**

1. **Base directory:** `apps/web`
2. **Build command:** `cd ../.. && pnpm install && turbo build --filter=@myproject/web`
3. **Environment variables:** `NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api/v1` (and Supabase public keys when added)
4. **Do not** set `output: 'export'` in `next.config` — SSR/API routes need the Netlify Next.js runtime

**Production env updates:**

| Variable | App | What | Why |
|----------|-----|------|-----|
| `CORS_ORIGIN` | API | Your Netlify web URL (e.g. `https://your-app.netlify.app`) | Browser blocks API calls without matching CORS origin |
| `NEXT_PUBLIC_API_URL` | Web | Your Render API URL (e.g. `https://your-api.onrender.com/api/v1`) | Client-side fetch must point at production API, not localhost |
| `API_BASE_URL` | Flutter | Production API URL via `--dart-define` | Mobile app must call deployed API, not localhost |

- Set `CORS_ORIGIN` on the API (Render) to your Netlify URL.
- Set `NEXT_PUBLIC_API_URL` on the web app (Netlify) to your Render API URL.
- Set `API_BASE_URL` on Flutter via `--dart-define` at build time.

**Supabase Auth (when added):** Site URL → `https://your-app.netlify.app` · Redirect URLs → `https://your-app.netlify.app/**`

**Optional:** add `apps/web/netlify.toml` for explicit monorepo build settings:

```toml
[build]
  command = "cd ../.. && pnpm install && turbo build --filter=@myproject/web"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

> **Note:** With `@netlify/plugin-nextjs`, Netlify manages the Next.js runtime — you typically do **not** set `publish = ".next"` manually in the UI; the plugin handles output. Keep `netlify.toml` in `apps/web` so Netlify picks it up when base directory is `apps/web`.

---

## Daily commands cheat sheet

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | The commands you run every day from the repo root. |
| **Why** | You should rarely `cd` into individual apps. Root scripts + turbo + pnpm `--filter` handle scoping for you. |
| **How** | Memorize `pnpm dev`, `pnpm dev:api`, `pnpm build`, and `pnpm --filter @myproject/api add <pkg>`. Use `--filter` to run any command in one app only. |

```bash
pnpm install                              # install all JS workspaces
pnpm dev                                  # API + web in parallel
pnpm dev:api                              # NestJS only
pnpm dev:web                              # Next.js only
pnpm dev:mobile                           # Flutter only
pnpm build                                # build shared → api → web
pnpm lint                                 # lint all JS packages
pnpm test                                 # test all JS packages

# Scoped package management
pnpm --filter @myproject/api add @nestjs/config
pnpm --filter @myproject/web add @supabase/supabase-js
pnpm --filter @myproject/api exec prisma generate
pnpm --filter @myproject/api exec prisma migrate dev

# Flutter (from apps/mobile)
flutter pub get
flutter analyze
flutter test
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:3001/api/v1
```

---

## Adding a new app or package later

### What / Why / How

| Question | Answer |
|----------|--------|
| **What** | How to extend the monorepo after initial setup — new Next.js app, shared package, or Flutter feature. |
| **Why** | Real products grow — admin panels, UI kits, new mobile features. The monorepo pattern scales by adding folders, not restructuring. |
| **How** | JS/TS apps: scaffold into `apps/`, set scoped `"name"`, add root `dev:*` script. Shared packages: copy `packages/shared` pattern. Flutter: add feature folders under `lib/features/` — no monorepo config changes. |

### New JS/TS app (e.g. admin panel)

```bash
pnpm create next-app@latest apps/admin --typescript --tailwind --eslint --app --src-dir --use-pnpm
```

Add `"name": "@myproject/admin"` to its `package.json`. pnpm picks it up automatically via `apps/*`.

Add a root script:

```json
"dev:admin": "turbo run dev --filter=@myproject/admin"
```

### New shared package (e.g. UI kit)

```bash
mkdir -p packages/ui/src
# add package.json, tsconfig.json — same pattern as packages/shared
```

### New Flutter feature module

Add under `apps/mobile/lib/features/<name>/` — no monorepo config changes needed.

---

## Common pitfalls

### Turbo and script wiring

| Pitfall | What happened | Why | Fix |
|---------|---------------|-----|-----|
| `pipeline` instead of `tasks` | Turbo 2.x fails immediately | Field renamed in Turborepo 2.0 | Rename `"pipeline"` → `"tasks"` in `turbo.json` |
| `dev:api` not found | `pnpm dev:api` fails | Root `package.json` has `start:api` but not `dev:api` | Add `"dev:api": "turbo run dev --filter=@myproject/api"` to root scripts |
| Turbo runs but API doesn't start | Turbo finds package, nothing happens | `apps/api` has `start:dev` but no `dev` script | Add `"dev": "nest start --watch"` to `apps/api/package.json` |
| `--filter=api` doesn't match | Turbo can't find the package | Filter must match exact `"name"` in app's `package.json` | Use `--filter=@myproject/api`, not `--filter=api` (unless name is literally `"api"`) |
| Filter uses root workspace name | `--filter=job-huntkit-workspace` fails | Root name is the orchestrator, not an app | Filter on app name: `@myproject/api` |

### TypeScript and NestJS

| Pitfall | What happened | Why | Fix |
|---------|---------------|-----|-----|
| Cannot find name `process` | Red squiggle in `main.ts` | Node types not loaded after extending base tsconfig | Add `"types": ["node"]` to `apps/api/tsconfig.json` |
| `rootDir` warning (TS 6+) | Deprecation/migration warning | TS 6 requires explicit source root when using `include` + `outDir` | Add `"rootDir": "./src"` |
| `baseUrl` deprecated | TS 6 deprecation warning | `baseUrl` is deprecated, removed in TS 7 | Remove `"baseUrl"` unless you use path aliases |
| Floating promise on `bootstrap()` | ESLint error on last line | Async function called without await or error handler | Use `bootstrap().catch(...)` |

### General monorepo

| Pitfall | Fix |
|---------|-----|
| `nest` / `next` not found | Run from repo root via `pnpm dev:api` or `turbo` |
| Shared types not found in apps | Run `pnpm build`; use `"@myproject/shared": "workspace:*"` |
| Port conflict | API on 3001, web on 3000 |
| Turbo doesn't rebuild shared | `"dependsOn": ["^build"]` in `turbo.json` handles this |
| Flutter can't reach localhost API | Use `10.0.2.2` (Android emulator) or your machine's LAN IP |
| CORS errors in browser | `CORS_ORIGIN` in API must match web URL exactly |
| Putting NestJS deps in root `package.json` | Move all app deps into `apps/api/package.json` |
| Importing TS shared package in Flutter | Use OpenAPI-generated Dart models instead |
| `packages field missing or empty` on `dev:web` | pnpm fails inside `apps/web` | `create-next-app` left `apps/web/pnpm-workspace.yaml` without `packages:` | Delete `apps/web/pnpm-workspace.yaml` and `apps/web/pnpm-lock.yaml`; `pnpm install` from root |
| Wrong deploy root on Netlify/Render | Set platform root to `apps/web` or `apps/api`, not repo root |
| Committing `.env` files | Only commit `.env.example` |

### Quick diagnostic: `pnpm dev:api` fails

Run through this checklist in order:

```bash
# 1. Does root script exist?
grep "dev:api" package.json

# 2. Does turbo.json use "tasks" (not "pipeline")?
grep '"tasks"' turbo.json

# 3. Does apps/api have a "dev" script?
grep '"dev"' apps/api/package.json

# 4. Does filter match app name?
grep '"name"' apps/api/package.json
# Should be "@myproject/api" — filter must match exactly
```

---

## HuntKit example (apply this tutorial)

This repo (`job-huntkit-workspace`) is the HuntKit product. After completing this tutorial's scaffold, continue with product-specific work:

| Doc | Purpose |
|-----|---------|
| [huntkit-mvp-spec.md](./huntkit-mvp-spec.md) | Product scope, DB schema, API routes, 7-day plan |
| [huntkit-build-guide.md](./huntkit-build-guide.md) | NestJS modules, Supabase auth, RAG pipeline |
| [monorepo-migration-guide.md](./monorepo-migration-guide.md) | HuntKit-specific monorepo notes |

**HuntKit stack mapping:**

| Tutorial slot | HuntKit usage |
|---------------|---------------|
| `apps/api` | Auth, profile ingest, jobs CRUD, RAG analyze, admin |
| `apps/web` | Landing, onboarding, job pipeline, analyze UI, admin runs |
| `apps/mobile` | v2 — pause for MVP per spec; scaffold now if you want |
| `packages/shared` | `JobStatus`, API response types |
| `supabase/migrations/` | pgvector schema from MVP spec |
| `seed/` | `resume.md`, `project-*.md` |

**HuntKit 7-day sequence (after monorepo scaffold):**

| Day | Focus | Done when |
|-----|-------|-----------|
| 1 | Supabase + Prisma + auth guard + jobs CRUD + health | curl creates/lists jobs |
| 2 | Profile sources + chunking (text only) | Resume saved, chunks in DB |
| 3 | Embeddings + pgvector retrieval | Search returns relevant chunks |
| 4 | `POST /jobs/:id/analyze` + ai_runs | curl returns bullets + citations |
| 5 | Next.js UI + copy buttons | End-to-end screen recording |
| 6 | Deploy + 5 real jobs in pipeline | Public URL, daily use starts |
| 7 | Portfolio + **5 applications sent** | Demo link in cover messages |

---

## Fresh-start checklist

Use this checklist every time you bootstrap a new monorepo:

- [ ] Create folder structure (`apps/`, `packages/`, optional `supabase/`, `seed/`, `devdocs/`)
- [ ] Add `pnpm-workspace.yaml` and root `package.json` (orchestrator only)
- [ ] Add `turbo.json` with `"tasks"` (not `"pipeline"`) and `tsconfig.base.json`
- [ ] Scaffold NestJS in `apps/api` → rename to `"@myproject/api"`
- [ ] Add `"dev": "nest start --watch"` to `apps/api/package.json` (NestJS CLI only creates `start:dev`)
- [ ] Add `"types": ["node"]` and `"rootDir": "./src"` to `apps/api/tsconfig.json`
- [ ] Add root `"dev:api"` script → `pnpm dev:api` boots on port 3001
- [ ] Scaffold Next.js in `apps/web` → `pnpm dev:web` on port 3000
- [ ] Scaffold Flutter in `apps/mobile` → `pnpm dev:mobile` runs
- [ ] Add `packages/shared` with at least one exported type/enum
- [ ] Wire `workspace:*` deps in api and web
- [ ] `pnpm build` succeeds (shared builds before apps)
- [ ] Add `.env.example` files; copy to `.env` locally
- [ ] Update `.gitignore` for `dist/`, `.next/`, `.turbo/`, Flutter build dirs
- [ ] Add a `GET /api/v1/health` route on the API
- [ ] Document product spec in `devdocs/`
- [ ] Continue with feature work (DB, auth, UI)

---

## What you learn (interview talking points)

1. **pnpm workspaces** — dependency hoisting, `workspace:*` protocol, single lockfile across apps.
2. **Turborepo** — task graphs, build caching, `dependsOn` build order.
3. **Separation of concerns** — API in NestJS, UI in Next.js, mobile in Flutter, contracts in shared TS package.
4. **Deploy independence** — each app ships to its own host with its own env vars.
5. **Cross-platform API** — one NestJS API serves web and mobile; OpenAPI bridges TS and Dart.

---

## Quick copy-paste bootstrap (all steps condensed)

Run from an empty directory when starting a **new** project:

```bash
# 1. Shell
mkdir my-project && cd my-project && git init
mkdir -p apps/api apps/web apps/mobile packages/shared/src supabase/migrations seed devdocs

# 2. Add pnpm-workspace.yaml, package.json, turbo.json, tsconfig.base.json, .gitignore
#    (copy contents from Steps 2–4 above)

pnpm install

# 3. NestJS
cd apps/api && pnpm dlx @nestjs/cli new . --package-manager pnpm --skip-git && cd ../..
# Then edit apps/api/package.json:
#   - "name": "@myproject/api"
#   - add "dev": "nest start --watch"
# Then edit apps/api/tsconfig.json: add "types": ["node"], "rootDir": "./src"

# 4. Next.js
pnpm create next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir --use-pnpm

# 5. Flutter
cd apps/mobile && flutter create . --org com.myproject --project-name my_project_mobile && cd ../..

# 6. Shared package + wire workspace:* deps (Step 8)

pnpm install && pnpm build && pnpm dev
```

Replace `myproject` / `my-project` with your actual project name throughout.

---

**Related docs in this repo:**

- [monorepo-migration-guide.md](./monorepo-migration-guide.md) — HuntKit-specific migration notes
- [huntkit-mvp-spec.md](./huntkit-mvp-spec.md) — HuntKit product specification
- [huntkit-build-guide.md](./huntkit-build-guide.md) — NestJS feature implementation guide
