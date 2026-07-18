# HuntKit — Learn & Build Guide (Single Source of Truth)

**Purpose:** One file to follow end-to-end. Read the architecture, check off todos, **type the code yourself**. Do not copy-paste blindly — typing builds muscle memory.

**How to use this file**

1. Read **Part A** once (product + architecture).
2. Work **Part B** phase by phase — finish the todo list before moving on.
3. For each phase: read **What → Why → How**, then type the code blocks.
4. Verify with the **Done when** checklist (curl / Postman).
5. Mark your progress in the tracker below.

**Postman:** `devdocs/huntkit-api.postman_collection.json` (extend it as you add routes).

**Deploy (locked):** API → **Render** · Web → **Netlify**.

**Auth (locked):** NestJS JWT. Supabase = **Postgres host only** (no Supabase Auth in Next.js).

---

## Your progress tracker

| Phase | Focus | Status |
|-------|--------|--------|
| 0 | Monorepo scaffold | ✅ Done |
| 1 | Supabase + schema | ✅ Done |
| 2 | Prisma + PrismaModule | ✅ Done |
| 3 | Health | ✅ Done |
| 4 | Auth (JWT) | ✅ Done |
| 5 | Jobs CRUD | ✅ Done |
| 6 | Profile ingest + embeddings | ✅ Done |
| 7 | Job analyze (RAG) | ✅ Done |
| 8 | Admin observability | ✅ Done |
| 9 | Next.js UI | ✅ Done |
| 10 | Deploy + dogfood + applications | ⬜ |

---

# Part A — Product & Architecture (read first)

## A1. One-liner

Paste a job description → get **RAG-grounded** match analysis, tailored application bullets, and interview prep — cited from **your real resume and projects**.

**Not:** LinkedIn auto-apply, resume designer, Flutter app, billing (v2).

## A2. Why this product

| Goal | How HuntKit delivers |
|------|----------------------|
| Win a job | Live demo: *"I built the tool I used to land interviews"* |
| Learn AI full-stack | RAG, embeddings, structured outputs, AI run logs |
| Indie later | Template / micro-SaaS for developers ($49–99) |
| Use daily | Track applications + generate tailored copy |

**Interview line:** *"Generic ChatGPT invents resume bullets. HuntKit only suggests claims grounded in chunks from my actual projects — with citations and AI run logs."*

## A3. Architecture (locked — Option A)

```
┌──────────────────────────────────────────────────────────────┐
│  Next.js (Netlify) — apps/web                                  │
│  Env: NEXT_PUBLIC_API_URL only                                 │
│  No DATABASE_URL, no OpenAI key, no Supabase client            │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTPS  /api/v1/*
                             │ Authorization: Bearer <JWT>
┌────────────────────────────▼─────────────────────────────────┐
│  NestJS (Render) — apps/api                                    │
│  Auth, Jobs, Profile, Analyze, Admin                           │
│  Prisma + raw SQL (pgvector)                                   │
└─────────┬──────────────────────────────┬─────────────────────┘
          ▼                              ▼
   PostgreSQL (Supabase)            OpenAI
   + pgvector                       embed + chat
```

**What / Why / How**

| | |
|--|--|
| **What** | Next.js UI → NestJS API → Postgres + OpenAI |
| **Why** | One backend owns secrets, validation, auth, data |
| **How** | Login → JWT → `Authorization: Bearer` on every protected call |

**Roles:** No RBAC in MVP. Every query filters by `user_id`. “Admin” pages = **your** AI runs / stats (owner observability). Add `users.role` later if you need a real staff admin.

## A4. Stack (locked)

| Layer | Choice |
|-------|--------|
| API | NestJS + TypeScript |
| DB | PostgreSQL + pgvector (Supabase host) |
| ORM | Prisma CRUD + `$executeRaw` / `$queryRaw` for vectors |
| UI | Next.js App Router |
| Auth | NestJS JWT (`@nestjs/jwt` + Passport) |
| AI | `text-embedding-3-small` + `gpt-4o-mini` |
| Deploy | Render (API) + Netlify (web) |

**Do not add in week 1:** LangChain, Redis, Docker, Qdrant, Flutter, billing.

## A5. Scope

**IN:** Auth · profile sources · chunk/embed · jobs pipeline · analyze (RAG) · AI run logs · landing + dashboard.

**OUT:** Auto-apply · PDF OCR · multi-user billing · Chrome extension · email.

## A6. NestJS building blocks (memorize)

```
HTTP → Guard (auth?) → Pipe (valid?) → Controller (thin) → Service (logic) → DB / OpenAI → Response
```

| Concept | HuntKit example |
|---------|-----------------|
| Module | `JobsModule` |
| Controller | `POST /api/v1/jobs` |
| Service | `JobsService.create()` |
| DTO | `CreateJobDto` + `class-validator` |
| Guard | `JwtAuthGuard` |

**Golden rules**

1. Controllers stay thin.
2. One feature = one module under `src/modules/<feature>/`.
3. Every input uses a DTO.
4. Inject dependencies — never `new SomeService()`.
5. Throw Nest `HttpException` subclasses.
6. Always filter by `user_id`.

## A7. Repo layout

```
job-huntkit-workspace/
├── apps/api/          # NestJS
├── apps/web/          # Next.js
├── packages/shared/   # JobStatus enum, shared types
├── supabase/migrations/
├── seed/              # resume.md, project-*.md
└── devdocs/
    ├── huntkit-learn-and-build.md   ← THIS FILE
    └── huntkit-api.postman_collection.json
```

## A8. Env vars

**API `apps/api/.env`**

```env
DATABASE_URL=postgresql://...
JWT_SECRET=<openssl rand -base64 48>
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-...
CORS_ORIGIN=http://localhost:3000
PORT=3001
RAG_SCORE_THRESHOLD=0.70
```

**Web `apps/web/.env.local`**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## A9. Success criteria

- [ ] Public demo URL (web) + API URL
- [ ] Auth works
- [ ] Profile ingested (resume + 2 projects)
- [ ] 5 real jobs in pipeline
- [ ] Analyze → bullets + questions + citations
- [ ] Admin AI runs page
- [ ] README + Loom + LinkedIn post
- [ ] **5 job applications sent** using HuntKit output

---

# Part B — Phases (type the code yourself)

---

## Phase 0 — Monorepo scaffold

**What:** pnpm workspace with `apps/api`, `apps/web`, `packages/shared`.  
**Why:** One repo for API + UI; shared enums.  
**How:** Already scaffolded in this workspace.

### Todo

- [✅] Root `pnpm-workspace.yaml` + turbo
- [✅] `@huntkit/api` NestJS on port 3001, prefix `api/v1`
- [✅] `@huntkit/web` Next.js on port 3000
- [✅] `@huntkit/shared` with `JobStatus` enum

### Done when

```bash
pnpm dev:api   # listens :3001
pnpm dev:web   # listens :3000
```

---

## Phase 1 — Database schema (Supabase)

**What:** Postgres tables + `vector` extension.  
**Why:** Jobs, profile chunks, AI runs need a real schema.  
**How:** SQL Editor (or `supabase/migrations/001_huntkit_schema.sql`).

### Todo

- [✅] Create Supabase project
- [✅] `CREATE EXTENSION IF NOT EXISTS vector;`
- [✅] Run schema (**table order matters**)

### Table create order (critical)

1. `users`
2. `profile_sources`
3. `profile_chunks`
4. `jobs`
5. `ai_runs` ← **before** `job_analyses`
6. `job_analyses`

