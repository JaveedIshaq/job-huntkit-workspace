# HuntKit MVP — Job Hunt + Portfolio + Indie Asset Spec

**Purpose:** Ship in 7 days a product you **use daily** for your job search, **demo to employers** as full-stack AI proof, and **sell later** on Lemon Squeezy / Gumroad.

**One-liner:** Paste a job description → get **RAG-grounded** match analysis, tailored application bullets, and interview prep — all cited from **your real resume and projects**.

**Not:** LinkedIn auto-apply, resume designer, multi-agent platform, Flutter app, billing (v2).

---

## Why HuntKit (three goals, one build)

| Goal | How HuntKit delivers |
|------|----------------------|
| **Win a job** | Live demo + story: *"I built the tool I used to land interviews"* |
| **Learn AI full-stack** | RAG, embeddings, structured outputs, observability in NestJS + pgvector |
| **Indie / sell later** | Template or micro-SaaS for developers job hunting ($49–99 template on Lemon Squeezy) |
| **Use yourself** | Track applications + generate tailored copy from **your** profile every day |

**Interview line:** *"Generic ChatGPT invents resume bullets. HuntKit only suggests claims grounded in chunks from my actual projects — with citations and AI run logs."*

---

## Success Criteria (Day 7)

- [ ] Public demo URL (Next.js) + API URL (NestJS)
- [ ] Auth works (JWT or Supabase — pick one)
- [ ] **Profile ingested:** resume + at least 2 project blurbs (`.md`)
- [ ] **5 real jobs** in pipeline (your actual targets)
- [ ] Paste JD on one job → analysis with match gaps, 3 bullets, 5 interview Qs + **citations**
- [ ] Admin page: AI runs (model, tokens, latency, status)
- [ ] GitHub README + architecture diagram
- [ ] 2-minute Loom: profile → add job → analyze → copy bullet
- [ ] **5 job applications sent** using HuntKit output + demo link in cover message
- [ ] LinkedIn post published

---

## Tech Stack (locked)

| Layer | Choice | Why |
|-------|--------|-----|
| API | **NestJS** + TypeScript | Job-target stack |
| DB | **PostgreSQL** + **pgvector** | RAG + resume story |
| ORM | **Prisma** or raw SQL for vectors | Prisma + `$executeRaw` for pgvector ops |
| UI | **Next.js 14+** App Router | Landing + dashboard |
| Auth | **NestJS JWT** ✅ (locked — see huntkit-architecture.md) | Web → API only; Supabase = Postgres host |
| AI | OpenAI `text-embedding-3-small` + `gpt-4o-mini` | Cheap, fast |
| Files | `.md` / `.txt` paste or upload | Skip PDF in v1 |
| Deploy | API: **Railway** / **Render** · Web: **Vercel** | Free tiers |

**Do not add:** Qdrant, LangChain, Redis, Docker, AWS, Lemon Squeezy checkout (week 2+).

---

## Scope: IN vs OUT

### IN (MVP)

- User auth (single user / demo account OK)
- **Profile sources:** resume + project case studies (paste or `.md` upload)
- Ingest: chunk → embed → **profile_chunks** in pgvector
- **Job pipeline:** company, role, URL, status, notes, full JD text
- **Analyze JD:** RAG retrieval from profile → structured output:
  - requirement summary
  - match strengths (with citations)
  - honest gaps
  - 3 tailored application bullets (grounded)
  - 5 likely interview questions
- Low-confidence path when retrieval score below threshold
- **AI run logging** on every analysis
- Admin: profile sources list, jobs board, AI runs table
- Public landing page explaining product

### OUT (cut ruthlessly)

- Auto-apply to job boards
- Resume PDF parsing / OCR
- Cover letter full PDF export (copy-paste text is enough)
- Multi-user SaaS billing
- Chrome extension
- Flutter mobile
- Agent frameworks / LangGraph
- Email integration

---

## System Flow

