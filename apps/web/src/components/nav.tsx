"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { SIGNUP_ENABLED } from "@/lib/config";
import { cn } from "./ui";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jobs", label: "Jobs" },
  { href: "/profile", label: "Profile" },
  { href: "/admin/runs", label: "AI Runs" },
];

export function Nav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  function onLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href={user ? "/dashboard" : "/"} className="font-semibold">
          Hunt<span className="opacity-60">Kit</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-1 text-sm">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 transition hover:bg-black/5 dark:hover:bg-white/10",
                  pathname.startsWith(l.href) && "bg-black/5 dark:bg-white/10",
                )}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={onLogout}
              className="ml-2 rounded-lg px-3 py-1.5 text-foreground/60 transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/login"
              className="rounded-lg bg-foreground px-3 py-1.5 text-background"
            >
              Login
            </Link>
            {SIGNUP_ENABLED && (
              <Link href="/register" className="rounded-lg px-3 py-1.5">
                Sign up
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
