"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/auth";
import { apiFetch, ApiError } from "@/lib/api";
import { JOB_STATUSES, type Job, type JobsList } from "@/lib/types";
import {
  Badge,
  Button,
  Card,
  ErrorText,
  Field,
  Input,
  Select,
  Textarea,
  cn,
} from "@/components/ui";
import { JobStatus, composeRoleAtCompany } from "@huntkit/shared";

export type ParsedJobFields = {
  company: string;
  roleTitle: string;
  location: string | null;
  jobUrl: string | null;
  jdText: string;
};

function formatJobDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function isAppliedJob(job: Job): boolean {
  return job.status === JobStatus.APPLIED || Boolean(job.appliedAt);
}

export default function JobsPage() {
  const { loading: authLoading } = useRequireAuth();
  const [items, setItems] = useState<Job[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await apiFetch<JobsList>("/jobs");
      setItems(data.items);
      setCounts(data.countsByStatus);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    void (async () => {
      await load();
    })();
  }, [authLoading, load]);

  if (authLoading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Close" : "+ New job"}
        </Button>
      </div>

      {Object.keys(counts).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(counts).map(([status, n]) => (
            <Badge key={status}>
              {status}: {n}
            </Badge>
          ))}
        </div>
      )}

      {showForm && (
        <Card>
          <NewJobForm
            onCreated={(job, options) => {
              setItems((prev) => [job, ...prev]);
              if (options?.keepOpen !== true) {
                setShowForm(false);
              }
              void load();
            }}
          />
        </Card>
      )}

      <ErrorText>{error}</ErrorText>

      {loading ? (
        <p className="text-muted-foreground">Loading jobs…</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">
          No jobs yet. Add one to start analyzing.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((job) => (
            <JobListRow
              key={job.id}
              job={job}
              onUpdated={(updated) => {
                setItems((prev) =>
                  prev.map((j) => (j.id === updated.id ? updated : j)),
                );
                void load();
              }}
              onError={setError}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function JobListRow({
  job,
  onUpdated,
  onError,
}: {
  job: Job;
  onUpdated: (job: Job) => void;
  onError: (message: string) => void;
}) {
  const [saving, setSaving] = useState(false);
  const applied = isAppliedJob(job);

  async function toggleApplied(nextApplied: boolean) {
    setSaving(true);
    onError("");
    try {
      const { job: updated } = await apiFetch<{ job: Job }>(`/jobs/${job.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: nextApplied ? JobStatus.APPLIED : JobStatus.SAVED,
        }),
      });
      onUpdated(updated);
    } catch (err) {
      onError(
        err instanceof ApiError ? err.message : "Failed to update applied status",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="transition hover:border-foreground/30">
      <div className="flex items-center gap-3">
        <label
          className={cn(
            "flex shrink-0 cursor-pointer flex-col items-center gap-1",
            saving && "opacity-50",
          )}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="size-4 cursor-pointer accent-primary"
            checked={applied}
            disabled={saving}
            aria-label={applied ? "Mark as not applied" : "Mark as applied"}
            onChange={(e) => void toggleApplied(e.target.checked)}
          />
          <span className="text-[10px] leading-none text-muted-foreground">
            Applied
          </span>
        </label>

        <Link
          href={`/jobs/${job.id}`}
          className="min-w-0 flex-1 cursor-pointer"
        >
          <div className="min-w-0">
            <div className="font-medium">{job.roleTitle}</div>
            <div className="text-sm text-muted-foreground">
              {job.location || "Location not set"}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge
                tone="blue"
                className="max-w-full whitespace-normal text-left leading-snug"
              >
                Saved {formatJobDateTime(job.createdAt)}
              </Badge>
              {job.appliedAt ? (
                <Badge
                  tone="green"
                  className="max-w-full whitespace-normal text-left leading-snug"
                >
                  Applied {formatJobDateTime(job.appliedAt)}
                </Badge>
              ) : null}
            </div>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          {job.jobUrl ? (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open job posting in a new tab"
              title="Open job posting"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon className="size-4" />
            </a>
          ) : null}
          <Badge>
            {job.status === JobStatus.SAVED && job.appliedAt
              ? JobStatus.APPLIED
              : job.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function NewJobForm({
  onCreated,
}: {
  onCreated: (job: Job, options?: { keepOpen?: boolean }) => void;
}) {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState<string>(JOB_STATUSES[0]);
  const [jdText, setJdText] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<"save" | "analyze" | null>(null);
  const [pasteOpen, setPasteOpen] = useState(false);

  function applyParsed(fields: ParsedJobFields) {
    const nextCompany = fields.company?.trim() ?? "";
    const nextRole = fields.roleTitle?.trim() ?? "";
    if (nextCompany) setCompany(nextCompany);
    if (nextRole || nextCompany) {
      setRoleTitle(composeRoleAtCompany(nextRole, nextCompany));
    }
    if (fields.location) setLocation(fields.location);
    if (fields.jobUrl) setJobUrl(fields.jobUrl);
    if (fields.jdText) setJdText(fields.jdText);
    setPasteOpen(false);
  }

  async function createJob(): Promise<Job> {
    const companyTrim = company.trim();
    const { job } = await apiFetch<{ job: Job }>("/jobs", {
      method: "POST",
      body: JSON.stringify({
        company: companyTrim,
        roleTitle: composeRoleAtCompany(roleTitle, companyTrim),
        jdText,
        status,
        location: location || undefined,
        jobUrl: jobUrl || undefined,
      }),
    });
    return job;
  }

  async function saveOnly(e?: FormEvent) {
    e?.preventDefault();
    setError("");
    setBusy("save");
    try {
      const job = await createJob();
      onCreated(job);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create job");
    } finally {
      setBusy(null);
    }
  }

  async function saveAndAnalyze(e?: FormEvent) {
    e?.preventDefault();
    setError("");
    setBusy("analyze");
    try {
      const job = await createJob();
      onCreated(job, { keepOpen: true });
      try {
        await apiFetch(`/jobs/${job.id}/analyze`, { method: "POST" });
        router.push(`/jobs/${job.id}`);
      } catch (err) {
        const message =
          err instanceof ApiError ? err.message : "Analysis failed";
        router.push(
          `/jobs/${job.id}?analyzeError=${encodeURIComponent(message)}`,
        );
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create job");
      setBusy(null);
    }
  }

  return (
    <>
      <form onSubmit={saveAndAnalyze} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            Fill manually, or paste a full job page and let AI extract fields.
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setPasteOpen(true)}
            disabled={busy !== null}
          >
            Paste the job page
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company">
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              disabled={busy !== null}
            />
          </Field>
          <Field label="Role title">
            <Input
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Flutter Developer — saved as Role at Company"
              required
              disabled={busy !== null}
            />
          </Field>
          <Field label="Location (optional)">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={busy !== null}
            />
          </Field>
          <Field label="Status">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={busy !== null}
            >
              {JOB_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Job URL (optional)">
          <Input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder="https://…"
            disabled={busy !== null}
          />
        </Field>
        <Field label="Job description">
          <Textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={8}
            placeholder="Paste the full job description here…"
            required
            disabled={busy !== null}
          />
        </Field>
        <ErrorText>{error}</ErrorText>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={busy !== null}
            onClick={() => void saveOnly()}
          >
            {busy === "save" ? "Saving…" : "Save"}
          </Button>
          <Button type="submit" disabled={busy !== null}>
            {busy === "analyze" ? "Saving & analyzing…" : "Save & analyze"}
          </Button>
        </div>
        {busy === "analyze" ? (
          <p className="text-sm text-muted-foreground">
            Saving the job, then running AI analysis. You’ll open the job
            detail when it finishes…
          </p>
        ) : null}
      </form>

      {pasteOpen && (
        <PasteJobPageDialog
          onClose={() => setPasteOpen(false)}
          onParsed={applyParsed}
        />
      )}
    </>
  );
}

function PasteJobPageDialog({
  onClose,
  onParsed,
}: {
  onClose: () => void;
  onParsed: (fields: ParsedJobFields) => void;
}) {
  const [pageText, setPageText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function extract() {
    setError("");
    setLoading(true);
    try {
      const { fields } = await apiFetch<{ fields: ParsedJobFields }>(
        "/jobs/parse-page",
        {
          method: "POST",
          body: JSON.stringify({ pageText }),
        },
      );
      onParsed(fields);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to extract job fields",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paste-job-page-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 text-card-foreground shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="paste-job-page-title" className="text-lg font-semibold">
              Paste the job page
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              On the job posting: select all (Ctrl/Cmd+A), copy, then paste here.
              AI will fill company, role, location, URL, and description.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            disabled={loading}
            onClick={onClose}
          >
            Close
          </Button>
        </div>

        <Textarea
          value={pageText}
          onChange={(e) => setPageText(e.target.value)}
          rows={14}
          placeholder="Paste the full page text here…"
          disabled={loading}
          className="min-h-[40vh] font-mono text-xs"
          autoFocus
        />

        <ErrorText>{error}</ErrorText>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={loading || pageText.trim().length < 40}
            onClick={() => void extract()}
          >
            {loading ? "Extracting…" : "Extract & fill form"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
