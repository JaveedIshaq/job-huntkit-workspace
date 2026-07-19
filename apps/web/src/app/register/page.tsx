"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { SIGNUP_ENABLED } from "@/lib/config";
import { Logo } from "@/components/logo";
import { Button, Card, ErrorText, Field, Input } from "@/components/ui";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password, displayName || undefined);
      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (!SIGNUP_ENABLED) {
    return (
      <div className="mx-auto max-w-sm pt-8">
        <div className="mb-6 flex justify-center">
          <Logo size={28} />
        </div>
        <Card>
          <h1 className="mb-1 text-xl font-semibold">Sign-up is closed</h1>
          <p className="mb-5 text-sm text-foreground/60">
            HuntKit is invite-only right now. If you have an account, log in
            below.
          </p>
          <Link href="/login">
            <Button>Go to login</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm pt-8">
      <div className="mb-6 flex justify-center">
        <Logo size={28} />
      </div>
      <Card>
        <h1 className="mb-1 text-xl font-semibold">Create your account</h1>
        <p className="mb-5 text-sm text-foreground/60">
          Start grounding your job hunt in real experience.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Field label="Name (optional)">
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </Field>
          <ErrorText>{error}</ErrorText>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-foreground/60">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
