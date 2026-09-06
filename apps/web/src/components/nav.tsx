"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { SIGNUP_ENABLED } from "@/lib/config";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
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
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href={user ? "/dashboard" : "/"}
          className="cursor-pointer shrink-0"
        >
          <Logo />
        </Link>

        {user ? (
          <div className="flex items-center gap-1 text-sm">
            <div className="hidden items-center gap-1 sm:flex">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-1.5 text-muted-foreground transition duration-200 hover:bg-muted hover:text-foreground",
                    pathname.startsWith(l.href) &&
                      "bg-muted font-medium text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <ThemeToggle className="ml-1" />
            <button
              type="button"
              onClick={onLogout}
              className="ml-1 cursor-pointer rounded-lg px-3 py-1.5 text-muted-foreground transition duration-200 hover:bg-muted hover:text-foreground"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <ThemeToggle />
            <Link
              href="/login"
              className="cursor-pointer rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground"
            >
              Login
            </Link>
            {SIGNUP_ENABLED && (
              <Link
                href="/register"
                className="cursor-pointer rounded-lg px-3 py-1.5 text-foreground hover:bg-muted"
              >
                Sign up
              </Link>
            )}
          </div>
        )}
      </nav>
      {user ? (
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-3 sm:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "cursor-pointer shrink-0 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                pathname.startsWith(l.href) &&
                  "bg-muted font-medium text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
