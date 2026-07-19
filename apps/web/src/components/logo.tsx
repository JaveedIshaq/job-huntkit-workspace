import { cn } from "./ui";

// The mark: a crosshair/target — "hunt" + hitting the right role.
// Uses currentColor so it adapts to light/dark; color it via className.
export function LogoMark({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path
        d="M12 1v3M12 20v3M1 12h3M20 12h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Full lockup: colored mark + wordmark. Wordmark inherits text color.
export function Logo({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold", className)}>
      <LogoMark size={size} className="text-indigo-500" />
      <span>
        Hunt<span className="opacity-60">Kit</span>
      </span>
    </span>
  );
}
