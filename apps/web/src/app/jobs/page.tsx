"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
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
} from "@/components/ui";

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

  if (authLoading) return <p className="text-foreground/60">Loading…</p>;

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
            onCreated={(job) => {
              setItems((prev) => [job, ...prev]);
              setShowForm(false);
              load();
            }}
          />
        </Card>
      )}

      <ErrorText>{error}</ErrorText>

      {loading ? (
        <p className="text-foreground/60">Loading jobs…</p>
      ) : items.length === 0 ? (
        <p className="text-foreground/60">
          No jobs yet. Add one to start analyzing.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <Card className="transition hover:border-foreground/30">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{job.roleTitle}</div>
                    <div className="text-sm text-foreground/60">
                      {job.company}
                      {job.location ? ` · ${job.location}` : ""}
                    </div>
                  </div>
                  <Badge>{job.status}</Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function NewJobForm({ onCreated }: { onCreated: (job: Job) => void }) {
  const [company, setCompany] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState<string>(JOB_STATUSES[0]);
  const [jdText, setJdText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { job } = await apiFetch<{ job: Job }>("/jobs", {
        method: "POST",
        body: JSON.stringify({
          company,
          roleTitle,
          jdText,
          status,
          location: location || undefined,
          jobUrl: jobUrl || undefined,
        }),
      });
      onCreated(job);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
        <Field label="Status">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
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
        />
      </Field>
      <Field label="Job description">
        <Textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          rows={8}
          placeholder="Paste the full job description here…"
          required
        />
      </Field>
      <ErrorText>{error}</ErrorText>
      <Button type="submit" disabled={loading} className="self-start">
        {loading ? "Saving…" : "Save job"}
      </Button>
    </form>
  );
}