```
Profile setup
    → paste/upload resume.md + project-*.md
    → chunk (512 tokens, 80 overlap)
    → embed (OpenAI)
    → store in profile_chunks + pgvector

Add job
    → save company, title, URL, status, jd_text

Analyze job (POST /jobs/:id/analyze)
    → embed JD (or key sentences)
    → pgvector search profile_chunks (top 8)
    → if weak match: flag gaps honestly
    → LLM structured JSON: summary, strengths, gaps, bullets, questions
    → each bullet linked to citation chunk IDs
    → save job_analyses row + ai_runs log
    → return to UI for copy/edit

You apply manually
    → paste tailored bullet into LinkedIn/Wellfound application
```

---

## Database Schema

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  display_name  TEXT,
  headline      TEXT,                    -- e.g. "Full-Stack Product Engineer | NestJS + AI"
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Resume + project write-ups (sources for RAG)
CREATE TABLE profile_sources (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_type   TEXT NOT NULL CHECK (source_type IN ('resume','project','notes')),
  title         TEXT NOT NULL,           -- "Resume", "Crunch Africa", "DocMind"
  content       TEXT NOT NULL,           -- full markdown text
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
  embedding           vector(1536) NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (profile_source_id, chunk_index)
);

CREATE INDEX idx_profile_chunks_user ON profile_chunks(user_id);
CREATE INDEX idx_profile_chunks_embedding ON profile_chunks
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Job application pipeline
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

-- Latest AI analysis per job (keep history: multiple rows OK)
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
```

### JSON shapes stored in `job_analyses`

**strengths / gaps:**
```json
[{ "text": "8+ years Flutter with production backends", "chunkId": "uuid", "excerpt": "...", "score": 0.88 }]
```

**application_bullets:**
```json
[{ "text": "Shipped NestJS + pgvector RAG features at Crunch Africa...", "chunkIds": ["uuid"], "confidence": "high" }]
```

**interview_questions:**
```json
[{ "question": "How would you design RAG for low-latency mobile?", "whyLikely": "JD mentions AI integration", "prepHint": "Cite your diagnosis workflow" }]
```

**citations:**
```json
[{ "chunkId": "uuid", "sourceTitle": "Resume", "excerpt": "...", "score": 0.85 }]
```

---

## API Routes (NestJS)

Base path: `/api/v1` · All routes below except `/health` and `/` landing require `Authorization: Bearer <token>`.

### Auth

| Method | Route | Body | Response |
|--------|-------|------|----------|
| POST | `/auth/register` | `{ email, password, displayName? }` | `{ accessToken, user }` |
| POST | `/auth/login` | `{ email, password }` | `{ accessToken, user }` |
| GET | `/auth/me` | — | `{ id, email, displayName, headline }` |
| PATCH | `/auth/me` | `{ displayName?, headline? }` | `{ user }` |

### Profile (RAG knowledge base = YOU)

| Method | Route | Body | Response |
|--------|-------|------|----------|
| POST | `/profile/sources` | `{ sourceType, title, content }` OR multipart file | `{ id, title, status }` |
| GET | `/profile/sources` | — | `{ items: ProfileSource[] }` |
| GET | `/profile/sources/:id` | — | source + `chunkCount` |
| DELETE | `/profile/sources/:id` | — | `{ success: true }` |
| POST | `/profile/sources/:id/reindex` | — | `{ id, status: 'processing' }` |

**Ingest behavior:** On create/update → `status: processing` → chunk → embed → `ready`. Reuse same `IngestService` pattern as DocMind.

### Jobs pipeline

| Method | Route | Body | Response |
|--------|-------|------|----------|
| POST | `/jobs` | `{ company, roleTitle, jobUrl?, location?, jdText, notes?, status? }` | `{ job }` |
| GET | `/jobs` | `?status=applied` optional | `{ items: Job[], countsByStatus }` |
| GET | `/jobs/:id` | — | `{ job, latestAnalysis? }` |
| PATCH | `/jobs/:id` | partial job fields | `{ job }` |
| DELETE | `/jobs/:id` | — | `{ success: true }` |

### Job analysis (core AI feature)

| Method | Route | Body | Response |
|--------|-------|------|----------|
| POST | `/jobs/:id/analyze` | `{ regenerate?: boolean }` | See below |

**POST `/jobs/:id/analyze` response:**

```json
{
  "analysisId": "uuid",
  "runId": "uuid",
  "status": "success | low_context",
  "requirementSummary": "string",
  "strengths": [{ "text": "...", "chunkId": "...", "excerpt": "...", "score": 0.88 }],
  "gaps": [{ "text": "...", "suggestion": "..." }],
  "applicationBullets": [{ "text": "...", "chunkIds": ["..."], "confidence": "high" }],
  "interviewQuestions": [{ "question": "...", "whyLikely": "...", "prepHint": "..." }],
  "citations": [{ "chunkId": "...", "sourceTitle": "...", "excerpt": "...", "score": 0.85 }],
  "overallMatchScore": 78
}
```

**Optional (nice Day 6):**

| Method | Route | Body | Response |
|--------|-------|------|----------|
| POST | `/jobs/:id/opening-paragraph` | `{ tone?: 'concise' \| 'warm' }` | `{ paragraph, citations, runId }` |

One short LinkedIn/Wellfound intro paragraph — still RAG-grounded. Skip if behind schedule.

### Admin / observability

| Method | Route | Response |
|--------|-------|----------|
| GET | `/admin/ai-runs` | `?limit=50&offset=0` → `{ items, total }` |
| GET | `/admin/ai-runs/:id` | run + chunk texts |
| GET | `/admin/stats` | `{ jobsTotal, appliedCount, analysesCount, tokensThisWeek }` |
| GET | `/health` | `{ status: 'ok', db: 'ok' }` |

---

## Core Service Logic

### Ingestion (`ProfileIngestService`)

Same as DocMind — different table names:

1. Split `content` on markdown headers when possible (`##` boundaries)
2. Fallback chunk: **512 tokens**, **80 overlap**
3. Batch embed via OpenAI
4. Insert `profile_chunks` (raw SQL for vector column)
5. Set `profile_sources.status = 'ready'`, `chunk_count`

