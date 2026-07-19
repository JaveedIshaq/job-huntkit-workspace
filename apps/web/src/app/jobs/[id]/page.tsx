"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRequireAuth } from "@/lib/auth";
import { apiFetch, ApiError } from "@/lib/api";
import type { AnalysisResult, Job, LatestAnalysis } from "@/lib/types";
import { Badge, Button, Card, ErrorText } from "@/components/ui";
import { CopyButton } from "@/components/copy-button";

function scoreTone(score: number) {
  if (score >= 70) return "green" as const;
  if (score >= 40) return "amber" as const;
  return "red" as const;
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
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const data = await apiFetch<{ job: Job; latestAnalysis: LatestAnalysis }>(
        `/jobs/${id}`,
      );
      setJob(data.job);
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

  async function analyze() {
    setAnalyzing(true);
    setError("");
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
    return <p className="text-foreground/60">Loading…</p>;
  if (!job) return <ErrorText>{error || "Job not found"}</ErrorText>;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/jobs" className="text-sm text-foreground/60 hover:underline">
        ← Back to jobs
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{job.roleTitle}</h1>
          <p className="text-foreground/60">
            {job.company}
            {job.location ? ` · ${job.location}` : ""}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge>{job.status}</Badge>
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
        <Button onClick={analyze} disabled={analyzing}>
          {analyzing
            ? "Analyzing…"
            : analysis
              ? "Re-analyze"
              : "Analyze with AI"}
        </Button>
      </div>

      {analyzedAt && (
        <p className="text-sm text-foreground/60">
          Showing saved analysis from {new Date(analyzedAt).toLocaleString()} —
          click <span className="font-medium">Re-analyze</span> to refresh.
        </p>
      )}

      <ErrorText>{error}</ErrorText>

      {analysis && <AnalysisView analysis={analysis} />}

      <Card>
        <h2 className="mb-2 font-medium">Job description</h2>
        <p className="whitespace-pre-wrap text-sm text-foreground/70">
          {job.jdText}
        </p>
      </Card>
    </div>
  );
}

function AnalysisView({ analysis }: { analysis: AnalysisResult }) {
  if (analysis.status === "low_context") {
    return (
      <Card>
        <h2 className="mb-1 font-medium">Not enough profile context</h2>
        <p className="text-sm text-foreground/60">
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
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Match score</h2>
          <Badge tone={scoreTone(score)}>{score}%</Badge>
        </div>
        {analysis.requirementSummary && (
          <p className="mt-3 text-sm text-foreground/70">
            {analysis.requirementSummary}
          </p>
        )}
      </Card>

      {analysis.strengths && analysis.strengths.length > 0 && (
        <Card>
          <h2 className="mb-2 font-medium">Strengths</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/80">
            {analysis.strengths.map((s, i) => (
              <li key={i}>{s.text}</li>
            ))}
          </ul>
        </Card>
      )}

      {analysis.gaps && analysis.gaps.length > 0 && (
        <Card>
          <h2 className="mb-2 font-medium">Gaps</h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            {analysis.gaps.map((g, i) => (
              <li key={i}>
                <span className="font-medium">{g.text}</span>
                {g.suggestion && (
                  <span className="text-foreground/60"> — {g.suggestion}</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {analysis.applicationBullets && analysis.applicationBullets.length > 0 && (
        <Card>
          <h2 className="mb-3 font-medium">Application bullets</h2>
          <ul className="flex flex-col gap-3">
            {analysis.applicationBullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="text-foreground/80">{b.text}</span>
                <CopyButton text={b.text} />
              </li>
            ))}
          </ul>
        </Card>
      )}

      {analysis.interviewQuestions &&
        analysis.interviewQuestions.length > 0 && (
          <Card>
            <h2 className="mb-3 font-medium">Likely interview questions</h2>
            <ul className="flex flex-col gap-4">
              {analysis.interviewQuestions.map((q, i) => (
                <li key={i} className="text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-medium text-foreground/90">
                      {q.question}
                    </span>
                    <CopyButton text={q.question} />
                  </div>
                  {q.prepHint && (
                    <p className="mt-1 text-foreground/60">{q.prepHint}</p>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        )}

      {analysis.citations && analysis.citations.length > 0 && (
        <Card>
          <h2 className="mb-2 font-medium">Sources used</h2>
          <ul className="space-y-2 text-xs text-foreground/60">
            {analysis.citations.map((c) => (
              <li key={c.chunkId}>
                <span className="font-medium text-foreground/80">
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
