import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/20",
  secondary:
    "bg-zinc-900 text-white hover:bg-zinc-800",
  outline:
    "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50",
  ghost: "text-blue-600 hover:bg-blue-50",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  ...props
}) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
    variants[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
