# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: the product owner — a Pakistan-based software engineer searching for remote / contractor roles (Flutter, NestJS, full-stack product work) who needs income soon and dogfoods HuntKit daily.

Secondary audience: recruiters and hiring managers who open the live demo URL and should see a credible, working product without local setup.

## Product Purpose

HuntKit helps a job seeker decide whether to apply to a role and what to say — grounded in their real resume and project write-ups, not invented ChatGPT claims.

Success means: paste or save a job → get RAG-cited strengths, gaps, application bullets, and interview prep → plus a clear geo/pay/work-auth eligibility verdict → track applied vs saved with dates.

## Positioning

Unlike generic chatbots, HuntKit only suggests claims supported by retrieved profile chunks (with citations) and separately scores application eligibility for a Pakistan remote candidate. Skill match and eligibility stay distinct so a strong Flutter fit is not hidden by a geo skip, and vice versa.

## Operating Context

- Daily workflow: save jobs from LinkedIn/etc. (paste page or manual entry) → analyze → decide apply/skip → mark applied with date → iterate profile sources.
- Demo workflow: log in (owner or demo account) → browse jobs/profile/analysis on the public Netlify site.
- Dev: monorepo `pnpm` / Turborepo; web on `:3000`, API on `:3001`.

## Capabilities and Constraints

Confirmed capabilities:
- JWT auth (NestJS); web talks only to `NEXT_PUBLIC_API_URL`
- Jobs CRUD, paste-page AI extract, status pipeline (`saved` / `applied` / …), `appliedAt` / `createdAt`
- Profile sources (resume / project / notes) with chunk + embed ingest
- RAG job analyze + eligibility JSON; AI run observability for owner
- Light/dark theme on web

Constraints:
- Lives in Pakistan; needs remote / internationally payable contractor or worldwide remote
- Pay floor (hard minimum): about USD 1,000+/month; nicer bands ~1.5k–3k+ preferred but not required to apply
- Prefer skip when EU/US work-auth, local payroll-only, or country-only remote without worldwide contractor path
- Public signup may be locked; accounts seeded for owner + demo
- Not in MVP: LinkedIn auto-apply, resume designer, billing, primary Flutter client (scaffold exists; web-first)
- UI must not invent testimonials, fake metrics, or employers not in the user’s profile sources

Open / operational (not product identity):
- Render API auto-deploy must be confirmed on each ship; Netlify already auto-deploys web

## Brand Commitments

- Product name: **HuntKit** (keep)
- Mark: crosshair-style logo / favicon (`apps/web` logo component + `icon.svg`) — keep
- Voice: direct, practical, honest about geo/pay risk; no hype fluff

## Evidence on Hand

- Live web: https://hunt-kit.netlify.app/
- Live API health: https://job-huntkit-workspace.onrender.com/api/v1/health
- Product narrative: `profile-sources/huntkit-project.md`
- Profile write-ups for RAG: `profile-sources/*.md` (local notes; not necessarily all ingested in prod)
- Do not fabricate case studies, customer logos, or press

## Product Principles

1. Ground every claim in retrieved profile evidence — never invent experience.
2. Separate skill fit from apply eligibility so the user can decide with clear eyes.
3. Optimize for speed-to-apply: paste, analyze, tick applied, move on.
4. Demo must work for a cold recruiter click (clarity over novelty).
5. Keep secrets and AI on the API; the web app stays a thin client.

## Accessibility & Inclusion

No formal WCAG target locked yet; preserve readable contrast in light and dark themes and usable touch targets on job list controls (checkbox, links).
