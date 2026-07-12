# HuntKit — Step-by-Step Build Guide (NestJS + Supabase + Next.js)

**Audience:** You are new to NestJS. This guide walks you from the current scaffold to a shippable MVP in 7 days.

**Spec reference:** [huntkit-mvp-spec.md](./huntkit-mvp-spec.md)

> **Architecture locked — Option A (NestJS JWT):** See [huntkit-architecture.md](./huntkit-architecture.md).  
> - **Supabase** = hosted PostgreSQL only (`DATABASE_URL`)  
> - **Next.js** = `NEXT_PUBLIC_API_URL` only — no Supabase client  
> - **Skip** §7 Supabase Auth; implement **NestJS JWT** (`@nestjs/jwt`, `JwtAuthGuard`) instead

**Strategic context:** This build serves **both tracks** from your career plan:
- **Track A (contractor bridge):** Proves NestJS + PostgreSQL + RAG + Next.js — the stack clients pay premium for.
- **Track B (indie hacker):** HuntKit itself becomes portfolio proof, daily job-hunt tool, and a future $49–99 template on Lemon Squeezy.

**Stack locked for this project:**

| Layer | Choice |
|-------|--------|
| API | NestJS 11 + TypeScript (strict) |
| DB + Auth | **Supabase** (PostgreSQL + Auth + pgvector) |
| ORM | **Prisma** (tables) + raw SQL (vector ops) |
| UI | Next.js 14+ App Router |
| AI | OpenAI `text-embedding-3-small` + `gpt-4o-mini` |
| Deploy | API: Railway/Render · Web: Vercel |

**Do not add in week 1:** LangChain, Redis, Docker, Qdrant, Lemon Squeezy checkout, Flutter.

---

## Table of Contents