### Full SQL (type / run this)

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  display_name  TEXT,
  headline      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE profile_sources (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_type   TEXT NOT NULL CHECK (source_type IN ('resume','project','notes')),
  title         TEXT NOT NULL,
  content       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'processing'
                CHECK (status IN ('processing','ready','failed')),
  chunk_count   INT NOT NULL DEFAULT 0,
  error_message TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE profile_chunks (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_source_id UUID NOT NULL REFERENCES profile_sources(id) ON DELETE CASCADE,
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  chunk_index       INT NOT NULL,
  content           TEXT NOT NULL,
  token_count       INT,
  metadata          JSONB NOT NULL DEFAULT '{}',
  embedding         vector(1536) NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (profile_source_id, chunk_index)
);

CREATE INDEX idx_profile_chunks_user ON profile_chunks(user_id);
CREATE INDEX idx_profile_chunks_embedding ON profile_chunks
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE TABLE jobs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company       TEXT NOT NULL,
  role_title    TEXT NOT NULL,
  job_url       TEXT,
  location      TEXT,
  status        TEXT NOT NULL DEFAULT 'saved'
                CHECK (status IN (
                  'saved','applied','screening','interview',
                  'offer','rejected','withdrawn'
                )),
  jd_text       TEXT NOT NULL,
  notes         TEXT,
  applied_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_jobs_user_status ON jobs(user_id, status);

CREATE TABLE ai_runs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  run_type          TEXT NOT NULL CHECK (run_type IN ('profile_ingest','job_analyze')),
  model             TEXT NOT NULL,
  prompt_tokens     INT,
  completion_tokens INT,
  total_tokens      INT,
  latency_ms        INT,
  status            TEXT NOT NULL CHECK (status IN ('success','failed','low_context')),
  error_message     TEXT,
  input_preview     TEXT,
  output_preview    TEXT,
  retrieved_chunk_ids UUID[],
  metadata          JSONB NOT NULL DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_runs_user_created ON ai_runs(user_id, created_at DESC);

CREATE TABLE job_analyses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id              UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ai_run_id           UUID REFERENCES ai_runs(id),
  requirement_summary TEXT,
  strengths           JSONB NOT NULL DEFAULT '[]',
  gaps                JSONB NOT NULL DEFAULT '[]',
  application_bullets JSONB NOT NULL DEFAULT '[]',
  interview_questions JSONB NOT NULL DEFAULT '[]',
  citations           JSONB NOT NULL DEFAULT '[]',
  overall_match_score INT CHECK (overall_match_score BETWEEN 0 AND 100),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Tip: DNS

If Prisma says `DatabaseNotReachable`, your router DNS may refuse the pooler host. Use `1.1.1.1` / `8.8.8.8` as DNS, flush cache, restart API.

---

## Phase 2 — Prisma (NestJS)

**What:** TypeScript client for Postgres.  
**Why:** Type-safe CRUD without hand-written SQL for normal tables.  
**How:** Prisma 7 + `@prisma/adapter-pg` + `db pull`.

### Todo

- [ ✅ ] Install `prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg`, `dotenv`
- [ ✅ ] `npx prisma init` → `db pull` → `generate`
- [ ✅ ] Keep `embedding` as `Unsupported("vector")` (use raw SQL later)
- [ ✅ ] `PrismaService` + `@Global()` `PrismaModule`
- [ ✅ ] `import 'dotenv/config'` as first line of `main.ts`

### Code to type — `prisma.service.ts`

```typescript
// apps/api/src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
```

### Code to type — `prisma.module.ts`

```typescript
// apps/api/src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

### Generator note (Prisma 7)

```prisma
generator client {
  provider     = "prisma-client"
  output       = "../src/generated/prisma"
  moduleFormat = "cjs"
}
```

After `db pull`, model names are snake_case (`users`, `jobs`). Use `prisma.users` / `prisma.jobs`.

---

## Phase 3 — Health module

**What:** `GET /api/v1/health` pings DB with `SELECT 1`.  
**Why:** Prove connectivity without touching business tables.  
**How:** Separate feature module (not `AppController`).

### Todo

- [ ✅ ] Generate `modules/health`
- [ ✅ ] Wire into `AppModule`
- [ ✅ ] Verify with curl / Postman

### Code to type

```typescript
// apps/api/src/modules/health/health.service.ts
@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check() {
    await this.prisma.$queryRaw`SELECT 1`;
    return {
      status: 'ok',
      message: 'Database is healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
```

```typescript
// apps/api/src/modules/health/health.controller.ts
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.check();
  }
}
```

### Done when

```bash
curl http://localhost:3001/api/v1/health
# → { "status": "ok", ... }
```

---

## Phase 4 — Auth (JWT)

**What:** Register / login / me with NestJS JWT + bcrypt.  
**Why:** Every job/profile row needs a real `user_id`.  
**How:** Passport JWT strategy + `JwtAuthGuard` + `@CurrentUser()`.

### Todo

- [ ✅ ] Packages: `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `bcrypt` + types
- [ ✅ ] Shared: `AuthUser`, `JwtPayload`, `JwtStrategy`, `JwtAuthGuard`, `@CurrentUser()`
- [ ✅ ] DTOs: register, login, update-me (`!` on required fields)
- [ ✅ ] `AuthService` + `AuthController` + `AuthModule`
- [ ✅ ] Postman Auth folder works

### Shared files (type these)

```typescript
// apps/api/src/modules/shared/types/auth-user.type.ts
export type AuthUser = { id: string; email: string };

// apps/api/src/modules/shared/types/jwt-payload.type.ts
export type JwtPayload = { sub: string; email: string };
```

```typescript
// apps/api/src/modules/shared/strategies/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not set');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload): AuthUser {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { id: payload.sub, email: payload.email };
  }
}
```

```typescript
// apps/api/src/modules/shared/guards/jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

```typescript
// apps/api/src/modules/shared/decorators/current-user.decorator.ts
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    return request.user;
  },
);
```

### Auth module JWT register tip

```typescript
// apps/api/src/modules/auth/auth.module.ts (inside @Module imports)
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds (avoids StringValue typing pain)
  },
}),
```

Register `JwtStrategy` in `providers`.

### Routes

| Method | Route | Guard? |
|--------|-------|--------|
| POST | `/auth/register` | no |
| POST | `/auth/login` | no |
| GET | `/auth/me` | yes |
| PATCH | `/auth/me` | yes |

### Done when

Register → Login → Get Me → Update Me all work in Postman; `accessToken` saved.

---

## Phase 5 — Jobs CRUD  ← START HERE

**What:** Create / list / get / update / delete job applications.  
**Why:** Analyze needs a saved JD first.  
**How:** `JobsModule` + Prisma `jobs` + always filter `user_id`.

### Todo

- [ ✅ ] `npx nest g module modules/jobs`
- [ ✅ ] `npx nest g controller modules/jobs/jobs --flat`
- [ ✅ ] `npx nest g service modules/jobs/jobs --flat`
- [ ✅ ] DTOs: `CreateJobDto`, `UpdateJobDto`
- [ ✅ ] Service methods (scoped by user)
- [ ✅ ] Controller with `@UseGuards(JwtAuthGuard)` on all routes
- [ ✅ ] Import `JobsModule` in `AppModule`
- [ ✅ ] Add Jobs folder to Postman collection
- [ ✅ ] Unit smoke: create + list via Postman

### Status values

Prefer the existing enum in `packages/shared/src/index.ts` (already built as `JobStatus`) — import it in the DTOs below with `import { JobStatus } from '@huntkit/shared';` and validate with `@IsIn(Object.values(JobStatus))`. Only if you skip the shared package, define this constant inline in the DTO file:

```typescript
// packages/shared/src/index.ts (already present as the JobStatus enum)
export const JOB_STATUSES = [
  'saved',
  'applied',
  'screening',
  'interview',
  'offer',
  'rejected',
  'withdrawn',
] as const;
```

### Code to type — DTOs

```typescript
// apps/api/src/modules/jobs/dto/create-job.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsIn } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  roleTitle!: string;

  @IsString()
  @IsNotEmpty()
  jdText!: string;

  @IsOptional()
  @IsUrl()
  jobUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsIn(['saved', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn'])
  status?: string;
}
```

```typescript
// apps/api/src/modules/jobs/dto/update-job.dto.ts
import { IsOptional, IsString, IsUrl, IsIn } from 'class-validator';

export class UpdateJobDto {
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() roleTitle?: string;
  @IsOptional() @IsString() jdText?: string;
  @IsOptional() @IsUrl() jobUrl?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional()
  @IsIn(['saved', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn'])
  status?: string;
}
```

### Code to type — `jobs.service.ts`

```typescript
// apps/api/src/modules/jobs/jobs.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateJobDto) {
    const job = await this.prisma.jobs.create({
      data: {
        user_id: userId,
        company: dto.company,
        role_title: dto.roleTitle,
        jd_text: dto.jdText,
        job_url: dto.jobUrl ?? null,
        location: dto.location ?? null,
        notes: dto.notes ?? null,
        status: dto.status ?? 'saved',
      },
    });
    return { job: this.toPublic(job) };
  }

  async findAll(userId: string, status?: string) {
    const where = {
      user_id: userId,
      ...(status ? { status } : {}),
    };

    const items = await this.prisma.jobs.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    const grouped = await this.prisma.jobs.groupBy({
      by: ['status'],
      where: { user_id: userId },
      _count: { _all: true },
    });

    const countsByStatus: Record<string, number> = {};
    for (const row of grouped) {
      countsByStatus[row.status] = row._count._all;
    }

    return {
      items: items.map((j) => this.toPublic(j)),
      countsByStatus,
    };
  }

  async findOne(userId: string, id: string) {
    const job = await this.prisma.jobs.findFirst({
      where: { id, user_id: userId },
      include: {
        job_analyses: {
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
    });

    if (!job) throw new NotFoundException('Job not found');

    const { job_analyses, ...rest } = job;
    return {
      job: this.toPublic(rest),
      latestAnalysis: job_analyses[0] ?? null,
    };
  }

  async update(userId: string, id: string, dto: UpdateJobDto) {
    await this.ensureOwned(userId, id);

    const job = await this.prisma.jobs.update({
      where: { id },
      data: {
        company: dto.company,
        role_title: dto.roleTitle,
        jd_text: dto.jdText,
        job_url: dto.jobUrl,
        location: dto.location,
        notes: dto.notes,
        status: dto.status,
        applied_at:
          dto.status === 'applied' ? new Date() : undefined,
        updated_at: new Date(),
      },
    });

    return { job: this.toPublic(job) };
  }

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await this.prisma.jobs.delete({ where: { id } });
    return { success: true };
  }

  private async ensureOwned(userId: string, id: string) {
    const found = await this.prisma.jobs.findFirst({
      where: { id, user_id: userId },
      select: { id: true },
    });
    if (!found) throw new NotFoundException('Job not found');
  }

  private toPublic(job: {
    id: string;
    company: string;
    role_title: string;
    job_url: string | null;
    location: string | null;
    status: string;
    jd_text: string;
    notes: string | null;
    applied_at: Date | null;
    created_at: Date;
    updated_at: Date;
  }) {
    return {
      id: job.id,
      company: job.company,
      roleTitle: job.role_title,
      jobUrl: job.job_url,
      location: job.location,
      status: job.status,
      jdText: job.jd_text,
      notes: job.notes,
      appliedAt: job.applied_at,
      createdAt: job.created_at,
      updatedAt: job.updated_at,
    };
  }
}
```

### Code to type — `jobs.controller.ts`

```typescript
// apps/api/src/modules/jobs/jobs.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { AuthUser } from '../shared/types/auth-user.type';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateJobDto) {
    return this.jobsService.create(user.id, dto);
  }

  @Get()
  findAll(
    @CurrentUser() user: AuthUser,
    @Query('status') status?: string,
  ) {
    return this.jobsService.findAll(user.id, status);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.jobsService.findOne(user.id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateJobDto,
  ) {
    return this.jobsService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.jobsService.remove(user.id, id);
  }
}
```

### Wire `JobsModule` into `AppModule`

```typescript
// apps/api/src/app.module.ts (inside @Module imports)
imports: [PrismaModule, HealthModule, AuthModule, JobsModule],
```

### Done when

```bash
# After login, with Bearer token:
curl -X POST http://localhost:3001/api/v1/jobs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"company":"Acme","roleTitle":"Product Engineer","jdText":"NestJS + Flutter + AI..."}'

curl http://localhost:3001/api/v1/jobs -H "Authorization: Bearer $TOKEN"
```

---

## Phase 6 — Profile ingest + embeddings

**What:** Save your resume/projects → cut into small pieces (chunks) → turn each piece into a vector (embedding) → store in `profile_chunks`.
**Why:** RAG (Retrieval-Augmented Generation) needs YOUR text as vectors so Phase 7 can find the pieces most relevant to a job description and ground the AI in real facts.
**How:** Build a pure chunker → add an OpenAI embedding service → wire an ingest flow that writes vectors with raw SQL → add a dev search route to prove retrieval works.

### Key idea (read once)

- **Chunk** = a small slice of your text. Small focused slices retrieve better than one giant blob, and they fit inside model limits.
- **Embedding** = a list of 1536 numbers representing the *meaning* of a chunk. Similar meaning → vectors that sit close together. This is why "NestJS backend" can match a JD asking for "Node.js API experience" even with different words.
- **pgvector** = the Postgres extension (already enabled in Phase 1) that stores vectors and compares them with the `<=>` cosine-distance operator.

### Architecture (components + data flow)

```
POST /profile/sources
      │
      ▼
ProfileController (thin, JWT-guarded)
      │
      ▼
ProfileIngestService
   1. insert profile_sources (status 'processing')
   2. chunkText(content)                → utils/chunk-text.ts (pure fn)
   3. embedBatch(chunks)                → OpenAiEmbeddingService → OpenAI
   4. $executeRaw INSERT each chunk     → profile_chunks (vector)
   5. update source → 'ready' + chunk_count   (on error → 'failed')
```

**Failure modes to design for**
- OpenAI down / rate-limited → catch, mark source `failed`, store `error_message`.
- Empty content → blocked by the DTO before any work starts.
- `embedding` column is **NOT NULL** → you must embed *before* inserting a chunk (never insert text-only rows).
- Wrong vector size → keep `text-embedding-3-small` (1536) so it matches the column exactly.

### Prerequisite check (before coding)

- [ ] `OPENAI_API_KEY` is set in the real `apps/api/.env` (not just `.env.example`).
- [ ] API and DB are up (`pnpm dev`, `GET /api/v1/health` returns ok).

### Todo (build in this order)

- [ ✅ ] Step 1 — Scaffold `modules/profile` and wire into `AppModule`
- [ ] Step 2 — Chunker `utils/chunk-text.ts` (+ unit test)
- [ ] Step 3 — `CreateSourceDto`
- [ ] Step 4 — Install `openai` + `OpenAiEmbeddingService`
- [ ] Step 5 — `ProfileIngestService` (save → chunk → embed → raw insert)
- [ ] Step 6 — `ProfileRetrievalService` (dev search)
- [ ] Step 7 — `ProfileController` + `ProfileModule`
- [ ] Step 8 — Seed `/seed` files + verify

### Routes

| Method | Route | Notes |
|--------|-------|-------|
| POST | `/profile/sources` | create + ingest a source |
| GET | `/profile/sources` | list your sources |
| GET | `/profile/sources/:id` | one source |
| DELETE | `/profile/sources/:id` | delete (chunks cascade) |
| POST | `/profile/sources/:id/reindex` | re-chunk + re-embed |
| GET | `/profile/search?q=` | dev only — remove before prod |

---

### Step 1 — Scaffold the module

**What:** Create an empty `profile` feature module with a controller and (first) service.
**Why:** One feature = one module under `src/modules/<feature>/` (golden rule). `PrismaService` is already `@Global`, so you only inject it — no import needed.
**How:** From `apps/api`, generate the files, then register the module.

```bash
cd apps/api
npx nest g module modules/profile
npx nest g controller modules/profile/profile --flat
npx nest g service modules/profile/profile --flat
```

You will end up creating these files under `apps/api/src/modules/profile/`:

```
modules/profile/
├── profile.controller.ts
├── profile.module.ts
├── profile-ingest.service.ts        # rename/add (main flow)
├── profile-retrieval.service.ts     # add (dev search + Phase 7 reuse)
├── openai-embedding.service.ts      # add
├── dto/create-source.dto.ts         # add
└── utils/chunk-text.ts              # add (+ chunk-text.spec.ts)
```

Then wire it in `apps/api/src/app.module.ts` (same pattern as `JobsModule`):

```typescript
// apps/api/src/app.module.ts (inside @Module imports)
imports: [PrismaModule, HealthModule, AuthModule, JobsModule, ProfileModule],
```

---

### Step 2 — The chunker (pure function + test)

**What:** A function that turns raw markdown text into an array of chunks.
**Why:** A *pure* function (no DB, no network — input in, output out) is trivial to unit-test and reuse. Splitting on `##` headings keeps each section's meaning together; long sections get sub-split with a small overlap so no sentence is cut cleanly in half at a boundary.
**How:** Create `apps/api/src/modules/profile/utils/chunk-text.ts`.

```typescript
// apps/api/src/modules/profile/utils/chunk-text.ts
export type Chunk = { index: number; content: string };

// Rough rule of thumb: 1 token ≈ 4 characters.
const MAX_CHARS = 2000; // ~500 tokens per chunk
const OVERLAP_CHARS = 320; // ~80 tokens repeated between neighbours

export function chunkText(raw: string): Chunk[] {
  // 1. Prefer splitting on markdown H2 headings ("## ...").
  const sections = raw
    .split(/\n(?=##\s)/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const parts = sections.length ? sections : [raw.trim()];

  // 2. Any section longer than MAX_CHARS is sliced with overlap.
  const pieces: string[] = [];
  for (const part of parts) {
    if (part.length <= MAX_CHARS) {
      pieces.push(part);
      continue;
    }
    let start = 0;
    while (start < part.length) {
      const end = Math.min(start + MAX_CHARS, part.length);
      pieces.push(part.slice(start, end).trim());
      if (end === part.length) break;
      start = end - OVERLAP_CHARS; // step back to create overlap
    }
  }

  return pieces.filter(Boolean).map((content, index) => ({ index, content }));
}
```

Unit test — `apps/api/src/modules/profile/utils/chunk-text.spec.ts`:

```typescript
// apps/api/src/modules/profile/utils/chunk-text.spec.ts
import { chunkText } from './chunk-text';

describe('chunkText', () => {
  it('splits on ## headings', () => {
    const md = '## Experience\nBuilt NestJS APIs.\n\n## Projects\nHuntKit.';
    const chunks = chunkText(md);
    expect(chunks).toHaveLength(2);
    expect(chunks[0].index).toBe(0);
    expect(chunks[0].content).toContain('Experience');
  });

  it('returns one chunk when there are no headings', () => {
    expect(chunkText('Just a plain paragraph.')).toHaveLength(1);
  });
});
```

Run it: `pnpm --filter @huntkit/api test`.

---

### Step 3 — The DTO

**What:** A validated shape for the create-source request body.
**Why:** DTO + `class-validator` reject bad input (missing/empty fields, wrong `source_type`) before your service runs. The `source_type` column only allows `resume | project | notes`.
**How:** Create `apps/api/src/modules/profile/dto/create-source.dto.ts`.

```typescript
// apps/api/src/modules/profile/dto/create-source.dto.ts
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateSourceDto {
  @IsIn(['resume', 'project', 'notes'])
  sourceType!: 'resume' | 'project' | 'notes';

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
```

---

### Step 4 — OpenAI embedding service

**What:** A thin wrapper around the OpenAI client exposing `embedBatch(texts) → number[][]`.
**Why:** One batched API call embeds all chunks at once — faster and cheaper than one call per chunk. Wrapping it in a service means Phase 7 can inject the same class to embed a job description.
**How:** Install the SDK, then create `apps/api/src/modules/profile/openai-embedding.service.ts`.

```bash
pnpm --filter @huntkit/api add openai
# restart your running `pnpm dev` so the new dependency loads
```

```typescript
// apps/api/src/modules/profile/openai-embedding.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

const EMBEDDING_MODEL = 'text-embedding-3-small'; // 1536 dims → matches the column

@Injectable()
export class OpenAiEmbeddingService {
  private readonly client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
    this.client = new OpenAI({ apiKey });
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];
    try {
      const res = await this.client.embeddings.create({
        model: EMBEDDING_MODEL,
        input: texts,
      });
      return res.data.map((d) => d.embedding);
    } catch (err) {
      throw new InternalServerErrorException(`Embedding failed: ${String(err)}`);
    }
  }
}
```

---

### Step 5 — Ingest service (the core flow)

**What:** Save the source, chunk it, embed the chunks, insert them as vectors, mark the source `ready`.
**Why:** This is the pipeline that fills `profile_chunks`. It must embed *before* insert (NOT NULL column) and must mark `failed` on error so a broken source never looks `ready`.
**How:** Create `apps/api/src/modules/profile/profile-ingest.service.ts`. Note the model names are snake_case (`this.prisma.profile_sources`) because the schema was pulled from Postgres.

```typescript
// apps/api/src/modules/profile/profile-ingest.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiEmbeddingService } from './openai-embedding.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { chunkText } from './utils/chunk-text';

@Injectable()
export class ProfileIngestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly embedding: OpenAiEmbeddingService,
  ) {}

  async createSource(userId: string, dto: CreateSourceDto) {
    const source = await this.prisma.profile_sources.create({
      data: {
        user_id: userId,
        source_type: dto.sourceType,
        title: dto.title,
        content: dto.content,
        status: 'processing',
      },
    });

    await this.indexSource(userId, source.id, dto.content);
    return this.getSource(userId, source.id);
  }

  async reindex(userId: string, sourceId: string) {
    const source = await this.prisma.profile_sources.findFirst({
      where: { id: sourceId, user_id: userId },
    });
    if (!source) throw new NotFoundException('Source not found');

    // Wipe old chunks, then rebuild from the stored content.
    await this.prisma.profile_chunks.deleteMany({
      where: { profile_source_id: sourceId, user_id: userId },
    });
    await this.prisma.profile_sources.update({
      where: { id: sourceId },
      data: { status: 'processing', chunk_count: 0, error_message: null },
    });

    await this.indexSource(userId, sourceId, source.content);
    return this.getSource(userId, sourceId);
  }

  // Chunk → embed → raw insert → mark ready. On failure: mark failed + rethrow.
  private async indexSource(userId: string, sourceId: string, content: string) {
    try {
      const chunks = chunkText(content);
      const vectors = await this.embedding.embedBatch(
        chunks.map((c) => c.content),
      );

      for (let i = 0; i < chunks.length; i++) {
        const vectorLiteral = `[${vectors[i].join(',')}]`;
        await this.prisma.$executeRaw`
          INSERT INTO profile_chunks
            (id, profile_source_id, user_id, chunk_index, content, embedding)
          VALUES (
            gen_random_uuid(),
            ${sourceId}::uuid,
            ${userId}::uuid,
            ${chunks[i].index},
            ${chunks[i].content},
            ${vectorLiteral}::vector
          )
        `;
      }

      await this.prisma.profile_sources.update({
        where: { id: sourceId },
        data: {
          status: 'ready',
          chunk_count: chunks.length,
          error_message: null,
          updated_at: new Date(),
        },
      });
    } catch (err) {
      await this.prisma.profile_sources.update({
        where: { id: sourceId },
        data: { status: 'failed', error_message: String(err), updated_at: new Date() },
      });
      throw err;
    }
  }

  async listSources(userId: string) {
    const items = await this.prisma.profile_sources.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    return { items: items.map((s) => this.toPublic(s)) };
  }

  async getSource(userId: string, id: string) {
    const source = await this.prisma.profile_sources.findFirst({
      where: { id, user_id: userId },
    });
    if (!source) throw new NotFoundException('Source not found');
    return { source: this.toPublic(source) };
  }

  async deleteSource(userId: string, id: string) {
    const found = await this.prisma.profile_sources.findFirst({
      where: { id, user_id: userId },
      select: { id: true },
    });
    if (!found) throw new NotFoundException('Source not found');
    // profile_chunks has ON DELETE CASCADE, so chunks go too.
    await this.prisma.profile_sources.delete({ where: { id } });
    return { success: true };
  }

  private toPublic(s: {
    id: string;
    source_type: string;
    title: string;
    status: string;
    chunk_count: number;
    error_message: string | null;
    created_at: Date;
    updated_at: Date;
  }) {
    return {
      id: s.id,
      sourceType: s.source_type,
      title: s.title,
      status: s.status,
      chunkCount: s.chunk_count,
      errorMessage: s.error_message,
      createdAt: s.created_at,
      updatedAt: s.updated_at,
    };
  }
}
```

**Why `$executeRaw` and the `::vector` cast:** Prisma marks the `embedding` column as `Unsupported("vector")`, so `.create()` cannot write it. You send raw SQL and cast a string like `[0.1,0.2,...]` to `::vector`. The tagged template (`` $executeRaw`...` ``) passes every `${...}` as a bound parameter, so user text can never inject SQL.

---

### Step 6 — Retrieval service (dev search, reused in Phase 7)

**What:** Embed a query string and return the closest chunks with a similarity score.
**Why:** Proves the whole pipeline works before you build the AI analyze feature. Phase 7 injects this exact service to fetch context for a job description.
**How:** Create `apps/api/src/modules/profile/profile-retrieval.service.ts`. `<=>` is cosine distance (smaller = closer), so `1 - distance` = similarity (bigger = better).

```typescript
// apps/api/src/modules/profile/profile-retrieval.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiEmbeddingService } from './openai-embedding.service';

export type RetrievedChunk = {
  id: string;
  content: string;
  source_title: string;
  score: number;
};

@Injectable()
export class ProfileRetrievalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly embedding: OpenAiEmbeddingService,
  ) {}

  async search(userId: string, query: string, limit = 8) {
    const [vector] = await this.embedding.embedBatch([query]);
    const vectorLiteral = `[${vector.join(',')}]`;

    const results = await this.prisma.$queryRaw<RetrievedChunk[]>`
      SELECT c.id, c.content, ps.title AS source_title,
             1 - (c.embedding <=> ${vectorLiteral}::vector) AS score
      FROM profile_chunks c
      JOIN profile_sources ps ON ps.id = c.profile_source_id
      WHERE c.user_id = ${userId}::uuid AND ps.status = 'ready'
      ORDER BY c.embedding <=> ${vectorLiteral}::vector
      LIMIT ${limit}
    `;

    return { results };
  }
}
```

---

### Step 7 — Controller + module

**What:** Expose the routes (all JWT-protected) and register the providers.
**Why:** Controllers stay thin — they only pass `user.id` + input to services. Exporting the retrieval + embedding services lets `AnalyzeModule` reuse them in Phase 7.
**How:** Create the two files below.

```typescript
// apps/api/src/modules/profile/profile.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { AuthUser } from '../shared/types/auth-user.type';
import { ProfileIngestService } from './profile-ingest.service';
import { ProfileRetrievalService } from './profile-retrieval.service';
import { CreateSourceDto } from './dto/create-source.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly ingest: ProfileIngestService,
    private readonly retrieval: ProfileRetrievalService,
  ) {}

  @Post('sources')
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateSourceDto) {
    return this.ingest.createSource(user.id, dto);
  }

  @Get('sources')
  list(@CurrentUser() user: AuthUser) {
    return this.ingest.listSources(user.id);
  }

  @Get('sources/:id')
  getOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.ingest.getSource(user.id, id);
  }

  @Delete('sources/:id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.ingest.deleteSource(user.id, id);
  }

  @Post('sources/:id/reindex')
  reindex(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.ingest.reindex(user.id, id);
  }

  // Dev only — delete this route before production.
  @Get('search')
  search(@CurrentUser() user: AuthUser, @Query('q') q: string) {
    return this.retrieval.search(user.id, q);
  }
}
```

```typescript
// apps/api/src/modules/profile/profile.module.ts
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileIngestService } from './profile-ingest.service';
import { ProfileRetrievalService } from './profile-retrieval.service';
import { OpenAiEmbeddingService } from './openai-embedding.service';

@Module({
  controllers: [ProfileController],
  providers: [
    ProfileIngestService,
    ProfileRetrievalService,
    OpenAiEmbeddingService,
  ],
  exports: [ProfileRetrievalService, OpenAiEmbeddingService],
})
export class ProfileModule {}
```

---

### Step 8 — Seed files + verify

**What:** Add real content and confirm retrieval returns it.
**Why:** RAG is only as good as your data — ingest your actual resume + projects.
**How:** Create files under `/seed` (repo root), POST them, then search.

```
seed/
├── resume.md
├── project-huntkit.md
└── project-<your-second-project>.md
```

Ingest one (after logging in for a `{{accessToken}}`):

```bash
curl -X POST http://localhost:3001/api/v1/profile/sources \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"sourceType\":\"resume\",\"title\":\"My Resume\",\"content\":\"$(sed 's/\"/\\\"/g' seed/resume.md | tr '\n' ' ')\"}"
```

### Done when

- `GET /api/v1/profile/sources` shows your source with `status: "ready"` and a `chunkCount > 0`.
- `GET /api/v1/profile/search?q=NestJS Flutter` returns relevant chunks, each with a `score` (roughly 0.4–0.8 for good matches).
- `pnpm --filter @huntkit/api build` is clean.

> Add a **Profile** folder to the Postman collection (`create`, `list`, `get`, `delete`, `reindex`, `search`) as you go, the same way you did for Jobs.

---

## Phase 7 — Job analyze (RAG) — core product

**What:** `POST /jobs/:id/analyze` → strengths, gaps, bullets, questions, citations.  
**Why:** This is the demo employers care about.  
**How:** Embed JD → retrieve top 8 → LLM structured JSON → save `job_analyses` + `ai_runs`.

### Todo

- [ ] `AnalyzeModule` or method on Jobs: `POST /jobs/:id/analyze`
- [ ] `ProfileRetrievalService`
- [ ] `JobAnalyzeService` flow (below)
- [ ] System prompt: never invent experience
- [ ] `low_context` when best score `< RAG_SCORE_THRESHOLD` (default 0.70)
- [ ] Persist analysis + ai_run
- [ ] Test with 1 real JD via Postman

### Flow

```
1. Load job.jd_text for this user
2. Embed first ~2000 chars of JD
3. Retrieve top 8 profile chunks
4. If best score < threshold → status low_context
5. gpt-4o-mini + response_format json_object
6. Map chunkIds → citation excerpts
7. Save job_analyses + ai_runs
8. Return analysis JSON
```

### System prompt (put in a constant)

Put this in `apps/api/src/modules/analyze/analyze.constants.ts` (e.g. `export const ANALYZE_SYSTEM_PROMPT = \`...\`;`).

```
You are a career coach for software engineers. Use ONLY the PROFILE CONTEXT chunks.
Never invent employers, metrics, or skills not supported by context.
If a JD requirement is not in context, list it under gaps honestly.

Return JSON:
{
  "requirementSummary": string,
  "strengths": [{ "text": string, "chunkId": string }],
  "gaps": [{ "text": string, "suggestion": string }],
  "applicationBullets": [{ "text": string, "chunkIds": string[], "confidence": "high"|"medium" }],
  "interviewQuestions": [{ "question": string, "whyLikely": string, "prepHint": string }],
  "overallMatchScore": number
}
```

### Response shape (API)

```json
{
  "analysisId": "uuid",
  "runId": "uuid",
  "status": "success",
  "requirementSummary": "...",
  "strengths": [],
  "gaps": [],
  "applicationBullets": [],
  "interviewQuestions": [],
  "citations": [],
  "overallMatchScore": 78
}
```

### JSON field shapes in DB

**strengths / gaps:** `{ text, chunkId?, excerpt?, score?, suggestion? }`  
**application_bullets:** `{ text, chunkIds, confidence }`  
**interview_questions:** `{ question, whyLikely, prepHint }`  
**citations:** `{ chunkId, sourceTitle, excerpt, score }`

### Done when

curl/Postman analyze returns bullets + questions + citations.

---

## Phase 8 — Admin (observability)

**What:** List your AI runs + simple stats.  
**Why:** Debug bad bullets; demo production thinking.  
**How:** JWT-protected routes scoped to `user_id` (not a staff role).

### Todo

- [ ] `GET /admin/ai-runs?limit=50&offset=0`
- [ ] `GET /admin/ai-runs/:id`
- [ ] `GET /admin/stats` → `{ jobsTotal, appliedCount, analysesCount, tokensThisWeek }`

### Done when

You can open runs after an analyze and see model / tokens / latency / status.

---

## Phase 9 — Next.js UI

**What:** Use HuntKit without Postman.  
**Why:** Dogfood + Loom demo.  
**How:** Thin client → NestJS only.

### Key idea (read once)

- **Thin client** = the web app holds *no business logic*. Every rule (auth, validation, RAG) already lives in NestJS. Next.js just renders screens and calls the API. This is the same split you'd use professionally: one backend, many frontends (web today, Flutter later) all hitting the same contract.
- **Client Components** = files starting with `"use client"`. You need them here because HuntKit reads the JWT from `localStorage`, uses `useState`/`useEffect`, and handles clicks — all browser-only things. (Server Components can't touch `localStorage`.)
- **JWT in localStorage** = after login the API returns an `accessToken`; we save it in the browser and attach it as `Authorization: Bearer <token>` on every request. Simple for an MVP. (Trade-off: vulnerable to XSS; httpOnly cookies are safer but need more backend plumbing — fine to defer.)

> **This Next.js is new (v16).** `params` in a dynamic route is now a **Promise** — unwrap it with React's `use()` hook. The project rule in `apps/web/AGENTS.md` says to check `node_modules/next/dist/docs/` before writing Next code; the patterns below already follow v16.

### Architecture (components + data flow)

```
Browser (Next.js, all client components)
  │  reads token from localStorage
  ▼
lib/api.ts  apiFetch()  ── attaches Bearer ──►  NestJS  /api/v1/*
  ▲                                                  │
  │  AuthProvider (React context)                    ▼
  └── useAuth() / useRequireAuth()            Prisma + pgvector + OpenAI

Route groups
  /                     landing (public)
  /login /register      call auth, store token, redirect
  /onboarding /profile  add + manage profile sources
  /jobs /jobs/[id]      pipeline + Analyze + copy buttons
  /dashboard            stats cards
  /admin/runs           AI run log
```

**Failure modes to design for**
- API returns non-2xx → `apiFetch` throws a typed `ApiError` with the server message; every page shows it in an error banner.
- Expired/invalid token → `/auth/me` fails on load → we clear the token and the guard sends the user to `/login`.
- Analyze returns `low_context` → the job page shows "add more profile sources" instead of a fake result.
- Clipboard blocked (insecure context) → copy fails silently; never crash the page.

### Prerequisite check (before coding)

- [ ] API is running: `pnpm dev` in `apps/api`, `GET http://localhost:3001/api/v1/health` returns ok.
- [ ] `apps/web/.env.local` exists with `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`.
- [ ] `@huntkit/shared` builds (it exports `JobStatus`, reused by the web forms).

### Todo (build in this order)

- [ ] Step 1 — Env + `lib/api.ts` (fetch wrapper that attaches the Bearer token)
- [ ] Step 2 — `lib/types.ts` (mirror the API response shapes)
- [ ] Step 3 — `lib/auth.tsx` (`AuthProvider`, `useAuth`, `useRequireAuth`)
- [ ] Step 4 — `components/ui.tsx` + `copy-button.tsx` + `nav.tsx` (shared UI)
- [ ] Step 5 — `app/layout.tsx` (wrap the app in `AuthProvider` + `Nav`)
- [ ] Step 6 — Landing `/` + `/login` + `/register`
- [ ] Step 7 — `/onboarding` + `/profile` (add-source form, reindex, delete)
- [ ] Step 8 — `/jobs` + `/jobs/[id]` (create, analyze, **copy buttons**)
- [ ] Step 9 — `/dashboard` (stats) + `/admin/runs`
- [ ] Step 10 — `pnpm lint` + `pnpm build`, then record the demo

### Pages

| Route | Purpose | Calls |
|-------|---------|-------|
| `/` | Landing | — |
| `/login`, `/register` | Auth → store JWT → redirect | `POST /auth/login`, `POST /auth/register` |
| `/onboarding` | Paste resume + projects | `POST /profile/sources` |
| `/profile` | Sources list / reindex / delete | `GET/POST/DELETE /profile/sources`, `POST /profile/sources/:id/reindex` |
| `/jobs` | Pipeline + create job | `GET /jobs`, `POST /jobs` |
| `/jobs/[id]` | Detail + analyze + **copy buttons** | `GET /jobs/:id`, `POST /jobs/:id/analyze` |
| `/dashboard` | Stats cards | `GET /admin/stats` |
| `/admin/runs` | AI run log | `GET /admin/ai-runs` |

---

### Step 1 — Env + API client

**What:** One `fetch` wrapper the whole app uses.
**Why:** Centralizes three things you'd otherwise repeat on every call: the base URL, the `Bearer` header, and error handling. Change auth once, it changes everywhere.
**How:** Store the token in `localStorage`; read it on each call; convert non-2xx into a typed error.

`apps/web/.env.local`

```bash
# Base URL of the NestJS API (global prefix is /api/v1)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

> **Why the `NEXT_PUBLIC_` prefix?** Next.js only exposes env vars to browser code if they start with `NEXT_PUBLIC_`. Secrets (DB URL, OpenAI key) live in the API, never here.

`apps/web/src/lib/api.ts`

```typescript
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

const TOKEN_KEY = "huntkit_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null; // SSR: no localStorage
  return window.localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = (await res.json()) as { message?: string | string[] };
      if (Array.isArray(body.message)) message = body.message.join(", ");
      else if (body.message) message = body.message;
    } catch {
      /* no JSON body */
    }
    throw new ApiError(res.status, message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
```

### Step 2 — Types

**What:** TypeScript mirrors of the API's JSON responses.
**Why:** Autocomplete + compile-time safety. If the API renames a field, the build breaks here instead of silently rendering `undefined`.
**How:** Copy the shapes returned by the NestJS services (`toPublic(...)` methods) into `apps/web/src/lib/types.ts`. Reuse the shared enum for statuses:

```typescript
import { JobStatus } from "@huntkit/shared";
export const JOB_STATUSES = Object.values(JobStatus);
// + User, AuthResponse, Job, JobsList, Source, AnalysisResult, Stats, AiRun …
```

See the file for the full list — each type matches one endpoint's response.

### Step 3 — Auth context

**What:** A React **context** that holds the current user and exposes `login`, `register`, `logout`.
**Why:** Any component (the nav, any page) can read "who is logged in" without passing props down every level. On first load it verifies the stored token via `/auth/me`.
**How:** `apps/web/src/lib/auth.tsx` (client component). Note the effect uses an **async IIFE** — Next 16's lint forbids calling `setState` synchronously inside `useEffect`, so all state updates happen after an `await`.

```typescript
"use client";
// AuthProvider verifies the token once, then provides { user, loading, login, register, logout }.
export function useRequireAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);
  return { user, loading };
}
```

Protected pages call `useRequireAuth()` at the top; it bounces logged-out users to `/login`.

### Step 4 — Shared UI

**What:** Tiny building blocks: `Button`, `Card`, `Input`, `Textarea`, `Select`, `Field`, `Badge`, `ErrorText` (`components/ui.tsx`), a `CopyButton`, and a `Nav`.
**Why:** Consistency + less repetition. The `CopyButton` is the star of the demo — one click copies a tailored bullet or interview question.
**How:**

```tsx
// components/copy-button.tsx
"use client";
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  }
  return <Button variant="secondary" onClick={copy}>{copied ? "Copied ✓" : label}</Button>;
}
```

### Step 5 — Root layout

**What:** Wrap every page in the `AuthProvider` and show the `Nav`.
**Why:** The provider must sit above all pages so `useAuth()` works anywhere; the nav is shared chrome.
**How:** `apps/web/src/app/layout.tsx` — `AuthProvider` (a client component) can be rendered inside the server `RootLayout`; that's the standard pattern.

```tsx
<body className="min-h-full flex flex-col">
  <AuthProvider>
    <Nav />
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
  </AuthProvider>
