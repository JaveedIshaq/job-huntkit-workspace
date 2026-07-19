"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/auth";
import { AddSourceForm } from "@/components/add-source-form";
import { Button, Card } from "@/components/ui";

export default function OnboardingPage() {
  const { loading } = useRequireAuth();
  const router = useRouter();

  if (loading) return <p className="text-foreground/60">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Build your profile</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Add your resume and a couple of project write-ups. HuntKit uses these
          to ground every analysis. Add as many as you like, then continue.
        </p>
      </div>

      <Card>
        <AddSourceForm />
      </Card>

      <div className="flex gap-3">
        <Link href="/profile">
          <Button variant="secondary">View my sources</Button>
        </Link>
        <Button onClick={() => router.push("/jobs")}>
          Continue to jobs →
        </Button>
      </div>
    </div>
  );
}
