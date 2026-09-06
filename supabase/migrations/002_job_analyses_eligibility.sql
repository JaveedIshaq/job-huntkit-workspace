-- Application eligibility verdict from job analyze (geo / contract / pay floor).
ALTER TABLE job_analyses
  ADD COLUMN IF NOT EXISTS eligibility JSONB NOT NULL DEFAULT '{}'::jsonb;
