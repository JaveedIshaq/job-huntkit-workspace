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