### Retrieval (`ProfileRetrievalService`)

```sql
SELECT c.id, c.content, ps.title AS source_title, ps.source_type,
       1 - (c.embedding <=> $1::vector) AS score
FROM profile_chunks c
JOIN profile_sources ps ON ps.id = c.profile_source_id
WHERE c.user_id = $2 AND ps.status = 'ready'
ORDER BY c.embedding <=> $1::vector
LIMIT 8;
```

**Query embedding input:** Concatenate first ~2k chars of `jd_text` OR embed full JD if under token limit.

**Threshold:** If best `score < 0.70`, set `status: low_context` and still return gaps + generic advice — do not invent experience.

### Analysis (`JobAnalyzeService`)

System prompt (keep in code as constant):

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

- Map `chunkId` → citation excerpts for UI
- Persist `job_analyses` + `ai_runs`
- `gpt-4o-mini` + `response_format: json_object` or structured outputs

---

## Next.js Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing: problem, demo GIF, CTA — **sellable landing later** |
| `/login` · `/register` | Auth |
| `/onboarding` | Paste resume + 2 projects (first-time setup) |
| `/profile` | Edit sources, reindex, chunk count |
| `/jobs` | Pipeline table/kanban by status |
| `/jobs/new` | Add job + paste JD |
| `/jobs/[id]` | JD view + **Analyze** button + results + copy bullets |
| `/admin/runs` | AI observability |
| `/dashboard` | Stats: applied this week, analyses run |

**UI rule:** Copy-to-clipboard on every bullet and question. You need speed for real applications.

---

## Seed Data (use YOUR real content)

Create in `/seed` before Day 6 deploy:

| File | Content |
|------|---------|
| `resume.md` | From `my-resume/javeed_ishaq_resume.md` — shorten to 1 page |
| `project-crunch.md` | NestJS + Flutter + AI bullets |
| `project-huntkit.md` | Meta: building this tool (update after ship) |
| `positioning.md` | Headline + pitch from `AGENTS.md` |