</body>
```

### Step 6 — Landing, login, register

**What:** Public landing + two auth forms.
**Why:** Entry point. On success, store the token (via `useAuth`) and redirect (`/dashboard` after login, `/onboarding` after register).
**How:** Each form calls `login`/`register`, catches `ApiError`, shows the message. Example submit:

```tsx
async function onSubmit(e: FormEvent) {
  e.preventDefault();
  setLoading(true);
  try {
    await login(email, password);
    router.push("/dashboard");
  } catch (err) {
    setError(err instanceof ApiError ? err.message : "Login failed");
  } finally {
    setLoading(false);
  }
}
```

### Step 7 — Onboarding + profile

**What:** A reusable `AddSourceForm` (type, title, content) used by `/onboarding` and `/profile`; `/profile` also lists sources with **reindex** and **delete**.
**Why:** This is how your resume/projects get into the vector store that powers analysis. Reindex re-embeds after edits; delete cascades to chunks.
**How:** Form posts to `/profile/sources`; the API chunks + embeds synchronously and returns the `ready` source. The list shows `status` (`processing`/`ready`/`failed`) and `chunkCount`.

### Step 8 — Jobs + job detail (the payoff)

**What:** `/jobs` lists the pipeline with status counts and a create form; `/jobs/[id]` shows the JD, an **Analyze with AI** button, and the grounded result with copy buttons.
**Why:** This is the demo. Analyze runs the Phase 7 RAG pipeline and renders strengths, gaps, application bullets, and interview questions — each copyable.
**How:** The dynamic route unwraps the Promise `params` with `use()` (Next 16):

```tsx
"use client";
import { use } from "react";
export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // GET /jobs/:id → { job, latestAnalysis }
  // POST /jobs/:id/analyze → AnalysisResult (render bullets/questions with <CopyButton />)
}
```

Render each bullet next to a `CopyButton`, and handle `status === "low_context"` by linking to `/profile`.

### Step 9 — Dashboard + admin runs

**What:** `/dashboard` shows four stat cards (`GET /admin/stats`); `/admin/runs` lists AI runs (`GET /admin/ai-runs`) with status, tokens, and latency.
**Why:** Observability you can show off — "here's every model call, its cost in tokens, and whether it succeeded."
**How:** Simple fetch-in-effect using the `.then(setState)` pattern (allowed by the Next 16 lint), then map over the results into `Card`s.

### Step 10 — Verify

```bash
cd apps/web
pnpm lint     # must pass — Next 16 is strict about setState-in-effect
pnpm build    # compiles all routes; /jobs/[id] is dynamic (ƒ), the rest static (○)
pnpm dev      # http://localhost:3000
```

### Common mistakes

- **`setState` synchronously in `useEffect`** → Next 16 lint error `set-state-in-effect`. Fix: wrap in an async IIFE and only set state after `await` (or use `.then(setState)`).
- **Forgetting `"use client"`** → "localStorage is not defined" or hook errors. Any file with state, effects, or browser APIs needs it.
- **Reading `params` directly** → in v16 it's a Promise; unwrap with `use(params)`.
- **Hardcoding the API URL** → use `NEXT_PUBLIC_API_URL` so deploy only needs an env change.

### Done when

Screen recording: register → onboarding (paste resume) → add job → analyze → copy a bullet — all in the browser, no Postman.

---

## Phase 10 — Deploy + dogfood + applications

**What:** Public URLs + real job hunt inside HuntKit.  
**Why:** Portfolio proof + actual interviews.  
**How:** Render (API) + Netlify (web), reusing your existing Supabase database.

### Key idea (read once)

- **Two hosts, one repo.** The API (NestJS, a long-running Node server) goes on **Render**. The web app (Next.js) goes on **Netlify**. They talk over HTTPS; the browser only ever knows the API's public URL via `NEXT_PUBLIC_API_URL`.
- **Reuse your existing Supabase project.** Your schema was created directly in Supabase (there are no Prisma migration files in the repo), so the database already exists. Point Render at the same `DATABASE_URL` — no migration step needed.
- **The Prisma client is generated, not committed.** `apps/api/src/generated/prisma` is gitignored, so the server must run `prisma generate` during its build. A `postinstall` hook now does this automatically on every `pnpm install`.

### Architecture (what talks to what)

```
Browser ── HTTPS ──► Netlify (Next.js)
   │                     serves the UI; NEXT_PUBLIC_API_URL baked in at build
   │
   └── HTTPS (Bearer JWT) ──► Render (NestJS)  ──► Supabase Postgres + pgvector
                                   │
                                   └────────────► OpenAI (embeddings + chat)

