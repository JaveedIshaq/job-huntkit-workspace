// Sign-up is off by default (safe for production). It's only on when the
// env var is explicitly "true" — set in .env.local for local development.
export const SIGNUP_ENABLED =
  process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true";