**Demo job:** Paste a real Tier 1 role JD from `job-openings/curated-job-roles.md`.

**Demo flow for Loom:**

1. Show profile ingested (chunk counts)
2. Add "Product Engineer" job at a startup
3. Analyze → show 3 bullets with citations
4. Copy one bullet → show admin AI run log

---

## 7-Day Execution Plan

### Day 1 — Skeleton + schema

**Goal:** API + DB + auth + jobs CRUD (no AI yet).

- [ ] Repos: `huntkit-api` (NestJS), `huntkit-web` (Next.js)
- [ ] PostgreSQL + `CREATE EXTENSION vector`
- [ ] Run full schema migration
- [ ] Modules: `Auth`, `Profile`, `Jobs`, `Analyze`, `Admin`, `Health`
- [ ] JWT auth guard
- [ ] `POST/GET/PATCH/DELETE /jobs` working
- [ ] `GET /health` OK

**Deliverable:** Create a job via curl/Postman; list jobs.

---

### Day 2 — Profile sources + ingest pipeline

**Goal:** Paste resume → chunks in DB (vectors can be dummy until Day 3).

- [ ] `POST /profile/sources` with markdown body
- [ ] `GET /profile/sources`, `DELETE`, `reindex`
- [ ] Text chunking service (port from DocMind spec)
- [ ] `profile_sources.status` lifecycle

**Deliverable:** Resume saved; chunks visible in DB (text only OK overnight).

---

### Day 3 — Embeddings + pgvector

**Goal:** Full profile RAG index.

- [ ] OpenAI embedding integration
- [ ] Insert `profile_chunks.embedding` via raw SQL
- [ ] Retrieval test endpoint (dev-only): `GET /profile/search?q=...`
- [ ] Ingest your real resume + 2 projects

**Deliverable:** Search "NestJS Flutter" returns relevant chunks.

---

### Day 4 — Job analyze endpoint

**Goal:** Core product value.

- [ ] `POST /jobs/:id/analyze`
- [ ] Retrieve top 8 chunks from JD embedding
- [ ] Structured LLM JSON → `job_analyses` + `ai_runs`
- [ ] `low_context` path when scores weak
- [ ] Test with 1 real JD

**Deliverable:** curl analyze returns bullets + questions + citations.

---

### Day 5 — Next.js UI

**Goal:** Use it yourself without Postman.

- [ ] Onboarding / profile pages
- [ ] Jobs list + new job form
- [ ] Job detail: analyze + render results + **copy buttons**
- [ ] Admin AI runs table
- [ ] Mark 2 jobs as `applied` manually

**Deliverable:** End-to-end screen recording.

---

### Day 6 — Deploy + dogfood

**Goal:** Public URL; your real job hunt starts inside HuntKit.

- [ ] Deploy API + DB + web (env vars below)
- [ ] Load production profile sources
- [ ] Add **5 real target jobs** from curated list
- [ ] Run analyze on all 5; refine threshold if needed
- [ ] Fix CORS/auth issues

**Deliverable:** `https://huntkit-xxx.vercel.app` — you use it daily from phone/laptop.

---

### Day 7 — Portfolio + applications (non-negotiable)

**Goal:** Job hunt + indie seed.

- [ ] README + architecture ASCII
- [ ] Case study (template below)
- [ ] Loom 2 min
- [ ] LinkedIn post: *"I built an AI job-hunt tool with pgvector RAG"*
- [ ] Update resume: **HuntKit** as lead project
- [ ] **Apply to 5 Tier 1 roles** — paste HuntKit bullets into each application
- [ ] Optional: Gumroad/Lemon Squeezy **waitlist** page only (no checkout required Day 7)

**Deliverable:** 5 applications sent + demo link included.

---

## Environment Variables

```env
# API
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-app.vercel.app
PORT=3001
RAG_SCORE_THRESHOLD=0.70

# Web
NEXT_PUBLIC_API_URL=https://your-api.railway.app/api/v1
```

---