CORS: Render's CORS_ORIGIN must equal the Netlify URL, or the browser blocks calls.
```

**Failure modes to design for**
- **Cold starts (Render free tier):** the service sleeps after ~15 min idle; the next request takes ~50s. Bad for a recruiter clicking your link. Mitigate with a free uptime pinger (Step 8) or a paid instance.
- **CORS mismatch:** wrong/trailing-slash `CORS_ORIGIN` → browser errors even though the API is up. Test with `curl` first to prove the API itself works.
- **Missing `prisma generate`:** build fails with "Cannot find module generated/prisma". The `postinstall` hook prevents this.
- **Leaked secrets:** the OpenAI key + JWT secret were shared in plaintext during dev. Rotate them before going public.

### Pre-deploy checklist

- [ ] Rotate secrets: new `OPENAI_API_KEY` (platform.openai.com) and a fresh `JWT_SECRET` (`openssl rand -base64 48`). Rotating JWT logs everyone out — fine, you re-login.
- [ ] Set a **hard monthly spend limit** in the OpenAI dashboard (Billing → Limits). This is your real credit backstop.
- [ ] Confirm `apps/api/.env` and `apps/web/.env.local` are gitignored (they are) — secrets go in the host dashboards, never in git.
- [ ] `pnpm build` passes at the repo root.

---

### Step 1 — Push to GitHub

**What:** Get the repo onto GitHub so Render and Netlify can build from it.
**Why:** Both hosts deploy by watching a git branch; every push to `main` redeploys.
**How:**

```bash
cd job-huntkit-workspace
git add -A && git commit -m "Deploy-ready: signup lockdown + web UI"
git push origin main   # create the GitHub repo first if needed (gh repo create)
```

### Step 2 — Deploy the API on Render

**What:** A Render **Web Service** running the compiled NestJS server.
**Why:** NestJS needs a persistent Node process (not serverless) for DB pooling and consistent latency.
**How:** Render dashboard → **New → Web Service** → connect the repo, then:

| Setting | Value |
|---------|-------|
| Root Directory | *(leave blank — repo root, so pnpm workspace resolves)* |
| Runtime | Node |
| Build Command | `corepack enable && pnpm install && pnpm --filter @huntkit/shared build && pnpm --filter @huntkit/api exec prisma generate && pnpm --filter @huntkit/api build` |
| Start Command | `pnpm --filter @huntkit/api start:prod` |
| Health Check Path | `/api/v1/health` |

> The build runs `prisma generate` explicitly (the client is gitignored). `start:prod` runs `node dist/main`; Render injects `PORT` automatically (don't set it yourself).

**Environment variables** (Render → Environment):

```
DATABASE_URL=postgresql://...pooler.supabase.com:5432/postgres   # same Supabase project
JWT_SECRET=<newly rotated secret>
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=<newly rotated key>
RAG_SCORE_THRESHOLD=0.35
CORS_ORIGIN=https://<your-web-url>   # fill in after Step 5, then redeploy
# Do NOT set SIGNUP_ENABLED  → public registration stays closed
```

Deploy, then verify the API is live:

```bash
curl https://<your-api>.onrender.com/api/v1/health
# → {"status":"ok","db":"ok",...}
```

### Step 3 — Seed the accounts

**What:** Create your owner + demo login (public sign-up is off).
**Why:** No one can register, so accounts must be seeded once.
**How:** Since prod reuses your existing Supabase DB, your account already exists. Add the demo account by running the seed **locally, pointed at the prod DB** (fastest — Render's free tier has no shell):

```bash
cd apps/api
# temporarily set the SEED_* vars + DATABASE_URL in .env to the prod values
pnpm seed:accounts
# → ✓ Seeded ishaqjaveed1@gmail.com  ✓ Seeded demo@huntkit.app
```

> Re-running just resets those passwords — safe. Revert your local `.env` to dev values afterward.

### Step 4 — Deploy the web app on Netlify

**What:** The Next.js UI on Netlify.
**Why:** Netlify builds from the repo and serves the app on a public HTTPS URL. A committed `netlify.toml` at the repo root makes the config reproducible.
**How:** The repo already contains `netlify.toml`:

```toml
[build]
  base = "apps/web"          # build inside the web package…
  command = "pnpm build"     # …but pnpm still installs the whole workspace
