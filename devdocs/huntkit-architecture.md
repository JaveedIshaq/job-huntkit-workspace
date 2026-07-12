# HuntKit — Architecture (Locked)

**Decision:** **Option A — NestJS JWT.** Web talks **only** to the API. API talks to Postgres (Supabase-hosted), OpenAI, and owns auth.

**Date locked:** July 2026

---

## What / Why / How

| Question | Answer |
|----------|--------|
| **What** | Three-tier flow: Next.js (UI) → NestJS (API + auth + business logic) → PostgreSQL + OpenAI |
| **Why** | One backend owns secrets, validation, and data. Easier to secure, test, and explain in interviews. Matches how many production SaaS APIs are built. |
| **How** | Web uses `NEXT_PUBLIC_API_URL` only. User logs in via `POST /auth/login` → stores JWT → sends `Authorization: Bearer <token>` on every API call. |

---

## Diagram

```
┌──────────────────────────────────────────────────────────────┐
│  Next.js (Netlify) — apps/web                                  │
│  • Pages, forms, copy UI                                       │
│  • Env: NEXT_PUBLIC_API_URL only                               │
│  • No DATABASE_URL, no OpenAI key, no Supabase client        │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTPS  /api/v1/*
                             │ Authorization: Bearer <JWT>
┌────────────────────────────▼─────────────────────────────────┐
│  NestJS (Render) — apps/api                                    │
│  • Auth: register, login, JWT guard, @CurrentUser()          │
│  • Jobs, profile ingest, RAG analyze, admin                    │
│  • Prisma + raw SQL (pgvector)                                 │
└────────────┬─────────────────────────────┬─────────────────────┘
             │                             │
             ▼                             ▼
   ┌─────────────────┐           ┌─────────────────┐
   │ PostgreSQL      │           │ OpenAI API      │
   │ (Supabase host) │           │ embed + chat    │
   │ + pgvector      │           └─────────────────┘
   └─────────────────┘

Supabase = managed Postgres host only (DATABASE_URL).
Not used: Supabase Auth, Supabase client in Next.js.
```

---

## Auth flow (JWT)

1. **Register:** `POST /api/v1/auth/register` → `{ accessToken, user }`
2. **Login:** `POST /api/v1/auth/login` → `{ accessToken, user }`
3. **Web** stores token (httpOnly cookie or memory — implement in Day 5 UI)
4. **Protected routes:** NestJS `JwtAuthGuard` validates token, attaches `user.id`
5. **Every DB query** filters by `user_id` in services (application-level security)

---

## Env vars by app

| Variable | API | Web |
|----------|-----|-----|
| `DATABASE_URL` | ✅ | ❌ |
| `OPENAI_API_KEY` | ✅ | ❌ |
| `JWT_SECRET` | ✅ | ❌ |
| `JWT_EXPIRES_IN` | ✅ | ❌ |
| `CORS_ORIGIN` | ✅ | ❌ |
| `NEXT_PUBLIC_API_URL` | ❌ | ✅ |

---

## Production note

This is a **standard production pattern** for product APIs:

- **BFF optional:** Next.js can stay a thin client; all rules live in NestJS.
- **Supabase as Postgres only** is common — you get hosted DB + pgvector without splitting auth across two systems.
- **Trade-off:** You implement password hashing, JWT refresh/expiry, and password reset in NestJS (more learning, full control).

For HuntKit MVP, skip refresh tokens until needed; use `JWT_EXPIRES_IN=7d` and re-login.

---

## Related docs

- [huntkit-mvp-spec.md](./huntkit-mvp-spec.md) — routes, schema, 7-day plan
- [huntkit-build-guide.md](./huntkit-build-guide.md) — implementation steps (§7 Supabase Auth is **skipped**; use JWT module instead)
