"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth, useRequireAuth } from "@/lib/auth";
import { apiFetch, ApiError } from "@/lib/api";
import type { Stats } from "@/lib/types";
import { Button, Card, ErrorText } from "@/components/ui";

const CARDS: { key: keyof Stats; label: string }[] = [
  { key: "jobsTotal", label: "Jobs tracked" },
  { key: "appliedCount", label: "Applied" },
  { key: "analysesCount", label: "AI analyses" },
  { key: "tokensThisWeek", label: "Tokens this week" },
];

export default function DashboardPage() {
  const { loading: authLoading } = useRequireAuth();
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    apiFetch<Stats>("/admin/stats")
      .then(setStats)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "Failed to load stats"),
      );
  }, [authLoading]);

  if (authLoading) return <p className="text-foreground/60">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome{user?.displayName ? `, ${user.displayName}` : ""}
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          Your job hunt at a glance.
        </p>
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <Card key={c.key}>
            <div className="text-3xl font-semibold">
              {stats ? stats[c.key].toLocaleString() : "—"}
            </div>
            <div className="mt-1 text-sm text-foreground/60">{c.label}</div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/jobs">
          <Button>Go to jobs</Button>
        </Link>
        <Link href="/profile">
          <Button variant="secondary">Manage profile</Button>
        </Link>
        <Link href="/admin/runs">
          <Button variant="secondary">View AI runs</Button>
        </Link>
      </div>
    </div>
  );
}