[build.environment]
  NODE_VERSION = "20"
[[plugins]]
  package = "@netlify/plugin-nextjs"   # official Next.js runtime
```

Netlify → **Add new site → Import an existing project** → pick the repo. It reads `netlify.toml`, so leave the build settings as detected. Then add the environment variable (Site settings → Environment variables):

```
NEXT_PUBLIC_API_URL=https://<your-api>.onrender.com/api/v1
# Do NOT set NEXT_PUBLIC_SIGNUP_ENABLED → sign-up UI stays hidden
```

Deploy → you get `https://<your-site>.netlify.app`.

> **Why `base = "apps/web"` and not a root install?** `base` runs the build in the web package, but pnpm walks up to `pnpm-workspace.yaml` and installs the whole workspace, so `@huntkit/shared` resolves. `NEXT_PUBLIC_*` vars are baked in **at build time**, so after changing `NEXT_PUBLIC_API_URL` you must trigger a redeploy.

### Step 5 — Wire CORS and smoke-test

**What:** Let the browser on your web domain call the API.
**Why:** Browsers block cross-origin calls unless the API allows the exact origin. Your API reads `CORS_ORIGIN`.
**How:** Set Render's `CORS_ORIGIN` to your web URL **with no trailing slash** (`https://<your-site>.netlify.app`), save → Render restarts. Then in the browser: open the site → log in → add a job → **Analyze** → **copy a bullet**. If a call fails, check the browser console for a CORS error and re-check the origin value.

