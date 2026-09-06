import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50",
    secondary:
      "border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50",
    ghost: "text-foreground hover:bg-muted disabled:opacity-50",
    danger:
      "border border-danger/40 bg-danger-bg text-danger-fg hover:opacity-90 disabled:opacity-50",
  }[variant];
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition duration-200 disabled:cursor-not-allowed",
        styles,
        className,
      )}
      {...props}
    />
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-lg border border-border bg-card px-3 py-2 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-ring sm:text-sm",
        props.className,
      )}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-lg border border-border bg-card px-3 py-2 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-ring sm:text-sm",
        props.className,
      )}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-lg border border-border bg-card px-3 py-2 text-base text-foreground outline-none focus:border-ring sm:text-sm",
        props.className,
      )}
    />
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "amber" | "red" | "blue";
  className?: string;
}) {
  const tones = {
    neutral: "bg-muted text-muted-foreground",
    green: "bg-success-bg text-success-fg",
    amber: "bg-warning-bg text-warning-fg",
    red: "bg-danger-bg text-danger-fg",
    blue: "bg-info-bg text-info-fg",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center truncate whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones,
        className,
      )}
      title={typeof children === "string" ? children : undefined}
    >
      {children}
    </span>
  );
}

export function ErrorText({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p className="rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
      {children}
    </p>
  );
}