1. [NestJS crash course (read first)](#1-nestjs-crash-course-read-first)
2. [Prerequisites & tooling](#2-prerequisites--tooling)
3. [Repo layout (monorepo)](#3-repo-layout-monorepo)
4. [Step 1 — Supabase project + pgvector](#4-step-1--supabase-project--pgvector)
5. [Step 2 — Database schema & Prisma](#5-step-2--database-schema--prisma)
6. [Step 3 — NestJS foundation](#6-step-3--nestjs-foundation)
7. [Step 4 — Supabase Auth in NestJS](#7-step-4--supabase-auth-in-nestjs)
8. [Step 5 — Feature modules (Day 1 deliverable)](#8-step-5--feature-modules-day-1-deliverable)
9. [Step 6 — Profile ingest pipeline (Day 2–3)](#9-step-6--profile-ingest-pipeline-day-23)
10. [Step 7 — Job analysis / RAG (Day 4)](#10-step-7--job-analysis--rag-day-4)
11. [Step 8 — Next.js frontend (Day 5)](#11-step-8--nextjs-frontend-day-5)
12. [Step 9 — Deploy & dogfood (Day 6–7)](#12-step-9--deploy--dogfood-day-67)
13. [7-day checklist](#13-7-day-checklist)
14. [Testing strategy](#14-testing-strategy)
15. [Environment variables](#15-environment-variables)
16. [Common mistakes (NestJS beginners)](#16-common-mistakes-nestjs-beginners)
17. [Interview & indie talking points](#17-interview--indie-talking-points)

---

## 1. NestJS crash course (read first)

NestJS is **Node.js + TypeScript** organized like Angular: modules, dependency injection, decorators.

### Core building blocks

| Concept | What it does | HuntKit example |
|---------|--------------|-----------------|
| **Module** | Groups related code | `JobsModule`, `ProfileModule` |
| **Controller** | HTTP routes (thin) | `POST /api/v1/jobs` |
| **Service** | Business logic | `JobsService.create()` |
| **DTO** | Validates request body | `CreateJobDto` with `class-validator` |
| **Guard** | Auth / permissions | `SupabaseAuthGuard` |
| **Pipe** | Transforms/validates input | Global `ValidationPipe` |
| **Filter** | Consistent error responses | `GlobalExceptionFilter` |

### Request flow (memorize this)

```
HTTP Request
  → Guard (is user authenticated?)
  → Pipe (is body valid?)
  → Controller (route handler)
  → Service (business logic)
  → Database / OpenAI
  → Response
```

### Golden rules (from project AGENTS.md)

1. **Controllers stay thin** — no business logic in controllers.
2. **One feature = one module** under `src/modules/<feature>/`.
3. **Every input uses a DTO** with `class-validator`.
4. **Inject dependencies** — never `new SomeService()` inside a service.
5. **`strict: true`** in `tsconfig.json` — no `any`.
6. **Throw `HttpException` subclasses** — never plain `Error` to clients.

### Minimal module example

```typescript
// jobs.module.ts
@Module({
  imports: [PrismaModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
```

```typescript
// jobs.controller.ts
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateJobDto, @CurrentUser() user: AuthUser) {
    return this.jobsService.create(user.id, dto);
  }
}
```

```typescript
// create-job.dto.ts
export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  roleTitle: string;

  @IsString()
  @IsNotEmpty()
  jdText: string;

  @IsOptional()
  @IsUrl()
  jobUrl?: string;
}
```

---

## 2. Prerequisites & tooling

### Install locally

```bash
node -v    # 20 LTS or 22+
pnpm -v    # 9+
```

### Accounts (free tiers)

- [Supabase](https://supabase.com) — Postgres + Auth
- [OpenAI](https://platform.openai.com) — embeddings + chat
- [Railway](https://railway.app) or [Render](https://render.com) — API hosting
- [netlify](https://www.netlify.com/) — Next.js hosting

### VS Code / Cursor extensions (recommended)

- ESLint
- Prisma
- REST Client or Thunder Client (API testing)

### Current state of this repo

You already have a **default NestJS 11 scaffold** at the repo root (`src/main.ts`, `src/app.module.ts`). This guide evolves that into the HuntKit API and adds a `apps/web` Next.js app via pnpm workspaces.

---

## 3. Repo layout (monorepo)

Industry practice for a solo full-stack product: **one repo, two apps**, shared tooling.

```
job-hunt-kit/
├── apps/
│   ├── api/                    # NestJS (move current src/ here OR keep at root)
│   └── web/                    # Next.js 14 App Router
├── packages/
│   └── shared/                 # optional: shared types (JobStatus enum, etc.)
├── supabase/
│   └── migrations/             # SQL migrations (pgvector, tables)
├── seed/
│   ├── resume.md
│   ├── project-crunch.md
│   └── project-huntkit.md
├── devdocs/
│   ├── huntkit-mvp-spec.md
│   └── huntkit-build-guide.md  # this file
├── pnpm-workspace.yaml
└── package.json
```

### Option A — Keep API at repo root (simplest for week 1)

Stay with the current layout. Add `apps/web` for Next.js only. **Recommended if you are new to NestJS** — fewer moves, less confusion.

### Option B — Full monorepo

Move NestJS into `apps/api/`. Better long term for template resale; do this only if comfortable with pnpm workspaces.

**This guide assumes Option A** unless you explicitly want Option B.

### Target API module structure

```
src/
├── main.ts
├── app.module.ts
└── modules/
    ├── shared/
    │   ├── decorators/         # @CurrentUser()
    │   ├── guards/             # SupabaseAuthGuard
    │   ├── filters/            # GlobalExceptionFilter
    │   ├── prisma/             # PrismaModule + PrismaService
    │   └── shared.module.ts
    ├── health/
    ├── auth/
    ├── profile/
    ├── jobs/
    ├── analyze/
    └── admin/
```

---

## 4. Step 1 — Supabase project + pgvector

### 4.1 Create Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. Choose a region close to you (or US if targeting US employers).
3. Save the **database password** securely (password manager — not in git).

### 4.2 Enable pgvector

In Supabase **SQL Editor**, run:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 4.3 Run the HuntKit schema

Copy the full schema from [huntkit-mvp-spec.md § Database Schema](./huntkit-mvp-spec.md) into the SQL Editor.

**Important fix for `job_analyses`:** `ai_run_id` references `ai_runs`, but `ai_runs` is defined after `job_analyses` in the spec. Create tables in this order:

1. `users`
2. `profile_sources`
3. `profile_chunks`
4. `jobs`
5. `ai_runs` ← before job_analyses
6. `job_analyses`

### 4.4 Supabase Auth settings

In **Authentication → Providers**:

- Enable **Email** provider.
- For MVP: disable email confirmation (Settings → Auth → confirm email OFF) so local dev is fast.
- Set **Site URL** to `http://localhost:3000` (Next.js dev).

### 4.5 Row Level Security (RLS)

For MVP with NestJS as the only data access layer (using **service role** or direct Postgres connection), you can:

- **Week 1 shortcut:** Use `DATABASE_URL` (direct Postgres) from Supabase → Settings → Database → Connection string. NestJS talks to Postgres; RLS optional.
- **Production best practice:** Enable RLS and use Supabase client only from Next.js for auth; NestJS validates JWT and scopes queries by `user_id`.

**Recommended for learning NestJS:** direct `DATABASE_URL` + application-level `user_id` filtering in every service query. Add RLS in v2.

### 4.6 Collect connection strings

From Supabase **Settings → API**:

| Variable | Where |
|----------|-------|
| `SUPABASE_URL` | Project URL | 
| `SUPABASE_ANON_KEY` | anon public key (Next.js client) |
| `SUPABASE_JWT_SECRET` | JWT Settings → JWT Secret (NestJS verifies tokens) |
| `DATABASE_URL` | Database → Connection string (URI, port 5432) |

---

## 5. Step 2 — Database schema & Prisma

Prisma handles CRUD tables. **pgvector columns use raw SQL** — Prisma does not natively model `vector(1536)` well.

### 5.1 Install Prisma

```bash
pnpm add @prisma/client
pnpm add -D prisma
npx prisma init
```

### 5.2 Configure `prisma/schema.prisma`

Map Prisma models to your existing Supabase tables. Example (abbreviated):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email        String   @unique
  passwordHash String?  @map("password_hash")
  displayName  String?  @map("display_name")
  headline     String?
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  profileSources ProfileSource[]
  jobs           Job[]

  @@map("users")
}

// ... ProfileSource, Job, JobAnalysis, AiRun — mirror SQL schema
```

**Skip `embedding` in Prisma schema** — manage `profile_chunks.embedding` via `$executeRaw`.

### 5.3 Introspect (if tables already exist in Supabase)

```bash
npx prisma db pull
npx prisma generate
```

### 5.4 PrismaService (NestJS pattern)

```typescript
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
```

Register in `PrismaModule` and import into every feature module.

---

## 6. Step 3 — NestJS foundation

### 6.1 Install core dependencies

```bash
pnpm add @nestjs/config @nestjs/throttler helmet compression class-validator class-transformer
pnpm add openai
pnpm add @supabase/supabase-js jsonwebtoken
pnpm add -D @types/jsonwebtoken
```

### 6.2 Enable strict TypeScript

In `tsconfig.json`, set:

```json
"strict": true,
"noImplicitAny": true
```

### 6.3 Configure `main.ts` (production-ready bootstrap)

Every HuntKit API should boot with:

```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
}
bootstrap();
```

### 6.4 ConfigModule (no hardcoded secrets)

```typescript
// src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  database: { url: process.env.DATABASE_URL },
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
  },
  openai: { apiKey: process.env.OPENAI_API_KEY },
  rag: { scoreThreshold: parseFloat(process.env.RAG_SCORE_THRESHOLD ?? '0.70') },
});
```

Use `ConfigService.getOrThrow<string>('database.url')` everywhere — never `process.env` scattered in services.

### 6.3 Wire `app.module.ts`

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    PrismaModule,
    HealthModule,
    AuthModule,
    ProfileModule,
    JobsModule,
    AnalyzeModule,
    AdminModule,
  ],
})
export class AppModule {}
```

### 6.4 Generate modules (CLI)

```bash
npx nest g module modules/health
npx nest g controller modules/health/health --flat
npx nest g service modules/health/health --flat

npx nest g module modules/jobs
npx nest g controller modules/jobs/jobs --flat
npx nest g service modules/jobs/jobs --flat

# Repeat for profile, analyze, admin, auth
```

---

## 7. Step 4 — Supabase Auth in NestJS

**Architecture:** Next.js signs users up/in via `@supabase/supabase-js`. Browser gets a Supabase access JWT. Next.js sends `Authorization: Bearer <token>` to NestJS. NestJS verifies the JWT and extracts `sub` (user id).

### 7.1 Why Supabase Auth (vs rolling your own JWT)

| Approach | Pros | Cons |
|----------|------|------|
| **Supabase Auth** ✅ | Fast, secure, free tier, works with Next.js SSR | Two systems to understand |
| NestJS JWT only | Single backend | More code, you own password reset, etc. |

For your goals: **Supabase Auth** = ship faster, still learn NestJS guards and DI.

### 7.2 Sync Supabase user → `users` table

On first authenticated request, upsert into `users`:

```typescript
// auth.service.ts — pseudocode
async ensureUser(supabaseUser: { id: string; email: string }): Promise<User> {
  return this.prisma.user.upsert({
    where: { id: supabaseUser.id },
    create: { id: supabaseUser.id, email: supabaseUser.email },
    update: {},
  });
}
```

### 7.3 SupabaseAuthGuard

```typescript
@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractBearer(request);
    if (!token) throw new UnauthorizedException();

    const payload = jwt.verify(
      token,
      this.config.getOrThrow<string>('supabase.jwtSecret'),
    ) as { sub: string; email?: string };

    request.user = { id: payload.sub, email: payload.email };
    return true;
  }
}
```

### 7.4 `@CurrentUser()` decorator

```typescript
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    return ctx.switchToHttp().getRequest().user;
  },
);
```

### 7.5 Auth routes (MVP)

With Supabase handling login/register on the **frontend**, NestJS only needs:

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/auth/me` | Return user profile from DB |
| PATCH | `/auth/me` | Update `displayName`, `headline` |

Optional: keep spec's `/auth/register` and `/auth/login` as thin proxies only if you want curl testing without the web app.

### 7.6 Next.js auth (preview — Day 5)

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

Pass session token to API:

```typescript
const { data: { session } } = await supabase.auth.getSession();
await fetch(`${API_URL}/jobs`, {
  headers: { Authorization: `Bearer ${session?.access_token}` },
});
```

---

## 8. Step 5 — Feature modules (Day 1 deliverable)

**Day 1 goal:** Auth guard works, Jobs CRUD works, health check OK. **No AI yet.**

### 8.1 Health module

```typescript
@Get()
check() {
  return { status: 'ok', db: 'ok' }; // optionally ping Prisma
}
```

Route: `GET /api/v1/health` — **public**, no guard.

### 8.2 Jobs module

Implement per spec:

| Method | Route |
|--------|-------|
| POST | `/jobs` |
| GET | `/jobs?status=applied` |
| GET | `/jobs/:id` |
| PATCH | `/jobs/:id` |
| DELETE | `/jobs/:id` |

**Service rules:**
- Every query filters by `user_id` from `@CurrentUser()`.
- `GET /jobs` returns `{ items, countsByStatus }`.
- `GET /jobs/:id` includes `latestAnalysis` if exists (null on Day 1).

**Status enum:**

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
```

### 8.3 Day 1 verification (curl)

```bash
# 1. Health
curl http://localhost:3001/api/v1/health

# 2. Create job (use real Supabase JWT)
curl -X POST http://localhost:3001/api/v1/jobs \
  -H "Authorization: Bearer <SUPABASE_ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"company":"Acme","roleTitle":"Product Engineer","jdText":"We need NestJS..."}'
```

**Deliverable:** Create and list jobs via curl or Postman.

---

## 9. Step 6 — Profile ingest pipeline (Day 2–3)

### Day 2 — Text chunking (no embeddings yet)

**Profile module routes:**

| Method | Route |
|--------|-------|
| POST | `/profile/sources` |
| GET | `/profile/sources` |
| GET | `/profile/sources/:id` |
| DELETE | `/profile/sources/:id` |
| POST | `/profile/sources/:id/reindex` |

**`ProfileIngestService` steps:**

1. Save source with `status: 'processing'`.
2. Split content:
   - Prefer markdown `##` section boundaries.
   - Fallback: 512-token chunks, 80-token overlap.
3. Insert rows into `profile_chunks` (text only on Day 2).
4. Set `status: 'ready'`, update `chunk_count`.

### Day 3 — Embeddings + pgvector

**`OpenAiEmbeddingService`:**

```typescript
async embedBatch(texts: string[]): Promise<number[][]> {
  const response = await this.openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}
```

**Insert vector via raw SQL:**

```typescript
await this.prisma.$executeRaw`
  INSERT INTO profile_chunks (id, profile_source_id, user_id, chunk_index, content, embedding)
  VALUES (
    gen_random_uuid(),
    ${sourceId}::uuid,
    ${userId}::uuid,
    ${index},
    ${content},
    ${`[${embedding.join(',')}]`}::vector
  )
`;
```

**`ProfileRetrievalService`:**

```typescript
const rows = await this.prisma.$queryRaw<RetrievedChunk[]>`
  SELECT c.id, c.content, ps.title AS source_title,
         1 - (c.embedding <=> ${vectorLiteral}::vector) AS score
  FROM profile_chunks c
  JOIN profile_sources ps ON ps.id = c.profile_source_id
  WHERE c.user_id = ${userId}::uuid AND ps.status = 'ready'
  ORDER BY c.embedding <=> ${vectorLiteral}::vector
  LIMIT 8
`;
```

**Dev-only test route (remove before prod):** `GET /profile/search?q=NestJS`

**Deliverable:** Ingest your real resume + 2 projects from `/seed`. Search returns relevant chunks.

---

## 10. Step 7 — Job analysis / RAG (Day 4)

**Core product value.** `POST /api/v1/jobs/:id/analyze`

### 10.1 `JobAnalyzeService` flow

```
1. Load job.jd_text for user
2. Build query text (first ~2000 chars of JD)
3. Embed query
4. ProfileRetrievalService → top 8 chunks
5. If best score < RAG_SCORE_THRESHOLD → status: low_context
6. Call gpt-4o-mini with structured JSON prompt (see spec)
7. Map chunkIds → citation excerpts
8. Save job_analyses + ai_runs
9. Return analysis to client
```

### 10.2 System prompt (keep as constant in code)

Use the exact prompt from [huntkit-mvp-spec.md § Analysis](./huntkit-mvp-spec.md). Key rule: **never invent experience**.

### 10.3 OpenAI structured output

```typescript
const completion = await this.openai.chat.completions.create({
  model: 'gpt-4o-mini',
  response_format: { type: 'json_object' },
  messages: [
    { role: 'system', content: ANALYZE_SYSTEM_PROMPT },
    { role: 'user', content: buildUserPrompt(jdText, chunks) },
  ],
});
```

### 10.4 `AiRunsService`

Log every call:

- `run_type`: `'profile_ingest'` | `'job_analyze'`
- `model`, token counts, `latency_ms`, `status`
- `retrieved_chunk_ids`, `input_preview`, `output_preview`

### 10.5 Admin module

| Method | Route |
|--------|-------|
| GET | `/admin/ai-runs?limit=50&offset=0` |
| GET | `/admin/ai-runs/:id` |
| GET | `/admin/stats` |

### 10.6 Day 4 verification

```bash
curl -X POST http://localhost:3001/api/v1/jobs/<JOB_ID>/analyze \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Deliverable:** Response includes bullets, questions, citations, `overallMatchScore`.

---

## 11. Step 8 — Next.js frontend (Day 5)

### 11.1 Create the web app

```bash
cd /path/to/job-hunt-kit
pnpm create next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir
```

Add to `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
```

### 11.2 Pages (from spec)

| Route | Purpose |
|-------|---------|
| `/` | Landing + CTA |
| `/login`, `/register` | Supabase Auth |
| `/onboarding` | Paste resume + 2 projects |
| `/profile` | Sources list, reindex |
| `/jobs` | Pipeline by status |
| `/jobs/new` | Add job + JD |
| `/jobs/[id]` | Analyze + results + **copy buttons** |
| `/admin/runs` | AI observability |
| `/dashboard` | Stats |

### 11.3 API client pattern

```typescript
// lib/api.ts
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`,
      ...options.headers,
    },
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json() as Promise<T>;
}
```

### 11.4 UI rule

**Copy-to-clipboard on every bullet and interview question.** You need speed for real applications.

**Deliverable:** Screen recording of full flow without Postman.

---

## 12. Step 9 — Deploy & dogfood (Day 6–7)

### 12.1 Deploy API (Railway example)

1. Connect GitHub repo.
2. Set root directory to repo root (or `apps/api`).
3. Build: `pnpm install && pnpm build`
4. Start: `pnpm start:prod`
5. Add env vars from [§ 15](#15-environment-variables).

### 12.2 Deploy web (Vercel)

1. Import repo, set root to `apps/web`.
2. Set `NEXT_PUBLIC_API_URL` and Supabase public keys.

### 12.3 Update Supabase Auth URLs

- Site URL → production Vercel URL
- Redirect URLs → `https://your-app.vercel.app/**`

### 12.4 Day 7 (non-negotiable)

From spec — these are **product deliverables**, not nice-to-haves:

- [ ] README + architecture diagram
- [ ] 2-minute Loom demo
- [ ] LinkedIn post
- [ ] **5 real job applications** using HuntKit bullets
- [ ] Update resume with HuntKit as lead project

---

## 13. 7-day checklist

| Day | Focus | Done when |
|-----|-------|-----------|
| **1** | Schema + Prisma + Auth guard + Jobs CRUD + health | curl creates/lists jobs |
| **2** | Profile sources + chunking (text only) | Resume saved, chunks in DB |
| **3** | Embeddings + pgvector retrieval | Search returns relevant chunks |
| **4** | `POST /jobs/:id/analyze` + ai_runs | curl returns bullets + citations |
| **5** | Next.js UI + copy buttons | End-to-end screen recording |
| **6** | Deploy + 5 real jobs in pipeline | Public URL, daily use starts |
| **7** | Portfolio + **5 applications sent** | Demo link in cover messages |

---

## 14. Testing strategy

Per project standards — **every public service method gets a unit test**; **every endpoint gets e2e**.

### Unit test example

```typescript
describe('JobsService', () => {
  let service: JobsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get(JobsService);
  });

  it('creates a job for the authenticated user', async () => {
    // ...
  });
});
```

### E2E test example

```typescript
it('GET /health returns ok', () => {
  return request(app.getHttpServer())
    .get('/api/v1/health')
    .expect(200)
    .expect({ status: 'ok' });
});
```

### What to test first (priority order)

1. `HealthController`
2. `JobsService.create` / `findAll`
3. `ProfileIngestService` chunking
4. `JobAnalyzeService` low_context path
5. `SupabaseAuthGuard` rejects missing token

---

## 15. Environment variables

### API (`.env` — never commit)

```env
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
SUPABASE_URL=https://[ref].supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_JWT_SECRET=your-jwt-secret
OPENAI_API_KEY=sk-...
CORS_ORIGIN=http://localhost:3000
PORT=3001
RAG_SCORE_THRESHOLD=0.70
```

### Web (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_SUPABASE_URL=https://[ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Copy from `.env.example` in repo root — generate real values locally only.

---

## 16. Common mistakes (NestJS beginners)

| Mistake | Fix |
|---------|-----|
| Business logic in controller | Move to service |
| Forgetting `ValidationPipe` in `main.ts` | DTOs won't validate |
| Using `any` | Enable `strict: true` |
| `getRepository()` outside DI | Inject `PrismaService` |
| SQL injection in raw queries | Always use `$1` / tagged template params |
| `synchronize: true` in prod | Use migrations only |
| Returning `@Res()` manually | Return values from controller |
| Skipping `user_id` filter | Data leaks between users |
| Inventing resume bullets | Enforce RAG + gap honesty in prompt |
| Building UI before analyze works | Day 4 curl test first |

---

## 17. Interview & indie talking points

Use these when pitching contractors or selling the template later.

1. **Why RAG?** LLMs invent experience; HuntKit grounds bullets in your real chunks with citations.
2. **Why NestJS?** Modular DI, validation, guards — same patterns as production SaaS APIs clients hire for.
3. **Why Supabase?** Postgres + Auth + pgvector without managing infra; NestJS owns business logic.
4. **Honest gaps:** Product flags missing JD requirements instead of fake claims.
5. **Observability:** Every AI run logged — model, tokens, latency, retrieved chunks.
6. **Dogfooding:** *"I used HuntKit for my own applications this week."*
7. **Indie path:** Same codebase → Gumroad template after validation.

**External identity (LinkedIn):** Full-Stack Mobile Product Engineer | Flutter + Next.js + NestJS/Supabase + AI

**HuntKit one-liner:** Paste a job description → get RAG-grounded match analysis, tailored bullets, and interview prep cited from your real resume.

---

## Quick start (do this today)

```bash
# 1. Supabase: create project, run schema SQL, enable pgvector
# 2. Copy .env.example → .env and fill values
# 3. Install deps
pnpm install
pnpm add @nestjs/config class-validator class-transformer @prisma/client
pnpm add -D prisma

# 4. Prisma
npx prisma db pull   # if tables exist
npx prisma generate

# 5. Generate first modules
npx nest g module modules/health
npx nest g module modules/jobs

# 6. Run API
pnpm start:dev

# 7. Verify
curl http://localhost:3001/api/v1/health
```

---

## Related docs

- [huntkit-mvp-spec.md](./huntkit-mvp-spec.md) — full API, schema, JSON shapes, seed data
- [../AGENTS.md](../AGENTS.md) — NestJS coding standards for this repo
- [indie-hacker AGENTS.md](/Users/javeedishaq/devwork/alchemist/indie-hacker/AGENTS.md) — career strategy & dual-track model

**Day 7 applications are the real deliverable. Start Day 1 today.**