### Step 6 — Load real data

**What:** Make the deployed app demo-ready.
**Why:** A recruiter should see it working instantly.
**How:** Log in as your owner account → **Profile** → paste your resume + 2 projects → **Jobs** → add **5 real target jobs** → **Analyze** each. If scores look too low/high, tune `RAG_SCORE_THRESHOLD` on Render and redeploy.

### Step 7 — Harden before sharing

**What:** Remove dev-only surface area.
**Why:** Less to exploit / less that can burn credits.
**How:**
- Delete the dev-only `GET /profile/search` route (`profile.controller.ts`).
- (Optional, recommended before handing out the demo link) add a per-user daily cap on `POST /jobs/:id/analyze` so the demo account can't drain OpenAI credits.

### Step 8 — Beat cold starts (optional but worth it)

**What:** Keep the free Render service awake during active job-hunting.
**Why:** A 50s first load makes the demo look broken.
**How:** Create a free cron at cron-job.org (or UptimeRobot) that GETs `https://<your-api>.onrender.com/api/v1/health` every 10 minutes. Pause it when you're done applying.

### Done when

Your public URL loads, you log in, analyze a real job, and copy a bullet — all live, no localhost.

---

### Todo — Launch (non-negotiable)

- [ ] README + architecture diagram
- [ ] 2-minute Loom
- [ ] LinkedIn post
- [ ] HuntKit on resume as lead project
- [ ] **Apply to 5 roles** using HuntKit bullets + demo link

