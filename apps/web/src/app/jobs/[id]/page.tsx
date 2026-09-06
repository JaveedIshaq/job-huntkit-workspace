"use client";

import {
  use,
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { useRequireAuth } from "@/lib/auth";
import { apiFetch, ApiError } from "@/lib/api";
import {
  JOB_STATUSES,
  type AnalysisResult,
  type Eligibility,
  type Job,
  type LatestAnalysis,
} from "@/lib/types";
import {
  Badge,
  Button,
  Card,
  ErrorText,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import { CopyButton } from "@/components/copy-button";

function scoreTone(score: number) {
  if (score >= 70) return "green" as const;
  if (score >= 40) return "amber" as const;
  return "red" as const;
}

function verdictTone(verdict: string) {
  if (verdict === "apply") return "green" as const;
  if (verdict === "apply_low_priority") return "amber" as const;
  if (verdict === "skip") return "red" as const;
  return "neutral" as const;
}

function verdictLabel(verdict: string) {
  if (verdict === "apply") return "Apply";
  if (verdict === "apply_low_priority") return "Low priority";
  if (verdict === "skip") return "Skip";
  return verdict;
}

function riskTone(level: string) {
  if (level === "low") return "green" as const;
  if (level === "medium") return "amber" as const;
  if (level === "high") return "red" as const;
  return "neutral" as const;
}

// Map a saved analysis (from GET /jobs/:id) into the same shape the
// analyze endpoint returns, so one <AnalysisView> renders both.
function fromSaved(la: NonNullable<LatestAnalysis>): AnalysisResult {
  return {
    analysisId: la.analysisId,
    runId: la.runId ?? "",
    status: "success",
    requirementSummary: la.requirementSummary,
    strengths: la.strengths,
    gaps: la.gaps,
    applicationBullets: la.applicationBullets,
    interviewQuestions: la.interviewQuestions,
    citations: la.citations,
    eligibility: la.eligibility,
    overallMatchScore: la.overallMatchScore,
  };
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { loading: authLoading } = useRequireAuth();

  const [job, setJob] = useState<Job | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analyzedAt, setAnalyzedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jdChangedHint, setJdChangedHint] = useState(false);
  const [error, setError] = useState("");

  const [company, setCompany] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [jdText, setJdText] = useState("");

  function syncForm(j: Job) {
    setCompany(j.company);
    setRoleTitle(j.roleTitle);
    setLocation(j.location ?? "");
    setJobUrl(j.jobUrl ?? "");
    setNotes(j.notes ?? "");
    setJdText(j.jdText);
  }

  const load = useCallback(async () => {
    try {
      const data = await apiFetch<{ job: Job; latestAnalysis: LatestAnalysis }>(
        `/jobs/${id}`,
      );
      setJob(data.job);
      syncForm(data.job);
      // Render the previously-saved analysis so the user can review it
      // later without spending tokens on a fresh run.
      if (data.latestAnalysis) {
        setAnalysis(fromSaved(data.latestAnalysis));
        setAnalyzedAt(data.latestAnalysis.createdAt);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load job");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (authLoading) return;
    void (async () => {
      await load();
    })();
  }, [authLoading, load]);

  function startEdit() {
    if (!job) return;
    syncForm(job);
    setError("");
    setJdChangedHint(false);
    setEditing(true);
  }

  function cancelEdit() {
    if (!job) return;
    syncForm(job);
    setError("");
    setEditing(false);
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!job) return;
    setSaving(true);
    setError("");
    const prevJd = job.jdText;
    try {
      const { job: updated } = await apiFetch<{ job: Job }>(`/jobs/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          company: company.trim(),
          roleTitle: roleTitle.trim(),
          location: location.trim() || null,
          jobUrl: jobUrl.trim() || null,
          notes: notes.trim() || null,
          jdText: jdText.trim(),
        }),
      });
      setJob(updated);
      syncForm(updated);
      setEditing(false);
      if (updated.jdText !== prevJd) {
        setJdChangedHint(true);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save job");
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(status: string) {
    setSavingStatus(true);
    setError("");
    try {
      // The API stamps applied_at automatically when status becomes "applied".
      const { job: updated } = await apiFetch<{ job: Job }>(`/jobs/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setJob(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update status");
    } finally {
      setSavingStatus(false);
    }
  }

  async function analyze() {
    setAnalyzing(true);
    setError("");
    setJdChangedHint(false);
    try {
      const result = await apiFetch<AnalysisResult>(`/jobs/${id}/analyze`, {
        method: "POST",
      });
      setAnalysis(result);
      setAnalyzedAt(new Date().toISOString());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  }

  if (authLoading || loading)
    return <p className="text-muted-foreground">Loading…</p>;
  if (!job) return <ErrorText>{error || "Job not found"}</ErrorText>;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/jobs" className="text-sm text-muted-foreground hover:underline">
        ← Back to jobs
      </Link>

      {editing ? (
        <Card>
          <form onSubmit={onSave} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Edit job</h2>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={cancelEdit}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company">
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </Field>
              <Field label="Role title">
                <Input
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  required
                />
              </Field>
              <Field label="Location (optional)">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Field>
              <Field label="Job URL (optional)">
                <Input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  placeholder="https://"
                />
              </Field>
            </div>

            <Field label="Notes (optional)">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Recruiter, salary, follow-ups…"
              />
            </Field>

            <Field label="Job description">
              <Textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                rows={12}
                required
              />
            </Field>

            <ErrorText>{error}</ErrorText>
          </form>
        </Card>
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">{job.roleTitle}</h1>
              <p className="text-muted-foreground">
                {job.company}
                {job.location ? ` · ${job.location}` : ""}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Select
                  aria-label="Job status"
                  value={job.status}
                  disabled={savingStatus}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="w-auto capitalize"
                >
                  {JOB_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
                {job.appliedAt && (
                  <span className="text-xs text-muted-foreground">
                    Applied {new Date(job.appliedAt).toLocaleDateString()}
                  </span>
                )}
                {job.jobUrl && (
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline"
                  >
                    Job posting ↗
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={startEdit}>
                Edit
              </Button>
              <Button onClick={analyze} disabled={analyzing}>
                {analyzing
                  ? "Analyzing…"
                  : analysis
                    ? "Re-analyze"
                    : "Analyze with AI"}
              </Button>
            </div>
          </div>

          {analyzedAt && (
            <p className="text-sm text-muted-foreground">
              Showing saved analysis from{" "}
              {new Date(analyzedAt).toLocaleString()} — click{" "}
              <span className="font-medium">Re-analyze</span> to refresh.
            </p>
          )}

          {jdChangedHint && (
            <p className="rounded-lg border border-warning-fg/30 bg-warning-bg px-3 py-2 text-sm text-warning-fg">
              Job description changed. Re-analyze so match results use the
              updated text.
            </p>
          )}

          <ErrorText>{error}</ErrorText>

          {job.notes && (
            <Card>
              <h2 className="mb-2 font-medium">Notes</h2>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {job.notes}
              </p>
            </Card>
          )}

          {analysis && <AnalysisView analysis={analysis} />}

          <Card>
            <h2 className="mb-2 font-medium">Job description</h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {job.jdText}
            </p>
          </Card>
        </>
      )}
    </div>
  );
}

function AnalysisView({ analysis }: { analysis: AnalysisResult }) {
  if (analysis.status === "low_context") {
    return (
      <Card>
        <h2 className="mb-1 font-medium">Not enough profile context</h2>
        <p className="text-sm text-muted-foreground">
          {analysis.message ??
            "Add more profile sources so the AI has experience to ground its answer."}
        </p>
        <Link href="/profile" className="mt-2 inline-block text-sm underline">
          Add profile sources →
        </Link>
      </Card>
    );
  }

  const score = analysis.overallMatchScore ?? 0;

  return (
    <div className="flex flex-col gap-4">
      {analysis.eligibility && (
        <EligibilityCard eligibility={analysis.eligibility} />
      )}

      <Card>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            Match score (skills)
          </h2>
          <Badge tone={scoreTone(score)}>{score}%</Badge>
        </div>
        {analysis.requirementSummary && (
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {analysis.requirementSummary}
          </p>
        )}
      </Card>

      {analysis.strengths && analysis.strengths.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Strengths</h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
            {analysis.strengths.map((s, i) => (
              <li key={i}>{s.text}</li>
            ))}
          </ul>
        </Card>
      )}

      {analysis.gaps && analysis.gaps.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Gaps</h2>
          <ul className="space-y-3 text-base leading-relaxed">
            {analysis.gaps.map((g, i) => (
              <li key={i}>
                <span className="font-medium text-foreground">{g.text}</span>
                {g.suggestion && (
                  <span className="text-muted-foreground"> — {g.suggestion}</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {analysis.applicationBullets && analysis.applicationBullets.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Application bullets</h2>
          <ul className="flex flex-col gap-3">
            {analysis.applicationBullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-3 text-base leading-relaxed"
              >
                <span className="text-foreground">{b.text}</span>
                <CopyButton text={b.text} />
              </li>
            ))}
          </ul>
        </Card>
      )}

      {analysis.interviewQuestions &&
        analysis.interviewQuestions.length > 0 && (
          <Card>
            <h2 className="mb-3 text-lg font-semibold">
              Likely interview questions
            </h2>
            <ul className="flex flex-col gap-4">
              {analysis.interviewQuestions.map((q, i) => (
                <li key={i} className="text-base leading-relaxed">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-medium text-foreground">
                      {q.question}
                    </span>
                    <CopyButton text={q.question} />
                  </div>
                  {q.prepHint && (
                    <p className="mt-1 text-muted-foreground">{q.prepHint}</p>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        )}

      {analysis.citations && analysis.citations.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Sources used</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {analysis.citations.map((c) => (
              <li key={c.chunkId}>
                <span className="font-medium text-foreground">
                  {c.sourceTitle}
                </span>{" "}
                (score {c.score.toFixed(3)}) — {c.excerpt}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

function EligibilityCard({ eligibility }: { eligibility: Eligibility }) {
  return (
    <Card className="border-l-4 border-l-primary">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Application eligibility
          </p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">
            Should I apply? (from Pakistan)
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={verdictTone(eligibility.verdict)}>
            {verdictLabel(eligibility.verdict)}
          </Badge>
          <Badge tone="neutral">confidence: {eligibility.confidence}</Badge>
        </div>
      </div>

      <p className="mt-4 text-base leading-relaxed text-foreground">
        {eligibility.summary}
      </p>

      {eligibility.roleFitNote ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Role fit: </span>
          {eligibility.roleFitNote}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="neutral">remote: {eligibility.remoteScope}</Badge>
        <Badge tone="neutral">employment: {eligibility.employmentType}</Badge>
        <Badge tone={riskTone(eligibility.workAuthRisk)}>
          work-auth: {eligibility.workAuthRisk}
        </Badge>
        <Badge tone={riskTone(eligibility.languageRisk)}>
          language: {eligibility.languageRisk}
        </Badge>
        <Badge tone="neutral">pay vs $2k: {eligibility.payVsFloor}</Badge>
      </div>

      {eligibility.reasons?.length > 0 && (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {eligibility.reasons.map((r, i) => (
            <li key={i} className="text-foreground/90">
              {r}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