## Architecture (ASCII for README)

```
┌──────────────────────────────────────────────────────────┐
│                     HuntKit (Next.js)                     │
│  Profile · Job Pipeline · Analyze · Copy · Admin Runs    │
└─────────────────────────┬────────────────────────────────┘
                          │ HTTPS
┌─────────────────────────▼────────────────────────────────┐
│                    NestJS API                               │
│  ProfileIngest · ProfileRetrieval · JobAnalyze · Jobs CRUD  │
└─────────┬───────────────────────┬──────────────────────────┘
          │                       │
          ▼                       ▼
   PostgreSQL + pgvector     OpenAI API
   (profile_chunks, jobs,     embed + chat
    job_analyses, ai_runs)
```

---

## Interview Talking Points

1. **Why RAG for job apps?** LLMs invent experience; RAG grounds bullets in real resume/project chunks.
2. **Honest gaps:** Product flags missing JD requirements instead of fake claims — trust + safety.
3. **Chunking:** Resume sections + per-project case studies = better retrieval than one blob.
4. **Observability:** Every analysis logged — debug bad bullets, show employers production thinking.
5. **Stack:** NestJS + pgvector — same as SaaS AI products; no separate vector DB.
6. **Dogfooding:** *"I used HuntKit for my own applications this week."*
7. **v2:** Opening paragraph generator, hybrid search, export to Notion, template marketplace.

---

## Case Study Outline (LinkedIn / portfolio)

**Title:** HuntKit — RAG-Grounded Job Application Assistant

1. **Problem:** Generic AI writes fake resume bullets; job tracking is scattered; applying takes hours.
2. **Solution:** Ingest real profile → paste JD → grounded match analysis + bullets + interview Qs with citations.
3. **Stack:** NestJS, PostgreSQL, pgvector, Next.js, OpenAI structured outputs.
4. **AI design:** Retrieval threshold, gap honesty, citation mapping, run logging.
5. **Personal use:** Tracked X applications; generated tailored copy in Y minutes vs manual.
6. **Links:** [Demo] · [GitHub]

---

## Indie / Lemon Squeezy (week 2+, after dogfooding)

| Offer | Price | Notes |
|-------|-------|-------|
| **Source template** | $49–79 | NestJS + Next + pgvector boilerplate |
| **Pro template** | $99–149 | + seed profile prompts + landing copy |
| **Hosted SaaS** | $9–19/mo | Only if 10+ waitlist signups |

**Landing copy angle:** *"Stop letting ChatGPT lie on your resume. Ground every bullet in your real experience."*

Distribution: shipkaro community, LinkedIn, indie hackers subreddit — one post, not spam.

---

## Risk Killers

| Risk | Mitigation |
|------|------------|
| Invented bullets | System prompt + citations required; show gaps |
| Scope creep | No auto-apply, no PDF resume parser v1 |
| pgvector + Prisma | Raw SQL for vector insert/search |
| OpenAI cost | `gpt-4o-mini`; cap JD length 8k chars |
| Build but never apply | Day 7 = 5 applications mandatory |
| Skip profile quality | Use real resume Day 3, not lorem ipsum |

---

## Reuse from DocMind

| DocMind | HuntKit |
|---------|---------|
| `documents` | `profile_sources` |
| `document_chunks` | `profile_chunks` |
| `POST /query` | `POST /jobs/:id/analyze` |
| `IngestService` | `ProfileIngestService` |
| `RetrievalService` | `ProfileRetrievalService` |
| `ai_runs` | Same pattern, `run_type` values differ |

Keep `docmind-mvp-spec.md` as reference for ingest/vector SQL patterns.

---

## Relation to other work

| Project | This sprint |
|---------|-------------|
| **HuntKit** | Primary — job + learn + indie seed |
| **plantUSA** | Pause (reuse RAG modules later) |
| **DocMind** | Superseded by HuntKit for now |
| **Virtual Code tutorials** | 5 hrs max on RAG chapters only |

---

**Start Day 1 today. Day 7 applications are the real deliverable.**
