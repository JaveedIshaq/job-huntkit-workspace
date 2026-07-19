import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { SIGNUP_ENABLED } from "@/lib/config";

const STEPS = [
  {
    title: "1. Add your profile",
    body: "Paste your resume and project write-ups. HuntKit chunks and embeds them into a searchable knowledge base.",
  },
  {
    title: "2. Save a job",
    body: "Drop in a job description. Track it through your pipeline from saved to offer.",
  },
  {
    title: "3. Analyze with AI",
    body: "RAG retrieves your most relevant experience and grades the match — with strengths, gaps, tailored bullets, and likely interview questions.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-start gap-5 pt-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Land the right role with your own{" "}
          <span className="opacity-60">AI job coach.</span>
        </h1>
        <p className="max-w-2xl text-lg text-foreground/70">
          HuntKit grounds every suggestion in your real experience. No generic
          advice — it cites the exact parts of your profile it used.
        </p>
        <div className="flex gap-3">
          {SIGNUP_ENABLED ? (
            <>
              <Link href="/register">
                <Button>Get started</Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary">I have an account</Button>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => (
          <Card key={s.title}>
            <h3 className="mb-2 font-semibold">{s.title}</h3>
            <p className="text-sm text-foreground/70">{s.body}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