### Indie (later)

| Offer | Price |
|-------|-------|
| Source template | $49–79 |
| Pro template | $99–149 |
| Hosted SaaS | only if 10+ waitlist |

---

# Part C — Reference

## C1. API map

Base: `/api/v1` · Protected unless noted.

| Area | Routes |
|------|--------|
| Health | `GET /health` (public) |
| Auth | `POST /auth/register`, `POST /auth/login`, `GET/PATCH /auth/me` |
| Jobs | `POST/GET/PATCH/DELETE /jobs`, `GET /jobs/:id` |
| Analyze | `POST /jobs/:id/analyze` |
| Profile | `POST/GET/DELETE /profile/sources`, `POST .../reindex` |
| Admin | `GET /admin/ai-runs`, `GET /admin/ai-runs/:id`, `GET /admin/stats` |

## C2. Common mistakes

| Mistake | Fix |
|---------|-----|
| Logic in controller | Move to service |
| Skip `user_id` filter | Data leak |
| Invent resume bullets | RAG + gaps only |
| Business vectors via Prisma create | `$executeRaw` |
| UI before analyze works | Postman auth first |
| DNS can't resolve pooler | Public DNS 1.1.1.1 / 8.8.8.8 |

## C3. Interview talking points

1. Why RAG for job apps (no invented experience)
2. Honest gaps as a product feature
3. NestJS modules / DI / guards (contractor stack)
4. pgvector without a separate vector DB
5. Observability via `ai_runs`
6. Dogfooding: *"I used this for my applications"*

## C4. Risk killers

| Risk | Mitigation |
|------|------------|
| Invented bullets | Citations required + gaps |
| Scope creep | No auto-apply / PDF v1 |
| OpenAI cost | `gpt-4o-mini`, cap JD length |
| Build but never apply | Ship = 5 applications |

---

**Next action:** Open Phase 5. Generate the Jobs module. Type the DTOs → service → controller. Verify with Postman. Then continue Phase 6.
